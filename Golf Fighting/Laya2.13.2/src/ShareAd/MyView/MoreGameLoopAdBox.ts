import WXAPI from "../../WXAPI";
import Share_sdlyg_Ad from "../ShareAd";
import ALD from "../../ALD";
import Event_sdlyg_Mgr from "../../Event/EventMgr";
import { Event_sdlyg_Def } from "../../Event/EventDef";
import OPPOAPI from "../../OPPOAPI";
import QQMiniGameAPI from "../../QQMiniGameAPI";
import LoopAdBox from "../View/LoopAdBox";

export default class MoreGameLoopAdBox extends LoopAdBox 
{   
    private star:Laya.Sprite;

    constructor() { super(); }

    onAwake(){
        super.onAwake();
        this.star = this.owner.getChildByName("star") as Laya.Sprite;
        this.star.visible = Math.random()>0.8;

                //创建遮罩对象
        let mask = new Laya.Sprite();
        //画一个圆形的遮罩区域
        mask.graphics.drawCircle(8,8,60,"#ff0000");
        mask.pos(this._displaySp.width/2,this._displaySp.height/2)
        //实现img显示对象的遮罩效果

        this._displaySp.mask = mask;
    }

    onEnable(): void 
    {
        this.owner.on(Laya.Event.CLICK,this,this.onSpClick);
    }

    setData(data)
    {
        if(data)
        {
            var self = this;
            this._displaySp.loadImage(data.logo,Laya.Handler.create(this,function()
            {
                if(!self._displaySp.destroyed)
                {
                    self._displaySp.width = self._originW;
                    self._displaySp.height = self._originH;
                }
            }));
            var str = String(data.title);
            var num = str.length;
            this._disText.fontSize = this._fontSize;
            this._disText.text = str;
            this._data = data;
        }
    }

    onDisable(): void 
    {
        this.owner.off(Laya.Event.CLICK,this,this.onSpClick);
    }
}