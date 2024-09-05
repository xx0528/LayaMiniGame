import ryw_KRQ_ComBase from "./KRQ_ComBase";
import ryw_ShareAd from "../../ShareAd/ShareAd";

export default class ryw_KRQ_SingleAd extends ryw_KRQ_ComBase
{
    protected static readonly ryw__repeatCheckList : Array<string> = new Array<string>();

    protected ryw__display : Laya.Sprite;
    protected ryw__text : Laya.Text;

    protected ryw__originW : number = 300;
    protected ryw__originH : number = 300;

    onAwake()
    {
        this.ryw_AdPosID = ryw_ShareAd.ryw_LoopAdLocationID;

        this.ryw__display = this.ryw_Sprite.getChildByName("Display") as Laya.Sprite;
        this.ryw__text = this.ryw_Sprite.getChildByName("Text") as Laya.Text;
        this.ryw__text.overflow = Laya.Text.SCROLL;
        this.ryw__text.text = "";
    }

    onEnable()
    {
        this.ryw_Sprite.on(Laya.Event.CLICK,this,this.ryw_onClickAd)
    }

    onDisable()
    {
        this.ryw_Sprite.off(Laya.Event.CLICK,this,this.ryw_onClickAd)
    }

    onStart()
    {
        this.ryw_autoScrollText(this.ryw__text);
        this.ryw_refresh();
    }


    public ryw_refresh(onComplate? : Function)
    {
        let self = this;
        ryw_ShareAd.ryw_getADVs(this.ryw_AdPosID,(datas)=>
        {
            if(null != datas)
            {
                self.ryw__datas = datas;
                if(self.ryw_Sprite && !self.ryw_Sprite.destroyed)
                {
                    for(let i=0;i < self.ryw__datas.length;++i)
                    {
                        let find = false;
                        let data = self.ryw__datas[i];
                        for(let j=0;j < ryw_KRQ_SingleAd.ryw__repeatCheckList.length;++j)
                        {
                            let appid = ryw_KRQ_SingleAd.ryw__repeatCheckList[j];
                            if(appid == data.appid)
                            {
                                find = true;
                                break;
                            }
                        }
                        if(!find)
                        {
                            self.ryw_clearRepeat();
                            self.ryw__data = data;
                            break;
                        }
                    }

                    if(null == self.ryw__data)
                    {
                        self.ryw__data = self.ryw__datas[Math.floor(Math.random() * datas.length)];
                    }
        
                    if(null != self.ryw__data)
                    {
                        self.ryw__display.loadImage(self.ryw__data.logo,Laya.Handler.create(self,function()
                        {
                            if(null != self.ryw_Sprite && !self.ryw_Sprite.destroy)
                            {
                                self.ryw_Sprite.visible = true;
                                if(onComplate)
                                {
                                    onComplate();
                                }
                            }
                        }));
                        var str = self.ryw__data.title;
                        self.ryw__text.text = str;

                        let isHas = false;
                        for(let j=0;j < ryw_KRQ_SingleAd.ryw__repeatCheckList.length;++j)
                        {
                            let appid = ryw_KRQ_SingleAd.ryw__repeatCheckList[j];
                            if(appid == self.ryw__data.appid)
                            {
                                isHas = true;
                                break;
                            }
                        }
                        if(!isHas)
                        {
                            ryw_KRQ_SingleAd.ryw__repeatCheckList.push(self.ryw__data.appid);
                        }
                    }
                    else
                    {
                        if(null != self.ryw_Sprite && !self.ryw_Sprite.destroy)
                        {
                            self.ryw_Sprite.visible = false;
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
                self.ryw_Sprite.visible = false;

                if(onComplate)
                {
                    onComplate();
                }
            }
        })
    }

    public ryw_hide()
    {
        this.ryw_Sprite.visible = false;
        this.ryw_clearRepeat();
    }

    protected ryw_clearRepeat()
    {
        if(null != this.ryw__data)
        {
            for (let i = 0; i < ryw_KRQ_SingleAd.ryw__repeatCheckList.length; ++i)
            {
                let appid = ryw_KRQ_SingleAd.ryw__repeatCheckList[i];
                if(appid == this.ryw__data.appid)
                {
                    ryw_KRQ_SingleAd.ryw__repeatCheckList.splice(i,1);
                    break;
                }
            }
        }
    }

    protected ryw_onClickAd()
    {
        this.ryw_navigateToMiniProgram();
        this.ryw_refresh();
    }

    onDestroy()
    {
        this.ryw_clearRepeat();
    }
}