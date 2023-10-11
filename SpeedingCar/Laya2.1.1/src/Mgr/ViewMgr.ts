
import View_wcjtn_Base from "../View/ViewBase";
import App_wcjtn_Switch_wcjtn_Config from "../Config/AppSwitchConfig";
import Wu_wcjtn_dian_wcjtn_Mgr from "./WudianMgr";

export enum View_wcjtn_Def
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
    MyMainView = "View/MyViews/MainView.json",
    GameView = "View/MyViews/GameView.json"
    
}

//界面管理器
export default class View_wcjtn_Mgr 
{
    public static readonly ins_wcjtn_tance: View_wcjtn_Mgr = new View_wcjtn_Mgr();
    protected readonly _wcjtn__views_wcjtn_ : any = {};
    protected readonly _loading_wcjtn_List : Array<View_wcjtn_Def> = new Array<View_wcjtn_Def>();

    public open_wcjtn_View(viewType :View_wcjtn_Def,data? : any,oncomplate? : Function): void 
    {
        if(this._wcjtn__views_wcjtn_[viewType])
        {  
            var view = this._wcjtn__views_wcjtn_[viewType];
            let coms = view._components;
            let viewBase : View_wcjtn_Base = null;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(element._viewBase){
                        viewBase = element as View_wcjtn_Base
                        viewBase.open_wcjtn_View(data);
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
        for (let i = 0; i < this._loading_wcjtn_List.length; ++i)
        {
            let def = this._loading_wcjtn_List[i];
            if(def == viewType)
            {
                console.log("界面 : " + String(def) + " 正在加载中，请不要重复加载");
                return;
            }
        }
        var viewUrl = String(viewType)
        var self = this;
        this._loading_wcjtn_List.push(viewType);
        Laya.Scene.load(viewUrl,Laya.Handler.create(this, function (owner: any) {
            Laya.stage.addChild(owner);
            var view = owner as Laya.View;
            self._wcjtn__views_wcjtn_[viewType] = view;
            let coms = owner._components;
            let viewBase : View_wcjtn_Base = null;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(element._viewBase){
                        viewBase = element as View_wcjtn_Base;
                        element._viewDef = viewType;
                        viewBase.open_wcjtn_View(data);
                        break;
                    }
                }
            }

            for (let i = 0; i < self._loading_wcjtn_List.length; ++i)  
            {
                let def = self._loading_wcjtn_List[i];
                if(def == viewType)
                {
                    self._loading_wcjtn_List.splice(i,1);
                    break;
                }
            }

            if(oncomplate)
            {
                oncomplate(viewBase);
            }
        }));
    }

    public close_wcjtn_View(viewType :View_wcjtn_Def) 
    {
        var view : Laya.View = this._wcjtn__views_wcjtn_[viewType];
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
            this._wcjtn__views_wcjtn_[viewType] = null;
        }
    }

    public Show_wcjtn_View(viewType :View_wcjtn_Def) 
    {
        var view  = this._wcjtn__views_wcjtn_[viewType];
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

    public hide_wcjtn_View(viewType :View_wcjtn_Def) 
    {
        var view = this._wcjtn__views_wcjtn_[viewType];
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

    public get_wcjtn_View(viewType :View_wcjtn_Def) : Laya.View
    {
        return this._wcjtn__views_wcjtn_[viewType];
    }

    public show_wcjtn_Tips(msg : string)
    {
        this.open_wcjtn_View(View_wcjtn_Def.TipsView,msg);
    }



    //尝试打开 导出界面3 (Exprot3ViewTemplate)
    //complate 回调用函数，如果成功打开界面 complate 接受参数 Export3View实例 否则为 null
    public tryShowPopAd(complate : Function)
    {
        if(1 == App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().pop_wcjtn_Ad && Wu_wcjtn_dian_wcjtn_Mgr.Wu_wcjtn_dian_wcjtn_Flag)
        {
            View_wcjtn_Mgr.ins_wcjtn_tance.open_wcjtn_View(View_wcjtn_Def.Export3View,null,(v: View_wcjtn_Base)=>
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