import Template_wcjtn_View_wcjtn_Base from "../TemplateViewBase";
import KRQ_wcjtn__Main_wcjtn_, { KRQ_Main_wcjtn_State } from "../../../KRQ/ViewCom/KRQ_Main";
import Utilit_wcjtn_ from "../../../Utilit";

export enum In_wcjtn_Game_wcjtn_ShowType
{
    _wcjtn_Normal_wcjtn_ = 0,
    _wcjtn_NoLoopAd_wcjtn_ = 1,
    _wcjtn_NoBannerAd_wcjtn_ = 2,
}

export default class In_wcjtn_Game_wcjtn_View_wcjtn_Template extends Template_wcjtn_View_wcjtn_Base
{
    protected _center_wcjtn_Zone : Laya.Clip = null;
    protected _krq_wcjtn_Main : KRQ_wcjtn__Main_wcjtn_ = null;

    onAwake()
    {
        super.onAwake();
        this._center_wcjtn_Zone = this.View_wcjtn_.getChildByName("CenterZone") as Laya.Clip;
        this._krq_wcjtn_Main = this.View_wcjtn_.getChildByName("KRQ_Main").getComponent(KRQ_wcjtn__Main_wcjtn_);

        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            if(Utilit_wcjtn_.is_wcjtn_IphoneX())
            {
                this._center_wcjtn_Zone.top =  this._center_wcjtn_Zone.top + 75;
            }
        }
        else
        {
            this._center_wcjtn_Zone.top =  this._center_wcjtn_Zone.top - 200;
            if(Utilit_wcjtn_.is_wcjtn_IphoneX())
            {
                this._center_wcjtn_Zone.top =  this._center_wcjtn_Zone.top + 75;
            }
        }
    }

    public open_wcjtn_View(data?: any): void
    {
        super.open_wcjtn_View(data);
        if(null != data &&  null != data.showType)
        {
            let showType = data.showType as In_wcjtn_Game_wcjtn_ShowType;
            switch(showType)
            {
                case In_wcjtn_Game_wcjtn_ShowType._wcjtn_Normal_wcjtn_:
                    this._krq_wcjtn_Main.switchState(KRQ_Main_wcjtn_State._wcjtn_Normal_wcjtn_);
                    break;
                case In_wcjtn_Game_wcjtn_ShowType._wcjtn_NoLoopAd_wcjtn_:
                    this._krq_wcjtn_Main.switchState(KRQ_Main_wcjtn_State._wcjtn_NoLoopAd_wcjtn_);
                    break;
                case In_wcjtn_Game_wcjtn_ShowType._wcjtn_NoBannerAd_wcjtn_:
                    this._krq_wcjtn_Main.switchState(KRQ_Main_wcjtn_State._wcjtn_NoBannerAd_wcjtn_);
                    break;
            }
        }
    }

    onStart()
    {
        super.onStart();
    }

    add_wcjtn_Event()
    {
        super.add_wcjtn_Event();
    }

    remove_wcjtn_Event()
    {
        super.remove_wcjtn_Event();
    }
}