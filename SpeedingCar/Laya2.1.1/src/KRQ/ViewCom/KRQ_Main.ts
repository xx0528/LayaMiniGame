import KRQ_wcjtn__Banner_wcjtn_ from "../Com/KRQ_Banner";
import KRQ__wcjtn_View_wcjtn_Com_wcjtn_Base from "./KRQ_ViewComBase";
import KRQ_wcjtn__His_wcjtn_tory from "../Com/KRQ_History/KRQ_History";
import KRQ_wcjtn__H_wcjtn_Loop_wcjtn_Ad from "../Com/KRQ_LoopAd/KRQ_HLoopAd";
import Utilit_wcjtn_ from "../../Utilit";

export enum KRQ_Main_wcjtn_State
{
    _wcjtn_Normal_wcjtn_ = 0,
    _wcjtn_NoLoopAd_wcjtn_ = 1,
    _wcjtn_NoBannerAd_wcjtn_ = 2,
}

export default class KRQ_wcjtn__Main_wcjtn_ extends KRQ__wcjtn_View_wcjtn_Com_wcjtn_Base
{
    protected _top_wcjtn_Zone : Laya.Clip = null;
    protected _history_wcjtn_Btn : Laya.Sprite = null;
    protected _krq_wcjtn_Loop_wcjtn_Ad : KRQ_wcjtn__H_wcjtn_Loop_wcjtn_Ad = null;

    protected _bottom_wcjtn_Zone : Laya.Clip = null;
    protected _krq_wcjtn_Banner : KRQ_wcjtn__Banner_wcjtn_ = null;

    protected _krq_wcjtn_History : KRQ_wcjtn__His_wcjtn_tory = null;

    onAwake()
    {
        this._top_wcjtn_Zone = this._wcjtn_Sprite_wcjtn_.getChildByName("TopZone") as Laya.Clip;
        this._history_wcjtn_Btn = this._top_wcjtn_Zone.getChildByName("HistoryBtn") as Laya.Sprite;
        this._history_wcjtn_Btn.visible = false;
        if(Utilit_wcjtn_.is_wcjtn_IphoneX())
        {
            this._top_wcjtn_Zone.top =  this._top_wcjtn_Zone.top + 75;
        }
        
        this._krq_wcjtn_Loop_wcjtn_Ad  = this._wcjtn_Sprite_wcjtn_.getChildByName("KRQ_HLoopAd").getComponent(KRQ_wcjtn__H_wcjtn_Loop_wcjtn_Ad) as KRQ_wcjtn__H_wcjtn_Loop_wcjtn_Ad;
        this._krq_wcjtn_Banner = this._wcjtn_Sprite_wcjtn_.getChildByName("KRQ_Banner").getComponent(KRQ_wcjtn__Banner_wcjtn_) as KRQ_wcjtn__Banner_wcjtn_;
        this._krq_wcjtn_History = this._wcjtn_Sprite_wcjtn_.getChildByName("KRQ_History").getComponent(KRQ_wcjtn__His_wcjtn_tory) as KRQ_wcjtn__His_wcjtn_tory;
        let self = this;

        let aspectRatio = Laya.stage.width / Laya.stage.height;
        this._krq_wcjtn_History.On_wcjtn_Back_wcjtn_Btn_wcjtn_Click =()=>
        {
            if(aspectRatio  < 0.5)
            {
                self._krq_wcjtn_Banner._wcjtn_show_wcjtn_();
            }
        }
        this._krq_wcjtn_Loop_wcjtn_Ad._wcjtn_Sprite_wcjtn_.visible = false;
        if(aspectRatio  < 0.5) 
        {
            this._krq_wcjtn_Loop_wcjtn_Ad._wcjtn_Clip_wcjtn_.top = 100;
            if(Utilit_wcjtn_.is_wcjtn_IphoneX())
            {
                this._krq_wcjtn_Loop_wcjtn_Ad._wcjtn_Clip_wcjtn_.top =  this._krq_wcjtn_Loop_wcjtn_Ad._wcjtn_Clip_wcjtn_.top + 75;
            }
            this._krq_wcjtn_Banner._wcjtn_Sprite_wcjtn_.visible = true;
        }
        else
        {
            this._krq_wcjtn_Loop_wcjtn_Ad._wcjtn_Clip_wcjtn_.top = Laya.stage.height - 280;
            this._krq_wcjtn_Banner._wcjtn_Sprite_wcjtn_.visible = false;
        }
    }

    public switchState(state : KRQ_Main_wcjtn_State)
    {
        if(state == KRQ_Main_wcjtn_State._wcjtn_Normal_wcjtn_)
        {
            let aspectRatio = Laya.stage.width / Laya.stage.height;
            if(aspectRatio  < 0.5) 
            {
                this._krq_wcjtn_Loop_wcjtn_Ad._wcjtn_Clip_wcjtn_.top = 100;
                if(Utilit_wcjtn_.is_wcjtn_IphoneX())
                {
                    this._krq_wcjtn_Loop_wcjtn_Ad._wcjtn_Clip_wcjtn_.top =  this._krq_wcjtn_Loop_wcjtn_Ad._wcjtn_Clip_wcjtn_.top + 75;
                }
                this._krq_wcjtn_Banner._wcjtn_Sprite_wcjtn_.visible = true;
            }
            else
            {
                this._krq_wcjtn_Loop_wcjtn_Ad._wcjtn_Clip_wcjtn_.top = Laya.stage.height - 280;
                this._krq_wcjtn_Banner._wcjtn_Sprite_wcjtn_.visible = false;
            }
        }
        else if(state == KRQ_Main_wcjtn_State._wcjtn_NoLoopAd_wcjtn_)
        {
            this._krq_wcjtn_Loop_wcjtn_Ad.isEnable = false;
            this._krq_wcjtn_Loop_wcjtn_Ad._wcjtn_Sprite_wcjtn_.visible = false;
            this._krq_wcjtn_Banner._wcjtn_Sprite_wcjtn_.visible = true;
        }
        else if(state == KRQ_Main_wcjtn_State._wcjtn_NoBannerAd_wcjtn_)
        {
            this._krq_wcjtn_Loop_wcjtn_Ad._wcjtn_Clip_wcjtn_.top = Laya.stage.height - 280;
            this._krq_wcjtn_Banner.Ad_wcjtn_Pos_wcjtn_ID= -1;
            this._krq_wcjtn_Banner._wcjtn_Sprite_wcjtn_.visible = false;
        }
    }

    onEnable()
    {
        this._history_wcjtn_Btn.on(Laya.Event.CLICK,this,this.on_wcjtn_History_wcjtn_Btn);
    }

    onDisable()
    {
        this._history_wcjtn_Btn.off(Laya.Event.CLICK,this,this.on_wcjtn_History_wcjtn_Btn);
    }

    protected on_wcjtn_History_wcjtn_Btn()
    {
        this._krq_wcjtn_History._wcjtn_show_wcjtn_();
        this._krq_wcjtn_Banner._wcjtn_hide_wcjtn_();
    }
}