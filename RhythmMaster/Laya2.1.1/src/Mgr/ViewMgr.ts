
import ViewBase from "../View/ViewBase";

export enum ViewDef
{
    None = "",
    TipsView = "View/TipsView.scene",
    GameMainView = "View/GameMain.scene",
    GameLoadingView = "View/GameLoading.scene", //[songName]
    GameSettleView = "View/GameSettleView.scene",
    GameFailureView = "View/GameFailure.scene",
    GameWorkView = "View/GameWork.scene",
    SongStoreView = "View/SongStore.scene",
    ExportView = "View/ExportView.scene"
    //todo:添加你的界面
}

//界面管理器
export default class View_myqq_Mgr 
{
    public static readonly instance: View_myqq_Mgr = new View_myqq_Mgr();
    protected readonly _views : any = {};

    public openView(viewType :ViewDef,data? : any,oncomplate? : Function): void 
    {
        if(this._views[viewType])
        {  
            var view = this._views[viewType];
            let coms = view._components;
            let viewBase : ViewBase = null;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(element._viewBase){
                        element.openView(data);
                        if (oncomplate)  {
                            oncomplate(element);
                        }
                        break;
                    }
                }
            }
            if(oncomplate)
            {
                oncomplate(viewBase);
            }
            return;
        }
        var viewUrl = String(viewType)
        var self = this;
        Laya.Scene.load(viewUrl,Laya.Handler.create(this, function (owner: any) {
            Laya.stage.addChild(owner);
            var view = owner as Laya.View;
            self._views[viewType] = view;
            let coms = owner._components;
            let viewBase : ViewBase = null;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(element._viewBase){
                        viewBase = element as ViewBase;
                        element._viewDef = viewType;
                        viewBase.openView(data);
                        break;
                    }
                }
            }
            if(oncomplate)
            {
                oncomplate(viewBase);
            }
        }));
    }

    public closeView(viewType :ViewDef) 
    {
        var view : Laya.View = this._views[viewType];
        if(view)
        {
            var owner = view as any;
            let coms = owner._components;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(element._viewBase){
                        element.onClose();
                        break;
                    }
                }
            }
            view.removeSelf();
            view.destroy();
            this._views[viewType] = null;
        }
    }

    public ShowView(viewType :ViewDef) 
    {
        var view  = this._views[viewType];
        if(view)
        {
            let coms = view._components;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(element._viewBase){
                        element.show();
                        break;
                    }
                }
            }
        }
    }

    public hideView(viewType :ViewDef) 
    {
        var view = this._views[viewType];
        if(view)
        {
            let coms = view._components;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(element._viewBase){
                        element.hide();
                        break;
                    }
                }
            }
        }
    }

    public getView(viewType :ViewDef) : Laya.View
    {
        return this._views[viewType];
    }

    public showTips(msg : string)
    {
        this.openView(ViewDef.TipsView,msg);
    }
}