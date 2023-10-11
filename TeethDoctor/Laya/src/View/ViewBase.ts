import Vie_XYXZS_wMgr, { Vie_XYXZS_wDef } from "../Mgr/ViewMgr";
import Even_XYXZS_tMgr from "../Event/EventMgr";
import { Even_XYXZS_tDef } from "../Event/EventDef";
import Uti_XYXZS_lit from "../Utilit";
import IViewSt_XYXZS_ateListener, { isIView_XYXZS_StateListener } from "./IViewStateListener";


//界面基类，所有功能模块界面继承于这个类。这种类型的界面不能嵌套。
export default class View_XYXZS_Base extends Laya.Script 
{
    public onCloseEvent : Function = null;
    public onOpenEvent : Function = null;
    
    protected readonly _viewBase : boolean  = true
    protected _viewDef : Vie_XYXZS_wDef = Vie_XYXZS_wDef.No_XYXZS_ne;
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
        Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.Game_OnV_XYXZS_iewOpen,{view:this._viewDef})
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
        Vie_XYXZS_wMgr.inst_XYXZS_ance.clos_XYXZS_eView(this._viewDef);
    }

    public hide()
    {
        (this.owner as Laya.View).visible = false;
        this.onHide();
        Uti_XYXZS_lit.for_XYXZS_EachChild(this.owner,(child : Laya.Node)=>
        {
            let coms = (child as any)._components;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(isIView_XYXZS_StateListener(element))
                    {
                        (element as IViewSt_XYXZS_ateListener).onViewHide(this);
                    }
                }
            }
        })
    }

    public show()
    {
        (this.owner as Laya.View).visible = true;
        this.onShow();
        Uti_XYXZS_lit.for_XYXZS_EachChild(this.owner,(child : Laya.Node)=>
        {
            let coms = (child as any)._components;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(isIView_XYXZS_StateListener(element))
                    {
                        (element as IViewSt_XYXZS_ateListener).onView__XYXZS_XYXZS_Show(this);
                    }
                }
            }
        })
    }

    public viewIsHide()
    {
        return (this.owner as Laya.View).visible;
    }

    protected onHide(){}
    protected onShow(){}
    protected onClose()
    {
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this);
        Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.Game_OnVi_XYXZS_ewClose,{view:this._viewDef})
        if(this.onCloseEvent)
        {
            this.onCloseEvent();
        }
    }
}