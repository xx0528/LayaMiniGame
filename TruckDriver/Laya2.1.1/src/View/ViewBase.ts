import View_ppxhc_Mgr, { View_ppxhc_Def } from "../Mgr/ViewMgr";
import Event_ppxhc_Mgr from "../Event/EventMgr";
import { Event_ppxhc_Def } from "../Event/EventDef";
import Utilit_ from "../Utilit";
import IViewStateListener_ppxhc_, { isIViewStateListener } from "./IViewStateListener";


//界面基类，所有功能模块界面继承于这个类。这种类型的界面不能嵌套。
export default class ViewBase extends Laya.Script 
{
    public onCloseEvent : Function = null;
    public onOpenEvent : Function = null;
    
    public get View()
    {
        return this.owner as Laya.View;
    }

    protected readonly _viewBase : boolean  = true
    protected _viewDef : View_ppxhc_Def = View_ppxhc_Def.None;
    protected _data : any = {};

    onAwake(): void {
        this.View.autoDestroyAtClosed = true;
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
        Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.Game_OnViewOpen,{view:this._viewDef})
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
        View_ppxhc_Mgr.instance.closeView(this._viewDef);
    }

    public hide()
    {
        this.View.visible = false;
        this.onHide();
        Utilit_.forEachChild(this.owner,(child : Laya.Node)=>
        {
            let coms = (child as any)._components;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(isIViewStateListener(element))
                    {
                        (element as IViewStateListener_ppxhc_).onViewHide(this);
                    }
                }
            }
        })
    }

    public show()
    {
        this.View.visible = true;
        this.onShow();
        Utilit_.forEachChild(this.owner,(child : Laya.Node)=>
        {
            let coms = (child as any)._components;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(isIViewStateListener(element))
                    {
                        (element as IViewStateListener_ppxhc_).onViewShow(this);
                    }
                }
            }
        })
    }

    public viewIsHide()
    {
        return this.View.visible;
    }

    protected onHide(){}
    protected onShow(){}
    protected onClose()
    {
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this);
        Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.Game_OnViewClose,{view:this._viewDef})
        if(this.onCloseEvent)
        {
            this.onCloseEvent();
        }
    }
}