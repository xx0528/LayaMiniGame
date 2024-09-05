import ryw_TTTemplateViewBase from "../TTTemplateViewBase";
import ryw_PageList from "./PageList";
import ryw_StoreBox from "./StoreBox";
import ryw_User from "../../../User/User";
import ryw_StoreConfig, { StoreData } from "../../../Config/StoreConfig";
import ryw_Utilit from "../../../Utilit";

export default class ryw_TTStore extends ryw_TTTemplateViewBase
{
    protected ryw__centerZone : Laya.Clip = null;

    protected ryw__is3d : boolean = false;//当前页面展示模式是否是3D，如果是3D则会隐藏2D展示界面
    protected ryw__closeBtn : Laya.Sprite = null;

    protected ryw__displayZone : Laya.Clip = null;
    protected ryw__displayIcon : Laya.Sprite = null;

    protected ryw__storeListZone : Laya.Clip = null;
    protected ryw__storeList : ryw_PageList = null;
    protected ryw__priceUnlockBtn : Laya.Sprite = null;
    protected ryw__videoUnlockBtn : Laya.Sprite = null;
    protected ryw__useBtn : Laya.Sprite = null;
    protected ryw__usedTag : Laya.Sprite = null;
    
    protected ryw__curSelected : number = 0;

    onAwake()
    {
        super.onAwake();

        this._topZone = this.ryw_View.getChildByName("TopZone") as Laya.Clip;
        this.ryw__centerZone = this.ryw_View.getChildByName("CenterZone") as Laya.Clip;
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            if(ryw_Utilit.ryw_isIphoneX())
            {
                this.ryw__centerZone.top =  this.ryw__centerZone.top + 75;
            }
        }

        this.ryw__closeBtn =  this.ryw__centerZone.getChildByName("CloseBtn") as Laya.Sprite;

        this.ryw__displayZone = this.ryw__centerZone.getChildByName("DisplayZone") as Laya.Clip;
        this.ryw__displayIcon = this.ryw__displayZone.getChildByName("DisplayIcon") as Laya.Clip;
        
        this.ryw__storeListZone = this.ryw__centerZone.getChildByName("StoreListZone") as Laya.Clip;
        this.ryw__storeList = this.ryw__storeListZone.getComponent(ryw_PageList) as ryw_PageList;
        this.ryw__storeList.ryw_List.renderHandler = Laya.Handler.create(this, this.ryw_onListRender, null, false);
        this.ryw__storeList.ryw_List.hScrollBarSkin = "";

        this.ryw__videoUnlockBtn = this.ryw__storeListZone.getChildByName("VideoUnlockBtn") as Laya.Sprite;
        this.ryw__priceUnlockBtn = this.ryw__storeListZone.getChildByName("PriceUnlockBtn") as Laya.Sprite;
        this.ryw__useBtn = this.ryw__storeListZone.getChildByName("UseBtn") as Laya.Sprite;
        this.ryw__usedTag = this.ryw__useBtn.getChildByName("Used") as Laya.Sprite;

    }

    onStart()
    {
        super.onStart();
        if(this.ryw__is3d)
        {
            this.ryw__displayZone.visible = false;
        }
        this.ryw_refreshStoreList();
        this.ryw__storeList.ryw_List.selectedIndex = 0;
        this.ryw_onBoxClick(0);
    }

    ryw_addEvent()
    {
        super.ryw_addEvent();
        this.ryw__closeBtn.on(Laya.Event.CLICK,this,this.ryw_onCloseBtn);
        this.ryw__priceUnlockBtn.on(Laya.Event.CLICK,this,this.ryw_onPriceUnlockBtn);
        this.ryw__videoUnlockBtn.on(Laya.Event.CLICK,this,this.ryw_onVideoUnlockBtn);
    }

    ryw_removeEvent()
    {
        super.ryw_removeEvent();
        this.ryw__closeBtn.off(Laya.Event.CLICK,this,this.ryw_onCloseBtn);
        this.ryw__priceUnlockBtn.off(Laya.Event.CLICK,this,this.ryw_onPriceUnlockBtn);
        this.ryw__videoUnlockBtn.off(Laya.Event.CLICK,this,this.ryw_onVideoUnlockBtn);
    }

    protected ryw_onCloseBtn()
    {
        this.ryw_closeView();
    }

    protected ryw_onPriceUnlockBtn()
    {
        let data = this.ryw__storeList.ryw_List.array[this.ryw__curSelected];
    }

    protected ryw_onVideoUnlockBtn()
    {
        let data = this.ryw__storeList.ryw_List.array[this.ryw__curSelected];
    }

    protected ryw_refreshStoreList()
    {
        let storeDatas = ryw_StoreConfig.getInstance().getStoreDatas();
        let add = 6 - (storeDatas.length % 6);
        for(let i=0;i < add ;++i)
        {
            let d = new StoreData();
            d.id = -10086;
            storeDatas.push(d);//占位
        }
        this.ryw__storeList.ryw_List.array = storeDatas;
    }

    protected ryw_onListRender(cell: Laya.Box, index: number): void 
    {
        let data = this.ryw__storeList.ryw_List.array[index];
        let storeBox : ryw_StoreBox = cell.getComponent(ryw_StoreBox);
        storeBox.ryw_setData(index,this,data,this.ryw__curSelected == index);
    }

    public ryw_onBoxClick(index: number)
    {
        this.ryw__curSelected = index;
        let data : StoreData = this.ryw__storeList.ryw_List.array[this.ryw__curSelected];

        //todo：这里处理选中后的逻辑
        ryw_User.curUsedItem = data.id;

        let unlocked = ryw_User.itemIsUnlocked(data.id);
        this.ryw__priceUnlockBtn.visible = 0 == data.priceType && !unlocked;
        this.ryw__videoUnlockBtn.visible = 1 == data.priceType && !unlocked;
        this.ryw__useBtn.visible = unlocked;
        this.ryw__usedTag.visible = data.id == ryw_User.curUsedItem;

        this.ryw__storeList.ryw_List.refresh();
    }
    
} 