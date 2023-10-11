import ViewBase from "../ViewBase";
import View_myqq_Mgr, { ViewDef } from "../../Mgr/ViewMgr";
import GameController from "../../Game/GameController";
import Utilit from "../../Utilit";
import SoundManager from "../../Game/SoundManager";
import User_yy, { PassSong } from "../../User/User";
import Game_myqq_Mgr from "../../Mgr/GameMgr";
import WXAPI from "../../WXAPI";
import { EventDef } from "../../Event/EventDef";
import NativeCallback from "../../NativeCallback";
import Event_myqq_Mgr from "../../Event/EventMgr";
import Sound_myqq_Mgr from "../../Mgr/SoundMgr";

export default class GameSettleView extends ViewBase {

    private _stars: Laya.Box;
    private _songName: Laya.Label = null;
    private _songSource: Laya.Label = null;

    private _energy: Laya.Box = null;
    private _energyLabel: Laya.FontClip = null;
    private _physicalBox: Laya.Box = null;
    private _physicalValue: Laya.Label = null;

    private _skipButton: Laya.UIComponent = null;
    private _adMultipleNum: Laya.FontClip = null;
    private _adReceiveButton: Laya.UIComponent = null;
    private _freeReceiveButton: Laya.UIComponent = null;

    private _currentPassSong: PassSong = null;

    onAwake(): void {
        this._energy = this.owner.getChildByName("Energy") as Laya.Box;
        this._energyLabel = this._energy.getChildByName("Label") as Laya.FontClip;
        this._stars = Utilit.FindChild(this.owner, "StartBox/Stars") as Laya.Box;
        this._songName = Utilit.FindChild(this.owner, "SongName/Label") as Laya.Label;
        this._songSource = Utilit.FindChild(this.owner, "Source/Label") as Laya.Label;
        this._skipButton = this.owner.getChildByName("SkipBtn") as Laya.UIComponent;
        this._adReceiveButton = this.owner.getChildByName("AdResurgenceBtn") as Laya.UIComponent;
        this._adMultipleNum = this.owner.getChildByName("Label") as Laya.FontClip;
        this._freeReceiveButton = this.owner.getChildByName("FreeResurgenceBtn") as Laya.UIComponent;

        this._physicalBox = Utilit.FindChild(this.owner, "PhysicalValue/Box") as Laya.Box;
        this._physicalValue = Utilit.FindChild(this.owner, "PhysicalValue/Label") as Laya.Label;

        this._skipButton.on(Laya.Event.CLICK, this, this.onClickFreeReceive);
        this._freeReceiveButton.on(Laya.Event.CLICK, this, this.onClickFreeReceive);
        this._adReceiveButton.on(Laya.Event.CLICK, this, this.onClickAdReceive);
    }
    
    onEnable()
    {
        super.onEnable();   
        
        Event_myqq_Mgr.instance.regEvemt(EventDef.RewardVideoFail,this,this.onRewardVidewoFail);
        Event_myqq_Mgr.instance.regEvemt(EventDef.RewardVideoSuccess,this,this.onRewardVidewoSuccess);

        Event_myqq_Mgr.instance.regEvemt(EventDef.InsertVideoEnd,this,this.onInsertVideoEnd);
    }

    onShow(): void {
        let win = this._data;
        let passSong = GameController.Instance.GetCurrentSongRecord();
        let songName = passSong.name;
        let starLevel = passSong.starLevel;//GameController.Instance.startLevel;
        let source = passSong.source;
        this._currentPassSong = passSong;

        this._songName.text = songName;
        this._songSource.text = source.toString();
        this._physicalValue.text = User_yy.getMoney().toString();
        this.SetStar(starLevel);
        this._energyLabel.value = SoundManager.Instance.GetSongAwards(win, starLevel).toString();;

        this._adReceiveButton.visible = win;
        this._freeReceiveButton.visible = !win

        //this._skipButton.visible = false;
    }

    private SetStar(level): void {
        this._stars._children.forEach((star: Laya.Image) => {
            star.visible = false;
        });
        
        Laya.timer.once(0.3 * 1000, this, () => { for (let i = 1; i <= 3; i++) {
            let star = this._stars.getChildByName("Star" + i) as Laya.UIComponent;
            if (i <= level) {
                let delayTime = (i - 1) * 0.2 * 1000;
                Laya.timer.once(delayTime, this, () => {
                    star.visible = true;
                    star.scale(1, 1);
                    Laya.Tween.from(star.alpha, {alpha: 0.01}, 0.1 * 1000, )
                    Laya.Tween.from(star, { scaleX: 4, scaleY: 4 }, 0.3 * 1000, Laya.Ease.backOut);
                })
            }
        } })
    }

    protected onRewardVidewoFail() {
        View_myqq_Mgr.instance.openView(ViewDef.TipsView, "Get reward after watch the video");
    }

    protected onRewardVidewoSuccess() {
        let num = SoundManager.Instance.SetAdSongAwards(this._currentPassSong.starLevel);
        this._physicalValue.text = num.toString();
        this.ShowGetPowerEffect(this._adReceiveButton as Laya.UIComponent);
    }

    private onClickAdReceive(e: Laya.Event): void {
        console.log("倍数领取奖励");
        // let self = this;
        // let loockBack = (completed) => {
        //     if (!completed) { 
        //         View_myqq_Mgr.instance.openView(ViewDef.TipsView, "看完视频才能领取翻倍奖励哦。。。");
        //         return;
        //     }
            
        //     let num = SoundManager.Instance.SetAdSongAwards(this._currentPassSong.starLevel);
        //     this._physicalValue.text = num.toString();
        //     self.ShowGetPowerEffect(e.target as Laya.UIComponent);
        // }
        // WXAPI.showRewardedVideoAd((isClose) => {
        //     loockBack.call(self, isClose);
        // }, () => {
        //     View_myqq_Mgr.instance.openView(ViewDef.TipsView, "视频加载失败。。。");
        // });


        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback.CallNativeFunc("showRewardVideo");
            Laya.SoundManager.muted = true;
        }else {
            let num = SoundManager.Instance.SetAdSongAwards(this._currentPassSong.starLevel);
            this._physicalValue.text = num.toString();
            this.ShowGetPowerEffect(e.target as Laya.UIComponent);
        }

        //loockBack.call(self, true);
    }

    private onClickFreeReceive(e: Laya.Event): void {
        console.log("免费领取");
        
        this._physicalValue.text = SoundManager.Instance.SetFreeSongAwards().toString();
        this.ShowGetPowerEffect(e.target as Laya.UIComponent);
    }

    private ShowGetPowerEffect(button: Laya.UIComponent) {
        let self = this;
        button.mouseEnabled = false;
        Laya.timer.once(1 * 1000, this, () => {
            //button.mouseEnabled = true;
            // View_myqq_Mgr.instance.openView(ViewDef.ExportView, null, () => {
            //     self.closeView();
            // });
            // var randNum = Math.random();
            // console.log("随机数值 ===========" + randNum);
            // // randNum = 0.46;
            // if ((Laya.Browser.onAndroid || Laya.Browser.onIOS) && randNum > 0.2) {
            //     NativeCallback.CallNativeFunc("showInsertVideo");
            //     NativeCallback.NowVideoType = "insertAd";
            //     Laya.SoundManager.muted = false;
            // }
            // else {
            //     View_myqq_Mgr.instance.openView(ViewDef.GameMainView, null, () => {
            //         self.closeView();
            //     })
            // }
            View_myqq_Mgr.instance.openView(ViewDef.GameMainView, null, () => {
                self.closeView();
            })
        });

        let startPos = this._energy.localToGlobal(new Laya.Point(this._energy.width / 2, this._energy.height / 2));
        let endPos = this._physicalBox.localToGlobal(new Laya.Point(0,0));
        let logo = this._physicalValue.parent.getChildByName("Logo") as Laya.UIComponent;
        this.ShowPhysicalAnim(this._physicalBox, logo, startPos, endPos, 300);
    }

    onInsertVideoEnd() {
        let self = this;
        View_myqq_Mgr.instance.openView(ViewDef.GameMainView, null, () => {
            self.closeView();
        })
        Laya.SoundManager.muted = true;
        NativeCallback.CallNativeFunc("loadNextAd");
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
            Laya.Tween.to(item, {x: startPos.x + Utilit.GetRandomNumber(-offset, offset), y: startPos.y + Utilit.GetRandomNumber(-offset, offset)}, 0.15 * 1000, null, Laya.Handler.create(this, () => {
                Laya.Tween.to(item, {x: endPos.x, y: endPos.y}, (0.2 + Math.random() * 0.3) * 1000, null, Laya.Handler.create(this, () => {
                    item.visible = false;
                    scaleChange.call(this);
                }));
            }));
        }
    }

    onDisable(): void {
        Laya.Tween.clearAll(this);
        Laya.timer.clearAll(this);
        
        Event_myqq_Mgr.instance.removeEvent(EventDef.RewardVideoFail,this,this.onRewardVidewoFail);
        Event_myqq_Mgr.instance.removeEvent(EventDef.RewardVideoSuccess,this,this.onRewardVidewoSuccess);
    }
}