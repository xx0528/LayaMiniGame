import Circular_wcjtn_ProcessBar from "../../CircularProcessBar";
import Utilit_wcjtn_ from "../../../Utilit";
import GameManager from "../../../MyScripts/Manager/GameManager";
import WX_wcjtn_API from "../../../WXAPI";

export default class ReliveBtn extends Laya.Script {
    /** @prop {name:circularBar, tips:"环形条", type:Node, default:1000}*/
    public circularBar: Laya.Sprite;
    /** @prop {name:timerClip, tips:"倒计时", type:Node, default:1000}*/
    public timerClip: Laya.FontClip;
    private _mOwner:Laya.Button;
    private _mCircularBar: Circular_wcjtn_ProcessBar;
    private _mTimeAmount:number = 5;  //8S倒计时
    private _mTimer:number = 0;

    constructor() { super(); }

    onAwake() {
        this._mOwner = this.owner as Laya.Button;
        this._mCircularBar = this.circularBar.getComponent(Circular_wcjtn_ProcessBar);
        this.Hide();
    }

    onUpdate(){
        if(this._mOwner.visible){
            this.TimeGo();
        }
    }



    Show(){
        this._mOwner.visible = true;
        this._mTimer = 0;
    }

    private TimeGo(){
        this._mTimer+=Utilit_wcjtn_.safeDelta();
        let time = this._mTimeAmount-Math.floor(this._mTimer/1000);
        this.timerClip.value = time.toString();
        let val = this._mTimer/(this._mTimeAmount*1000);
        this._mCircularBar.set_wcjtn_Value(val);
        if(time<=0){
            console.log("复活按钮关闭");
            this._mOwner.visible = false;
        }
    }

    GetTimerAmount():number{
        return this._mTimeAmount;
    }

    Hide(){
        this._mOwner.visible = false;
    }
}