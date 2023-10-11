import KRQ_Main from "../../../KRQ/ViewCom/KRQ_Main";
import EventMgr from "../../../Event/EventMgr";
import { EventDef } from "../../../Event/EventDef";
import User from "../../../User/User";
import Utilit from "../../../Utilit";
import TTTemplateViewBase from "../TTTemplateViewBase";
import TTAPI from "../../../TTAPI";
import AppSwitchConfig from "../../../Config/AppSwitchConfig";

export default class TTMainViewTemplate extends TTTemplateViewBase
{
    protected _centerZone : Laya.Clip = null;
    protected _startBtn : Laya.Sprite = null;

    protected _levelNum : Laya.FontClip = null;
    protected _moneyNum : Laya.FontClip = null;
    
    protected _moreGameBtn : Laya.Sprite = null;
    protected _shareBtn : Laya.Sprite = null;

    onAwake()
    {
        super.onAwake();

        this._centerZone = this.View.getChildByName("CenterZone") as Laya.Clip;
        this._moreGameBtn = this._centerZone.getChildByName("MoreGameBtn") as Laya.Clip;
        this._shareBtn = this._centerZone.getChildByName("ShareBtn") as Laya.Clip;

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


        this._moreGameBtn.visible = AppSwitchConfig.getInstance().getAppSwitchData().ttcfg.moreGameSwitch == 1;
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

        this._moreGameBtn.on(Laya.Event.CLICK,this,this.onMoreGameBtn);
        this._shareBtn.on(Laya.Event.CLICK,this,this.onShareBtn);
    }

    removeEvent()
    {
        super.removeEvent();
        this._startBtn.off(Laya.Event.CLICK,this,this.onStartBtn);
        EventMgr.instance.removeEvent(EventDef.Game_OnUserMoneyChange,this,this.onUserMoneyChange);

        this._moreGameBtn.off(Laya.Event.CLICK,this,this.onMoreGameBtn);
        this._shareBtn.off(Laya.Event.CLICK,this,this.onShareBtn);
    }

    protected onStartBtn()
    {
        
    }

    protected onMoreGameBtn()
    {
        TTAPI.showMoreGamesModal(()=>
        {
            
        },()=>
        {

        })
    }

    protected onShareBtn()
    {
        TTAPI.share(()=>
        {

        })
    }

    protected onUserMoneyChange(para)
    {
        let curr = para.curr;
        let last = para.last;
        this._moneyNum.value = String(curr);
    }
}