import GameController from "../../Game/GameController";
import View_myqq_Mgr, { ViewDef } from "../../Mgr/ViewMgr";
import ViewBase from "../ViewBase";
import Sound_myqq_Mgr from "../../Mgr/SoundMgr";
import GameConst from "../../Game/GameConst";
import Version, { Song, ChargeType } from "../../Game/Version";
import CenterList from "./CenterList";
import Utilit from "../../Utilit";
import User_yy from "../../User/User";
import WXAPI from "../../WXAPI";
import SoundManager, { castPlayOneMoney } from "../../Game/SoundManager";
import SongDisCell from "./CellView/SongDisCell";
import Event_myqq_Mgr from "../../Event/EventMgr";
import { EventDef } from "../../Event/EventDef";
import NativeCallback from "../../NativeCallback";

export default class GameMainView extends ViewBase {

    private songList: Laya.List;
    private centerList: CenterList;

    private powerFlag: Laya.Box;
    private videoFlag: Laya.Box;
    private castLabel: Laya.Label;
    private playButton: Laya.UIComponent;
    private shardButton: Laya.UIComponent;
    private rankButton: Laya.UIComponent;
    private storeButton: Laya.UIComponent;
    private NewSongFlag: Laya.Image;

    private physicals: Laya.Box; 
    private physicalValues: Laya.Label;
    private noPhysical: Laya.UIComponent;

    private clickSong: Song;

    onAwake(): void {
        this.songList = this.owner.getChildByName("SongList") as Laya.List;
        this.centerList = this.songList.getComponent(CenterList);
        this.playButton = this.owner.getChildByName("PlayButton") as Laya.UIComponent;
        this.shardButton = this.owner.getChildByName("ShareButton") as Laya.UIComponent;
        this.rankButton = this.owner.getChildByName("RankButton") as Laya.UIComponent;
        this.storeButton = this.owner.getChildByName("SongStore") as Laya.UIComponent;
        this.NewSongFlag = this.storeButton.getChildByName("NewSong") as Laya.Image;
        
        this.shardButton.visible = false;
        this.rankButton.visible = false;
        
        this.physicalValues = Utilit.FindChild(this.owner, "PhysicalValue/Label") as Laya.Label;
        this.physicals = this.playButton.getChildByName("Box") as Laya.Box;
        this.powerFlag = this.playButton.getChildByName("Power") as Laya.Box;
        this.videoFlag = this.playButton.getChildByName("Video") as Laya.Box;
        this.noPhysical = this.playButton.getChildByName("NoPhysical") as Laya.Box;
        this.castLabel = this.powerFlag.getChildByName("Label") as Laya.Label;

        this.songList.hScrollBarSkin = "";
        this.songList.selectEnable = false;
        this.songList.elasticEnabled = true;
        this.songList.renderHandler = Laya.Handler.create(this, this.OnRenderSongList, null, false);
        this.centerList.cellStateChange = Laya.Handler.create(this, this.OnCellStateChange, null, false);
        this.centerList.centerCellChange = Laya.Handler.create(this, this.OnCenterChange, null, false);

        this.playButton.on(Laya.Event.CLICK, this, this.OnClickPlayButton);
        this.shardButton.on(Laya.Event.CLICK, this, this.OnClickShareButton);
        this.storeButton.on(Laya.Event.CLICK, this, this.OnClickStoreButton);
        this.rankButton.on(Laya.Event.CLICK, this, this.OnClickRankButton);
    }

    onEnable(): void {
        console.log(Version.songs.length);
        this.songList.array = Version.songs;
        this.physicalValues.text = User_yy.getMoney().toString();
        let index = SoundManager.Instance.GetLastPlaySongIndex();
        this.centerList.MoveTo(index);
        Event_myqq_Mgr.instance.regEvemt(EventDef.Game_OnUserMoneyChange, this, this.OnMoneyChange);

        Event_myqq_Mgr.instance.regEvemt(EventDef.RewardVideoFail,this,this.onRewardVidewoFail);
        Event_myqq_Mgr.instance.regEvemt(EventDef.RewardVideoSuccess,this,this.onRewardVidewoSuccess);

        let song = Version.songs[index];
        let chargeType: ChargeType = song.chargeType;
        let moneyEnough = SoundManager.Instance.CanPlayOne();

        if (!moneyEnough) {
            this.noPhysical.visible = true;
            this.videoFlag.visible = true;
            this.powerFlag.visible = false;
        } else {
            this.noPhysical.visible = false;
            this.videoFlag.visible = chargeType == ChargeType.Video;
            this.powerFlag.visible = (chargeType == ChargeType.Power) || (chargeType == ChargeType.Free);
        }
    }

    onDisable(): void {
        Laya.Tween.clearAll(this);
        Laya.timer.clearAll(this);
        Event_myqq_Mgr.instance.removeEvent(EventDef.Game_OnUserMoneyChange, this, this.OnMoneyChange);
        
        Event_myqq_Mgr.instance.removeEvent(EventDef.RewardVideoFail,this,this.onRewardVidewoFail);
        Event_myqq_Mgr.instance.removeEvent(EventDef.RewardVideoSuccess,this,this.onRewardVidewoSuccess);
    }

    
    protected onRewardVidewoFail() {
        if (NativeCallback.NowVideoType == "ClickPlay") {
            this.playButton.mouseEnabled = true;
        }
        View_myqq_Mgr.instance.openView(ViewDef.TipsView, "Video playback failed. can't enter game");
    }

    protected onRewardVidewoSuccess() {
        let songs = Version.songs;
        if (songs == null || songs.length == 0) {
            View_myqq_Mgr.instance.openView(ViewDef.TipsView, "The library is empty and is being expedited ... ...");
            return;
        }
        var playSong = songs[this.centerList.CenterIndex];
        
        if(NativeCallback.NowVideoType == "ClickSong" && this.clickSong != null) {
            playSong = this.clickSong;
        }

        this.PlaySong(playSong);
        Laya.timer.clearAll(this);
        this.playButton.mouseEnabled = true;
        return;
    }

    private OnClickPlayButton(): void {
        let songs = Version.songs;
        if (songs == null || songs.length == 0) {
            View_myqq_Mgr.instance.openView(ViewDef.TipsView, "The library is empty and is being expedited ... ...");
            return;
        }

        //手机平台钱不足 看广告
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            if (!SoundManager.Instance.CanPlayOne()) {
                NativeCallback.NowVideoType = "ClickPlay";
                NativeCallback.CallNativeFunc("showRewardVideo");
                Laya.SoundManager.muted = true;
                this.playButton.mouseEnabled = false;
                return;
            }
        }

        let playSong = songs[this.centerList.CenterIndex];
        if (!SoundManager.Instance.CanPlayOne()) {
            this.PlaySong(playSong);
            Laya.timer.clearAll(this);
            this.playButton.mouseEnabled = false;
            Laya.timer.once(1000, this, () => { this.playButton.mouseEnabled = true; })
            return;
        }

        this.playButton.mouseEnabled = false;
        Laya.timer.clearAll(this);
        Laya.timer.once(1000, this, () => {
            this.playButton.mouseEnabled = true;
            this.PlaySong(playSong);
        });

        this.physicalValues.text = (User_yy.getMoney() - SoundManager.Instance.GetSongCastMoney(playSong)).toString();
        let logo = Utilit.FindChild(this.playButton, "Power/Logo") as Laya.UIComponent; //this.playButton.getChildByName("Logo") as Laya.UIComponent;
        let startPos = (this.physicalValues.parent as Laya.UIComponent).localToGlobal(new Laya.Point());
        let endPos = logo.localToGlobal(new Laya.Point());
        this.ShowPhysicalAnim(this.physicals, logo, startPos, endPos, 300);
    }

    private ShowPhysicalAnim(physicals: Laya.UIComponent, logo: Laya.UIComponent, startPos: Laya.Point, endPos: Laya.Point, offset: number): void {
        startPos = physicals.globalToLocal(startPos);
        endPos = physicals.globalToLocal(endPos);
        let scaleChange = () => {
            Laya.Tween.clearAll(logo);
            logo.scale(1,1);
            Laya.Tween.from(logo, {scaleX: 1.4, scaleY: 1.4}, 0.2 * 1000, Laya.Ease.backOut);
        }
        for (let i = 0; i < physicals._children.length; i++) {
            let item = physicals._children[i] as Laya.UIComponent;
            item.x = startPos.x;
            item.y = startPos.y;
            item.visible = true;
            Laya.Tween.clearAll(this);
            Laya.Tween.to(item, {x: startPos.x + Utilit.GetRandomNumber(0, offset), y: startPos.y + Utilit.GetRandomNumber(0, offset)}, 0.15 * 1000, null, Laya.Handler.create(this, () => {
                Laya.Tween.to(item, {x: endPos.x, y: endPos.y}, (0.2 + Math.random() * 0.3) * 1000, null, Laya.Handler.create(this, () => {
                    item.visible = false;
                    scaleChange.call(this);
                }));
            }));
        }
    }

    private OnClickShareButton(): void {
        let self = this;
        WXAPI.share((isCompleted) => {
            console.log(isCompleted ? "分享成功" : "用户取消");
        }, "魔音球球， 快一起来玩呀！", "");
    }

    private OnClickRankButton(): void {
        View_myqq_Mgr.instance.openView(ViewDef.TipsView, "功能正在完善中。。。");
    }

    private OnClickStoreButton(): void {
        let self = this;
        View_myqq_Mgr.instance.openView(ViewDef.SongStoreView, this.centerList.CenterIndex, () => {
            self.closeView();
        });
    }

    private OnRenderSongList(cell: Laya.Box, index: number): void {
        var song = this.songList.array[index];
        let songCell = cell.getComponent(SongDisCell) as SongDisCell;
        songCell.UpdateView(index, song);
        songCell.clickHandler = Laya.Handler.create(this, this.OnClickSong, null, false);
    }

    private OnCenterChange(centerCell: Laya.Box, centerIndex: number) {
        let cells = this.songList.cells;
        for (let i = 0; i < cells.length; i++) {
            let cell = cells[i]
            let songCell = cells[i].getComponent(SongDisCell) as SongDisCell;
            let active = cell == centerCell;
            songCell.ActiveSong(active);
        }
        
        let song = this.songList.array[centerIndex] as Song;
        SoundManager.Instance.AuditionSong(song);
        this.castLabel.text = "×" + SoundManager.Instance.GetSongCastMoney(song);
    }

    private OnClickSong(song: Song): void {
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            if (!SoundManager.Instance.CanPlayOne()) {
                NativeCallback.NowVideoType = "ClickSong";
                NativeCallback.CallNativeFunc("showRewardVideo");
                Laya.SoundManager.muted = true;
                this.clickSong = song;
                return;
            }
        }

        this.PlaySong(song);
    }

    private PlaySong(song: Song): void {
        SoundManager.Instance.PlaySong(song, this, () => {
            this.closeView();
        });
    }

    private OnCellStateChange(cell: Laya.Box, scale: number) {
        const startScele = 0.6;
        const maxScale = 1
        let boxScale = Math.min(maxScale, (0.6 + 0.4 * scale));
        cell.scale(boxScale, boxScale);
    }

    private OnMoneyChange(data): void {
        let currMoney = data.curr;
        this.physicalValues.text = currMoney.toString();
    }
}