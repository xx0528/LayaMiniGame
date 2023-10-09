import { StoreData } from "../../../Config/StoreConfig";
import User_ZMDGJ_ from "../../../User/User";
import TT_ZMDGJ_Store from "./TTStore";

export default class Store_ZMDGJ_Box extends Laya.Script 
{
    protected _root_ZMDGJ_ : Laya.Clip = null;
    protected _unlocked_ZMDGJ_Tag : Laya.Sprite = null;
    protected _used_ZMDGJ_Tag : Laya.Sprite = null;

    protected _index_ZMDGJ_ : number = -1;
    protected _view_ZMDGJ_ : TT_ZMDGJ_Store = null;
    

    onAwake()
    {
        super.onAwake();
        this._root_ZMDGJ_ = this.owner.getChildByName("Root") as Laya.Clip;
        this._unlocked_ZMDGJ_Tag = this._root_ZMDGJ_.getChildByName("Unlock") as Laya.Sprite;
        this._used_ZMDGJ_Tag = this._root_ZMDGJ_.getChildByName("Used") as Laya.Sprite;

    }

    onEnable()
    {
        super.onEnable();
        (this.owner as Laya.Box).on(Laya.Event.CLICK,this,this.on_ZMDGJ_Box_ZMDGJ_Click);
    }

    onDisable()
    {
        super.onDisable();
        (this.owner as Laya.Box).on(Laya.Event.CLICK,this,this.on_ZMDGJ_Box_ZMDGJ_Click);
    }

    public set_ZMDGJ_Data(index : number, view : TT_ZMDGJ_Store,data : StoreData,selected : boolean)
    {
        this._index_ZMDGJ_ = index;
        this._view_ZMDGJ_ = view;

        this._unlocked_ZMDGJ_Tag.visible = User_ZMDGJ_.itemIsUnlocked(data.id);
        this._used_ZMDGJ_Tag.visible = User_ZMDGJ_.curUsedItem == data.id;
        this._root_ZMDGJ_.visible = (-10086 != data.id);
    }

    protected on_ZMDGJ_Box_ZMDGJ_Click()
    {
        if(null != this._view_ZMDGJ_ && -1 != this._index_ZMDGJ_)
        {
            this._view_ZMDGJ_.on_ZMDGJ_Box_ZMDGJ_Click(this._index_ZMDGJ_);
        }
    }

}