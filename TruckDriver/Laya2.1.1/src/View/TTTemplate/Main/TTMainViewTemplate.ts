import KRQ_Main from "../../../KRQ/ViewCom/KRQ_Main";
import EventMgr from "../../../Event/EventMgr";
import { Event_ppxhc_Def } from "../../../Event/EventDef";
import User from "../../../User/User";
import Utilit from "../../../Utilit";
import TTTemplateViewBase from "../TTTemplateViewBase";
import TTAPI from "../../../TTAPI";
import AppSwitchConfig from "../../../Config/AppSwitchConfig";

export default class TTMainViewTemplate_ppxhc extends TTTemplateViewBase
{
    protected _centerZone_ppxhc : Laya.Clip = null;
    protected _startBtn_ppxhc : Laya.Sprite = null;

    protected _levelNum_ppxhc : Laya.FontClip = null;
    protected _moneyNum_ppxhc : Laya.FontClip = null;
    
    protected _moreGameBtn_ppxhc : Laya.Sprite = null;
    protected _shareBtn_ppxhc : Laya.Sprite = null;

    onAwake()
    {
        super.onAwake();

        this._centerZone_ppxhc = this.View.getChildByName("CenterZone") as Laya.Clip;
        this._moreGameBtn_ppxhc = this._centerZone_ppxhc.getChildByName("MoreGameBtn") as Laya.Clip;
        this._shareBtn_ppxhc = this._centerZone_ppxhc.getChildByName("ShareBtn") as Laya.Clip;

        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            if(Utilit.isIphoneX_())
            {
                this._centerZone_ppxhc.top =  this._centerZone_ppxhc.top + 75;
            }
        }
        else
        {
            this._centerZone_ppxhc.top =  this._centerZone_ppxhc.top - 200;
            if(Utilit.isIphoneX_())
            {
                this._centerZone_ppxhc.top =  this._centerZone_ppxhc.top + 75;
            }
        }

        this._startBtn_ppxhc = this._centerZone_ppxhc.getChildByName("StartBtn") as Laya.Sprite;

        this._levelNum_ppxhc = this._centerZone_ppxhc.getChildByName("LevelInfo").getChildByName("LevelNum") as Laya.FontClip;
        this._moneyNum_ppxhc = this._centerZone_ppxhc.getChildByName("MoneyInfo").getChildByName("MoneyNum") as Laya.FontClip;


        this._moreGameBtn_ppxhc.visible = AppSwitchConfig.getInstance().getAppSwitchData().ttcfg.moreGameSwitch == 1;
    }

    onStart()
    {
        super.onStart();
        this._moneyNum_ppxhc.value = String(User.get_ppxhc_Money());
        this._levelNum_ppxhc.value = String(User.get_ppxhc_LeveNum());
    }

    addEvent()
    {
        super.addEvent();
        this._startBtn_ppxhc.on(Laya.Event.CLICK,this,this.onStartBtn);
        EventMgr.instance.regEvemt_(Event_ppxhc_Def.Game_OnUserMoneyChange,this,this.onUserMoneyChange);

        this._moreGameBtn_ppxhc.on(Laya.Event.CLICK,this,this.onMoreGameBtn);
        this._shareBtn_ppxhc.on(Laya.Event.CLICK,this,this.onShareBtn);
    }

    removeEvent()
    {
        super.removeEvent();
        this._startBtn_ppxhc.off(Laya.Event.CLICK,this,this.onStartBtn);
        EventMgr.instance.removeEvent_(Event_ppxhc_Def.Game_OnUserMoneyChange,this,this.onUserMoneyChange);

        this._moreGameBtn_ppxhc.off(Laya.Event.CLICK,this,this.onMoreGameBtn);
        this._shareBtn_ppxhc.off(Laya.Event.CLICK,this,this.onShareBtn);
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
        this._moneyNum_ppxhc.value = String(curr);
    }
}