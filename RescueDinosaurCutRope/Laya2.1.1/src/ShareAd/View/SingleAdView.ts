import Shar_JJKLBB_eAd from "../ShareAd";
import Util_JJKLBB_it from "../../Utilit";
import WXAPI from "../../WXAPI";
import A_JJKLBB_LD from "../../ALD";
import Even_JJKLBB_tMgr from "../../Event/EventMgr";
import { Event_JJKLBB_Def } from "../../Event/EventDef";
import OPPO_JJKLBB_API from "../../OPPOAPI";
import QQMini_JJKLBB_GameAPI from "../../QQMiniGameAPI";

export default class SingleA_JJKLBB_dView extends Laya.Script 
{
    public AdPo_JJKLBB_sID : number = Shar_JJKLBB_eAd.LoopAd_JJKLBB_LocationID;
    protected _owner_JJKLBB_Sprite :Laya.Sprite;
    protected _displ_JJKLBB_aySp : Laya.Sprite;
    protected _disTe_JJKLBB_xt : Laya.Text;
    protected _aniFo_JJKLBB_rward : boolean = false;
    protected _da_JJKLBB_ta : any = null;
    protected _fon_JJKLBB_tSize = 25;
    protected _orig_JJKLBB_inSize = 1;
    protected _orig_JJKLBB_inW : number = 150;
    protected _origi_JJKLBB_nH : number = 150;

    onAwake()
    {
        this._owner_JJKLBB_Sprite = this.owner as Laya.Sprite;
        this._displ_JJKLBB_aySp = this.owner.getChildByName("Display") as Laya.Sprite;
        this._orig_JJKLBB_inW = this._displ_JJKLBB_aySp.width;
        this._origi_JJKLBB_nH = this._displ_JJKLBB_aySp.height;
        this._disTe_JJKLBB_xt =  this.owner.getChildByName("TitelText") as Laya.Text;
        this._disTe_JJKLBB_xt.text = "";
        this._fon_JJKLBB_tSize = this._disTe_JJKLBB_xt.fontSize;
        this._orig_JJKLBB_inSize =  this._displ_JJKLBB_aySp.scaleX;
    }
    
    onEnable(): void 
    {
        this.refreshA_JJKLBB_DVDis();
        Laya.timer.loop(3000,this,this.refreshA_JJKLBB_DVDis);

        this._owner_JJKLBB_Sprite.on(Laya.Event.CLICK,this,this.onSpC_JJKLBB_lick);
    }

    onDisable(): void 
    {
        Laya.timer.clearAll(this);
        this._owner_JJKLBB_Sprite.off(Laya.Event.CLICK,this,this.onSpC_JJKLBB_lick);
    }

    protected refreshA_JJKLBB_DVDis()
    {
        var self = this;
        Shar_JJKLBB_eAd.get_JJKLBB_ADVs(this.AdPo_JJKLBB_sID,(datas)=>
        {
            if(self.owner && !self.owner.destroyed)
            {
                if(datas && datas.length > 0)
                {
                    (self.owner as Laya.Sprite).visible = true;
                    var data = datas[Math.floor(Math.random() * datas.length)];
    
                    self._displ_JJKLBB_aySp.loadImage(data.logo,Laya.Handler.create(self,function()
                    {
                        if(!self._displ_JJKLBB_aySp.destroyed)
                        {
                            self._displ_JJKLBB_aySp.width = self._orig_JJKLBB_inW;
                            self._displ_JJKLBB_aySp.height = self._origi_JJKLBB_nH;
                            self._displ_JJKLBB_aySp.scale(self._orig_JJKLBB_inSize,self._orig_JJKLBB_inSize);
                        }
                    }));
                    var str = String(data.title);
                    var num = str.length;
                    var fontSize = Math.floor((5 / num) * this._fon_JJKLBB_tSize);
                    // self._disText.fontSize = fontSize;
                    self._disTe_JJKLBB_xt.text = str;
                    self._da_JJKLBB_ta = data;
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
        this.displa_JJKLBB_yAni();
    }

    protected displa_JJKLBB_yAni()
    {
        if(!this._aniFo_JJKLBB_rward)
        {
            var scale = this._displ_JJKLBB_aySp.scaleX - Laya.timer.delta / 3000  * 1;
            scale = Math.max(scale,0);
            this._displ_JJKLBB_aySp.scale(scale,scale);
            if(this._displ_JJKLBB_aySp.scaleX <= 0.95 * this._orig_JJKLBB_inSize)
            {
                this._aniFo_JJKLBB_rward = true;
            }
        }
        else
        {
            var scale = this._displ_JJKLBB_aySp.scaleX + Laya.timer.delta / 3000  * 1;
            scale = Math.min(scale,1 * this._orig_JJKLBB_inSize);
            this._displ_JJKLBB_aySp.scale(scale,scale);
            if(this._displ_JJKLBB_aySp.scaleX >= this._orig_JJKLBB_inSize)
            {
                this._aniFo_JJKLBB_rward = false;
            }
        }
    }

    protected onSpC_JJKLBB_lick()
    {
        var data = this._da_JJKLBB_ta;
        if(data)
        {
            console.log("跳转游戏： " + data.title);
            if(Laya.Browser.onMiniGame)
            {
                WXAPI.navigateToMiniProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Shar_JJKLBB_eAd.reportUs_JJKLBB_erClick(data.appid);
                    A_JJKLBB_LD.aldSendReportA_JJKLBB_dClickSuccess(data);
                },(res)=>
                {
                    console.log("跳转失败")
                    Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.AD_OnShare_JJKLBB_AdFail);
                    if(res.errMsg == "navigateToMiniProgram:fail cancel")
                    {
                        console.log("用户取消跳转");
                        Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.AD_OnShareAdFail_UseCancel);
                        A_JJKLBB_LD.aldSendRepo_JJKLBB_rtAdClickFail(data);
                    }
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQGMiniGame)
            {
                OPPO_JJKLBB_API.navigat_JJKLBB_eToMiniPr_JJKLBB_ogram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Shar_JJKLBB_eAd.reportUs_JJKLBB_erClick(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.AD_OnShare_JJKLBB_AdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQQMiniGame) //qq小游戏
            {
                QQMini_JJKLBB_GameAPI.navig_JJKLBB_ateToMiniP_JJKLBB_rogram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Shar_JJKLBB_eAd.reportUs_JJKLBB_erClick(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.AD_OnShare_JJKLBB_AdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
        }
    }
}