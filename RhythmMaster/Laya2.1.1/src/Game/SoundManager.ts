import Version, { Song, ChargeType } from "./Version";
import User_yy, { PassSong } from "../User/User";
import View_myqq_Mgr, { ViewDef } from "../Mgr/ViewMgr";
import WXAPI from "../WXAPI";
import Game_myqq_Mgr from "../Mgr/GameMgr";
import AudioWraper from "./Audio/AudioWraper";

export const castPlayOneMoney = 10;
const lastSongKey = "LastPlaySong"
export default class SoundManager {
    private static _instance: SoundManager;
    public static get Instance(): SoundManager {
        return SoundManager._instance ? SoundManager._instance : SoundManager._instance = new SoundManager;
    }

    public IsFirstEnterGame(): boolean {
        const FirstEnter = "FirstEnter"
        let value = Laya.LocalStorage.getItem(FirstEnter);
        Laya.LocalStorage.setItem(FirstEnter, "succeed");
        return value == null || value == "";
    }

    public IsFirstTime(): boolean {
        let count = 0;
        let passSongs = User_yy.getPassSong();
        for (let i = 0; i < passSongs.length; i++) {
            if (passSongs[i].completed) {
                count += 1;
            }
        }
        return count < 1;
    }

    public CheckSongUnlocked(name: string): boolean {
        return User_yy.IncludetSong(name);
    }

    public CanPlayOne(): boolean {
        if (User_yy.getMoney() < castPlayOneMoney) {
            return false;
        }
        return true
    }

    public GetSongRecord(name: string): PassSong {
        let passSongs = User_yy.getPassSong();
        for (let i = 0; i < passSongs.length; i++) {
            let song = passSongs[i];
            if (song.name == name) {
                return song;
            }
        }
        return null;
    }

    public SaveSongRecord(name: string, starLevel: number, source: number, completed: boolean, saveCompleted?: Laya.Handler ) {
        console.log("saveSongRecord:" + name + "|starLevel:" + starLevel + "|source:" + source);
        let passSong = this.GetSongRecord(name);
        if (source > passSong.source) {
        passSong.source = source;
        }
        if (starLevel > passSong.starLevel) {
            passSong.starLevel = starLevel;
        }
        if (!passSong.completed) {
            passSong.completed = completed;
        }
        if (!saveCompleted) {
            Game_myqq_Mgr.getInstance().save_myqq_GameData();
        } else {
            Game_myqq_Mgr.getInstance().save_myqq_GameData(saveCompleted.caller, saveCompleted.method);
        }
    }

    public GetSongbyName(name: string): Song {
        let songs = Version.songs;
        for (let i = 0; i < songs.length; i++) {
            if (songs[i].name == name) {
                return songs[i];
            }
        }
        return null
    }

    public PlaySongbyName(name: string) {
        let song = this.GetSongbyName(name);
        this.PlaySong(song);
    }

    public CheckSongIsFree(song: Song): boolean {
        let isFree = Version.enableCharge ? song.chargeType == 0 : true;
        return isFree;
    }

    public AuditionSong(song: Song): void {
        Laya.LocalStorage.setItem(lastSongKey, song.name);
        AudioWraper.Instance.LoadPlay(song.songPath);
    }

    public PlaySong(song: Song, caller?: any, completed?: Function): void {
        // if (User.getMoney() < 10) {
        //     View_myqq_Mgr.instance.openView(ViewDef.TipsView, "你当前体力不足");
        //     return;
        // }

        if (song == null) { return; }

        function playSong(succeed) {
            if (!succeed) {
                return;
            }
            AudioWraper.Instance.Stop();
            Laya.LocalStorage.setItem(lastSongKey, song.name);
            View_myqq_Mgr.instance.openView(ViewDef.GameLoadingView, song, () => {
                if (completed != null) {
                    completed.call(caller);
                }
            });
        }

        let powerEnough = this.CanPlayOne();
        this.PlayAndUnlockSong(powerEnough, song, Laya.Handler.create(this, playSong));
    }

    public GetSongCastMoney(song: Song): number {
        return song.chargeType == ChargeType.Power ? song.costPower : castPlayOneMoney;
    }

    public SubPlayOneMoney(song: Song, saveNow: boolean = false): void {
        let castMoney = this.GetSongCastMoney(song);
        User_yy.subMoney(castMoney);
        if (saveNow == true) {
            Game_myqq_Mgr.getInstance().save_myqq_GameData();
        }
    }

    private PlayAndUnlockSong(powerEnough: boolean, song: Song, completed?: Laya.Handler) {
        let lookAdSucceed = (succeed) => {
            if (completed) completed.runWith(succeed);
            if (!succeed) {
                View_myqq_Mgr.instance.showTips("观看完整视频才可解锁游戏！");
                return;
            }
            if (!User_yy.IncludetSong(song.name)) {
                User_yy.AddUnlockSong(song.name);
                Game_myqq_Mgr.getInstance().save_myqq_GameData(this);
            }
        }

        if (!Version.enableCharge) {
            if (!powerEnough) {
                this.PlayCastByChargeType(2, 0, this, lookAdSucceed);
                //View_myqq_Mgr.instance.showTips("当前体力不足");
            }
            else {
                lookAdSucceed.call(this, true);
            }
        } else {
            if (User_yy.IncludetSong(song.name)) {
                if (completed != null) completed.runWith(true);
                return;
            }
            this.PlayCastByChargeType(song.chargeType, song.costPower, this, lookAdSucceed);
        }
    }

    private LookRewardedVideo(completed?: Laya.Handler) {
        this.PlayCastByChargeType(3, 0, completed.caller, completed.method);
    }

    // 0 免费 1 金币 2 广告
    private PlayCastByChargeType(chargeType: ChargeType, castMoney: number, caller: any, handler: Function) {
        switch(chargeType) {
            case ChargeType.Free: {
                console.log("免费解锁");
                handler.call(caller, true);
                break;
            }
            case ChargeType.Power: {
                console.log("消耗体力解锁");
                if (User_yy.getMoney() < castMoney) {
                    handler.call(caller, false);
                    return;
                }
                User_yy.subMoney(10);
                handler.call(caller, true);
                break;
            }
            case ChargeType.Video: {
                console.log("广告解锁");
                let self = this;
                WXAPI.showRewardedVideoAd((isCompleted) => {
                    handler.call(caller, isCompleted);
                }, () => {
                    handler.call(caller, false);
                });
                break;
            }
        }
    }

    public GetLastPlaySongIndex(): number {
        let index = 0;
        let name = Laya.LocalStorage.getItem(lastSongKey);
        for(let i = 0; i < Version.songs.length; i++) {
            let song = Version.songs[i];
            if (song.name == name) {
                index = i;
            }
        }
        return index;
    }

    public GetSongAwards(win, starLevel): number {
        const awards = 2;
        return (win) ? awards * starLevel : 5;
    }

    public SetAdSongAwards(starLevel): number {
        let count = this.GetSongAwards(true, starLevel) * 5;
        User_yy.addMoney(count);
        Game_myqq_Mgr.getInstance().save_myqq_GameData(); 
        return User_yy.getMoney();
    }

    public SetFreeSongAwards(): number {
        let count = this.GetSongAwards(false, 0);
        User_yy.addMoney(count);
        Game_myqq_Mgr.getInstance().save_myqq_GameData(); 
        return User_yy.getMoney();
    }
}