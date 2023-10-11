import KRQ_ppxhc_Banner from "../Com/KRQ_Banner";
import KRQ_ViewComBase from "./KRQ_ViewComBase";
import KRQ_ppxhc_History from "../Com/KRQ_History/KRQ_History";
import KRQ_ppxhc_HLoopAd from "../Com/KRQ_LoopAd/KRQ_HLoopAd";
import Utilit_ from "../../Utilit";
import View_ppxhc_Mgr, { View_ppxhc_Def } from "../../Mgr/ViewMgr";
import Utilit from "../../Utilit";

export enum KRQ_MainState
{
    Normal = 0,
    NoLoopAd = 1,
    NoBannerAd = 2,
}

export default class KRQ_Main extends KRQ_ViewComBase
{
    protected _topZone : Laya.Clip = null;
    protected _historyBtn : Laya.Sprite = null;
    protected _krqLoopAd : KRQ_ppxhc_HLoopAd = null;

    protected _bottomZone : Laya.Clip = null;
    protected _krqBanner : KRQ_ppxhc_Banner = null;

    protected _krqHistory : KRQ_ppxhc_History = null;

    onAwake()
    {
        this._topZone = this.Sprite.getChildByName("TopZone") as Laya.Clip;
        this._historyBtn = this._topZone.getChildByName("HistoryBtn") as Laya.Sprite;

        this._historyBtn.visible = false;
        if(Utilit.isIphoneX_())
        {
            this._topZone.top =  this._topZone.top + 75;
        }
        
        this._krqLoopAd  = this.Sprite.getChildByName("KRQ_HLoopAd").getComponent(KRQ_ppxhc_HLoopAd) as KRQ_ppxhc_HLoopAd;
        this._krqBanner = this.Sprite.getChildByName("KRQ_Banner").getComponent(KRQ_ppxhc_Banner) as KRQ_ppxhc_Banner;
        this._krqHistory = this.Sprite.getChildByName("KRQ_History").getComponent(KRQ_ppxhc_History) as KRQ_ppxhc_History;
        let self = this;
        let aspectRatio = Laya.stage.width / Laya.stage.height;

        this._krqHistory.OnBackBtn_ppxhc_Click =()=>
        {
            if(aspectRatio  < 0.5)
            {
                self._krqBanner.show();
            }
        }
        this._krqLoopAd.Sprite.visible = false;
        if(aspectRatio  < 0.5) 
        {
            this._krqLoopAd.Clip.top = 100;
            if(Utilit_.isIphoneX_())
            {
                this._krqLoopAd.Clip.top =  this._krqLoopAd.Clip.top + 75;
            }
            this._krqBanner.Sprite.visible = true;
        }
        
        else
        {
            this._krqLoopAd.Clip.top = Laya.stage.height - 280;
            this._krqBanner.Sprite.visible = false;
        }
            //         this._krqLoopAd.Clip.top = 100;
            // if(Utilit.isIphoneX())
            // {
            //     this._krqLoopAd.Clip.top =  this._krqLoopAd.Clip.top + 75;
            // }
            // this._krqBanner.Sprite.visible = true;
    }

    public switchState(state : KRQ_MainState)
    {
        if(state == KRQ_MainState.Normal)
        {
            let aspectRatio = Laya.stage.width / Laya.stage.height;
            if(aspectRatio  < 0.5) 
            {
                this._krqLoopAd.Clip.top = 100;
                if(Utilit_.isIphoneX_())
                {
                    this._krqLoopAd.Clip.top =  this._krqLoopAd.Clip.top + 75;
                }
                this._krqBanner.Sprite.visible = true;
            }
            else
            {
                this._krqLoopAd.Clip.top = Laya.stage.height - 280;
                this._krqBanner.Sprite.visible = false;
            }
        }
        else if(state == KRQ_MainState.NoLoopAd)
        {
            this._krqLoopAd.isEnable = false;
            this._krqLoopAd.Sprite.visible = false;
            this._krqBanner.Sprite.visible = true;
        }
        else if(state == KRQ_MainState.NoBannerAd)
        {
            this._krqLoopAd.Clip.top = Laya.stage.height - 280;
            this._krqBanner.AdPos_ppxhc_ID= -1;
            this._krqBanner.Sprite.visible = false;
        }
    }

    onEnable()
    {
        this._historyBtn.on(Laya.Event.CLICK,this,this.onHistoryBtn);
    }

    onDisable()
    {
        this._historyBtn.off(Laya.Event.CLICK,this,this.onHistoryBtn);
    }

    protected onHistoryBtn()
    {
        // this._krqHistory.show();
        // this._krqBanner.hide();
        View_ppxhc_Mgr.instance.openView(View_ppxhc_Def.GameHistory);
    }
}