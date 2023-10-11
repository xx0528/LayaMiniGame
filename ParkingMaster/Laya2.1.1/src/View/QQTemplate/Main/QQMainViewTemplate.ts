import KRQ_Main from "../../../KRQ/ViewCom/KRQ_Main";
import EventMgr from "../../../Event/EventMgr";
import { EventDef } from "../../../Event/EventDef";
import User from "../../../User/User";
import Utilit from "../../../Utilit";
import QQTemplateViewBase from "../QQTemplateViewBase";
import QQMiniGameAPI from "../../../QQMiniGameAPI";

export default class QQMainViewTemplate extends QQTemplateViewBase
{
    protected _centerZone : Laya.Clip = null;
    protected _startBtn : Laya.Sprite = null;

    protected _levelNum : Laya.FontClip = null;
    protected _moneyNum : Laya.FontClip = null;
    
    protected _moreGameBtn : Laya.Sprite = null;

    onAwake()
    {
        super.onAwake();

        this._centerZone = this.View.getChildByName("CenterZone") as Laya.Clip;
        this._moreGameBtn = this._centerZone.getChildByName("MoreGameBtn") as Laya.Sprite;

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
            //this._centerZone.top =  this._centerZone.top - 100;
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
        this._moreGameBtn.on(Laya.Event.CLICK,this,this.onMoreGameBtn);

        EventMgr.instance.regEvemt(EventDef.Game_OnUserMoneyChange,this,this.onUserMoneyChange);
    }

    removeEvent()
    {
        super.removeEvent();
        this._startBtn.off(Laya.Event.CLICK,this,this.onStartBtn);
        this._moreGameBtn.off(Laya.Event.CLICK,this,this.onMoreGameBtn);
        
        EventMgr.instance.removeEvent(EventDef.Game_OnUserMoneyChange,this,this.onUserMoneyChange);
    }

    protected onStartBtn()
    {
        
    }

    protected onMoreGameBtn()
    {
        QQMiniGameAPI.showAppBoxAd(()=>
        {
            
        });
    }

    protected onUserMoneyChange(para)
    {
        let curr = para.curr;
        let last = para.last;
        this._moneyNum.value = String(curr);
    }
}