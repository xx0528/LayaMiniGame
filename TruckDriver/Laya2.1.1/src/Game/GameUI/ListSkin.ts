import ViewBase from "../../View/ViewBase";
import { Event_ppxhc_Def } from "../../Event/EventDef";
import Event_ppxhc_Mgr from "../../Event/EventMgr";

export default class ListSkin extends ViewBase {

    private Sprite;

    protected _displaySp : Laya.Sprite;
    protected _disText : Laya.Text;
    protected _originW : number = 170;
    protected _originH : number = 170;


    onAwake()
    {
        this._displaySp = this.owner.getChildByName("Display") as Laya.Sprite;
        this._originW = this._displaySp.width;
        this._originH = this._displaySp.height;
        this._disText = this.owner.getChildByName("TitelText") as Laya.Text;
        //this._disText.overflow = Laya.Text.SCROLL;
        //this._disText.text = "";
        this.Sprite = this.owner as Laya.Sprite;
    }

    // onStart()
    // {
    //     this.autoScrollText(this._disText);
    // }

    onEnable()
    {
        this.Sprite.on(Laya.Event.CLICK,this,this.onClickAd)
    }

    onDisable()
    {
        this.Sprite.off(Laya.Event.CLICK,this,this.onClickAd)
    }

    protected onClickAd()
    {
        if(this._data.islock == false)
        {
            Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.Car_Skin, [this._data.index,this._data.islock]);
        }
        console.log("点击皮肤",this._disText.text)

        //this.navigateToMiniProgram();
    }

    public setData(data)
    {
        this._data = data;
        console.log("获取皮肤数据",this._disText.text)
        if(null != this._data)
        {
            let self = this;
            //赋值图片
            this._displaySp.loadImage(this._data.logo,Laya.Handler.create(this,function()
            {
                if(!self._displaySp.destroyed)
                {
                    self._displaySp.width = self._originW;
                    self._displaySp.height = self._originH;
                }
            }));
            (this._displaySp.getChildByName("lock") as Laya.Sprite).visible = data.islock;
            let str = String(this._data.title);
            //赋值文本
            this._disText.text = str;
            console.log("获取皮肤数据2",this._disText.text)

        }
    }
}