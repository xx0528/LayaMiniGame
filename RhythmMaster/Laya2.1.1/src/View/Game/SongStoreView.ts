import ViewBase from "../ViewBase";
import Version, { Song } from "../../Game/Version";
import Utilit from "../../Utilit";
import View_myqq_Mgr, { ViewDef } from "../../Mgr/ViewMgr";
import SoundManager from "../../Game/SoundManager";
import SongStoreCell from "./CellView/SongStoreCell";
import NativeCallback from "../../NativeCallback";
import Event_myqq_Mgr from "../../Event/EventMgr";
import { EventDef } from "../../Event/EventDef";

export default class SongStoreView extends ViewBase {

    private selectIndex: number;
    private currSongBox: Laya.Box;
    private songList: Laya.List;
    private backButton: Laya.Image;

    onAwake(): void {
        this.songList = this.owner.getChildByName("SongList") as Laya.List;
        this.currSongBox = this.owner.getChildByName("CurrSongData") as Laya.List;
        this.backButton = this.owner.getChildByName("BackButton") as Laya.Image;

        this.songList.vScrollBarSkin = "";
        this.songList.selectEnable = true;
        this.songList.elasticEnabled = true;
        this.songList.selectHandler = Laya.Handler.create(this, this.OnSelectSong, null, false);
        this.songList.renderHandler = Laya.Handler.create(this, this.OnRenderSongList, null, false);

        this.backButton.on(Laya.Event.CLICK, this, this.OnClickBackButton);
    }

    onEnable(): void {
        Event_myqq_Mgr.instance.regEvemt(EventDef.RewardVideoFail,this,this.onRewardVidewoFail);
        Event_myqq_Mgr.instance.regEvemt(EventDef.RewardVideoSuccess,this,this.onRewardVidewoSuccess);
    }
    onShow(): void {
        let selectIndex = SoundManager.Instance.GetLastPlaySongIndex();
        this.selectIndex = selectIndex;
        let song = Version.songs[selectIndex];
        this.SetCurrSongData(song);
        this.songList.array = Version.songs;
    }

    private SetCurrSongData(song: Song): void  {
        let name = Utilit.FindChild(this.currSongBox, "Name/Label") as Laya.Label;
        let stars = this.currSongBox.getChildByName("StarLevels") as Laya.Box;
        name.text = song.name;
        let songRecord = SoundManager.Instance.GetSongRecord(song.name);
        let starLevel = (songRecord == null) ? 0 : songRecord.starLevel;

        for (let i = 1; i <= 3; i++) {
            let star = stars.getChildByName("Star" + i);
            let activeFlag = star.getChildByName("Active") as Laya.UIComponent;
            activeFlag.visible = i <= starLevel;
        }
    }

    OnRenderSongList(cell: Laya.Box, index: number): void {
        let song = this.songList.array[index] as Song;
        let songCell = cell.getComponent(SongStoreCell) as SongStoreCell;
        
        songCell.UpdateView(song);
        songCell.ActiveSong(index == this.selectIndex);

        cell.off(Laya.Event.CLICK, this, this.OnClickPlay);
        cell.on(Laya.Event.CLICK, this, this.OnClickPlay);
    }
    
    OnSelectSong(index: number): void {
        let cells = this.songList.cells;
        let song = this.songList.array[index] as Song;
        let activeCell = this.songList.getCell(index);

        SoundManager.Instance.AuditionSong(song);

        for (let i = 0; i < cells.length; i++) {
            let cell = cells[i]
            let songCell = cells[i].getComponent(SongStoreCell) as SongStoreCell;
            songCell.ActiveSong(cell == activeCell);
        }
    }

    OnClickPlay(): void {
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            if (!SoundManager.Instance.CanPlayOne()) {
                NativeCallback.NowVideoType = "StoreSong";
                NativeCallback.CallNativeFunc("showRewardVideo");
                Laya.SoundManager.muted = true;
                return;
            }
        }
        if (this.selectIndex != this.songList.selectedIndex) {
            this.selectIndex = this.songList.selectedIndex
            this.SetCurrSongData(this.songList.array[this.selectIndex]);
            return;
        }

        let song = this.songList.array[this.selectIndex];
        SoundManager.Instance.PlaySong(song, this, () => {
            this.closeView();
        });
    }
    
    protected onRewardVidewoFail() {
        if (NativeCallback.NowVideoType == "StoreSong") {
            View_myqq_Mgr.instance.openView(ViewDef.TipsView, "Video playback failed. can't enter game");
        }
    }

    protected onRewardVidewoSuccess() {
        if (this.selectIndex != this.songList.selectedIndex) {
            this.selectIndex = this.songList.selectedIndex
            this.SetCurrSongData(this.songList.array[this.selectIndex]);
            return;
        }

        let song = this.songList.array[this.selectIndex];
        SoundManager.Instance.PlaySong(song, this, () => {
            this.closeView();
        });
    }

    OnClickUnlock(): void {
        this.songList.refresh();
    }

    OnClickBackButton(): void {
        let self = this;
        View_myqq_Mgr.instance.openView(ViewDef.GameMainView, null, () => {
            self.closeView();
        });
    }

    
    onDisable(): void {
        
        Event_myqq_Mgr.instance.removeEvent(EventDef.RewardVideoFail,this,this.onRewardVidewoFail);
        Event_myqq_Mgr.instance.removeEvent(EventDef.RewardVideoSuccess,this,this.onRewardVidewoSuccess);
    }
}