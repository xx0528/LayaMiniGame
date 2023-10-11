import TemplateViewBase from "../TemplateViewBase";
import KRQ_Main, { KRQ_MainState } from "../../../KRQ/ViewCom/KRQ_Main";
import Utilit_ from "../../../Utilit";

export enum InGameShowType
{
    Normal = 0,
    NoLoopAd = 1,
    NoBannerAd = 2,
}

export default class InGameViewTemplate extends TemplateViewBase
{
    protected _center_ppxhc_Zone : Laya.Clip = null;
    protected _krq_ppxhc_Main : KRQ_Main = null;

    onAwake()
    {
        super.onAwake();
        this._center_ppxhc_Zone = this.View.getChildByName("CenterZone") as Laya.Clip;
        // this._krq_ppxhc_Main = this.View.getChildByName("KRQ_Main").getComponent(KRQ_Main);

        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            if(Utilit_.isIphoneX_())
            {
                this._center_ppxhc_Zone.top =  this._center_ppxhc_Zone.top + 75;
            }
        }
        else
        {
            this._center_ppxhc_Zone.top =  this._center_ppxhc_Zone.top - 200;
            if(Utilit_.isIphoneX_())
            {
                this._center_ppxhc_Zone.top =  this._center_ppxhc_Zone.top + 75;
            }
        }
    }

    public openView(data?: any): void
    {
        super.openView(data);
        // if(null != data &&  null != data.showType)
        // {
        //     let showType = data.showType as InGameShowType;
        //     switch(showType)
        //     {
        //         case InGameShowType.Normal:
        //             this._krq_ppxhc_Main.switchState(KRQ_MainState.Normal);
        //             break;
        //         case InGameShowType.NoLoopAd:
        //             this._krq_ppxhc_Main.switchState(KRQ_MainState.NoLoopAd);
        //             break;
        //         case InGameShowType.NoBannerAd:
        //             this._krq_ppxhc_Main.switchState(KRQ_MainState.NoBannerAd);
        //             break;
        //     }
        // }
    }

    onStart()
    {
        super.onStart();
    }

    addEvent()
    {
        super.addEvent();
    }

    remove_ppxhc_Event()
    {
        super.remove_ppxhc_Event();
    }
}