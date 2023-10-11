import ViewBase from "../ViewBase";
import ViewMgr, { ViewDef } from "../../Mgr/ViewMgr";
import AppConfig from "../../AppConfig";
import EventMgr from "../../Event/EventMgr";
import { EventDef } from "../../Event/EventDef";
import TemplateViewBase from "../TemplateViews/TemplateViewBase";

export default class MoreGameView extends TemplateViewBase
{

    constructor() { super(); }

    onAwake()
    {
        var btnContinue = this.owner.getChildByName("btnContinue") as Laya.UIComponent;
        btnContinue.once(Laya.Event.MOUSE_UP, this, this._onClickContinue);
    }

    onDestroy() {
    }

    _onClickContinue() {
        var data = this._data;

        if (data == null || !data.refresh) {
            EventMgr.instance.dispatch(EventDef.Game_OnLevelStart);
        }

        this.closeView();
    }

}