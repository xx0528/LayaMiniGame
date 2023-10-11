import KRQ__wcjtn_View_wcjtn_Com_wcjtn_Base from "./KRQ_ViewComBase";
import Utilit_wcjtn_ from "../../Utilit";

export default class KRQ_wcjtn__Export_wcjtn_ extends KRQ__wcjtn_View_wcjtn_Com_wcjtn_Base
{
    public on_wcjtn_Continue_wcjtn_Btn_wcjtn_Click : Function = null;

    protected _top_wcjtn_Zone_wcjtn_ : Laya.Clip = null;
    public get Back_wcjtn_Btn()
    {
        if(null == this._back_wcjtn_Btn)
        {
            this._back_wcjtn_Btn = this._wcjtn_Sprite_wcjtn_.getChildByName("TopZone").getChildByName("BackBtn") as Laya.Sprite;
        }
        return this._back_wcjtn_Btn;
    }
    protected _back_wcjtn_Btn : Laya.Sprite = null;
    
    protected _center_wcjtn_Zone : Laya.Clip = null;
    public get Continue_wcjtn_Btn()
    {
        if(null == this._continue_wcjtn_Btn)
        {
            this._continue_wcjtn_Btn = this._wcjtn_Sprite_wcjtn_.getChildByName("CenterZone").getChildByName("ContinueBtn") as Laya.Sprite;
        }
        return this._continue_wcjtn_Btn;
    }
    protected _continue_wcjtn_Btn : Laya.Sprite = null;

    onAwake()
    {
        this._top_wcjtn_Zone_wcjtn_ = this._wcjtn_Sprite_wcjtn_.getChildByName("TopZone") as Laya.Clip;
        if(Utilit_wcjtn_.is_wcjtn_IphoneX())
        {
            this._top_wcjtn_Zone_wcjtn_.top =  this._top_wcjtn_Zone_wcjtn_.top + 75;
        }
        this._back_wcjtn_Btn = this._top_wcjtn_Zone_wcjtn_.getChildByName("BackBtn") as Laya.Sprite;
        this._center_wcjtn_Zone = this._wcjtn_Sprite_wcjtn_.getChildByName("CenterZone") as Laya.Clip;
        if(Utilit_wcjtn_.is_wcjtn_IphoneX())
        {
            this._center_wcjtn_Zone.top =  this._center_wcjtn_Zone.top + 75;
        }
        this._continue_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("ContinueBtn") as Laya.Sprite;
    }

    onEnable()
    {
        this._back_wcjtn_Btn.on(Laya.Event.CLICK,this,this.on_wcjtn_Back_wcjtn_Btn);
        this._continue_wcjtn_Btn.on(Laya.Event.CLICK,this,this.on_wcjtn_Continue_wcjtn_Btn);
    }

    onDisable()
    {
        this._back_wcjtn_Btn.off(Laya.Event.CLICK,this,this.on_wcjtn_Back_wcjtn_Btn);
        this._continue_wcjtn_Btn.off(Laya.Event.CLICK,this,this.on_wcjtn_Continue_wcjtn_Btn);
    }

    protected on_wcjtn_Back_wcjtn_Btn()
    {
        this._wcjtn_hide_wcjtn_();
    }

    protected on_wcjtn_Continue_wcjtn_Btn()
    {
        if(null != this.on_wcjtn_Continue_wcjtn_Btn_wcjtn_Click)
        {
            this.on_wcjtn_Continue_wcjtn_Btn_wcjtn_Click();
        }
    }
}