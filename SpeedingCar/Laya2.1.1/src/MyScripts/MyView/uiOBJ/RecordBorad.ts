import GameManager from "../../Manager/GameManager";
import User_wcjtn_ from "../../../User/User";
import View_wcjtn_Mgr, { View_wcjtn_Def } from "../../../Mgr/ViewMgr";
import WX_wcjtn_API from "../../../WXAPI";
import Circular_wcjtn_ProcessBar from "../../../View/CircularProcessBar";
import Utilit_wcjtn_ from "../../../Utilit";
import Event_wcjtn_Mgr from "../../../Event/EventMgr";
import { Event_wcjtn_Def } from "../../../Event/EventDef";
import NativeCallback from "../../../NativeCallback";

export default class RecordBorad extends Laya.Script {
    /** @prop {name:xin, tips:"新", type:Node, default:1000}*/
    public xin: Laya.Sprite;
    /** @prop {name:ji, tips:"记", type:Node, default:1000}*/
    public ji: Laya.Sprite;
    /** @prop {name:lu, tips:"录", type:Node, default:1000}*/
    public lu: Laya.Sprite;
    /** @prop {name:getCoin, tips:"得到的金币", type:Node, default:1000}*/
    public getCoin: Laya.FontClip;

    /** @prop {name:tribleBtn, tips:"三倍金币的按钮", type:Node, default:1000}*/
    public tribleBtn: Laya.Button;

    /** @prop {name:giveUpBtn, tips:"放弃按钮", type:Node, default:1000}*/
    public giveUpBtn: Laya.Button;

    /** @prop {name:record, tips:"记录", type:Node, default:1000}*/
    public record: Laya.FontClip;

    private _mOwner: Laya.Image;

    private _getCoinAmount: number = 0;
    private _recordVal: number = 0;
    private _fixRecordVal: number = 0;

    /** @prop {name:circularBar, tips:"环形条", type:Node, default:1000}*/
    public circularBar: Laya.Sprite;
    /** @prop {name:timerClip, tips:"倒计时", type:Node, default:1000}*/
    public timerClip: Laya.FontClip;
    private _mCircularBar: Circular_wcjtn_ProcessBar;
    private _mTimeAmount:number = 3;  //8S倒计时
    private _mTimer:number = 0;

    constructor() { super(); }

    onAwake() {
        this._mOwner = this.owner as Laya.Image;
        this._mOwner.visible = false;
        this._mCircularBar = this.circularBar.getComponent(Circular_wcjtn_ProcessBar);
        this.giveUpBtn.visible = false;
    }


    private addEvent() {
        this.tribleBtn.on(Laya.Event.CLICK, this, this.clickTribleBtn);
        this.giveUpBtn.on(Laya.Event.CLICK, this, this.clickGiveUpBtn);
    }

    private removeEvent() {
        this.tribleBtn.off(Laya.Event.CLICK, this, this.clickTribleBtn);
        this.giveUpBtn.off(Laya.Event.CLICK, this, this.clickGiveUpBtn);
    }

    
    onEnable() {
        super.onEnable();
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.RewardVideoFail, this, this.onRewardVidewoFail);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    }

    onDisable() {
        super.onDisable();
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.RewardVideoFail, this, this.onRewardVidewoFail);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    }

    
    onRewardVidewoFail() {
        if (NativeCallback.NowVideoType == "trible") {
            //存档
            GameManager.Instance().OpenOverView();
            View_wcjtn_Mgr.ins_wcjtn_tance.close_wcjtn_View(View_wcjtn_Def.GameView);
            NativeCallback.NowVideoType = "";
        }
    }

    onRewardVidewoSuccess() {
        if (NativeCallback.NowVideoType == "trible") {
            User_wcjtn_.add_wcjtn_Money(this._getCoinAmount * 2);
            //存档
            GameManager.Instance().OpenOverView();
            View_wcjtn_Mgr.ins_wcjtn_tance.close_wcjtn_View(View_wcjtn_Def.GameView);
            NativeCallback.NowVideoType = "";
        }
    }


    onUpdate() {
        if (this._mOwner.visible) {
            //更新记录数字的展示
            if (this._recordVal < this._fixRecordVal) {
                this._recordVal++;
                this.record.value = this._recordVal.toString();
            }
            this.TimeGo();            
        }
    }

    private TimeGo(){
        if(!this.timerClip.visible)return;
        this._mTimer+=Utilit_wcjtn_.safeDelta();
        let time = this._mTimeAmount-Math.floor(this._mTimer/1000);
        this.timerClip.value = time.toString();
        let val = this._mTimer/(this._mTimeAmount*1000);
        this._mCircularBar.set_wcjtn_Value(val);
        if(time<=0){
            this._mCircularBar.hide();
            this.timerClip.visible= false;
        }
    }

    Show(record: number, getCoin: number) {
        this._getCoinAmount = getCoin;
        this._fixRecordVal = record;
        this.getCoin.value = this._getCoinAmount.toString();
        this.record.value = this._recordVal.toString();
        this.FontMove(this.xin, 0);
        this.FontMove(this.ji, 500);
        this.FontMove(this.lu, 1000);
        this._mOwner.visible = true;
        // this.ToFixScale(this.tribleBtn,1000,1,0,null);
        // this.ToFixScale(this.giveUpBtn,500,1,2000,null);
        // this.ToFixScale(this.getCoin,1000,1,0,null);
        this.tribleBtn.visible = true;
        this.getCoin.visible = true;
        Laya.timer.once(this._mTimeAmount*1000, this, () => {
            this.giveUpBtn.visible = true;
        })
        this.addEvent();
    }

    private ToFixScale(sp: Laya.Sprite, timer: number, fixScale: number, delay: number, ease: any) {
        sp.scale(0, 0);
        Laya.timer.once(delay, this, () => {
            Laya.Tween.to(sp, { scaleX: fixScale, scaleY: fixScale }, timer, ease)
        })
    }

    private FontMove(sp: Laya.Sprite, delay: number) {
        sp.pos(sp.x, sp.y - 500);
        Laya.timer.once(delay, this, () => {
            Laya.Tween.to(sp, { y: sp.y + 500 }, 300, Laya.Ease.elasticOut);
        })
    }

    clickTribleBtn() {
        this.removeEvent();
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback.CallNativeFunc("showRewardVideo");
            NativeCallback.NowVideoType = "trible";
            Laya.SoundManager.muted = true;
        }
        else {
            User_wcjtn_.add_wcjtn_Money(this._getCoinAmount * 2);
            GameManager.Instance().OpenOverView();
            View_wcjtn_Mgr.ins_wcjtn_tance.close_wcjtn_View(View_wcjtn_Def.GameView);
        }
    }

    clickGiveUpBtn() {
        GameManager.Instance().OpenOverView();
        View_wcjtn_Mgr.ins_wcjtn_tance.close_wcjtn_View(View_wcjtn_Def.GameView);
    }


}