import TT_wcjtn_Template_wcjtn_View_wcjtn_Base from "../TTTemplateViewBase";
import Page_wcjtn_List from "./PageList";
import Store_wcjtn_Box from "./StoreBox";
import User_wcjtn_ from "../../../User/User";
import StoreConfig, { StoreData } from "../../../Config/StoreConfig";
import Utilit_wcjtn_ from "../../../Utilit";

export default class TT_wcjtn_Store extends TT_wcjtn_Template_wcjtn_View_wcjtn_Base
{
    protected _center_wcjtn_Zone : Laya.Clip = null;

    protected _is3d : boolean = false;//当前页面展示模式是否是3D，如果是3D则会隐藏2D展示界面
    protected _closeBtn : Laya.Sprite = null;

    protected _displayZone : Laya.Clip = null;
    protected _displayIcon : Laya.Sprite = null;

    protected _store_wcjtn_ListZone : Laya.Clip = null;
    protected _store_wcjtn_List : Page_wcjtn_List = null;
    protected _price_wcjtn_UnlockBtn : Laya.Sprite = null;
    protected _video_wcjtn_UnlockBtn : Laya.Sprite = null;
    protected _use_wcjtn_Btn : Laya.Sprite = null;
    protected _used_wcjtn_Tag : Laya.Sprite = null;
    
    protected _cur_wcjtn_Selected : number = 0;

    onAwake()
    {
        super.onAwake();

        this._topZone = this.View_wcjtn_.getChildByName("TopZone") as Laya.Clip;
        this._center_wcjtn_Zone = this.View_wcjtn_.getChildByName("CenterZone") as Laya.Clip;
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            if(Utilit_wcjtn_.is_wcjtn_IphoneX())
            {
                this._center_wcjtn_Zone.top =  this._center_wcjtn_Zone.top + 75;
            }
        }

        this._closeBtn =  this._center_wcjtn_Zone.getChildByName("CloseBtn") as Laya.Sprite;

        this._displayZone = this._center_wcjtn_Zone.getChildByName("DisplayZone") as Laya.Clip;
        this._displayIcon = this._displayZone.getChildByName("DisplayIcon") as Laya.Clip;
        
        this._store_wcjtn_ListZone = this._center_wcjtn_Zone.getChildByName("StoreListZone") as Laya.Clip;
        this._store_wcjtn_List = this._store_wcjtn_ListZone.getComponent(Page_wcjtn_List) as Page_wcjtn_List;
        this._store_wcjtn_List.List.renderHandler = Laya.Handler.create(this, this.on_wcjtn_ListRender, null, false);
        this._store_wcjtn_List.List.hScrollBarSkin = "";

        this._video_wcjtn_UnlockBtn = this._store_wcjtn_ListZone.getChildByName("VideoUnlockBtn") as Laya.Sprite;
        this._price_wcjtn_UnlockBtn = this._store_wcjtn_ListZone.getChildByName("PriceUnlockBtn") as Laya.Sprite;
        this._use_wcjtn_Btn = this._store_wcjtn_ListZone.getChildByName("UseBtn") as Laya.Sprite;
        this._used_wcjtn_Tag = this._use_wcjtn_Btn.getChildByName("Used") as Laya.Sprite;

    }

    onStart()
    {
        super.onStart();
        if(this._is3d)
        {
            this._displayZone.visible = false;
        }
        this.refresh_wcjtn_Store_wcjtn_List();
        this._store_wcjtn_List.List.selectedIndex = 0;
        this.on_wcjtn_Box_wcjtn_Click(0);
    }

    add_wcjtn_Event()
    {
        super.add_wcjtn_Event();
        this._closeBtn.on(Laya.Event.CLICK,this,this.on_wcjtn_CloseBtn);
        this._price_wcjtn_UnlockBtn.on(Laya.Event.CLICK,this,this.onPrice_wcjtn_UnlockBtn);
        this._video_wcjtn_UnlockBtn.on(Laya.Event.CLICK,this,this.onVideo_wcjtn_UnlockBtn);
    }

    remove_wcjtn_Event()
    {
        super.remove_wcjtn_Event();
        this._closeBtn.off(Laya.Event.CLICK,this,this.on_wcjtn_CloseBtn);
        this._price_wcjtn_UnlockBtn.off(Laya.Event.CLICK,this,this.onPrice_wcjtn_UnlockBtn);
        this._video_wcjtn_UnlockBtn.off(Laya.Event.CLICK,this,this.onVideo_wcjtn_UnlockBtn);
    }

    protected on_wcjtn_CloseBtn()
    {
        this.close_wcjtn_View();
    }

    protected onPrice_wcjtn_UnlockBtn()
    {
        let data = this._store_wcjtn_List.List.array[this._cur_wcjtn_Selected];
    }

    protected onVideo_wcjtn_UnlockBtn()
    {
        let data = this._store_wcjtn_List.List.array[this._cur_wcjtn_Selected];
    }

    protected refresh_wcjtn_Store_wcjtn_List()
    {
        let storeDatas = StoreConfig.getInstance().getStoreDatas();
        let add = 6 - (storeDatas.length % 6);
        for(let i=0;i < add ;++i)
        {
            let d = new StoreData();
            d.id = -10086;
            storeDatas.push(d);//占位
        }
        this._store_wcjtn_List.List.array = storeDatas;
    }

    protected on_wcjtn_ListRender(cell: Laya.Box, index: number): void 
    {
        let data = this._store_wcjtn_List.List.array[index];
        let storeBox : Store_wcjtn_Box = cell.getComponent(Store_wcjtn_Box);
        storeBox.set_wcjtn_Data(index,this,data,this._cur_wcjtn_Selected == index);
    }

    public on_wcjtn_Box_wcjtn_Click(index: number)
    {
        this._cur_wcjtn_Selected = index;
        let data : StoreData = this._store_wcjtn_List.List.array[this._cur_wcjtn_Selected];

        //todo：这里处理选中后的逻辑
        User_wcjtn_.curUsedItem = data.id;

        let unlocked = User_wcjtn_.itemIsUnlocked(data.id);
        this._price_wcjtn_UnlockBtn.visible = 0 == data.priceType && !unlocked;
        this._video_wcjtn_UnlockBtn.visible = 1 == data.priceType && !unlocked;
        this._use_wcjtn_Btn.visible = unlocked;
        this._used_wcjtn_Tag.visible = data.id == User_wcjtn_.curUsedItem;

        this._store_wcjtn_List.List.refresh();
    }
    
} 