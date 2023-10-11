import App_wcjtn_Switch_wcjtn_Config from "../Config/AppSwitchConfig";
import WX_wcjtn_API from "../WXAPI";

export class WX_wcjtn_BannderAd
{
    public static readonly MAX__wcjtn_RETRY_COUNT_wcjtn_ : number = 3;

    constructor(bannerid : string)
    {
        this._id_wcjtn_ = bannerid;
    }

    public get _wcjtn_Id_wcjtn_()
    {
        return this._id_wcjtn_;
    }
    protected _id_wcjtn_ : string = null;
    protected _banner_wcjtn_ : any = null;
    public get Create_wcjtn_Time()
    {
        return this._create_wcjtn_Time;
    }
    protected _create_wcjtn_Time : number = 0;

    public get Destroyed_wcjtn_()
    {
        return this._destroyed_wcjtn_;
    }
    protected _destroyed_wcjtn_: boolean = false;

    public get is_wcjtn_Ready()
    {
        return null != this._banner_wcjtn_;
    }
    public get is_wcjtn_Error()
    {
        return null != this._wcjtn__error_wcjtn_;
    }
    public get _wcjtn_Error_wcjtn_()
    {
        return this._wcjtn__error_wcjtn_;
    }
    protected _wcjtn__error_wcjtn_ : any = null;

    public get Load_wcjtn_ing()
    {
        return this._loading_wcjtn_;
    }
    protected _loading_wcjtn_ : boolean = false;

    public get Retry_wcjtn_Count()
    {
        return this._retry_wcjtn_Count;
    }
    protected _retry_wcjtn_Count : number = 0;

    public get Banner_wcjtn_Total_wcjtn_ShowTime()
    {
        return this._banner_wcjtn_Total_wcjtn_ShowTime;
    }
    protected _banner_wcjtn_Total_wcjtn_ShowTime : number = 0;
    protected _last_wcjtn_Show_wcjtn_Time : number = 0;

    public _wcjtn_show_wcjtn_() 
    {
        if(this.is_wcjtn_Ready)
        {
            this._banner_wcjtn_.hide();
            let self = this;
            let sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
            let sw = sysInfo.screenWidth;
            let sh = sysInfo.screenHeight;
            let pos = new Laya.Point(0, 0);
            let width = 300;
            let left = sw / 2 - width / 2;
            let top = sh - 130;
            this._banner_wcjtn_.style.left = left;
            this._banner_wcjtn_.style.top = top;
            this._last_wcjtn_Show_wcjtn_Time = Laya.timer.currTimer;
            this._banner_wcjtn_.show();
        }
    }
    public _wcjtn_hide_wcjtn_() 
    {
        if(this.is_wcjtn_Ready)
        {
            this._banner_wcjtn_.hide();
            this._banner_wcjtn_Total_wcjtn_ShowTime += (Laya.timer.currTimer - this._last_wcjtn_Show_wcjtn_Time);
        }
    }
    public des_wcjtn_troy()
    {
        if(this._destroyed_wcjtn_)
        {
            console.log("BannerAd 已经被销毁");
            return;
        }
        if(this._loading_wcjtn_)
        {
            console.log("BannerAd 正在加载中，无法进行销毁");
            return;
        }
        if(null != this._banner_wcjtn_)
        {
            this._banner_wcjtn_.destroy();
        }
        this._banner_wcjtn_ = null;
        this._destroyed_wcjtn_ = true;
    }

    public _wcjtn_retry_wcjtn_(callBack? : Function)
    {
        if(this._destroyed_wcjtn_)
        {
            console.log("BannerAd 已被销毁，无法重试");
            return;
        }
        if(this.is_wcjtn_Ready)
        {
            console.log("BannerAd 已创建成功，无需重试");
            return;
        }
        if(this._loading_wcjtn_)
        {
            console.log("BannerAd 正在创建中");
            return;
        }
        if(this._retry_wcjtn_Count >= WX_wcjtn_BannderAd.MAX__wcjtn_RETRY_COUNT_wcjtn_)
        {
            console.log("此 BannerAd 重试次数已达最大");
            return;
        }
        let self = this;
        this._create_wcjtn_((isOk :boolean)=>
        {
            if(null != callBack)
            {
                callBack(isOk);
            }
            ++self._retry_wcjtn_Count;
        });
    }

    protected _create_wcjtn_(callBack? : Function)
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
                    adUnitId : this._id_wcjtn_,
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
                    adUnitId : this._id_wcjtn_,
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
            this._loading_wcjtn_ = true;
            banner.onLoad((res) =>  {
                console.log("BannderAd 加载完成",self._id_wcjtn_,res);
                self._banner_wcjtn_ = banner;
                self._create_wcjtn_Time = Laya.timer.currTimer;
                self._loading_wcjtn_ = false;
                if(null != callBack)
                {
                    callBack(true);
                }
            })
            banner.onError((err) =>  {
                console.log("BannderAd 加载失败",self._id_wcjtn_,err);
                self._wcjtn__error_wcjtn_ = err;
                self._loading_wcjtn_ = false;
                banner.destroy();
                if(null != callBack)
                {
                    callBack(false);
                }
            })
        }
    }
}

export class WX_wcjtn_GridAd
{
    constructor(bannerid : string)
    {
        this._id_wcjtn_ = bannerid;
    }

    protected _id_wcjtn_ : string = null;
    protected _grid_wcjtn_Ad : any = null;
    public get Create_wcjtn_Time()
    {
        return this._create_wcjtn_Time;
    }
    protected _create_wcjtn_Time : number = 0;

    public get Des_wcjtn_troyed()
    {
        return this._des_wcjtn_troyed;
    }
    protected _des_wcjtn_troyed: boolean = false;

    public get is_wcjtn_Ready()
    {
        return null != this._grid_wcjtn_Ad;
    }
    public get is_wcjtn_Error()
    {
        return null != this._wcjtn__error_wcjtn_;
    }
    public get _wcjtn_Error_wcjtn_()
    {
        return this._wcjtn__error_wcjtn_;
    }
    protected _wcjtn__error_wcjtn_ : any = null;

    public get Load_wcjtn_ing()
    {
        return this._load_wcjtn_ing;
    }
    protected _load_wcjtn_ing : boolean = false;

    public _wcjtn_show_wcjtn_() 
    {
        if(this.is_wcjtn_Ready)
        {
            this._grid_wcjtn_Ad.show();
        }
    }
    public _wcjtn_hide_wcjtn_() 
    {
        if(this.is_wcjtn_Ready)
        {
            this._grid_wcjtn_Ad.hide();
        }
    }
    public des_wcjtn_troy()
    {
        if(this._des_wcjtn_troyed)
        {
            console.log("GridAD 已经被销毁");
            return;
        }
        if(this._load_wcjtn_ing)
        {
            console.log("GridAD 正在加载中，无法进行销毁");
            return;
        }
        if(null != this._grid_wcjtn_Ad)
        {
            this._grid_wcjtn_Ad.destroy();
        }
        this._grid_wcjtn_Ad = null;
        this._des_wcjtn_troyed = true;
    }

    public _wcjtn_retry_wcjtn_(callBack? : Function)
    {
        if(this._des_wcjtn_troyed)
        {
            console.log("GridAD 已被销毁，无法重试");
            return;
        }
        if(this.is_wcjtn_Ready)
        {
            console.log("GridAD 已创建成功，无需重试");
            return;
        }
        if(this._load_wcjtn_ing)
        {
            console.log("GridAD 正在创建中");
            return;
        }
        let self = this;
        this._wcjtn__create_wcjtn_((isOk :boolean)=>
        {
            if(null != callBack)
            {
                callBack(isOk);
            }
        });
    }

    protected _wcjtn__create_wcjtn_(callBack? : Function)
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
                adUnitId : this._id_wcjtn_,
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
            this._load_wcjtn_ing = true;
            gridAd.onLoad((res) =>  {
                console.log("GridAD 加载完成",self._id_wcjtn_,res);
                self._grid_wcjtn_Ad = gridAd;
                self._create_wcjtn_Time = Laya.timer.currTimer;
                self._load_wcjtn_ing = false;
                if(null != callBack)
                {
                    callBack(true);
                }
            })
            gridAd.onError((err) =>  {
                console.log("GridAD 加载失败",self._id_wcjtn_,err);
                self._wcjtn__error_wcjtn_ = err;
                self._load_wcjtn_ing = false;
                gridAd.destroy();
                if(null != callBack)
                {
                    callBack(false);
                }
            })
        }
    }
}

export default class WX_wcjtn_ADMgr 
{
    protected static _inited_wcjtn_ : boolean = false;
    protected static readonly _banner_wcjtn_Ids : Array<string> = new Array<string>();
    protected static readonly _banners_wcjtn_ : Array<WX_wcjtn_BannderAd> = new Array<any>();
    protected static _cur_wcjtn_Banner_wcjtn_CreateIndex : number = 0;
    protected static _cur_wcjtn_Banner_wcjtn_GetIndex : number = 0;

    protected static _wx_wcjtn_GridAd : WX_wcjtn_GridAd = null;
    
    public static _wcjtn_init_wcjtn_()
    {
        if(WX_wcjtn_ADMgr._inited_wcjtn_)
            return;
        let banners = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wx_wcjtn_Wu_wcjtn_Dian_wcjtn_Banners;
        for (let i = 0; i < banners.length; ++i)
        {
            WX_wcjtn_ADMgr._banner_wcjtn_Ids.push(banners[i]);
        }
        for(let i=0;i < WX_wcjtn_ADMgr._banner_wcjtn_Ids.length;++i)
        {
            let cur = WX_wcjtn_ADMgr._banner_wcjtn_Ids[i];
            WX_wcjtn_ADMgr._banner_wcjtn_Ids[i] = banners[Math.floor(Math.random() * banners.length)];
        }

        WX_wcjtn_ADMgr._create_wcjtn_BannerAd_wcjtn_();
        let bannerRecreateTime = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Create_wcjtn_FailNum * 1000;
        Laya.timer.loop(bannerRecreateTime,WX_wcjtn_ADMgr,()=>
        {
            WX_wcjtn_ADMgr._check_wcjtn_BannerAd_wcjtn_();
            WX_wcjtn_ADMgr._create_wcjtn_BannerAd_wcjtn_();
        });

        //WX_wcjtn_ADMgr._create_wcjtn_GirdAd();

        WX_wcjtn_ADMgr._inited_wcjtn_ = true;
    }

    public static get_wcjtn_Banner(callBack : Function)
    {
        let readyBannerAd :Array<WX_wcjtn_BannderAd> = [];
        let UnreadyBannerAd :Array<WX_wcjtn_BannderAd> = [];
        for(let i=0; i < WX_wcjtn_ADMgr._banners_wcjtn_.length;++i)
        {
            let bannerAd = WX_wcjtn_ADMgr._banners_wcjtn_[i];
            if(!bannerAd.Destroyed_wcjtn_)
            {
                if(bannerAd.is_wcjtn_Ready)
                {
                    readyBannerAd.push(bannerAd);
                }
                else
                {
                    UnreadyBannerAd.push(bannerAd);
                }
            }
        }
        
        if(WX_wcjtn_ADMgr._cur_wcjtn_Banner_wcjtn_GetIndex >= readyBannerAd.length)
        {
            WX_wcjtn_ADMgr._cur_wcjtn_Banner_wcjtn_GetIndex = 0;
        }
        let bannerAd = readyBannerAd[WX_wcjtn_ADMgr._cur_wcjtn_Banner_wcjtn_GetIndex];
        ++WX_wcjtn_ADMgr._cur_wcjtn_Banner_wcjtn_GetIndex;

        if(null != bannerAd)
        {
            callBack(bannerAd);
        }
        else
        {
            bannerAd = WX_wcjtn_ADMgr._create_wcjtn_BannerAd_wcjtn_();
            if(null == bannerAd)
            {
                bannerAd = WX_wcjtn_ADMgr._banners_wcjtn_[Math.floor(Math.random() * WX_wcjtn_ADMgr._banners_wcjtn_.length)];
            }
            if(null == bannerAd)
            {
                callBack(null);
            }
            else
            {
                bannerAd._wcjtn_retry_wcjtn_((ok : boolean)=>
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

    protected static _create_wcjtn_BannerAd_wcjtn_() : WX_wcjtn_BannderAd
    {
        if(WX_wcjtn_ADMgr._cur_wcjtn_Banner_wcjtn_CreateIndex >= WX_wcjtn_ADMgr._banner_wcjtn_Ids.length)
            return null;
        let bannerAd = new WX_wcjtn_BannderAd(WX_wcjtn_ADMgr._banner_wcjtn_Ids[WX_wcjtn_ADMgr._cur_wcjtn_Banner_wcjtn_CreateIndex]);
        WX_wcjtn_ADMgr._banners_wcjtn_.push(bannerAd);
        bannerAd._wcjtn_retry_wcjtn_();
        ++WX_wcjtn_ADMgr._cur_wcjtn_Banner_wcjtn_CreateIndex;
        return bannerAd;
    }

    protected static _check_wcjtn_BannerAd_wcjtn_()
    {
        let readyBannerAd :Array<WX_wcjtn_BannderAd> = [];
        let UnreadyBannerAd :Array<WX_wcjtn_BannderAd> = [];
        for(let i=0; i < WX_wcjtn_ADMgr._banners_wcjtn_.length;++i)
        {
            let bannerAd = WX_wcjtn_ADMgr._banners_wcjtn_[i];
            if(!bannerAd.Destroyed_wcjtn_)
            {
                if(bannerAd.is_wcjtn_Ready)
                {
                    readyBannerAd.push(bannerAd);
                }
                else
                {
                    UnreadyBannerAd.push(bannerAd);
                }
            }
        }

        for(let i=0;i < WX_wcjtn_ADMgr._banners_wcjtn_.length;++i)
        {
            let bannerAd: WX_wcjtn_BannderAd = WX_wcjtn_ADMgr._banners_wcjtn_[i];
            let bannerShowTime = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Show_wcjtn_Time;
            if(!bannerAd.is_wcjtn_Ready)
            {
                if(bannerAd.Retry_wcjtn_Count >= WX_wcjtn_BannderAd.MAX__wcjtn_RETRY_COUNT_wcjtn_)
                {
                    console.log("BannerAd 超过重试次数，销毁 : ",bannerAd._wcjtn_Id_wcjtn_);
                    bannerAd.des_wcjtn_troy();
                }
                else
                {
                    bannerAd._wcjtn_retry_wcjtn_();
                }
            }
            else if(readyBannerAd.length >= 2 && bannerAd.Banner_wcjtn_Total_wcjtn_ShowTime >= bannerShowTime * 1000)
            {
                console.log("BannerAd 展示时间超过限制，销毁 : ",bannerAd._wcjtn_Id_wcjtn_);
                bannerAd.des_wcjtn_troy();
            }
        }
    }

    public static get_wcjtn_Box_wcjtn_Ad(callBack : Function)
    {
        if(WX_wcjtn_ADMgr._wx_wcjtn_GridAd.is_wcjtn_Ready)
        {
            callBack(WX_wcjtn_ADMgr._wx_wcjtn_GridAd);
        }
        else
        {
            let gridAd = WX_wcjtn_ADMgr._wx_wcjtn_GridAd;
            gridAd._wcjtn_retry_wcjtn_((isOk:boolean)=>
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

    protected static _create_wcjtn_GirdAd()
    {
        if(null != WX_wcjtn_ADMgr._wx_wcjtn_GridAd)
            return;
        let gridAd = new WX_wcjtn_GridAd("");
        gridAd._wcjtn_retry_wcjtn_();
        WX_wcjtn_ADMgr._wx_wcjtn_GridAd = gridAd;
    }
}