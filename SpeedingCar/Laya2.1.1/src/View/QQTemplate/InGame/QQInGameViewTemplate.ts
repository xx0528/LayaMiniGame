import KRQ_Main from "../../../KRQ/ViewCom/KRQ_Main";
import Utilit_wcjtn_ from "../../../Utilit";
import QQ_wcjtn_Template_wcjtn_ViewBase from "../QQTemplateViewBase";

export default class QQ_wcjtn_InGame_wcjtn_ViewTemplate extends QQ_wcjtn_Template_wcjtn_ViewBase
{
    protected _center_wcjtn_Zone : Laya.Clip = null;

    onAwake()
    {
        super.onAwake();
        this._center_wcjtn_Zone = this.View_wcjtn_.getChildByName("CenterZone") as Laya.Clip;

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