import KRQ_ComBase from "./KRQ_ComBase";
import Shar_XYXZS_eAd from "../../ShareAd/ShareAd";

export default class KRQ_Si_XYXZS_ngleAd extends KRQ_ComBase
{
    protected static readonly _repeatC_XYXZS_heckList : Array<string> = new Array<string>();

    protected _dis_XYXZS_play : Laya.Sprite;
    protected _t_XYXZS_ext : Laya.Text;

    protected _or_XYXZS_iginW : number = 300;
    protected _ori_XYXZS_ginH : number = 300;

    onAwake()
    {
        this.AdP_XYXZS_osID = Shar_XYXZS_eAd.LoopA_XYXZS_dLocationID;

        this._dis_XYXZS_play = this.Sp_XYXZS_rite.getChildByName("Display") as Laya.Sprite;
        this._t_XYXZS_ext = this.Sp_XYXZS_rite.getChildByName("Text") as Laya.Text;
        this._t_XYXZS_ext.overflow = Laya.Text.SCROLL;
        this._t_XYXZS_ext.text = "";
    }

    onEnable()
    {
        this.Sp_XYXZS_rite.on(Laya.Event.CLICK,this,this.onCli_XYXZS_ckAd)
    }

    onDisable()
    {
        this.Sp_XYXZS_rite.off(Laya.Event.CLICK,this,this.onCli_XYXZS_ckAd)
    }

    onStart()
    {
        this.autoScr_XYXZS_ollText(this._t_XYXZS_ext);
        this.re_XYXZS_fresh();
    }


    public re_XYXZS_fresh(onComplate? : Function)
    {
        let self = this;
        Shar_XYXZS_eAd.ge_XYXZS_tADVs(this.AdP_XYXZS_osID,(datas)=>
        {
            if(null != datas)
            {
                self._d_XYXZS_ata = null;
                self._da_XYXZS_tas = datas;
                if(self.Sp_XYXZS_rite && !self.Sp_XYXZS_rite.destroyed)
                {
                    for(let i=0;i < self._da_XYXZS_tas.length;++i)
                    {
                        let find = false;
                        let data = self._da_XYXZS_tas[i];
                        for(let j=0;j < KRQ_Si_XYXZS_ngleAd._repeatC_XYXZS_heckList.length;++j)
                        {
                            let appid = KRQ_Si_XYXZS_ngleAd._repeatC_XYXZS_heckList[j];
                            if(appid == data.appid)
                            {
                                find = true;
                                break;
                            }
                        }
                        if(!find)
                        {
                            self.clea_XYXZS_rRepeat();
                            self._d_XYXZS_ata = data;
                            break;
                        }
                    }

                    if(null == self._d_XYXZS_ata)
                    {
                        self._d_XYXZS_ata = self._d_XYXZS_ata[Math.floor(Math.random() * datas.length)];
                    }
        
                    if(null != self._d_XYXZS_ata)
                    {
                        self._dis_XYXZS_play.loadImage(self._d_XYXZS_ata.logo,Laya.Handler.create(self,function()
                        {
                            if(!self._dis_XYXZS_play.destroyed)
                            {
                                self.Sp_XYXZS_rite.visible = true;
                                if(onComplate)
                                {
                                    onComplate();
                                }
                            }
                        }));
                        var str = self._d_XYXZS_ata.title;
                        self._t_XYXZS_ext.text = str;

                        let isHas = false;
                        for(let j=0;j < KRQ_Si_XYXZS_ngleAd._repeatC_XYXZS_heckList.length;++j)
                        {
                            let appid = KRQ_Si_XYXZS_ngleAd._repeatC_XYXZS_heckList[j];
                            if(appid == self._d_XYXZS_ata.appid)
                            {
                                isHas = true;
                                break;
                            }
                        }
                        if(!isHas)
                        {
                            KRQ_Si_XYXZS_ngleAd._repeatC_XYXZS_heckList.push(self._d_XYXZS_ata.appid);
                        }
                    }
                    else
                    {
                        self.Sp_XYXZS_rite.visible = false;
                        
                        if(onComplate)
                        {
                            onComplate();
                        }
                    }
                }
            }
            else
            {
                self.Sp_XYXZS_rite.visible = false;

                if(onComplate)
                {
                    onComplate();
                }
            }
        })
    }

    public hide()
    {
        this.Sp_XYXZS_rite.visible = false;
        this.clea_XYXZS_rRepeat();
    }

    protected clea_XYXZS_rRepeat()
    {
        if(null != this._d_XYXZS_ata)
        {
            for (let i = 0; i < KRQ_Si_XYXZS_ngleAd._repeatC_XYXZS_heckList.length; ++i)
            {
                let appid = KRQ_Si_XYXZS_ngleAd._repeatC_XYXZS_heckList[i];
                if(appid == this._d_XYXZS_ata.appid)
                {
                    KRQ_Si_XYXZS_ngleAd._repeatC_XYXZS_heckList.splice(i,1);
                    break;
                }
            }
        }
    }

    protected onCli_XYXZS_ckAd()
    {
        this.navigateT_XYXZS_oMiniProgram();
        this.re_XYXZS_fresh();
    }

    onDestroy()
    {
        this.clea_XYXZS_rRepeat();
    }
}