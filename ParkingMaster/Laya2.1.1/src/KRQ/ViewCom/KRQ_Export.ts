import KRQ_ViewComBase from "./KRQ_ViewComBase";
import Utilit from "../../Utilit";
import ViewMgr, { ViewDef } from "../../Mgr/ViewMgr";
import MiniGameViewTemplate from "../../View/TemplateViews/MiniGame/MiniGameViewTemplate";
import KRQ_History from "../Com/KRQ_History/KRQ_History";
import KRQ_Banner from "../Com/KRQ_Banner";

export default class KRQ_Export extends KRQ_ViewComBase
{
    public onContinueBtnClick : Function = null;

    protected _topZone : Laya.Clip = null;
    public get BackBtn()
    {
        if(null == this._backBtn)
        {
            this._backBtn = this.Sprite.getChildByName("TopZone").getChildByName("BackBtn") as Laya.Sprite;
        }
        return this._backBtn;
    }
    protected _backBtn : Laya.Sprite = null;
    
    protected _centerZone : Laya.Clip = null;
    public get ContinueBtn()
    {
        if(null == this._continueBtn)
        {
            this._continueBtn = this.Sprite.getChildByName("CenterZone").getChildByName("ContinueBtn") as Laya.Sprite;
        }
        return this._continueBtn;
    }
    protected _continueBtn : Laya.Sprite = null;

    protected _krqHistory : KRQ_History = null;
    protected _krqBanner : KRQ_Banner = null;

    onAwake()
    {
        this._topZone = this.Sprite.getChildByName("TopZone") as Laya.Clip;
        if(Utilit.isIphoneX())
        {
            this._topZone.top =  this._topZone.top + 75;
        }
        this._backBtn = this._topZone.getChildByName("BackBtn") as Laya.Sprite;
        this._centerZone = this.Sprite.getChildByName("CenterZone") as Laya.Clip;
        if(Utilit.isIphoneX())
        {
            this._centerZone.top =  this._centerZone.top + 75;
        }
        this._continueBtn = this._centerZone.getChildByName("ContinueBtn") as Laya.Sprite;

        this._krqHistory = this.owner.getChildByName("KRQ_History").getComponent(KRQ_History);
        this._krqBanner = this.owner.getChildByName("KRQ_Banner").getComponent(KRQ_Banner);

        let self = this;
        this._krqHistory.OnBackBtnClick =()=>
        {
            self._krqBanner.show();
        }
    }

    onEnable()
    {
        this._backBtn.on(Laya.Event.CLICK,this,this.onBackBtn);
        this._continueBtn.on(Laya.Event.CLICK,this,this.onContinueBtn);
    }

    onDisable()
    {
        this._backBtn.off(Laya.Event.CLICK,this,this.onBackBtn);
        this._continueBtn.off(Laya.Event.CLICK,this,this.onContinueBtn);
    }

    protected onBackBtn()
    {
        this._krqHistory.show();
        this._krqBanner.hide();
    }

    protected onContinueBtn()
    {
        if(null != this.onContinueBtnClick)
        {
            this.onContinueBtnClick();
        }
    }
}