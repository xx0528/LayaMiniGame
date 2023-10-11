import ryw_TemplateViewBase from "../TemplateViewBase";
import ryw_KRQ_Main, { ryw_KRQ_MainState } from "../../../KRQ/ViewCom/KRQ_Main";
import ryw_Utilit from "../../../Utilit";

export enum ryw_InGameShowType
{
    Normal = 0,
    NoLoopAd = 1,
    NoBannerAd = 2,
}

export default class ryw_InGameViewTemplate extends ryw_TemplateViewBase
{
    protected ryw__centerZone : Laya.Clip = null;
    // protected ryw__krqMain : ryw_KRQ_Main = null;

    onAwake()
    {
        super.onAwake();
        this.ryw__centerZone = this.ryw_View.getChildByName("CenterZone") as Laya.Clip;
        // this.ryw__krqMain = this.ryw_View.getChildByName("KRQ_Main").getComponent(ryw_KRQ_Main);

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
            this.ryw__centerZone.top =  this.ryw__centerZone.top - 200;
            if(ryw_Utilit.ryw_isIphoneX())
            {
                this.ryw__centerZone.top =  this.ryw__centerZone.top + 75;
            }
        }
    }

    public ryw_openView(data?: any): void
    {
        super.ryw_openView(data);
        // if(null != data &&  null != data.showType)
        // {
        //     let showType = data.showType as ryw_InGameShowType;
        //     switch(showType)
        //     {
        //         case ryw_InGameShowType.Normal:
        //             this.ryw__krqMain.ryw_switchState(ryw_KRQ_MainState.Normal);
        //             break;
        //         case ryw_InGameShowType.NoLoopAd:
        //             this.ryw__krqMain.ryw_switchState(ryw_KRQ_MainState.NoLoopAd);
        //             break;
        //         case ryw_InGameShowType.NoBannerAd:
        //             this.ryw__krqMain.ryw_switchState(ryw_KRQ_MainState.NoBannerAd);
        //             break;
        //     }
        // }
    }

    onStart()
    {
        super.onStart();
    }

    ryw_addEvent()
    {
        super.ryw_addEvent();
    }

    ryw_removeEvent()
    {
        super.ryw_removeEvent();
    }
}