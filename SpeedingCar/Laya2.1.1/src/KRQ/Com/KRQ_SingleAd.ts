import KRQ__wcjtn_Com_wcjtn_Base from "./KRQ_ComBase";
import _wcjtn_ShareAd_wcjtn_ from "../../ShareAd/ShareAd";

export default class KRQ_wcjtn__Single_wcjtn_Ad extends KRQ__wcjtn_Com_wcjtn_Base
{
    protected static readonly _repeatCheckList : Array<string> = new Array<string>();

    protected _wcjtn__display_wcjtn_ : Laya.Sprite;
    protected _wcjtn__text_wcjtn_ : Laya.Text;

    protected _wcjtn__originW_wcjtn_ : number = 300;
    protected _wcjtn__originH_wcjtn_ : number = 300;

    onAwake()
    {
        this.Ad_wcjtn_Pos_wcjtn_ID = _wcjtn_ShareAd_wcjtn_.LoopAd_wcjtn_LocationID;

        this._wcjtn__display_wcjtn_ = this._wcjtn_Sprite_wcjtn_.getChildByName("Display") as Laya.Sprite;
        this._wcjtn__text_wcjtn_ = this._wcjtn_Sprite_wcjtn_.getChildByName("Text") as Laya.Text;
        this._wcjtn__text_wcjtn_.overflow = Laya.Text.SCROLL;
        this._wcjtn__text_wcjtn_.text = "";
    }

    onEnable()
    {
        this._wcjtn_Sprite_wcjtn_.on(Laya.Event.CLICK,this,this.on_wcjtn_Click_wcjtn_Ad)
    }

    onDisable()
    {
        this._wcjtn_Sprite_wcjtn_.off(Laya.Event.CLICK,this,this.on_wcjtn_Click_wcjtn_Ad)
    }

    onStart()
    {
        this.auto_wcjtn_Scroll_wcjtn_Text(this._wcjtn__text_wcjtn_);
        this.ref_wcjtn_resh();
    }


    public ref_wcjtn_resh(onComplate? : Function)
    {
        let self = this;
        _wcjtn_ShareAd_wcjtn_.get_wcjtn_ADVs(this.Ad_wcjtn_Pos_wcjtn_ID,(datas)=>
        {
            if(null != datas)
            {
                self._datas = datas;
                if(self._wcjtn_Sprite_wcjtn_ && !self._wcjtn_Sprite_wcjtn_.destroyed)
                {
                    for(let i=0;i < self._datas.length;++i)
                    {
                        let find = false;
                        let data = self._datas[i];
                        for(let j=0;j < KRQ_wcjtn__Single_wcjtn_Ad._repeatCheckList.length;++j)
                        {
                            let appid = KRQ_wcjtn__Single_wcjtn_Ad._repeatCheckList[j];
                            if(appid == data.appid)
                            {
                                find = true;
                                break;
                            }
                        }
                        if(!find)
                        {
                            self.clear_wcjtn_Repeat();
                            self._data = data;
                            break;
                        }
                    }

                    if(null == self._data)
                    {
                        self._data = self._datas[Math.floor(Math.random() * datas.length)];
                    }
        
                    if(null != self._data)
                    {
                        self._wcjtn__display_wcjtn_.loadImage(self._data.logo,Laya.Handler.create(self,function()
                        {
                            if(null != self._wcjtn_Sprite_wcjtn_ && !self._wcjtn_Sprite_wcjtn_.destroy)
                            {
                                self._wcjtn_Sprite_wcjtn_.visible = true;
                                if(onComplate)
                                {
                                    onComplate();
                                }
                            }
                        }));
                        var str = self._data.title;
                        self._wcjtn__text_wcjtn_.text = str;

                        let isHas = false;
                        for(let j=0;j < KRQ_wcjtn__Single_wcjtn_Ad._repeatCheckList.length;++j)
                        {
                            let appid = KRQ_wcjtn__Single_wcjtn_Ad._repeatCheckList[j];
                            if(appid == self._data.appid)
                            {
                                isHas = true;
                                break;
                            }
                        }
                        if(!isHas)
                        {
                            KRQ_wcjtn__Single_wcjtn_Ad._repeatCheckList.push(self._data.appid);
                        }
                    }
                    else
                    {
                        if(null != self._wcjtn_Sprite_wcjtn_ && !self._wcjtn_Sprite_wcjtn_.destroy)
                        {
                            self._wcjtn_Sprite_wcjtn_.visible = false;
                        }
                        if(onComplate)
                        {
                            onComplate();
                        }
                    }
                }
            }
            else
            {
                self._wcjtn_Sprite_wcjtn_.visible = false;

                if(onComplate)
                {
                    onComplate();
                }
            }
        })
    }

    public _wcjtn_hide_wcjtn_()
    {
        this._wcjtn_Sprite_wcjtn_.visible = false;
        this.clear_wcjtn_Repeat();
    }

    protected clear_wcjtn_Repeat()
    {
        if(null != this._data)
        {
            for (let i = 0; i < KRQ_wcjtn__Single_wcjtn_Ad._repeatCheckList.length; ++i)
            {
                let appid = KRQ_wcjtn__Single_wcjtn_Ad._repeatCheckList[i];
                if(appid == this._data.appid)
                {
                    KRQ_wcjtn__Single_wcjtn_Ad._repeatCheckList.splice(i,1);
                    break;
                }
            }
        }
    }

    protected on_wcjtn_Click_wcjtn_Ad()
    {
        this.navigate_wcjtn_To_wcjtn_Mini_wcjtn_Program();
        this.ref_wcjtn_resh();
    }

    onDestroy()
    {
        this.clear_wcjtn_Repeat();
    }
}