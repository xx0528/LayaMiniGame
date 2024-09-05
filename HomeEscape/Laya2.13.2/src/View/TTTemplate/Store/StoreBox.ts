import { StoreData } from "../../../Config/StoreConfig";
import User from "../../../User/User";
import ryw_TTStore from "./TTStore";

export default class ryw_StoreBox extends Laya.Script 
{
    protected ryw__root : Laya.Clip = null;
    protected ryw__unlockedTag : Laya.Sprite = null;
    protected ryw__usedTag : Laya.Sprite = null;

    protected ryw__index : number = -1;
    protected ryw__view : ryw_TTStore = null;
    

    onAwake()
    {
        this.ryw__root = this.owner.getChildByName("Root") as Laya.Clip;
        this.ryw__unlockedTag = this.ryw__root.getChildByName("Unlock") as Laya.Sprite;
        this.ryw__usedTag = this.ryw__root.getChildByName("Used") as Laya.Sprite;

    }

    onEnable()
    {
        (this.owner as Laya.Box).on(Laya.Event.CLICK,this,this.ryw_onBoxClick);
    }

    onDisable()
    {
        (this.owner as Laya.Box).on(Laya.Event.CLICK,this,this.ryw_onBoxClick);
    }

    public ryw_setData(index : number, view : ryw_TTStore,data : StoreData,selected : boolean)
    {
        this.ryw__index = index;
        this.ryw__view = view;

        this.ryw__unlockedTag.visible = User.itemIsUnlocked(data.id);
        this.ryw__usedTag.visible = User.curUsedItem == data.id;
        this.ryw__root.visible = (-10086 != data.id);
    }

    protected ryw_onBoxClick()
    {
        if(null != this.ryw__view && -1 != this.ryw__index)
        {
            this.ryw__view.ryw_onBoxClick(this.ryw__index);
        }
    }

}