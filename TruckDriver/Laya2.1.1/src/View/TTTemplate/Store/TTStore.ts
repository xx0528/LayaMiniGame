import TTTemplateViewBase from "../TTTemplateViewBase";
import PageList from "./PageList";
import StoreBox from "./StoreBox";
import User from "../../../User/User";
import StoreConfig, { StoreData } from "../../../Config/StoreConfig";
import Utilit from "../../../Utilit";

export default class TTStore extends TTTemplateViewBase
{
    protected _centerZone : Laya.Clip = null;

    protected _is3d : boolean = false;//当前页面展示模式是否是3D，如果是3D则会隐藏2D展示界面
    protected _closeBtn : Laya.Sprite = null;

    protected _displayZone : Laya.Clip = null;
    protected _displayIcon : Laya.Sprite = null;

    protected _storeListZone : Laya.Clip = null;
    protected _storeList : PageList = null;
    protected _priceUnlockBtn : Laya.Sprite = null;
    protected _videoUnlockBtn : Laya.Sprite = null;
    protected _useBtn : Laya.Sprite = null;
    protected _usedTag : Laya.Sprite = null;
    
    protected _curSelected : number = 0;

    onAwake()
    {
        super.onAwake();

        this._topZone = this.View.getChildByName("TopZone") as Laya.Clip;
        this._centerZone = this.View.getChildByName("CenterZone") as Laya.Clip;
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            if(Utilit.isIphoneX_())
            {
                this._centerZone.top =  this._centerZone.top + 75;
            }
        }

        this._closeBtn =  this._centerZone.getChildByName("CloseBtn") as Laya.Sprite;

        this._displayZone = this._centerZone.getChildByName("DisplayZone") as Laya.Clip;
        this._displayIcon = this._displayZone.getChildByName("DisplayIcon") as Laya.Clip;
        
        this._storeListZone = this._centerZone.getChildByName("StoreListZone") as Laya.Clip;
        this._storeList = this._storeListZone.getComponent(PageList) as PageList;
        this._storeList.List.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
        this._storeList.List.hScrollBarSkin = "";

        this._videoUnlockBtn = this._storeListZone.getChildByName("VideoUnlockBtn") as Laya.Sprite;
        this._priceUnlockBtn = this._storeListZone.getChildByName("PriceUnlockBtn") as Laya.Sprite;
        this._useBtn = this._storeListZone.getChildByName("UseBtn") as Laya.Sprite;
        this._usedTag = this._useBtn.getChildByName("Used") as Laya.Sprite;

    }

    onStart()
    {
        super.onStart();
        if(this._is3d)
        {
            this._displayZone.visible = false;
        }
        this.refreshStoreList();
        this._storeList.List.selectedIndex = 0;
        this.onBoxClick(0);
    }

    addEvent()
    {
        super.addEvent();
        this._closeBtn.on(Laya.Event.CLICK,this,this.onCloseBtn);
        this._priceUnlockBtn.on(Laya.Event.CLICK,this,this.onPriceUnlockBtn);
        this._videoUnlockBtn.on(Laya.Event.CLICK,this,this.onVideoUnlockBtn);
    }

    removeEvent()
    {
        super.removeEvent();
        this._closeBtn.off(Laya.Event.CLICK,this,this.onCloseBtn);
        this._priceUnlockBtn.off(Laya.Event.CLICK,this,this.onPriceUnlockBtn);
        this._videoUnlockBtn.off(Laya.Event.CLICK,this,this.onVideoUnlockBtn);
    }

    protected onCloseBtn()
    {
        this.closeView();
    }

    protected onPriceUnlockBtn()
    {
        let data = this._storeList.List.array[this._curSelected];
    }

    protected onVideoUnlockBtn()
    {
        let data = this._storeList.List.array[this._curSelected];
    }

    protected refreshStoreList()
    {
        let storeDatas = StoreConfig.getInstance().getStoreDatas();
        let add = 6 - (storeDatas.length % 6);
        for(let i=0;i < add ;++i)
        {
            let d = new StoreData();
            d.id = -10086;
            storeDatas.push(d);//占位
        }
        this._storeList.List.array = storeDatas;
    }

    protected onListRender(cell: Laya.Box, index: number): void 
    {
        let data = this._storeList.List.array[index];
        let storeBox : StoreBox = cell.getComponent(StoreBox);
        storeBox.setData(index,this,data,this._curSelected == index);
    }

    public onBoxClick(index: number)
    {
        this._curSelected = index;
        let data : StoreData = this._storeList.List.array[this._curSelected];

        //todo：这里处理选中后的逻辑
        User.curUsedItem = data.id;

        let unlocked = User.itemIsUnlocked(data.id);
        this._priceUnlockBtn.visible = 0 == data.priceType && !unlocked;
        this._videoUnlockBtn.visible = 1 == data.priceType && !unlocked;
        this._useBtn.visible = unlocked;
        this._usedTag.visible = data.id == User.curUsedItem;

        this._storeList.List.refresh();
    }
    
} 