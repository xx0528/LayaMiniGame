import ryw_KRQ_Banner from "../../KRQ/Com/KRQ_Banner";
import ryw_WXAPI from "../../WXAPI";
import ryw_EventMgr from "../../Event/EventMgr";
import { ryw_EventDef } from "../../Event/EventDef";

export default class GameViewBanner extends ryw_KRQ_Banner{

    public onGetWXBanner(){
        return  this.ryw__wxBanner;
    }

    protected refreshWXBanner()
    {
        if(!Laya.Browser.onMiniGame|| null == this.ryw_Sprite || !this.ryw_Sprite.visible)
            return;
        this.ryw_clearWXBaner();
        let self = this;
        let sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
        let sw = sysInfo.screenWidth;
        let sh = sysInfo.screenHeight;
        let pos = this.ryw_Sprite.localToGlobal(new Laya.Point(0,0))
        let width = 300;
        let scale = self.ryw_Sprite.width / Laya.stage.width;
        let realWidth = sw * scale;
        let offset = (realWidth - width) / 2;
        let left = pos.x / Laya.stage.width * sw + offset;
        let top = pos.y / Laya.stage.height * sh;

        this.ryw__wxBanner = Laya.Browser.window["wx"].createBannerAd(
            {
                adUnitId : ryw_WXAPI.ryw_bannerAdUnitId,
                adIntervals : 30,
                style : 
                {
                    left:left,
                    top:top,
                    width: width,
                }
            })
            self.ryw__wxBanner.onLoad((res) =>  {
            console.log("KRQ  WXBanner广告 加载完成 : ", ryw_WXAPI.ryw_bannerAdUnitId);
            console.log(res);
        })
        if(null != this.ryw__wxBanner)
        {
            this.ryw__wxBanner.onError((err) =>  {
                console.log("KRQ WXBanner广告 加载失败 : ", ryw_WXAPI.ryw_bannerAdUnitId);
                console.log(err);
                self.ryw_refreshBanner();
                self.ryw_clearWXBaner();
            })
            this.ryw__wxBanner.onResize(res => {
    
              })
            this.ryw__wxBanner.show();
        }
        else
        {
            this.ryw_refreshBanner();
        }
    }
}