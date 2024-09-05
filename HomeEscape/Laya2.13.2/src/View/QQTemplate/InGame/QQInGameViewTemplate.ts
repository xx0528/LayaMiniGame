import ryw_KRQ_Main from "../../../KRQ/ViewCom/KRQ_Main";
import ryw_Utilit from "../../../Utilit";
import QQTemplateViewBase from "../QQTemplateViewBase";

export default class ryw_QQInGameViewTemplate extends QQTemplateViewBase
{
    protected ryw__centerZone : Laya.Clip = null;

    onAwake()
    {
        super.onAwake();
        this.ryw__centerZone = this.ryw_View.getChildByName("CenterZone") as Laya.Clip;

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