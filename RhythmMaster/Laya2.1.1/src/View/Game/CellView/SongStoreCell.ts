import Version, { Song } from "../../../Game/Version";
import Utilit from "../../../Utilit";
import SoundManager from "../../../Game/SoundManager";
import { PassSong } from "../../../User/User";

export default class SongStoreCell extends Laya.Script {

    private songData: Song;

    private songName: Laya.Label;
    private playButton: Laya.Image;
    private unlockAdButton: Laya.Image;
    private unlocakPowerButton: Laya.Box;
    private record: Laya.UIComponent;
    private selectFlag: Laya.UIComponent;
    private starLevels: Laya.Node;
    private freeUnlockButton: Laya.UIComponent;

    public playHander: Laya.Handler = null;
    public unlockHander: Laya.Handler = null;

    onAwake(): void {
        this.songName = this.owner.getChildByName("SongName") as Laya.Label;
        this.playButton = this.owner.getChildByName("PlayButton") as Laya.Image;
        this.unlockAdButton = Utilit.FindChild(this.owner, "Operation/AdType") as Laya.Image;
        this.unlocakPowerButton = Utilit.FindChild(this.owner, "Operation/PowerType") as Laya.Box;
        this.record = Utilit.FindChild(this.owner, "Operation/Played") as Laya.Box;
        this.selectFlag = Utilit.FindChild(this.owner, "Background/Selected") as Laya.Image;
        this.starLevels = this.owner.getChildByName("StarLevels") as Laya.Node;
        this.freeUnlockButton = Utilit.FindChild(this.owner, "Operation/Free") as Laya.UIComponent;
    }

    UpdateView(song: Song) {
        this.songData = song;
        this.songName.text = song.name;

        let chargeType = song.chargeType;
        let isFreee = SoundManager.Instance.CheckSongIsFree(song);
        let isUnlock = SoundManager.Instance.CheckSongUnlocked(song.name);
        this.record.visible = isUnlock;
        this.freeUnlockButton.visible = isFreee && !isUnlock;
        this.unlockAdButton.visible = !isFreee && !isUnlock && chargeType == 2;
        this.unlocakPowerButton.visible = !isFreee && !isUnlock && chargeType == 1;
        
        if (isUnlock) {
            let passSong = SoundManager.Instance.GetSongRecord(song.name) as PassSong;
            this.SetStarLevel(passSong.starLevel);
        } else {
            this.SetStarLevel(0);
        }

        if (this.playHander) {
            this.playHander.recover();
        }
        if (this.unlockHander) {
            this.unlockHander.recover();
        }
    }

    private SetStarLevel(level) {
        for (let i = 1; i <= 3; i++) {
            let star = this.starLevels.getChildByName("Star" + i) as Laya.Node;
            let active = star.getChildByName("Active") as Laya.UIComponent;
            active.visible = i <= level;
        }
    }

    ActiveSong(isActive): void {
        this.selectFlag.visible = isActive; 
    }
}