import View_ZMDGJ_Base from "../ViewBase";
import Utilit_ZMDGJ_ from "../../Utilit";
import View_ZMDGJ_Mgr, { View_ZMDGJ_Def } from "../../Mgr/ViewMgr";
import Mini_ZMDGJ_Game_ZMDGJ_View_ZMDGJ_Template from "../TemplateViews/MiniGame/MiniGameViewTemplate";

export default class TT_ZMDGJ_Template_ZMDGJ_View_ZMDGJ_Base extends View_ZMDGJ_Base 
{
    public get TopZone()
    {
        if(null == this._topZone)
        {
            this._topZone = this.View_ZMDGJ_.getChildByName("TopZone") as Laya.Clip;
        }
        return this._topZone;
    }
    protected _topZone : Laya.Clip = null;

    onAwake()
    {
        super.onAwake();
        this._topZone = this.View_ZMDGJ_.getChildByName("TopZone") as Laya.Clip;
        if(null != this._topZone && Utilit_ZMDGJ_.is_ZMDGJ_IphoneX())
        {
            this._topZone.top =  this._topZone.top + 75;
        }
    }

    add_ZMDGJ_Event()
    {
        super.add_ZMDGJ_Event();
    }

    remove_ZMDGJ_Event()
    {
        super.remove_ZMDGJ_Event();
    }
}