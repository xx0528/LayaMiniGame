import ryw_AppSwitchConfig from "../Config/AppSwitchConfig";
import ryw_WXAPI from "../WXAPI";

export class ryw_WXBannderAd
{
    public static readonly ryw_MAX_RETRY_COUNT : number = 3;

    constructor(bannerid : string)
    {
        this.ryw__id = bannerid;
    }

    public get ryw_Id()
    {
        return this.ryw__id;
    }
    protected ryw__id : string = null;
    protected ryw__banner : any = null;
    public get ryw_CreateTime()
    {
        return this.ryw__createTime;
    }
    protected ryw__createTime : number = 0;

    public get ryw_Destroyed()
    {
        return this.ryw__destroyed;
    }
    protected ryw__destroyed: boolean = false;

    public get ryw_isReady()
    {
        return null != this.ryw__banner;
    }
    public get ryw_isError()
    {
        return null != this.ryw__error;
    }
    public get ryw_Error()
    {
        return this.ryw__error;
    }
    protected ryw__error : any = null;

    public get ryw_Loading()
    {
        return this.ryw__loading;
    }
    protected ryw__loading : boolean = false;

    public get ryw_RetryCount()
    {
        return this.ryw__retryCount;
    }
    protected ryw__retryCount : number = 0;

    public get ryw_BannerTotalShowTime()
    {
        return this.ryw__bannerTotalShowTime;
    }
    protected ryw__bannerTotalShowTime : number = 0;
    protected ryw__lastShowTime : number = 0;

    public ryw_show() 
    {
        if(this.ryw_isReady)
        {
            this.ryw__banner.hide();
            let self = this;
            let sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
            let sw = sysInfo.screenWidth;
            let sh = sysInfo.screenHeight;
            let pos = new Laya.Point(0, 0);
            let width = 300;
            let left = sw / 2 - width / 2;
            let top = sh - 130;
            this.ryw__banner.style.left = left;
            this.ryw__banner.style.top = top;
            this.ryw__lastShowTime = Laya.timer.currTimer;
            this.ryw__banner.show();
        }
    }
    public ryw_hide() 
    {
        if(this.ryw_isReady)
        {
            this.ryw__banner.hide();
            this.ryw__bannerTotalShowTime += (Laya.timer.currTimer - this.ryw__lastShowTime);
        }
    }
    public ryw_destroy()
    {
        if(this.ryw__destroyed)
        {
            console.log("BannerAd 已经被销毁");
            return;
        }
        if(this.ryw__loading)
        {
            console.log("BannerAd 正在加载中，无法进行销毁");
            return;
        }
        if(null != this.ryw__banner)
        {
            this.ryw__banner.destroy();
        }
        this.ryw__banner = null;
        this.ryw__destroyed = true;
    }

    public ryw_retry(callBack? : Function)
    {
        if(this.ryw__destroyed)
        {
            console.log("BannerAd 已被销毁，无法重试");
            return;
        }
        if(this.ryw_isReady)
        {
            console.log("BannerAd 已创建成功，无需重试");
            return;
        }
        if(this.ryw__loading)
        {
            console.log("BannerAd 正在创建中");
            return;
        }
        if(this.ryw__retryCount >= ryw_WXBannderAd.ryw_MAX_RETRY_COUNT)
        {
            console.log("此 BannerAd 重试次数已达最大");
            return;
        }
        let self = this;
        this.ryw__create((isOk :boolean)=>
        {
            if(null != callBack)
            {
                callBack(isOk);
            }
            ++self.ryw__retryCount;
        });
    }

    protected ryw__create(callBack? : Function)
    {
        if(!Laya.Browser.onMiniGame)
        {
            if(null != callBack)
            {
                callBack(false);
            }
            return;
        }
        let banner = null;
        if(Laya.Browser.onMiniGame)
        {
            banner = Laya.Browser.window["wx"].createBannerAd(
                {
                    adUnitId : this.ryw__id,
                    adIntervals : 30,
                    style : 
                    {
                        left : 0,
                        top : 0,
                        width : 300,
                    }
                })
        }
        else if(Laya.Browser.onQQMiniGame)
        {
            banner = Laya.Browser.window["qq"].createBannerAd(
                {
                    adUnitId : this.ryw__id,
                    adIntervals : 30,
                    style : 
                    {
                        left : 0,
                        top : 0,
                        width : 300,
                    }
                })
        }
        if(null != banner)
        {
            let self = this;
            this.ryw__loading = true;
            banner.onLoad((res) =>  {
                console.log("BannderAd 加载完成",self.ryw__id,res);
                self.ryw__banner = banner;
                self.ryw__createTime = Laya.timer.currTimer;
                self.ryw__loading = false;
                if(null != callBack)
                {
                    callBack(true);
                }
            })
            banner.onError((err) =>  {
                console.log("BannderAd 加载失败",self.ryw__id,err);
                self.ryw__error = err;
                self.ryw__loading = false;
                banner.destroy();
                if(null != callBack)
                {
                    callBack(false);
                }
            })
        }
    }
}

export class ryw_WXGridAd
{
    constructor(bannerid : string)
    {
        this.ryw__id = bannerid;
    }

    protected ryw__id : string = null;
    protected ryw__gridAd : any = null;
    public get ryw_CreateTime()
    {
        return this.ryw__createTime;
    }
    protected ryw__createTime : number = 0;

    public get ryw_Destroyed()
    {
        return this.ryw__destroyed;
    }
    protected ryw__destroyed: boolean = false;

    public get ryw_isReady()
    {
        return null != this.ryw__gridAd;
    }
    public get ryw_isError()
    {
        return null != this.ryw__error;
    }
    public get ryw_Error()
    {
        return this.ryw__error;
    }
    protected ryw__error : any = null;

    public get ryw_Loading()
    {
        return this.ryw__loading;
    }
    protected ryw__loading : boolean = false;

    public ryw_show() 
    {
        if(this.ryw_isReady)
        {
            this.ryw__gridAd.show();
        }
    }
    public ryw_hide() 
    {
        if(this.ryw_isReady)
        {
            this.ryw__gridAd.hide();
        }
    }
    public ryw_destroy()
    {
        if(this.ryw__destroyed)
        {
            console.log("GridAD 已经被销毁");
            return;
        }
        if(this.ryw__loading)
        {
            console.log("GridAD 正在加载中，无法进行销毁");
            return;
        }
        if(null != this.ryw__gridAd)
        {
            this.ryw__gridAd.destroy();
        }
        this.ryw__gridAd = null;
        this.ryw__destroyed = true;
    }

    public ryw_retry(callBack? : Function)
    {
        if(this.ryw__destroyed)
        {
            console.log("GridAD 已被销毁，无法重试");
            return;
        }
        if(this.ryw_isReady)
        {
            console.log("GridAD 已创建成功，无需重试");
            return;
        }
        if(this.ryw__loading)
        {
            console.log("GridAD 正在创建中");
            return;
        }
        let self = this;
        this.ryw__create((isOk :boolean)=>
        {
            if(null != callBack)
            {
                callBack(isOk);
            }
        });
    }

    protected ryw__create(callBack? : Function)
    {
        if(!Laya.Browser.onMiniGame)
        {
            if(null != callBack)
            {
                callBack(false);
            }
            return;
        }
        let gridAd = Laya.Browser.window["wx"].createGridAd(
            {
                adUnitId : this.ryw__id,
                adIntervals : 30,
                style : 
                {
                    left : 0,
                    top : 0,
                    width : 300,
                    height : 150,
                }
            })
        if(null != gridAd)
        {
            let self = this;
            this.ryw__loading = true;
            gridAd.onLoad((res) =>  {
                console.log("GridAD 加载完成",self.ryw__id,res);
                self.ryw__gridAd = gridAd;
                self.ryw__createTime = Laya.timer.currTimer;
                self.ryw__loading = false;
                if(null != callBack)
                {
                    callBack(true);
                }
            })
            gridAd.onError((err) =>  {
                console.log("GridAD 加载失败",self.ryw__id,err);
                self.ryw__error = err;
                self.ryw__loading = false;
                gridAd.destroy();
                if(null != callBack)
                {
                    callBack(false);
                }
            })
        }
    }
}

export default class ryw_WXADMgr 
{
    protected static ryw__inited : boolean = false;
    protected static readonly ryw__bannerIds : Array<string> = new Array<string>();
    protected static readonly ryw__banners : Array<ryw_WXBannderAd> = new Array<any>();
    protected static ryw__curBannerCreateIndex : number = 0;
    protected static ryw__curBannerGetIndex : number = 0;

    protected static ryw__wxGridAd : ryw_WXGridAd = null;
    
    public static ryw_init()
    {
        if(ryw_WXADMgr.ryw__inited)
            return;
        let banners = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wxWuDianBanners;
        for (let i = 0; i < banners.length; ++i)
        {
            ryw_WXADMgr.ryw__bannerIds.push(banners[i]);
        }
        for(let i=0;i < ryw_WXADMgr.ryw__bannerIds.length;++i)
        {
            let cur = ryw_WXADMgr.ryw__bannerIds[i];
            ryw_WXADMgr.ryw__bannerIds[i] = banners[Math.floor(Math.random() * banners.length)];
        }

        ryw_WXADMgr.ryw__createBannerAd();
        let bannerRecreateTime = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerCreateFailNum * 1000;
        Laya.timer.loop(bannerRecreateTime,ryw_WXADMgr,()=>
        {
            ryw_WXADMgr.ryw__checkBannerAd();
            ryw_WXADMgr.ryw__createBannerAd();
        });

        //WXADMgr._createGirdAd();

        ryw_WXADMgr.ryw__inited = true;
    }

    public static ryw_getBanner(callBack : Function)
    {
        let readyBannerAd :Array<ryw_WXBannderAd> = [];
        let UnreadyBannerAd :Array<ryw_WXBannderAd> = [];
        for(let i=0; i < ryw_WXADMgr.ryw__banners.length;++i)
        {
            let bannerAd = ryw_WXADMgr.ryw__banners[i];
            if(!bannerAd.ryw_Destroyed)
            {
                if(bannerAd.ryw_isReady)
                {
                    readyBannerAd.push(bannerAd);
                }
                else
                {
                    UnreadyBannerAd.push(bannerAd);
                }
            }
        }
        
        if(ryw_WXADMgr.ryw__curBannerGetIndex >= readyBannerAd.length)
        {
            ryw_WXADMgr.ryw__curBannerGetIndex = 0;
        }
        let bannerAd = readyBannerAd[ryw_WXADMgr.ryw__curBannerGetIndex];
        ++ryw_WXADMgr.ryw__curBannerGetIndex;

        if(null != bannerAd)
        {
            callBack(bannerAd);
        }
        else
        {
            bannerAd = ryw_WXADMgr.ryw__createBannerAd();
            if(null == bannerAd)
            {
                bannerAd = ryw_WXADMgr.ryw__banners[Math.floor(Math.random() * ryw_WXADMgr.ryw__banners.length)];
            }
            if(null == bannerAd)
            {
                callBack(null);
            }
            else
            {
                bannerAd.ryw_retry((ok : boolean)=>
                {
                    if(ok)
                    {
                        callBack(bannerAd);
                    }
                    else
                    {
                        callBack(null);
                    }
                });
            }
        }
    }   

    protected static ryw__createBannerAd() : ryw_WXBannderAd
    {
        if(ryw_WXADMgr.ryw__curBannerCreateIndex >= ryw_WXADMgr.ryw__bannerIds.length)
            return null;
        let bannerAd = new ryw_WXBannderAd(ryw_WXADMgr.ryw__bannerIds[ryw_WXADMgr.ryw__curBannerCreateIndex]);
        ryw_WXADMgr.ryw__banners.push(bannerAd);
        bannerAd.ryw_retry();
        ++ryw_WXADMgr.ryw__curBannerCreateIndex;
        return bannerAd;
    }

    protected static ryw__checkBannerAd()
    {
        let readyBannerAd :Array<ryw_WXBannderAd> = [];
        let UnreadyBannerAd :Array<ryw_WXBannderAd> = [];
        for(let i=0; i < ryw_WXADMgr.ryw__banners.length;++i)
        {
            let bannerAd = ryw_WXADMgr.ryw__banners[i];
            if(!bannerAd.ryw_Destroyed)
            {
                if(bannerAd.ryw_isReady)
                {
                    readyBannerAd.push(bannerAd);
                }
                else
                {
                    UnreadyBannerAd.push(bannerAd);
                }
            }
        }

        for(let i=0;i < ryw_WXADMgr.ryw__banners.length;++i)
        {
            let bannerAd: ryw_WXBannderAd = ryw_WXADMgr.ryw__banners[i];
            let bannerShowTime = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerShowTime;
            if(!bannerAd.ryw_isReady)
            {
                if(bannerAd.ryw_RetryCount >= ryw_WXBannderAd.ryw_MAX_RETRY_COUNT)
                {
                    console.log("BannerAd 超过重试次数，销毁 : ",bannerAd.ryw_Id);
                    bannerAd.ryw_destroy();
                }
                else
                {
                    bannerAd.ryw_retry();
                }
            }
            else if(readyBannerAd.length >= 2 && bannerAd.ryw_BannerTotalShowTime >= bannerShowTime * 1000)
            {
                console.log("BannerAd 展示时间超过限制，销毁 : ",bannerAd.ryw_Id);
                bannerAd.ryw_destroy();
            }
        }
    }

    public static ryw_getBoxAd(callBack : Function)
    {
        if(ryw_WXADMgr.ryw__wxGridAd.ryw_isReady)
        {
            callBack(ryw_WXADMgr.ryw__wxGridAd);
        }
        else
        {
            let gridAd = ryw_WXADMgr.ryw__wxGridAd;
            gridAd.ryw_retry((isOk:boolean)=>
            {
                if(isOk)
                {
                    callBack(gridAd);
                }
                else
                {
                    callBack(null);
                }
            })
        }
    }

    protected static ryw__createGirdAd()
    {
        if(null != ryw_WXADMgr.ryw__wxGridAd)
            return;
        let gridAd = new ryw_WXGridAd("");
        gridAd.ryw_retry();
        ryw_WXADMgr.ryw__wxGridAd = gridAd;
    }
}