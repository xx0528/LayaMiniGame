import View_tippy_Mgr, { ViewDef } from "../Mgr/ViewMgr";
import Event_tippy_Mgr from "../Event/EventMgr";
import { Event_tippy_Def } from "../Event/EventDef";

//界面基类，所有功能模块界面继承于这个类。这种类型的界面不能嵌套。
export default class View_tippy_Base extends Laya.Script 
{
    public onCloseEvent : Function = null;
    public onOpenEvent : Function = null;
    
    protected readonly _viewBase : boolean  = true
    protected _viewDef : ViewDef = ViewDef.None;
    protected _data : any = {};

    onAwake(): void {
        //删除时自动释放
        (this.owner as Laya.View).autoDestroyAtClosed = true;
        (this.owner as Laya.View).height = Laya.stage.height;
    }

    onEnable(): void {
        this.addEvent();
    }
    onDisable(): void {
        this.removeEvent();
    }
    onDestroy(): void {
        this.removeEvent();
    }
    
    public openView(data?: any): void {
        this._data = data;
        this.show()
        Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.Game__tippy_OnViewOpen,{view:this._viewDef})
        if(this.onOpenEvent)
        {
            this.onOpenEvent();
        }
    }

    public addEvent() {

    }

    public removeEvent() {
        Laya.timer.clearAll(this);
    }

    public closeView() 
    {
        View_tippy_Mgr.insta_tippy_nce.close_tippy_View(this._viewDef);
    }

    public hide()
    {
        (this.owner as Laya.View).visible = false;
        this.onHide();
    }

    public show()
    {
        (this.owner as Laya.View).visible = true;
        this.onShow();
    }

    public viewIsHide()
    {
        return (this.owner as Laya.View).alpha == 0;
    }

    protected onHide(){}
    protected onShow(){}
    protected onClose()
    {
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this);
        Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.Game__tippy_OnViewClose,{view:this._viewDef})
        if(this.onCloseEvent)
        {
            this.onCloseEvent();
        }
    }
}