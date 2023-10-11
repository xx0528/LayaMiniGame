
import ViewBase from "../View/ViewBase";

export enum View_sdlyg_Def
{
    None = "",
    TipsView = "View/TipsView.json",
    ClickGetPrize = "View/ClickGetPrize.json",
    MenuView = "subRes/View/MenuView.json",
    LotteryView = "subRes/View/LotteryView.json",
    BagView = "subRes/View/BagView.json",
    OverView = "subRes/View/OverView.json",
    OverDeriveView = "subRes/View/OverDeriveView.json",
    MoreGameView = "subRes/View/MoreGameView.json",
    GameView = "subRes/View/GameView.json",
    ReliveView = "subRes/View/ReliveView.json",
    SideAdView = "subRes/View/SideAdView.json",
    RankView = "subRes/View/RankView.json",
    MoreGame = "subRes/View/MoreGame.json",
    TrySkinView = "subRes/View/TrySkinView.json",
    EnterGamePop = "subRes/View/EnterGamePop.json",
    NativeView = "subRes/View/NativeView.json"
    //todo:添加你的界面
}

//界面管理器
export default class View_sdlyg_Mgr 
{
    public static readonly instance: View_sdlyg_Mgr = new View_sdlyg_Mgr();
    protected readonly _views : any = {};

    public openView(viewType :View_sdlyg_Def,data? : any,oncomplate? : Function): void 
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
                        viewBase = element as ViewBase
                        viewBase.openView(data);
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

    public closeView(viewType :View_sdlyg_Def) 
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

    public ShowView(viewType :View_sdlyg_Def) 
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

    public hideView(viewType :View_sdlyg_Def) 
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

    public getView(viewType :View_sdlyg_Def) : Laya.View
    {
        return this._views[viewType];
    }

    public showTips(msg : string)
    {
        this.openView(View_sdlyg_Def.TipsView,msg);
    }
}