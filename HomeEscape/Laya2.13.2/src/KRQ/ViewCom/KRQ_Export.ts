import ryw_KRQ_ViewComBase from "./KRQ_ViewComBase";
import ryw_Utilit from "../../Utilit";
import ryw_ViewMgr, { ryw_ViewDef } from "../../Mgr/ViewMgr";
import ryw_MiniGameViewTemplate from "../../View/TemplateViews/MiniGame/MiniGameViewTemplate";
import ryw_KRQ_History from "../Com/KRQ_History/KRQ_History";
import ryw_KRQ_Banner from "../Com/KRQ_Banner";

export default class ryw_KRQ_Export extends ryw_KRQ_ViewComBase
{
    public ryw_onContinueBtnClick : Function = null;

    protected ryw__topZone : Laya.Clip = null;
    public get ryw_BackBtn()
    {
        if(null == this.ryw__backBtn)
        {
            this.ryw__backBtn = this.ryw_Sprite.getChildByName("TopZone").getChildByName("BackBtn") as Laya.Sprite;
        }
        return this.ryw__backBtn;
    }
    protected ryw__backBtn : Laya.Sprite = null;
    
    protected ryw__centerZone : Laya.Clip = null;
    public get ryw_ContinueBtn()
    {
        if(null == this.ryw__continueBtn)
        {
            this.ryw__continueBtn = this.ryw_Sprite.getChildByName("CenterZone").getChildByName("ContinueBtn") as Laya.Sprite;
        }
        return this.ryw__continueBtn;
    }
    protected ryw__continueBtn : Laya.Sprite = null;

    protected ryw__krqHistory : ryw_KRQ_History = null;
    protected ryw__krqBanner : ryw_KRQ_Banner = null;

    onAwake()
    {
        this.ryw__topZone = this.ryw_Sprite.getChildByName("TopZone") as Laya.Clip;
        if(ryw_Utilit.ryw_isIphoneX())
        {
            this.ryw__topZone.top =  this.ryw__topZone.top + 75;
        }
        this.ryw__backBtn = this.ryw__topZone.getChildByName("BackBtn") as Laya.Sprite;
        this.ryw__centerZone = this.ryw_Sprite.getChildByName("CenterZone") as Laya.Clip;
        if(ryw_Utilit.ryw_isIphoneX())
        {
            this.ryw__centerZone.top =  this.ryw__centerZone.top + 75;
        }
        this.ryw__continueBtn = this.ryw__centerZone.getChildByName("ContinueBtn") as Laya.Sprite;

        this.ryw__krqHistory = this.owner.getChildByName("KRQ_History").getComponent(ryw_KRQ_History);
        this.ryw__krqBanner = this.owner.getChildByName("KRQ_Banner").getComponent(ryw_KRQ_Banner);

        let self = this;
        this.ryw__krqHistory.ryw_OnBackBtnClick =()=>
        {
            self.ryw__krqBanner.ryw_show();
        }
    }

    onEnable()
    {
        this.ryw__backBtn.on(Laya.Event.CLICK,this,this.ryw_onBackBtn);
        this.ryw__continueBtn.on(Laya.Event.CLICK,this,this.ryw_onContinueBtn);
    }

    onDisable()
    {
        this.ryw__backBtn.off(Laya.Event.CLICK,this,this.ryw_onBackBtn);
        this.ryw__continueBtn.off(Laya.Event.CLICK,this,this.ryw_onContinueBtn);
    }

    protected ryw_onBackBtn()
    {
        this.ryw__krqHistory.ryw_show();
        this.ryw__krqBanner.ryw_hide();
    }

    protected ryw_onContinueBtn()
    {
        if(null != this.ryw_onContinueBtnClick)
        {
            this.ryw_onContinueBtnClick();
        }
    }
}