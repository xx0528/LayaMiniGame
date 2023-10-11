import Shar_XYXZS_eAd from "../ShareAd";
import W_XYXZS_XAPI from "../../WXAPI";
import A_XYXZS_LD from "../../ALD";
import Even_XYXZS_tMgr from "../../Event/EventMgr";
import { Even_XYXZS_tDef } from "../../Event/EventDef";
import OPP_XYXZS_OAPI from "../../OPPOAPI";
import QQMini_XYXZS_GameAPI from "../../QQMiniGameAPI";

export default class Inser_XYXZS_tAdView extends Laya.Script 
{
    public AdP_XYXZS_osID : number = Shar_XYXZS_eAd.Insert_XYXZS_AdLocationID;
    protected _dis_XYXZS_playSp : Laya.Sprite;
    protected _d_XYXZS_ata : any = null;

    onAwake()
    {
        this._dis_XYXZS_playSp = this.owner.getChildByName("Display") as Laya.Sprite;
        if(null == this._dis_XYXZS_playSp)
        {
            this._dis_XYXZS_playSp = this.owner as Laya.Sprite;
        }
    }
    
    onEnable(): void 
    {
        this.refres_XYXZS_hBannerDis();
        this._dis_XYXZS_playSp.on(Laya.Event.CLICK,this,this.onSpC_XYXZS_lick);
    }

    onDisable(): void 
    {
        this._dis_XYXZS_playSp.off(Laya.Event.CLICK,this,this.onSpC_XYXZS_lick);
    }

    protected refres_XYXZS_hBannerDis()
    {
        var self = this;
        Shar_XYXZS_eAd.ge_XYXZS_tADVs(this.AdP_XYXZS_osID,(datas)=>
        {
            if(datas && datas.length > 0)
            {
                var data = datas[Math.floor(Math.random() * datas.length)];

                self._dis_XYXZS_playSp.loadImage(data.logo,Laya.Handler.create(self,function()
                {
                    if(!self._dis_XYXZS_playSp.destroyed)
                    {
                        self._dis_XYXZS_playSp.width = 550;
                        self._dis_XYXZS_playSp.height = 670;
                        self._dis_XYXZS_playSp.scale(1,1);
                    }
                }));
                self._d_XYXZS_ata = data;
            }
        },false)
    }

    protected onSpC_XYXZS_lick()
    {
        var data = this._d_XYXZS_ata;
        if(data)
        {
            console.log("跳转游戏： " + data.title);
            if(Laya.Browser.onMiniGame)
            {
                W_XYXZS_XAPI.navigateT_XYXZS_oMiniProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Shar_XYXZS_eAd.reportUs_XYXZS_erClick(data.appid);
                    A_XYXZS_LD.aldSend_XYXZS_ReportAdClickSuccess(data);
                },(res)=>
                {
                    console.log("跳转失败")
                    Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.AD_OnShare_XYXZS_AdFail);
                    if(res.errMsg == "navigateToMiniProgram:fail cancel")
                    {
                        console.log("用户取消跳转");
                        A_XYXZS_LD.aldSend_XYXZS_ReportAdClickFail(data);
                    }
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQGMiniGame)
            {
                OPP_XYXZS_OAPI.navigat_XYXZS_eToMiniProgram(data.appid,data.title,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Shar_XYXZS_eAd.reportUs_XYXZS_erClick(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.AD_OnShare_XYXZS_AdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQQMiniGame) //qq小游戏
            {
                QQMini_XYXZS_GameAPI.navigateToMi_XYXZS_niProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Shar_XYXZS_eAd.reportUs_XYXZS_erClick(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.AD_OnShare_XYXZS_AdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
        }
    }
}