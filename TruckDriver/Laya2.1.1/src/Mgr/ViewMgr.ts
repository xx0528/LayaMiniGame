
import ViewBase from "../View/ViewBase";
import AppSwitchConfig from "../Config/AppSwitchConfig";
import WudianMgr from "./WudianMgr";

export enum View_ppxhc_Def
{
    None = "",
    TipsView = "View/TipsView.json",
    ClickGetPrize = "View/ClickGetPrize.json",
    MainView = "View/Template/MainViewTemplate.json",
    MiniGameView = "View/Template/MiniGameViewTemplate.json",
    RewardView = "View/Template/RewardViewTemplate.json",
    InGameView = "View/Template/InGameViewTemplate.json",
    GameWinView = "View/Template/GameWinViewTemplate.json",
    GameFailView = "View/Template/GameFailViewTemplate.json",
    ExportView = "View/Template/ExportViewTemplate.json",
    Export2View = "View/Template/Export2ViewTemplate.json",
    Export3View = "View/Template/Export3ViewTemplate.json",
    WXCrazyClick = "View/Template/WXCrazyClick.json",
    
    OPPONativeView = "View/Template/OPPONativeViewTemplate.json",
    
    QQCrazyClickView = "View/Template/QQ/QQCrazyClick.json",
    QQCrazyClickView2 = "View/Template/QQ/QQCrazyClick2.json",
    
    TTStoreView = "View/Template/TT/TTStore.json",
    TTSignInView = "View/Template/TT/TTSignIn.json",
    TTRewardView = "View/Template/TT/TTReward.json",

    VVNativeView1 = "View/Template/VV/VVNativeView1Template.json",
    VVNativeView2 = "View/Template/VV/VVNativeView2Template.json",
    
    //todo:添加你的界面
    TestGame = "subRes/Views/TestGame.json",
    GameHome = "subRes/Views/GameHome.json",
    GameView = "subRes/Views/GameView.json",
    GameOver = "subRes/Views/GameOver.json",
    GameContinue = "subRes/Views/GameContinue.json",
    GameHistory = "subRes/Views/GameHistory.json",
    GameSkin = "subRes/Views/GameSkin.json",
    TrialSkin = "subRes/Views/TrialSkin.json"
}

//界面管理器
export default class View_ppxhc_Mgr 
{
    public static readonly instance: View_ppxhc_Mgr = new View_ppxhc_Mgr();
    protected readonly _views : any = {};
    protected readonly _loadingList : Array<View_ppxhc_Def> = new Array<View_ppxhc_Def>();

    public openView(viewType :View_ppxhc_Def,data? : any,oncomplate? : Function): void 
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
        for (let i = 0; i < this._loadingList.length; ++i)
        {
            let def = this._loadingList[i];
            if(def == viewType)
            {
                console.log("界面 : " + String(def) + " 正在加载中，请不要重复加载");
                return;
            }
        }
        var viewUrl = String(viewType)
        var self = this;
        this._loadingList.push(viewType);
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

            for (let i = 0; i < self._loadingList.length; ++i)
            {
                let def = self._loadingList[i];
                if(def == viewType)
                {
                    self._loadingList.splice(i,1);
                    break;
                }
            }

            if(oncomplate)
            {
                oncomplate(viewBase);
            }
        }));
    }

    public closeView(viewType :View_ppxhc_Def) 
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

    public ShowView(viewType :View_ppxhc_Def) 
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

    public hideView(viewType :View_ppxhc_Def) 
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

    public getView(viewType :View_ppxhc_Def) : Laya.View
    {
        return this._views[viewType];
    }

    public showTips(msg : string)
    {
        this.openView(View_ppxhc_Def.TipsView,msg);
    }



    //尝试打开 导出界面3 (Exprot3ViewTemplate)
    //complate 回调用函数，如果成功打开界面 complate 接受参数 Export3View实例 否则为 null
    public tryShowPopAd(complate : Function)
    {
        if(1 == AppSwitchConfig.getInstance().getAppSwitchData().popAd && WudianMgr.Wudian_ppxhc_Flag)
        {
            View_ppxhc_Mgr.instance.openView(View_ppxhc_Def.Export3View,null,(v: ViewBase)=>
            {
                if(null != complate) complate(v);
            })
        }
        else
        {
            if(null != complate) complate(null);
        }
    }
}