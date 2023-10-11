import Shar_XYXZS_eAd from "../ShareAd";
import Uti_XYXZS_lit from "../../Utilit";
import W_XYXZS_XAPI from "../../WXAPI";
import A_XYXZS_LD from "../../ALD";
import Even_XYXZS_tMgr from "../../Event/EventMgr";
import { Even_XYXZS_tDef } from "../../Event/EventDef";
import OPP_XYXZS_OAPI from "../../OPPOAPI";
import QQMini_XYXZS_GameAPI from "../../QQMiniGameAPI";

export default class Sing_XYXZS_leAdView extends Laya.Script 
{
    public AdP_XYXZS_osID : number = Shar_XYXZS_eAd.LoopA_XYXZS_dLocationID;
    protected _owne_XYXZS_rSprite :Laya.Sprite;
    protected _disp_XYXZS_laySp : Laya.Sprite;
    protected _dis_XYXZS_Text : Laya.Text;
    protected _ani_XYXZS_Forward : boolean = false;
    protected _d_XYXZS_ata : any = null;
    protected _fon_XYXZS_tSize = 25;
    protected _ori_XYXZS_ginSize = 1;
    protected _ori_XYXZS_ginW : number = 150;
    protected _ori_XYXZS_ginH : number = 150;

    onAwake()
    {
        this._owne_XYXZS_rSprite = this.owner as Laya.Sprite;
        this._disp_XYXZS_laySp = this.owner.getChildByName("Display") as Laya.Sprite;
        this._ori_XYXZS_ginW = this._disp_XYXZS_laySp.width;
        this._ori_XYXZS_ginH = this._disp_XYXZS_laySp.height;
        this._dis_XYXZS_Text =  this.owner.getChildByName("TitelText") as Laya.Text;
        this._dis_XYXZS_Text.text = "";
        this._fon_XYXZS_tSize = this._dis_XYXZS_Text.fontSize;
        this._ori_XYXZS_ginSize =  this._disp_XYXZS_laySp.scaleX;
    }
    
    onEnable(): void 
    {
        this.refre_XYXZS_shADVDis();
        Laya.timer.loop(3000,this,this.refre_XYXZS_shADVDis);

        this._owne_XYXZS_rSprite.on(Laya.Event.CLICK,this,this.onS_XYXZS_pClick);
    }

    onDisable(): void 
    {
        Laya.timer.clearAll(this);
        this._owne_XYXZS_rSprite.off(Laya.Event.CLICK,this,this.onS_XYXZS_pClick);
    }

    protected refre_XYXZS_shADVDis()
    {
        var self = this;
        Shar_XYXZS_eAd.ge_XYXZS_tADVs(this.AdP_XYXZS_osID,(datas)=>
        {
            if(self.owner && !self.owner.destroyed)
            {
                if(datas && datas.length > 0)
                {
                    (self.owner as Laya.Sprite).visible = true;
                    var data = datas[Math.floor(Math.random() * datas.length)];
    
                    self._disp_XYXZS_laySp.loadImage(data.logo,Laya.Handler.create(self,function()
                    {
                        if(!self._disp_XYXZS_laySp.destroyed)
                        {
                            self._disp_XYXZS_laySp.width = self._ori_XYXZS_ginW;
                            self._disp_XYXZS_laySp.height = self._ori_XYXZS_ginH;
                            self._disp_XYXZS_laySp.scale(self._ori_XYXZS_ginSize,self._ori_XYXZS_ginSize);
                        }
                    }));
                    var str = String(data.title);
                    var num = str.length;
                    var fontSize = Math.floor((5 / num) * this._fon_XYXZS_tSize);
                    self._dis_XYXZS_Text.fontSize = fontSize;
                    self._dis_XYXZS_Text.text = str;
                    self._d_XYXZS_ata = data;
                }
                else
                {
                    (this.owner as Laya.Sprite).visible = false;
                }
            }
        })
    }

    onUpdate()
    {
        this.disp_XYXZS_layAni();
    }

    protected disp_XYXZS_layAni()
    {
        if(!this._ani_XYXZS_Forward)
        {
            var scale = this._disp_XYXZS_laySp.scaleX - Laya.timer.delta / 3000  * 1;
            scale = Math.max(scale,0);
            this._disp_XYXZS_laySp.scale(scale,scale);
            if(this._disp_XYXZS_laySp.scaleX <= 0.95 * this._ori_XYXZS_ginSize)
            {
                this._ani_XYXZS_Forward = true;
            }
        }
        else
        {
            var scale = this._disp_XYXZS_laySp.scaleX + Laya.timer.delta / 3000  * 1;
            scale = Math.min(scale,1 * this._ori_XYXZS_ginSize);
            this._disp_XYXZS_laySp.scale(scale,scale);
            if(this._disp_XYXZS_laySp.scaleX >= this._ori_XYXZS_ginSize)
            {
                this._ani_XYXZS_Forward = false;
            }
        }
    }

    protected onS_XYXZS_pClick()
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