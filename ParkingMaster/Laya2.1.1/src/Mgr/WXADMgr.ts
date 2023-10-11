import AppSwitchConfig from "../Config/AppSwitchConfig";
import WXAPI from "../WXAPI";

export class WXBannderAd
{
    public static readonly MAX_RETRY_COUNT : number = 3;

    constructor(bannerid : string)
    {
        this._id = bannerid;
    }

    public get Id()
    {
        return this._id;
    }
    protected _id : string = null;
    protected _banner : any = null;
    public get CreateTime()
    {
        return this._createTime;
    }
    protected _createTime : number = 0;

    public get Destroyed()
    {
        return this._destroyed;
    }
    protected _destroyed: boolean = false;

    public get isReady()
    {
        return null != this._banner;
    }
    public get isError()
    {
        return null != this._error;
    }
    public get Error()
    {
        return this._error;
    }
    protected _error : any = null;

    public get Loading()
    {
        return this._loading;
    }
    protected _loading : boolean = false;

    public get RetryCount()
    {
        return this._retryCount;
    }
    protected _retryCount : number = 0;

    public get BannerTotalShowTime()
    {
        return this._bannerTotalShowTime;
    }
    protected _bannerTotalShowTime : number = 0;
    protected _lastShowTime : number = 0;

    public show() 
    {
        if(this.isReady)
        {
            this._banner.hide();
            let self = this;
            let sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
            let sw = sysInfo.screenWidth;
            let sh = sysInfo.screenHeight;
            let pos = new Laya.Point(0, 0);
            let width = 300;
            let left = sw / 2 - width / 2;
            let top = sh - 130;
            this._banner.style.left = left;
            this._banner.style.top = top;
            this._lastShowTime = Laya.timer.currTimer;
            this._banner.show();
        }
    }
    public hide() 
    {
        if(this.isReady)
        {
            this._banner.hide();
            this._bannerTotalShowTime += (Laya.timer.currTimer - this._lastShowTime);
        }
    }
    public destroy()
    {
        if(this._destroyed)
        {
            console.log("BannerAd 已经被销毁");
            return;
        }
        if(this._loading)
        {
            console.log("BannerAd 正在加载中，无法进行销毁");
            return;
        }
        if(null != this._banner)
        {
            this._banner.destroy();
        }
        this._banner = null;
        this._destroyed = true;
    }

    public retry(callBack? : Function)
    {
        if(this._destroyed)
        {
            console.log("BannerAd 已被销毁，无法重试");
            return;
        }
        if(this.isReady)
        {
            console.log("BannerAd 已创建成功，无需重试");
            return;
        }
        if(this._loading)
        {
            console.log("BannerAd 正在创建中");
            return;
        }
        if(this._retryCount >= WXBannderAd.MAX_RETRY_COUNT)
        {
            console.log("此 BannerAd 重试次数已达最大");
            return;
        }
        let self = this;
        this._create((isOk :boolean)=>
        {
            if(null != callBack)
            {
                callBack(isOk);
            }
            ++self._retryCount;
        });
    }

    protected _create(callBack? : Function)
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
                    adUnitId : this._id,
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
                    adUnitId : this._id,
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
            this._loading = true;
            banner.onLoad((res) =>  {
                console.log("BannderAd 加载完成",self._id,res);
                self._banner = banner;
                self._createTime = Laya.timer.currTimer;
                self._loading = false;
                if(null != callBack)
                {
                    callBack(true);
                }
            })
            banner.onError((err) =>  {
                console.log("BannderAd 加载失败",self._id,err);
                self._error = err;
                self._loading = false;
                banner.destroy();
                if(null != callBack)
                {
                    callBack(false);
                }
            })
        }
    }
}

export class WXGridAd
{
    constructor(bannerid : string)
    {
        this._id = bannerid;
    }

    protected _id : string = null;
    protected _gridAd : any = null;
    public get CreateTime()
    {
        return this._createTime;
    }
    protected _createTime : number = 0;

    public get Destroyed()
    {
        return this._destroyed;
    }
    protected _destroyed: boolean = false;

    public get isReady()
    {
        return null != this._gridAd;
    }
    public get isError()
    {
        return null != this._error;
    }
    public get Error()
    {
        return this._error;
    }
    protected _error : any = null;

    public get Loading()
    {
        return this._loading;
    }
    protected _loading : boolean = false;

    public show() 
    {
        if(this.isReady)
        {
            this._gridAd.show();
        }
    }
    public hide() 
    {
        if(this.isReady)
        {
            this._gridAd.hide();
        }
    }
    public destroy()
    {
        if(this._destroyed)
        {
            console.log("GridAD 已经被销毁");
            return;
        }
        if(this._loading)
        {
            console.log("GridAD 正在加载中，无法进行销毁");
            return;
        }
        if(null != this._gridAd)
        {
            this._gridAd.destroy();
        }
        this._gridAd = null;
        this._destroyed = true;
    }

    public retry(callBack? : Function)
    {
        if(this._destroyed)
        {
            console.log("GridAD 已被销毁，无法重试");
            return;
        }
        if(this.isReady)
        {
            console.log("GridAD 已创建成功，无需重试");
            return;
        }
        if(this._loading)
        {
            console.log("GridAD 正在创建中");
            return;
        }
        let self = this;
        this._create((isOk :boolean)=>
        {
            if(null != callBack)
            {
                callBack(isOk);
            }
        });
    }

    protected _create(callBack? : Function)
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
                adUnitId : this._id,
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
            this._loading = true;
            gridAd.onLoad((res) =>  {
                console.log("GridAD 加载完成",self._id,res);
                self._gridAd = gridAd;
                self._createTime = Laya.timer.currTimer;
                self._loading = false;
                if(null != callBack)
                {
                    callBack(true);
                }
            })
            gridAd.onError((err) =>  {
                console.log("GridAD 加载失败",self._id,err);
                self._error = err;
                self._loading = false;
                gridAd.destroy();
                if(null != callBack)
                {
                    callBack(false);
                }
            })
        }
    }
}

export default class WXADMgr 
{
    protected static _inited : boolean = false;
    protected static readonly _bannerIds : Array<string> = new Array<string>();
    protected static readonly _banners : Array<WXBannderAd> = new Array<any>();
    protected static _curBannerCreateIndex : number = 0;
    protected static _curBannerGetIndex : number = 0;

    protected static _wxGridAd : WXGridAd = null;
    
    public static init()
    {
        if(WXADMgr._inited)
            return;
        let banners = AppSwitchConfig.getInstance().getAppSwitchData().wxWuDianBanners;
        for (let i = 0; i < banners.length; ++i)
        {
            WXADMgr._bannerIds.push(banners[i]);
        }
        for(let i=0;i < WXADMgr._bannerIds.length;++i)
        {
            let cur = WXADMgr._bannerIds[i];
            WXADMgr._bannerIds[i] = banners[Math.floor(Math.random() * banners.length)];
        }

        WXADMgr._createBannerAd();
        let bannerRecreateTime = AppSwitchConfig.getInstance().getAppSwitchData().bannerCreateFailNum * 1000;
        Laya.timer.loop(bannerRecreateTime,WXADMgr,()=>
        {
            WXADMgr._checkBannerAd();
            WXADMgr._createBannerAd();
        });

        //WXADMgr._createGirdAd();

        WXADMgr._inited = true;
    }

    public static getBanner(callBack : Function)
    {
        let readyBannerAd :Array<WXBannderAd> = [];
        let UnreadyBannerAd :Array<WXBannderAd> = [];
        for(let i=0; i < WXADMgr._banners.length;++i)
        {
            let bannerAd = WXADMgr._banners[i];
            if(!bannerAd.Destroyed)
            {
                if(bannerAd.isReady)
                {
                    readyBannerAd.push(bannerAd);
                }
                else
                {
                    UnreadyBannerAd.push(bannerAd);
                }
            }
        }
        
        if(WXADMgr._curBannerGetIndex >= readyBannerAd.length)
        {
            WXADMgr._curBannerGetIndex = 0;
        }
        let bannerAd = readyBannerAd[WXADMgr._curBannerGetIndex];
        ++WXADMgr._curBannerGetIndex;

        if(null != bannerAd)
        {
            callBack(bannerAd);
        }
        else
        {
            bannerAd = WXADMgr._createBannerAd();
            if(null == bannerAd)
            {
                bannerAd = WXADMgr._banners[Math.floor(Math.random() * WXADMgr._banners.length)];
            }
            if(null == bannerAd)
            {
                callBack(null);
            }
            else
            {
                bannerAd.retry((ok : boolean)=>
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

    protected static _createBannerAd() : WXBannderAd
    {
        if(WXADMgr._curBannerCreateIndex >= WXADMgr._bannerIds.length)
            return null;
        let bannerAd = new WXBannderAd(WXADMgr._bannerIds[WXADMgr._curBannerCreateIndex]);
        WXADMgr._banners.push(bannerAd);
        bannerAd.retry();
        ++WXADMgr._curBannerCreateIndex;
        return bannerAd;
    }

    protected static _checkBannerAd()
    {
        let readyBannerAd :Array<WXBannderAd> = [];
        let UnreadyBannerAd :Array<WXBannderAd> = [];
        for(let i=0; i < WXADMgr._banners.length;++i)
        {
            let bannerAd = WXADMgr._banners[i];
            if(!bannerAd.Destroyed)
            {
                if(bannerAd.isReady)
                {
                    readyBannerAd.push(bannerAd);
                }
                else
                {
                    UnreadyBannerAd.push(bannerAd);
                }
            }
        }

        for(let i=0;i < WXADMgr._banners.length;++i)
        {
            let bannerAd: WXBannderAd = WXADMgr._banners[i];
            let bannerShowTime = AppSwitchConfig.getInstance().getAppSwitchData().bannerShowTime;
            if(!bannerAd.isReady)
            {
                if(bannerAd.RetryCount >= WXBannderAd.MAX_RETRY_COUNT)
                {
                    console.log("BannerAd 超过重试次数，销毁 : ",bannerAd.Id);
                    bannerAd.destroy();
                }
                else
                {
                    bannerAd.retry();
                }
            }
            else if(readyBannerAd.length >= 2 && bannerAd.BannerTotalShowTime >= bannerShowTime * 1000)
            {
                console.log("BannerAd 展示时间超过限制，销毁 : ",bannerAd.Id);
                bannerAd.destroy();
            }
        }
    }

    public static getBoxAd(callBack : Function)
    {
        if(this._wxGridAd.isReady)
        {
            callBack(this._wxGridAd);
        }
        else
        {
            let gridAd = this._wxGridAd;
            gridAd.retry((isOk:boolean)=>
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

    protected static _createGirdAd()
    {
        if(null != this._wxGridAd)
            return;
        let gridAd = new WXGridAd("");
        gridAd.retry();
        this._wxGridAd = gridAd;
    }
}