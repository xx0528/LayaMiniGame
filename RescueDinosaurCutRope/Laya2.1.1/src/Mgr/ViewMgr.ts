
import ViewBase from "../View/ViewBase";

export enum View_JJKLBB_Def
{
    None = "",
    TipsView = "View/TipsView.json",
    ClickGetPrize = "View/ClickGetPrize.json",
    ClickGetPrize_2 = "View/ClickGetPrize_2.json",
    //todo:添加你的界面
    MainView = "View/MainView.json",
    LevelStateView = "View/LevelStateView.json",
    MoreGameView = "View/MoreGame.json",
    GameRewardView = "View/GameReward.json",
    GameOverView = "View/GameOver.json",
    SignInRewardView = "View/SignInReward.json",
    ActorSkinView = "View/ActorSkinView.json",
    FreeRewardView = "View/FreeReward.json",
    GameView =  "View/GameView.json",
    GameOverSkin = "View/GameOverSkin.json",
}

//界面管理器
export default class View_JJKLBB_Mgr 
{
    public static readonly insta_JJKLBB_nce: View_JJKLBB_Mgr = new View_JJKLBB_Mgr();
    protected readonly _views : any = {};

    public openView(viewType :View_JJKLBB_Def,data? : any,oncomplate? : Function): void 
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

    public closeView(viewType :View_JJKLBB_Def) 
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

    public ShowView(viewType :View_JJKLBB_Def) 
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

    public hideView(viewType :View_JJKLBB_Def) 
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

    public getView(viewType :View_JJKLBB_Def) : Laya.View
    {
        return this._views[viewType];
    }

    public showTips(msg : string)
    {
        this.openView(View_JJKLBB_Def.TipsView,msg);
    }
}