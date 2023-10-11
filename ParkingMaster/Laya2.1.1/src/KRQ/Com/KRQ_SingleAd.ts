import KRQ_ComBase from "./KRQ_ComBase";
import ShareAd from "../../ShareAd/ShareAd";

export default class KRQ_SingleAd extends KRQ_ComBase
{
    protected static readonly _repeatCheckList : Array<string> = new Array<string>();

    protected _display : Laya.Sprite;
    protected _text : Laya.Text;

    protected _originW : number = 300;
    protected _originH : number = 300;

    onAwake()
    {
        this.AdPosID = ShareAd.LoopAdLocationID;

        this._display = this.Sprite.getChildByName("Display") as Laya.Sprite;
        this._text = this.Sprite.getChildByName("Text") as Laya.Text;
        this._text.overflow = Laya.Text.SCROLL;
        this._text.text = "";
    }

    onEnable()
    {
        this.Sprite.on(Laya.Event.CLICK,this,this.onClickAd)
    }

    onDisable()
    {
        this.Sprite.off(Laya.Event.CLICK,this,this.onClickAd)
    }

    onStart()
    {
        this.autoScrollText(this._text);
        this.refresh();
    }


    public refresh(onComplate? : Function)
    {
        let self = this;
        ShareAd.getADVs(this.AdPosID,(datas)=>
        {
            if(null != datas)
            {
                self._datas = datas;
                if(self.Sprite && !self.Sprite.destroyed)
                {
                    for(let i=0;i < self._datas.length;++i)
                    {
                        let find = false;
                        let data = self._datas[i];
                        for(let j=0;j < KRQ_SingleAd._repeatCheckList.length;++j)
                        {
                            let appid = KRQ_SingleAd._repeatCheckList[j];
                            if(appid == data.appid)
                            {
                                find = true;
                                break;
                            }
                        }
                        if(!find)
                        {
                            self.clearRepeat();
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
                        self._display.loadImage(self._data.logo,Laya.Handler.create(self,function()
                        {
                            if(null != self.Sprite && !self.Sprite.destroy)
                            {
                                self.Sprite.visible = true;
                                if(onComplate)
                                {
                                    onComplate();
                                }
                            }
                        }));
                        var str = self._data.title;
                        self._text.text = str;

                        let isHas = false;
                        for(let j=0;j < KRQ_SingleAd._repeatCheckList.length;++j)
                        {
                            let appid = KRQ_SingleAd._repeatCheckList[j];
                            if(appid == self._data.appid)
                            {
                                isHas = true;
                                break;
                            }
                        }
                        if(!isHas)
                        {
                            KRQ_SingleAd._repeatCheckList.push(self._data.appid);
                        }
                    }
                    else
                    {
                        if(null != self.Sprite && !self.Sprite.destroy)
                        {
                            self.Sprite.visible = false;
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
                self.Sprite.visible = false;

                if(onComplate)
                {
                    onComplate();
                }
            }
        })
    }

    public hide()
    {
        this.Sprite.visible = false;
        this.clearRepeat();
    }

    protected clearRepeat()
    {
        if(null != this._data)
        {
            for (let i = 0; i < KRQ_SingleAd._repeatCheckList.length; ++i)
            {
                let appid = KRQ_SingleAd._repeatCheckList[i];
                if(appid == this._data.appid)
                {
                    KRQ_SingleAd._repeatCheckList.splice(i,1);
                    break;
                }
            }
        }
    }

    protected onClickAd()
    {
        this.navigateToMiniProgram();
        this.refresh();
    }

    onDestroy()
    {
        this.clearRepeat();
    }
}