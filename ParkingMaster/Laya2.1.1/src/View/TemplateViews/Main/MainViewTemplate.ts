import TemplateViewBase from "../TemplateViewBase";
import KRQ_Main from "../../../KRQ/ViewCom/KRQ_Main";
import EventMgr from "../../../Event/EventMgr";
import { EventDef } from "../../../Event/EventDef";
import User from "../../../User/User";
import Utilit from "../../../Utilit";

export default class MainViewTemplate extends TemplateViewBase
{
    protected _krqMain : KRQ_Main = null;

    protected _centerZone : Laya.Clip = null;
    protected _startBtn : Laya.Sprite = null;

    protected _levelNum : Laya.FontClip = null;
    protected _moneyNum : Laya.FontClip = null;
    
    onAwake()
    {
        super.onAwake();

        this._krqMain = this.View.getChildByName("KRQ_Main").getComponent(KRQ_Main);
        this._centerZone = this.View.getChildByName("CenterZone") as Laya.Clip;

        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            if(Utilit.isIphoneX())
            {
                this._centerZone.top =  this._centerZone.top + 75;
            }
        }
        else
        {
            this._centerZone.top =  this._centerZone.top - 200;
            if(Utilit.isIphoneX())
            {
                this._centerZone.top =  this._centerZone.top + 75;
            }
        }

        this._startBtn = this._centerZone.getChildByName("StartBtn") as Laya.Sprite;

        this._levelNum = this._centerZone.getChildByName("LevelInfo").getChildByName("LevelNum") as Laya.FontClip;
        this._moneyNum = this._centerZone.getChildByName("MoneyInfo").getChildByName("MoneyNum") as Laya.FontClip;
    }

    onStart()
    {
        super.onStart();
        this._moneyNum.value = String(User.getMoney());
        this._levelNum.value = String(User.getLeveNum());
    }

    addEvent()
    {
        super.addEvent();
        this._startBtn.on(Laya.Event.CLICK,this,this.onStartBtn);
        EventMgr.instance.regEvemt(EventDef.Game_OnUserMoneyChange,this,this.onUserMoneyChange);
    }

    removeEvent()
    {
        super.removeEvent();
        this._startBtn.off(Laya.Event.CLICK,this,this.onStartBtn);
        EventMgr.instance.removeEvent(EventDef.Game_OnUserMoneyChange,this,this.onUserMoneyChange);
    }

    protected onStartBtn()
    {
        
    }

    protected onUserMoneyChange(para)
    {
        let curr = para.curr;
        let last = para.last;
        this._moneyNum.value = String(curr);
    }
}