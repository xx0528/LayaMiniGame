import View_wcjtn_Mgr, { View_wcjtn_Def } from "../Mgr/ViewMgr";
import Event_wcjtn_Mgr from "../Event/EventMgr";
import { Event_wcjtn_Def } from "../Event/EventDef";
import Utilit_wcjtn_ from "../Utilit";
import IView_wcjtn_State_wcjtn_Listener, { isIViewStateListener } from "./IViewStateListener";


//界面基类，所有功能模块界面继承于这个类。这种类型的界面不能嵌套。
export default class View_wcjtn_Base extends Laya.Script 
{
    public on_wcjtn_CloseEvent : Function = null;
    public on_wcjtn_OpenEvent : Function = null;
    
    public get View_wcjtn_()
    {
        return this.owner as Laya.View;
    }

    protected readonly _viewBase : boolean  = true
    protected _viewDef : View_wcjtn_Def = View_wcjtn_Def.None;
    protected _data : any = {};

    onAwake(): void {
        this.View_wcjtn_.autoDestroyAtClosed = true;
    }

    onEnable(): void {
        this.add_wcjtn_Event();
    }
    onDisable(): void {
        this.remove_wcjtn_Event();
    }
    onDestroy(): void {
        this.remove_wcjtn_Event();
    }
    
    public open_wcjtn_View(data?: any): void {
        this._data = data;
        this.show_wcjtn_()
        Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.Game_On_wcjtn_View_wcjtn_Open,{view:this._viewDef})
        if(this.on_wcjtn_OpenEvent)
        {
            this.on_wcjtn_OpenEvent();
        }
    }

    public add_wcjtn_Event() {

    }

    public remove_wcjtn_Event() {
        Laya.timer.clearAll(this);
    }

    public close_wcjtn_View() 
    {
        View_wcjtn_Mgr.ins_wcjtn_tance.close_wcjtn_View(this._viewDef);
    }

    public hide_wcjtn_()
    {
        this.View_wcjtn_.visible = false;
        this.onHide();
        Utilit_wcjtn_.for_wcjtn_Each_wcjtn_Child(this.owner,(child : Laya.Node)=>
        {
            let coms = (child as any)._components;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(isIViewStateListener(element))
                    {
                        (element as IView_wcjtn_State_wcjtn_Listener).onViewHide(this);
                    }
                }
            }
        })
    }

    public show_wcjtn_()
    {
        this.View_wcjtn_.visible = true;
        this.onShow();
        Utilit_wcjtn_.for_wcjtn_Each_wcjtn_Child(this.owner,(child : Laya.Node)=>
        {
            let coms = (child as any)._components;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(isIViewStateListener(element))
                    {
                        (element as IView_wcjtn_State_wcjtn_Listener).onViewShow(this);
                    }
                }
            }
        })
    }

    public view_wcjtn_IsHide()
    {
        return this.View_wcjtn_.visible;
    }

    protected onHide(){}
    protected onShow(){}
    protected onClose()
    {
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this);
        Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.Game_On_wcjtn_View_wcjtn_Close,{view:this._viewDef})
        if(this.on_wcjtn_CloseEvent)
        {
            this.on_wcjtn_CloseEvent();
        }
    }
}