import ryw_KRQ_Main from "../../../KRQ/ViewCom/KRQ_Main";
import ryw_EventMgr from "../../../Event/EventMgr";
import { ryw_EventDef } from "../../../Event/EventDef";
import ryw_User from "../../../User/User";
import ryw_Utilit from "../../../Utilit";
import QQTemplateViewBase from "../QQTemplateViewBase";
import ryw_QQMiniGameAPI from "../../../QQMiniGameAPI";

export default class ryw_QQMainViewTemplate extends QQTemplateViewBase
{
    protected ryw__centerZone : Laya.Clip = null;
    protected ryw__startBtn : Laya.Sprite = null;

    protected ryw__levelNum : Laya.FontClip = null;
    protected ryw__moneyNum : Laya.FontClip = null;
    
    protected ryw__moreGameBtn : Laya.Sprite = null;

    onAwake()
    {
        super.onAwake();

        this.ryw__centerZone = this.ryw_View.getChildByName("CenterZone") as Laya.Clip;
        this.ryw__moreGameBtn = this.ryw__centerZone.getChildByName("MoreGameBtn") as Laya.Sprite;

        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            if(ryw_Utilit.ryw_isIphoneX())
            {
                this.ryw__centerZone.top =  this.ryw__centerZone.top + 75;
            }
        }
        else
        {
            //this.ryw__centerZone.top =  this.ryw__centerZone.top - 100;
            if(ryw_Utilit.ryw_isIphoneX())
            {
                this.ryw__centerZone.top =  this.ryw__centerZone.top + 75;
            }
        }

        this.ryw__startBtn = this.ryw__centerZone.getChildByName("StartBtn") as Laya.Sprite;

        this.ryw__levelNum = this.ryw__centerZone.getChildByName("LevelInfo").getChildByName("LevelNum") as Laya.FontClip;
        this.ryw__moneyNum = this.ryw__centerZone.getChildByName("MoneyInfo").getChildByName("MoneyNum") as Laya.FontClip;
    }

    onStart()
    {
        super.onStart();
        this.ryw__moneyNum.value = String(ryw_User.ryw_getMoney());
        this.ryw__levelNum.value = String(ryw_User.ryw_getLeveNum());
    }

    ryw_addEvent()
    {
        super.ryw_addEvent();
        this.ryw__startBtn.on(Laya.Event.CLICK,this,this.ryw_onStartBtn);
        this.ryw__moreGameBtn.on(Laya.Event.CLICK,this,this.ryw_onMoreGameBtn);

        ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.ryw_Game_OnUserMoneyChange,this,this.ryw_onUserMoneyChange);
    }

    ryw_removeEvent()
    {
        super.ryw_removeEvent();
        this.ryw__startBtn.off(Laya.Event.CLICK,this,this.ryw_onStartBtn);
        this.ryw__moreGameBtn.off(Laya.Event.CLICK,this,this.ryw_onMoreGameBtn);
        
        ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.ryw_Game_OnUserMoneyChange,this,this.ryw_onUserMoneyChange);
    }

    protected ryw_onStartBtn()
    {
        
    }

    protected ryw_onMoreGameBtn()
    {
        ryw_QQMiniGameAPI.ryw_showAppBoxAd(()=>
        {
            
        });
    }

    protected ryw_onUserMoneyChange(para)
    {
        let curr = para.curr;
        let last = para.last;
        this.ryw__moneyNum.value = String(curr);
    }
}