import ryw_ViewBase from "../ViewBase";
import ryw_Utilit from "../../Utilit";
import ryw_ViewMgr, { ryw_ViewDef } from "../../Mgr/ViewMgr";
import ryw_MiniGameViewTemplate from "../TemplateViews/MiniGame/MiniGameViewTemplate";

export default class ryw_TTTemplateViewBase extends ryw_ViewBase 
{
    public get TopZone()
    {
        if(null == this._topZone)
        {
            this._topZone = this.ryw_View.getChildByName("TopZone") as Laya.Clip;
        }
        return this._topZone;
    }
    protected _topZone : Laya.Clip = null;

    onAwake()
    {
        this._topZone = this.ryw_View.getChildByName("TopZone") as Laya.Clip;
        if(null != this._topZone && ryw_Utilit.ryw_isIphoneX())
        {
            this._topZone.top =  this._topZone.top + 75;
        }
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