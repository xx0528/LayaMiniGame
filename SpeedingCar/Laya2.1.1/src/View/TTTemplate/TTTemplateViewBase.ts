import View_wcjtn_Base from "../ViewBase";
import Utilit_wcjtn_ from "../../Utilit";
import View_wcjtn_Mgr, { View_wcjtn_Def } from "../../Mgr/ViewMgr";
import Mini_wcjtn_Game_wcjtn_View_wcjtn_Template from "../TemplateViews/MiniGame/MiniGameViewTemplate";

export default class TT_wcjtn_Template_wcjtn_View_wcjtn_Base extends View_wcjtn_Base 
{
    public get TopZone()
    {
        if(null == this._topZone)
        {
            this._topZone = this.View_wcjtn_.getChildByName("TopZone") as Laya.Clip;
        }
        return this._topZone;
    }
    protected _topZone : Laya.Clip = null;

    onAwake()
    {
        this._topZone = this.View_wcjtn_.getChildByName("TopZone") as Laya.Clip;
        if(null != this._topZone && Utilit_wcjtn_.is_wcjtn_IphoneX())
        {
            this._topZone.top =  this._topZone.top + 75;
        }
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