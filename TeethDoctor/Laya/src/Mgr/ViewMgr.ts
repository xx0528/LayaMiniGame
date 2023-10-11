
import View_XYXZS_Base from "../View/ViewBase";

export enum Vie_XYXZS_wDef
{
    No_XYXZS_ne = "",
    Tips_XYXZS_View = "View/TipsView.json",
    Cli_XYXZS_ckGetPrize = "View/ClickGetPrize.json",
    //todo:添加你的界面
    GameP_XYXZS_laying = "View/GamePlaying.json"    ,
    Main_XYXZS_View="View/MainView.json",
    More_XYXZS_GameView="View/MoreGameView.json",
    Game_XYXZS_Over="View/GameOver.json",
    Game_XYXZS_View="View/GameView.json",
    Fake_XYXZS_Export="View/FakeExport.json",
    KRQ__XYXZS_TEST="View/KRQ_TEST.json"
}

//界面管理器
export default class Vie_XYXZS_wMgr 
{
    public static readonly inst_XYXZS_ance: Vie_XYXZS_wMgr = new Vie_XYXZS_wMgr();
    protected readonly _v_XYXZS_iews : any = {};

    public open_XYXZS_View(viewType :Vie_XYXZS_wDef,data? : any,oncomplate? : Function): void 
    {
        if(this._v_XYXZS_iews[viewType])
        {  
            var view = this._v_XYXZS_iews[viewType];
            let coms = view._components;
            let viewBase : View_XYXZS_Base = null;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(element._viewBase){
                        viewBase = element as View_XYXZS_Base
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
            self._v_XYXZS_iews[viewType] = view;
            let coms = owner._components;
            let viewBase : View_XYXZS_Base = null;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(element._viewBase){
                        viewBase = element as View_XYXZS_Base;
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

    public clos_XYXZS_eView(viewType :Vie_XYXZS_wDef) 
    {
        var view : Laya.View = this._v_XYXZS_iews[viewType];
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
            this._v_XYXZS_iews[viewType] = null;
        }
    }

    public Show_XYXZS_View(viewType :Vie_XYXZS_wDef) 
    {
        var view  = this._v_XYXZS_iews[viewType];
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

    public hide_XYXZS_View(viewType :Vie_XYXZS_wDef) 
    {
        var view = this._v_XYXZS_iews[viewType];
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

    public get_XYXZS_View(viewType :Vie_XYXZS_wDef) : Laya.View
    {
        return this._v_XYXZS_iews[viewType];
    }

    public showT_XYXZS_ips(msg : string)
    {
        this.open_XYXZS_View(Vie_XYXZS_wDef.Tips_XYXZS_View,msg);
    }
}