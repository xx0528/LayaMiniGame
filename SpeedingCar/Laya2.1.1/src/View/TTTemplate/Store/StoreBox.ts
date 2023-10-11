import { StoreData } from "../../../Config/StoreConfig";
import User_wcjtn_ from "../../../User/User";
import TT_wcjtn_Store from "./TTStore";

export default class Store_wcjtn_Box extends Laya.Script 
{
    protected _root_wcjtn_ : Laya.Clip = null;
    protected _unlocked_wcjtn_Tag : Laya.Sprite = null;
    protected _used_wcjtn_Tag : Laya.Sprite = null;

    protected _index_wcjtn_ : number = -1;
    protected _view_wcjtn_ : TT_wcjtn_Store = null;
    

    onAwake()
    {
        this._root_wcjtn_ = this.owner.getChildByName("Root") as Laya.Clip;
        this._unlocked_wcjtn_Tag = this._root_wcjtn_.getChildByName("Unlock") as Laya.Sprite;
        this._used_wcjtn_Tag = this._root_wcjtn_.getChildByName("Used") as Laya.Sprite;

    }

    onEnable()
    {
        (this.owner as Laya.Box).on(Laya.Event.CLICK,this,this.on_wcjtn_Box_wcjtn_Click);
    }

    onDisable()
    {
        (this.owner as Laya.Box).on(Laya.Event.CLICK,this,this.on_wcjtn_Box_wcjtn_Click);
    }

    public set_wcjtn_Data(index : number, view : TT_wcjtn_Store,data : StoreData,selected : boolean)
    {
        this._index_wcjtn_ = index;
        this._view_wcjtn_ = view;

        this._unlocked_wcjtn_Tag.visible = User_wcjtn_.itemIsUnlocked(data.id);
        this._used_wcjtn_Tag.visible = User_wcjtn_.curUsedItem == data.id;
        this._root_wcjtn_.visible = (-10086 != data.id);
    }

    protected on_wcjtn_Box_wcjtn_Click()
    {
        if(null != this._view_wcjtn_ && -1 != this._index_wcjtn_)
        {
            this._view_wcjtn_.on_wcjtn_Box_wcjtn_Click(this._index_wcjtn_);
        }
    }

}