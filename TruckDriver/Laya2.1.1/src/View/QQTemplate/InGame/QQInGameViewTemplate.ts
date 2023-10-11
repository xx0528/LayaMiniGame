import KRQ_Main from "../../../KRQ/ViewCom/KRQ_Main";
import Utilit from "../../../Utilit";
import QQTemplateViewBase_ppxhc from "../QQTemplateViewBase";

export default class QQInGameViewTemplate_ppxhc extends QQTemplateViewBase_ppxhc
{
    protected _centerZone_ppxhc : Laya.Clip = null;

    onAwake()
    {
        super.onAwake();
        this._centerZone_ppxhc = this.View.getChildByName("CenterZone") as Laya.Clip;

        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            if(Utilit.isIphoneX_())
            {
                this._centerZone_ppxhc.top =  this._centerZone_ppxhc.top + 75;
            }
        }
        else
        {
            this._centerZone_ppxhc.top =  this._centerZone_ppxhc.top - 200;
            if(Utilit.isIphoneX_())
            {
                this._centerZone_ppxhc.top =  this._centerZone_ppxhc.top + 75;
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