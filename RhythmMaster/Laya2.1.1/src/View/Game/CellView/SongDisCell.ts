import { Song } from "../../../Game/Version";
import Utilit from "../../../Utilit";
import GameConst from "../../../Game/GameConst";
import SoundManager from "../../../Game/SoundManager";


export default class SongDisCell extends Laya.Script {
    private newFlag: Laya.Image = null;
    private hotFlag: Laya.Image = null;
    private songName: Laya.Label = null;
    private selectFlag: Laya.Image = null;
    private background: Laya.Sprite = null;
    private starLevels: Laya.Box = null;

    public songData: Song = null;
    public clickHandler: Laya.Handler = null;

    onAwake(): void {
        this.newFlag = this.owner.getChildByName("NewFlag") as Laya.Image;
        this.hotFlag = this.owner.getChildByName("HotFlag") as Laya.Image;
        this.songName = Utilit.FindChild(this.owner, "SongName/Label") as Laya.Label;
        this.selectFlag = this.owner.getChildByName("SelectFlag") as Laya.Image;
        this.background = this.owner.getChildByName("Background") as Laya.Sprite;
        this.starLevels = this.owner.getChildByName("StarLevels") as Laya.Box;

        this.background.on(Laya.Event.CLICK, this, this.OnClickSong);
    }

    public Reset(): void {
        if (this.clickHandler) this.clickHandler.recover();
    }

    public UpdateView(index: number, song: Song): void {
        this.Reset();
        if (song == null) { return; }
        this.songData = song;
        this.songName.text = "No." + (index + 1) + " " + song.songName;
        this.hotFlag.visible = false;
        this.newFlag.visible = false;
        this.background.loadImage(GameConst.GetRandomSongPreviewPng);

        let previewPngs = song.previewPngs;
        if (previewPngs.length != 0) {
            let imagePath = previewPngs[Utilit.GetRandomNumber(0, previewPngs.length - 1)];
            this.background.loadImage(imagePath);
        }

        let passSong = SoundManager.Instance.GetSongRecord(song.name);
        let level = passSong ? passSong.starLevel : 0;
        this.SetStarLevel(level);
    }

    public ActiveSong(isActive): void {
        if (this.songData == null) { return; }
        this.selectFlag.visible = isActive;
        Laya.Tween.clearAll(this.selectFlag);
        Laya.Tween.clearAll(this.background);
        if (isActive) {
            this.selectFlag.alpha = 0;
            Laya.Tween.to(this.selectFlag, { alpha: 1 }, 0.3 * 1000);
            Laya.Tween.to(this.background, { rotation: this.background.rotation + 360 * 10 }, 120 * 1000);
        }

        this.AutoTextScroll(this.songName.textField, isActive);
    }

    private SetStarLevel(level) {
        for (let i = 1; i <= 3; i++) {
            let star = this.starLevels.getChildByName("Star" + i) as Laya.Node;
            let active = star.getChildByName("Active") as Laya.UIComponent;
            active.visible = i <= level;
        }
    }

    private timer: number = 0;
    private AutoTextScroll(text: Laya.Text, isEnable: boolean, speed: number = 5) {
        let width = text.width;
        let TestWidth = text.textWidth;
        let offset = TestWidth - width;
      
        if (isEnable) {
            this.timer = 0;
            Laya.timer.frameLoop(1, this, this.TextScroll, [text, width, offset, speed]);
        } else {
            text.scrollX = 0;
            Laya.timer.clear(this, this.TextScroll);
        }
    }
 
    private TextScroll(text: Laya.Text, width:number, offset: number, speed: number) {
        text.scrollX = Math.sin(this.timer) * offset;
        this.timer += speed * (Laya.timer.delta / 10000);
    }

    private OnClickSong(): void {
        if (this.clickHandler) {
            this.clickHandler.runWith(this.songData);
        }
    }
}