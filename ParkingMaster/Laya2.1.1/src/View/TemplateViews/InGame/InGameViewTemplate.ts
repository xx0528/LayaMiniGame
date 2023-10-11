import TemplateViewBase from "../TemplateViewBase";
import KRQ_Main, { KRQ_MainState } from "../../../KRQ/ViewCom/KRQ_Main";
import Utilit from "../../../Utilit";

export enum InGameShowType
{
    Normal = 0,
    NoLoopAd = 1,
    NoBannerAd = 2,
}

export default class InGameViewTemplate extends TemplateViewBase
{
    protected _centerZone : Laya.Clip = null;
    protected _krqMain : KRQ_Main = null;

    onAwake()
    {
        super.onAwake();
        this._centerZone = this.View.getChildByName("CenterZone") as Laya.Clip;
        this._krqMain = this.View.getChildByName("KRQ_Main").getComponent(KRQ_Main);

        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            if(Utilit.isIphoneX())
            {
                this._centerZone.top =  this._centerZone.top + 75;
            }
        }
        else
        {
            this._centerZone.top =  this._centerZone.top - 200;
            if(Utilit.isIphoneX())
            {
                this._centerZone.top =  this._centerZone.top + 75;
            }
        }
    }

    public openView(data?: any): void
    {
        super.openView(data);
        if(null != data &&  null != data.showType)
        {
            let showType = data.showType as InGameShowType;
            switch(showType)
            {
                case InGameShowType.Normal:
                    this._krqMain.switchState(KRQ_MainState.Normal);
                    break;
                case InGameShowType.NoLoopAd:
                    this._krqMain.switchState(KRQ_MainState.NoLoopAd);
                    break;
                case InGameShowType.NoBannerAd:
                    this._krqMain.switchState(KRQ_MainState.NoBannerAd);
                    break;
            }
        }
    }

    onStart()
    {
        super.onStart();
    }

    addEvent()
    {
        super.addEvent();
    }

    removeEvent()
    {
        super.removeEvent();
    }
}