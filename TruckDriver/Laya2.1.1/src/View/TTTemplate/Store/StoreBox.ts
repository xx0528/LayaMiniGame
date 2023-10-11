import { StoreData } from "../../../Config/StoreConfig";
import User from "../../../User/User";
import TTStore from "./TTStore";

export default class StoreBox extends Laya.Script 
{
    protected _root : Laya.Clip = null;
    protected _unlockedTag : Laya.Sprite = null;
    protected _usedTag : Laya.Sprite = null;

    protected _index : number = -1;
    protected _view : TTStore = null;
    

    onAwake()
    {
        this._root = this.owner.getChildByName("Root") as Laya.Clip;
        this._unlockedTag = this._root.getChildByName("Unlock") as Laya.Sprite;
        this._usedTag = this._root.getChildByName("Used") as Laya.Sprite;

    }

    onEnable()
    {
        (this.owner as Laya.Box).on(Laya.Event.CLICK,this,this.onBoxClick);
    }

    onDisable()
    {
        (this.owner as Laya.Box).on(Laya.Event.CLICK,this,this.onBoxClick);
    }

    public setData(index : number, view : TTStore,data : StoreData,selected : boolean)
    {
        this._index = index;
        this._view = view;

        this._unlockedTag.visible = User.itemIsUnlocked(data.id);
        this._usedTag.visible = User.curUsedItem == data.id;
        this._root.visible = (-10086 != data.id);
    }

    protected onBoxClick()
    {
        if(null != this._view && -1 != this._index)
        {
            this._view.onBoxClick(this._index);
        }
    }

}