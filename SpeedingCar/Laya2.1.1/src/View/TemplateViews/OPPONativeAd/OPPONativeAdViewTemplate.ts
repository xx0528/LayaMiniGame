import View_wcjtn_Base from "../../ViewBase";
import App_wcjtn_Switch_wcjtn_Config from "../../../Config/AppSwitchConfig";
import OPPO_wcjtn_API from "../../../OPPOAPI";
import Wu_wcjtn_dian_wcjtn_Mgr from "../../../Mgr/WudianMgr";

export default class OPPO_wcjtn_NativeAd_wcjtn_ViewTemplate extends View_wcjtn_Base 
{

    protected _center_wcjtn_Zone : Laya.Sprite;
    protected _dis_wcjtn_play : Laya.Sprite;
    protected _ok_wcjtn_Btn : Laya.Sprite;
    protected _close_wcjtn_Btn : Laya.Sprite;

    protected _native_wcjtn_Ad : any = null;
    protected _cur_wcjtn_AdItem : any = null;

    protected _bg_wcjtn_:Laya.Sprite;

    onAwake()
    {
        this._center_wcjtn_Zone = this.owner.getChildByName("CenterZone") as Laya.Sprite;
        this._dis_wcjtn_play = this._center_wcjtn_Zone.getChildByName("Display") as Laya.Sprite;
        this._ok_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("OkBtn") as Laya.Sprite;
        this._close_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("CloseBtn") as Laya.Sprite;
        this._bg_wcjtn_ = this.owner.getChildByName("BG") as Laya.Sprite;
    }

    onEnable()
    {
        super.onEnable();
        this.load_wcjtn_Ad();
        this._bg_wcjtn_.height = Laya.stage.height;
        this._close_wcjtn_Btn.visible = false;
        Laya.timer.once(App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().oppo_wcjtn_cfg.btn_wcjtn_Show_wcjtn_Timer,this,()=>{
            this._close_wcjtn_Btn.visible = true;
        })
    }

    add_wcjtn_Event()
    {
        super.add_wcjtn_Event();
        this._ok_wcjtn_Btn.on(Laya.Event.CLICK,this,this.on_wcjtn_Ok_wcjtn_Btn);
        this._close_wcjtn_Btn.on(Laya.Event.CLICK,this,this.on_wcjtn_Close_wcjtn_Btn);
        this._dis_wcjtn_play.on(Laya.Event.CLICK,this,this.on_wcjtn_Display_wcjtn_Click);
        
    }

    remove_wcjtn_Event()
    {
        super.remove_wcjtn_Event();
        this._ok_wcjtn_Btn.off(Laya.Event.CLICK,this,this.on_wcjtn_Ok_wcjtn_Btn);
        this._close_wcjtn_Btn.off(Laya.Event.CLICK,this,this.on_wcjtn_Close_wcjtn_Btn);
        this._dis_wcjtn_play.off(Laya.Event.CLICK,this,this.on_wcjtn_Display_wcjtn_Click);
    }

    protected load_wcjtn_Ad()
    {
        var self = this;
        let ipBlocked = Wu_wcjtn_dian_wcjtn_Mgr.Get_wcjtn_Ip_wcjtn_Blocked();
        if(!ipBlocked)
        {
            self.close_wcjtn_View();
            return;
        }
        if(Laya.Browser.onQGMiniGame)
        {
            if(this._native_wcjtn_Ad)
            {
                this._native_wcjtn_Ad.destroy();
                this._native_wcjtn_Ad = null;
            }
            this._cur_wcjtn_AdItem = null;
            
            this._native_wcjtn_Ad = qg.createNativeAd({ 
                posId: OPPO_wcjtn_API.Native_wcjtn_AdId 
            })
            this._native_wcjtn_Ad.load();
            this._native_wcjtn_Ad.onLoad((res)=>
            {
                console.log("原生广告加载成功：",res);
                var adlist = res.adList;
                for (var i = 0; i < adlist.length; ++i)  
                {
                    var ad = adlist[i];
                    console.log("原生广告数据：",i);
                    for(var key in ad)
                    {
                        console.log(key,ad[key]);
                    }
                }
                self._cur_wcjtn_AdItem = adlist[Math.floor(Math.random() * adlist.length)];
                if(null != self._cur_wcjtn_AdItem)
                {
                    for (var i = 0; i < self._cur_wcjtn_AdItem.imgUrlList.length; ++i)
                    {
                        console.log("imgUrlList : ",i + " ",self._cur_wcjtn_AdItem.imgUrlList[i])
                    }
                    var imgulr = self._cur_wcjtn_AdItem.imgUrlList[Math.floor(Math.random() * self._cur_wcjtn_AdItem.imgUrlList.length)];
                    self._dis_wcjtn_play.loadImage(imgulr);
                    self._native_wcjtn_Ad.reportAdShow({
                        adId: self._cur_wcjtn_AdItem.adId
                    })
                    console.log("加载图片",imgulr);
                    console.log("点击上报！！！")
                }
                self._center_wcjtn_Zone.visible = true;
            })
            this._native_wcjtn_Ad.onError((res)=>
            {
                console.log("原生广告加载失败：",res);
                for(var key in res)
                {
                    console.log(key,res[key]);
                }
                self.close_wcjtn_View();
            })

            this._center_wcjtn_Zone.visible = false;
        }
    }

    protected on_wcjtn_Close_wcjtn_Btn()
    {
        this.close_wcjtn_View();
    }

    protected on_wcjtn_Ok_wcjtn_Btn()
    {
        if (Math.random() * 100 <= App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().oppo_wcjtn_cfg.yuan_wcjtn_sheng) {
            console.log("进入变态广告");
            this.on_wcjtn_Display_wcjtn_Click();
        }   
        this.close_wcjtn_View();
    }

    protected on_wcjtn_Display_wcjtn_Click()
    {
        if(null != this._native_wcjtn_Ad && null != this._cur_wcjtn_AdItem)
        {
            console.log("点击上报！！！")
            this._native_wcjtn_Ad.reportAdClick({
                adId: this._cur_wcjtn_AdItem.adId
            })
        }
    }

    onDestroy()
    {
        super.onDestroy();
        if(Laya.Browser.onQGMiniGame)
        {
            if(this._native_wcjtn_Ad)
            {
                this._native_wcjtn_Ad.destroy();
            }
            this._native_wcjtn_Ad = null;
            this._cur_wcjtn_AdItem = null;
        }
    }
}