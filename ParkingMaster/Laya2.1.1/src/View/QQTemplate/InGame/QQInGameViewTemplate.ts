import KRQ_Main from "../../../KRQ/ViewCom/KRQ_Main";
import Utilit from "../../../Utilit";
import QQTemplateViewBase from "../QQTemplateViewBase";

export default class QQInGameViewTemplate extends QQTemplateViewBase
{
    protected _centerZone : Laya.Clip = null;

    onAwake()
    {
        super.onAwake();
        this._centerZone = this.View.getChildByName("CenterZone") as Laya.Clip;

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