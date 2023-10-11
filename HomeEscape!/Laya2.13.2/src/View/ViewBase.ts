import ryw_ViewMgr, { ryw_ViewDef } from "../Mgr/ViewMgr";
import ryw_EventMgr from "../Event/EventMgr";
import { ryw_EventDef } from "../Event/EventDef";
import ryw_Utilit from "../Utilit";
import IViewStateListener, { isIViewStateListener } from "./IViewStateListener";


//界面基类，所有功能模块界面继承于这个类。这种类型的界面不能嵌套。
export default class ryw_ViewBase extends Laya.Script 
{
    public ryw_onCloseEvent : Function = null;
    public ryw_onOpenEvent : Function = null;
    
    public get ryw_View()
    {
        return this.owner as Laya.View;
    }

    protected readonly _viewBase : boolean  = true
    protected _viewDef : ryw_ViewDef = ryw_ViewDef.ryw_None;
    protected _data : any = {};

    onAwake(): void {
        this.ryw_View.autoDestroyAtClosed = true;
    }

    onEnable(): void {
        this.ryw_addEvent();
    }
    onDisable(): void {
        this.ryw_removeEvent();
    }
    onDestroy(): void {
        this.ryw_removeEvent();
    }
    
    public ryw_openView(data?: any): void {
        this._data = data;
        this.ryw_show()
        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_Game_OnViewOpen,{view:this._viewDef})
        if(this.ryw_onOpenEvent)
        {
            this.ryw_onOpenEvent();
        }
    }

    public ryw_addEvent() {

    }

    public ryw_removeEvent() {
        Laya.timer.clearAll(this);
    }

    public ryw_closeView() 
    {
        ryw_ViewMgr.ryw_instance.ryw_closeView(this._viewDef);
    }

    public ryw_hide()
    {
        this.ryw_View.visible = false;
        this.onHide();
        ryw_Utilit.ryw_forEachChild(this.owner,(child : Laya.Node)=>
        {
            let coms = (child as any)._components;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(isIViewStateListener(element))
                    {
                        (element as IViewStateListener).onViewHide(this);
                    }
                }
            }
        })
    }

    public ryw_show()
    {
        this.ryw_View.visible = true;
        this.onShow();
        ryw_Utilit.ryw_forEachChild(this.owner,(child : Laya.Node)=>
        {
            let coms = (child as any)._components;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(isIViewStateListener(element))
                    {
                        (element as IViewStateListener).onViewShow(this);
                    }
                }
            }
        })
    }

    public ryw_viewIsHide()
    {
        return this.ryw_View.visible;
    }

    protected onHide(){}
    protected onShow(){}
    protected onClose()
    {
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this);
        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_Game_OnViewClose,{view:this._viewDef})
        if(this.ryw_onCloseEvent)
        {
            this.ryw_onCloseEvent();
        }
    }
}