import TT_ZMDGJ_Template_ZMDGJ_View_ZMDGJ_Base from "../TTTemplateViewBase";
import Page_ZMDGJ_List from "./PageList";
import Store_ZMDGJ_Box from "./StoreBox";
import User_ZMDGJ_ from "../../../User/User";
import StoreConfig, { StoreData } from "../../../Config/StoreConfig";
import Utilit_ZMDGJ_ from "../../../Utilit";

export default class TT_ZMDGJ_Store extends TT_ZMDGJ_Template_ZMDGJ_View_ZMDGJ_Base
{
    protected _center_ZMDGJ_Zone : Laya.Clip = null;

    protected _is3d : boolean = false;//当前页面展示模式是否是3D，如果是3D则会隐藏2D展示界面
    protected _closeBtn : Laya.Sprite = null;

    protected _displayZone : Laya.Clip = null;
    protected _displayIcon : Laya.Sprite = null;

    protected _store_ZMDGJ_ListZone : Laya.Clip = null;
    protected _store_ZMDGJ_List : Page_ZMDGJ_List = null;
    protected _price_ZMDGJ_UnlockBtn : Laya.Sprite = null;
    protected _video_ZMDGJ_UnlockBtn : Laya.Sprite = null;
    protected _use_ZMDGJ_Btn : Laya.Sprite = null;
    protected _used_ZMDGJ_Tag : Laya.Sprite = null;
    
    protected _cur_ZMDGJ_Selected : number = 0;

    onAwake()
    {
        super.onAwake();

        this._topZone = this.View_ZMDGJ_.getChildByName("TopZone") as Laya.Clip;
        this._center_ZMDGJ_Zone = this.View_ZMDGJ_.getChildByName("CenterZone") as Laya.Clip;
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            if(Utilit_ZMDGJ_.is_ZMDGJ_IphoneX())
            {
                this._center_ZMDGJ_Zone.top =  this._center_ZMDGJ_Zone.top + 75;
            }
        }

        this._closeBtn =  this._center_ZMDGJ_Zone.getChildByName("CloseBtn") as Laya.Sprite;

        this._displayZone = this._center_ZMDGJ_Zone.getChildByName("DisplayZone") as Laya.Clip;
        this._displayIcon = this._displayZone.getChildByName("DisplayIcon") as Laya.Clip;
        
        this._store_ZMDGJ_ListZone = this._center_ZMDGJ_Zone.getChildByName("StoreListZone") as Laya.Clip;
        this._store_ZMDGJ_List = this._store_ZMDGJ_ListZone.getComponent(Page_ZMDGJ_List) as Page_ZMDGJ_List;
        this._store_ZMDGJ_List.List.renderHandler = Laya.Handler.create(this, this.on_ZMDGJ_ListRender, null, false);
        this._store_ZMDGJ_List.List.hScrollBarSkin = "";

        this._video_ZMDGJ_UnlockBtn = this._store_ZMDGJ_ListZone.getChildByName("VideoUnlockBtn") as Laya.Sprite;
        this._price_ZMDGJ_UnlockBtn = this._store_ZMDGJ_ListZone.getChildByName("PriceUnlockBtn") as Laya.Sprite;
        this._use_ZMDGJ_Btn = this._store_ZMDGJ_ListZone.getChildByName("UseBtn") as Laya.Sprite;
        this._used_ZMDGJ_Tag = this._use_ZMDGJ_Btn.getChildByName("Used") as Laya.Sprite;

    }

    onStart()
    {
        super.onStart();
        if(this._is3d)
        {
            this._displayZone.visible = false;
        }
        this.refresh_ZMDGJ_Store_ZMDGJ_List();
        this._store_ZMDGJ_List.List.selectedIndex = 0;
        this.on_ZMDGJ_Box_ZMDGJ_Click(0);
    }

    add_ZMDGJ_Event()
    {
        super.add_ZMDGJ_Event();
        this._closeBtn.on(Laya.Event.CLICK,this,this.on_ZMDGJ_CloseBtn);
        this._price_ZMDGJ_UnlockBtn.on(Laya.Event.CLICK,this,this.onPrice_ZMDGJ_UnlockBtn);
        this._video_ZMDGJ_UnlockBtn.on(Laya.Event.CLICK,this,this.onVideo_ZMDGJ_UnlockBtn);
    }

    remove_ZMDGJ_Event()
    {
        super.remove_ZMDGJ_Event();
        this._closeBtn.off(Laya.Event.CLICK,this,this.on_ZMDGJ_CloseBtn);
        this._price_ZMDGJ_UnlockBtn.off(Laya.Event.CLICK,this,this.onPrice_ZMDGJ_UnlockBtn);
        this._video_ZMDGJ_UnlockBtn.off(Laya.Event.CLICK,this,this.onVideo_ZMDGJ_UnlockBtn);
    }

    protected on_ZMDGJ_CloseBtn()
    {
        this.close_ZMDGJ_View();
    }

    protected onPrice_ZMDGJ_UnlockBtn()
    {
        let data = this._store_ZMDGJ_List.List.array[this._cur_ZMDGJ_Selected];
    }

    protected onVideo_ZMDGJ_UnlockBtn()
    {
        let data = this._store_ZMDGJ_List.List.array[this._cur_ZMDGJ_Selected];
    }

    protected refresh_ZMDGJ_Store_ZMDGJ_List()
    {
        let storeDatas = StoreConfig.getInstance().getStoreDatas();
        let add = 6 - (storeDatas.length % 6);
        for(let i=0;i < add ;++i)
        {
            let d = new StoreData();
            d.id = -10086;
            storeDatas.push(d);//占位
        }
        this._store_ZMDGJ_List.List.array = storeDatas;
    }

    protected on_ZMDGJ_ListRender(cell: Laya.Box, index: number): void 
    {
        let data = this._store_ZMDGJ_List.List.array[index];
        let storeBox : Store_ZMDGJ_Box = cell.getComponent(Store_ZMDGJ_Box);
        storeBox.set_ZMDGJ_Data(index,this,data,this._cur_ZMDGJ_Selected == index);
    }

    public on_ZMDGJ_Box_ZMDGJ_Click(index: number)
    {
        this._cur_ZMDGJ_Selected = index;
        let data : StoreData = this._store_ZMDGJ_List.List.array[this._cur_ZMDGJ_Selected];

        //todo：这里处理选中后的逻辑
        User_ZMDGJ_.curUsedItem = data.id;

        let unlocked = User_ZMDGJ_.itemIsUnlocked(data.id);
        this._price_ZMDGJ_UnlockBtn.visible = 0 == data.priceType && !unlocked;
        this._video_ZMDGJ_UnlockBtn.visible = 1 == data.priceType && !unlocked;
        this._use_ZMDGJ_Btn.visible = unlocked;
        this._used_ZMDGJ_Tag.visible = data.id == User_ZMDGJ_.curUsedItem;

        this._store_ZMDGJ_List.List.refresh();
    }
    
} 