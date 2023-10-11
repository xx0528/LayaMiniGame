import ViewBase from "../ViewBase";
import Utilit from "../../Utilit";
import ViewMgr, { ViewDef } from "../../Mgr/ViewMgr";
import MiniGameViewTemplate from "../TemplateViews/MiniGame/MiniGameViewTemplate";

export default class TTTemplateViewBase extends ViewBase 
{
    public get TopZone()
    {
        if(null == this._topZone)
        {
            this._topZone = this.View.getChildByName("TopZone") as Laya.Clip;
        }
        return this._topZone;
    }
    protected _topZone : Laya.Clip = null;

    onAwake()
    {
        this._topZone = this.View.getChildByName("TopZone") as Laya.Clip;
        if(null != this._topZone && Utilit.isIphoneX())
        {
            this._topZone.top =  this._topZone.top + 75;
        }
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