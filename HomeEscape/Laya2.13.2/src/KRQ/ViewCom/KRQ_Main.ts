import ryw_KRQ_Banner from "../Com/KRQ_Banner";
import ryw_KRQ_ViewComBase from "./KRQ_ViewComBase";
import ryw_KRQ_History from "../Com/KRQ_History/KRQ_History";
import ryw_KRQ_HLoopAd from "../Com/KRQ_LoopAd/KRQ_HLoopAd";
import ryw_Utilit from "../../Utilit";

export enum ryw_KRQ_MainState
{
    Normal = 0,
    NoLoopAd = 1,
    NoBannerAd = 2,
}

export default class ryw_KRQ_Main extends ryw_KRQ_ViewComBase
{
    protected ryw__topZone : Laya.Clip = null;
    protected ryw__historyBtn : Laya.Sprite = null;
    protected ryw__krqLoopAd : ryw_KRQ_HLoopAd = null;

    protected ryw__bottomZone : Laya.Clip = null;
    protected ryw__krqBanner : ryw_KRQ_Banner = null;

    protected ryw__krqHistory : ryw_KRQ_History = null;

    onAwake()
    {
        this.ryw__topZone = this.ryw_Sprite.getChildByName("TopZone") as Laya.Clip;
        this.ryw__historyBtn = this.ryw__topZone.getChildByName("HistoryBtn") as Laya.Sprite;
        this.ryw__historyBtn.visible = false;
        if(ryw_Utilit.ryw_isIphoneX())
        {
            this.ryw__topZone.top =  this.ryw__topZone.top + 75;
        }
        
        this.ryw__krqLoopAd  = this.ryw_Sprite.getChildByName("KRQ_HLoopAd").getComponent(ryw_KRQ_HLoopAd) as ryw_KRQ_HLoopAd;
        this.ryw__krqBanner = this.ryw_Sprite.getChildByName("KRQ_Banner").getComponent(ryw_KRQ_Banner) as ryw_KRQ_Banner;
        this.ryw__krqHistory = this.ryw_Sprite.getChildByName("KRQ_History").getComponent(ryw_KRQ_History) as ryw_KRQ_History;
        let self = this;

        let aspectRatio = Laya.stage.width / Laya.stage.height;
        this.ryw__krqHistory.ryw_OnBackBtnClick =()=>
        {
            if(aspectRatio  < 0.5)
            {
                self.ryw__krqBanner.ryw_show();
            }
        }
        this.ryw__krqLoopAd.ryw_Sprite.visible = false;
        if(aspectRatio  < 0.5) 
        {
            this.ryw__krqLoopAd.ryw_Clip.top = 100;
            if(ryw_Utilit.ryw_isIphoneX())
            {
                this.ryw__krqLoopAd.ryw_Clip.top =  this.ryw__krqLoopAd.ryw_Clip.top + 75;
            }
            this.ryw__krqBanner.ryw_Sprite.visible = true;
        }
        else
        {
            this.ryw__krqLoopAd.ryw_Clip.top = Laya.stage.height - 280;
            this.ryw__krqBanner.ryw_Sprite.visible = false;
        }
    }

    public ryw_switchState(state : ryw_KRQ_MainState)
    {
        if(state == ryw_KRQ_MainState.Normal)
        {
            let aspectRatio = Laya.stage.width / Laya.stage.height;
            if(aspectRatio  < 0.5) 
            {
                this.ryw__krqLoopAd.ryw_Clip.top = 100;
                if(ryw_Utilit.ryw_isIphoneX())
                {
                    this.ryw__krqLoopAd.ryw_Clip.top =  this.ryw__krqLoopAd.ryw_Clip.top + 75;
                }
                this.ryw__krqBanner.ryw_Sprite.visible = true;
            }
            else
            {
                this.ryw__krqLoopAd.ryw_Clip.top = Laya.stage.height - 280;
                this.ryw__krqBanner.ryw_Sprite.visible = false;
            }
        }
        else if(state == ryw_KRQ_MainState.NoLoopAd)
        {
            this.ryw__krqLoopAd.ryw_isEnable = false;
            this.ryw__krqLoopAd.ryw_Sprite.visible = false;
            this.ryw__krqBanner.ryw_Sprite.visible = true;
        }
        else if(state == ryw_KRQ_MainState.NoBannerAd)
        {
            this.ryw__krqLoopAd.ryw_Clip.top = Laya.stage.height - 280;
            this.ryw__krqBanner.ryw_AdPosID= -1;
            this.ryw__krqBanner.ryw_Sprite.visible = false;
        }
    }

    onEnable()
    {
        this.ryw__historyBtn.on(Laya.Event.CLICK,this,this.ryw_onHistoryBtn);
    }

    onDisable()
    {
        this.ryw__historyBtn.off(Laya.Event.CLICK,this,this.ryw_onHistoryBtn);
    }

    protected ryw_onHistoryBtn()
    {
        this.ryw__krqHistory.ryw_show();
        this.ryw__krqBanner.ryw_hide();
    }
}