
import ryw_WudianMgr from "./WudianMgr";
import ryw_ViewBase from "../View/ViewBase";
import ryw_AppSwitchConfig from "../Config/AppSwitchConfig";

export enum ryw_ViewDef
{
    ryw_None = "",
    ryw_TipsView = "View/TipsView.json",
    ryw_ClickGetPrize = "View/ClickGetPrize.json",
    ryw_MainView = "View/Template/MainViewTemplate.json",
    ryw_MiniGameView = "View/Template/MiniGameViewTemplate.json",
    ryw_RewardView = "View/Template/RewardViewTemplate.json",
    ryw_InGameView = "View/Template/InGameViewTemplate.json",
    ryw_GameWinView = "View/Template/GameWinViewTemplate.json",
    ryw_GameFailView = "View/Template/GameFailViewTemplate.json",
    ryw_ExportView = "View/Template/ExportViewTemplate.json",
    ryw_Export2View = "View/Template/Export2ViewTemplate.json",
    ryw_Export3View = "View/Template/Export3ViewTemplate.json",
    ryw_WXCrazyClick = "View/Template/WXCrazyClick.json",

    ryw_OPPONativeView = "View/Template/OPPONativeViewTemplate.json",
    
    ryw_QQCrazyClickView = "View/Template/QQ/QQCrazyClick.json",
    ryw_QQCrazyClickView2 = "View/Template/QQ/QQCrazyClick2.json",
    
    ryw_TTStoreView = "View/Template/TT/TTStore.json",
    ryw_TTSignInView = "View/Template/TT/TTSignIn.json",
    TTRewardView = "View/Template/TT/TTReward.json",

    VVNativeView1 = "View/Template/VV/VVNativeView1Template.json",
    VVNativeView2 = "View/Template/VV/VVNativeView2Template.json",
    
    //todo:添加你的界面
    GameView = "subRes/GameView.scene",
    // MoreGameView = "subRes/MoreGameView.scene",
    // GameOverView = "subRes/GameOverView.scene",
}

//界面管理器
export default class ryw_ViewMgr 
{
    public static readonly ryw_instance: ryw_ViewMgr = new ryw_ViewMgr();
    protected readonly ryw__views : any = {};
    protected readonly ryw__loadingList : Array<ryw_ViewDef> = new Array<ryw_ViewDef>();

    public ryw_openView(viewType :ryw_ViewDef,data? : any,oncomplate? : Function): void 
    {
        if(this.ryw__views[viewType])
        {  
            var view = this.ryw__views[viewType];
            let coms = view._components;
            let viewBase : ryw_ViewBase = null;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(element._viewBase){
                        viewBase = element as ryw_ViewBase
                        viewBase.ryw_openView(data);
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
        for (let i = 0; i < this.ryw__loadingList.length; ++i)
        {
            let def = this.ryw__loadingList[i];
            if(def == viewType)
            {
                console.log("界面 : " + String(def) + " 正在加载中，请不要重复加载");
                return;
            }
        }
        var viewUrl = String(viewType)
        var self = this;
        this.ryw__loadingList.push(viewType);
        Laya.Scene.load(viewUrl,Laya.Handler.create(this, function (owner: any) {
            Laya.stage.addChild(owner);
            var view = owner as Laya.View;
            self.ryw__views[viewType] = view;
            let coms = owner._components;
            let viewBase : ryw_ViewBase = null;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(element._viewBase){
                        viewBase = element as ryw_ViewBase;
                        element._viewDef = viewType;
                        viewBase.ryw_openView(data);
                        break;
                    }
                }
            }

            for (let i = 0; i < self.ryw__loadingList.length; ++i)
            {
                let def = self.ryw__loadingList[i];
                if(def == viewType)
                {
                    self.ryw__loadingList.splice(i,1);
                    break;
                }
            }

            if(oncomplate)
            {
                oncomplate(viewBase);
            }
        }));
    }

    public ryw_closeView(viewType :ryw_ViewDef) 
    {
        var view : Laya.View = this.ryw__views[viewType];
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
            this.ryw__views[viewType] = null;
        }
    }

    public ryw_ShowView(viewType :ryw_ViewDef) 
    {
        var view  = this.ryw__views[viewType];
        if(view)
        {
            let coms = view._components;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(element._viewBase){
                        element.ryw_show();
                        break;
                    }
                }
            }
        }
    }

    public ryw_hideView(viewType :ryw_ViewDef) 
    {
        var view = this.ryw__views[viewType];
        if(view)
        {
            let coms = view._components;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(element._viewBase){
                        element.ryw_hide();
                        break;
                    }
                }
            }
        }
    }

    public ryw_getView(viewType :ryw_ViewDef) : Laya.View
    {
        return this.ryw__views[viewType];
    }

    public ryw_showTips(msg : string)
    {
        this.ryw_openView(ryw_ViewDef.ryw_TipsView,msg);
    }



    //尝试打开 导出界面3 (Exprot3ViewTemplate)
    //complate 回调用函数，如果成功打开界面 complate 接受参数 Export3View实例 否则为 null
    public tryShowPopAd(complate : Function)
    {
        if(1 == ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_popAd && ryw_WudianMgr.ryw_WudianFlag)
        {
            ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.ryw_Export3View,null,(v: ryw_ViewBase)=>
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