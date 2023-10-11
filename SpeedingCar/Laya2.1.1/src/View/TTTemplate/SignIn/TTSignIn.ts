import TT_wcjtn_Template_wcjtn_View_wcjtn_Base from "../TTTemplateViewBase";
import Http_wcjtn_Unit from "../../../Net/HttpUnit";
import TT_wcjtn_API from "../../../TTAPI";
import Utilit_wcjtn_ from "../../../Utilit";


//抖音签到界面
export default class TT_wcjtn_SignIn extends TT_wcjtn_Template_wcjtn_View_wcjtn_Base 
{
    protected _center_wcjtn_Zone : Laya.Clip = null;
    
    protected _signIconRoot: Laya.Sprite = null;
    protected _signIcons : Array<Laya.Sprite> = [];
    protected _signMasks : Array<Laya.Sprite> = [];

    protected _ad_wcjtn_Toggle : Laya.Sprite = null;
    protected _ad_wcjtn_ToggleTag : Laya.Sprite = null;
    protected _signInBtn : Laya.Sprite = null;
    protected _skip_wcjtn_Btn : Laya.Sprite = null;
    protected _skip_wcjtn_OkTag : Laya.Sprite = null;
    protected _skip_wcjtn_NoTag : Laya.Sprite = null;

    protected _signedTag : Laya.Sprite = null;

    protected _signIning : boolean = false;//是否正在签到中

    onAwake()
    {
        this._topZone = this.View_wcjtn_.getChildByName("TopZone") as Laya.Clip;
        this._center_wcjtn_Zone = this.View_wcjtn_.getChildByName("CenterZone") as Laya.Clip;
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            if(Utilit_wcjtn_.is_wcjtn_IphoneX())
            {
                this._center_wcjtn_Zone.top =  this._center_wcjtn_Zone.top + 75;
            }
        }
        
        this._signIconRoot = this._center_wcjtn_Zone.getChildByName("SignIconRoot") as Laya.Sprite;
        for (let i = 0; i < this._signIconRoot.numChildren; ++i)  
        {
            let s = this._signIconRoot.getChildByName(String(i + 1)) as Laya.Sprite;
            let OkTag = s.getChildByName("Ok") as Laya.Sprite;
            OkTag.visible = false;
            let Mask = s.getChildByName("Mask") as Laya.Sprite;
            Mask.visible = true;
            this._signIcons.push(OkTag);
            this._signMasks.push(Mask);
        }

        this._ad_wcjtn_Toggle = this._center_wcjtn_Zone.getChildByName("AdToggle") as Laya.Sprite;
        this._ad_wcjtn_ToggleTag = this._ad_wcjtn_Toggle.getChildByName("Tag") as Laya.Sprite;
        this._signInBtn = this._center_wcjtn_Zone.getChildByName("SignInBtn") as Laya.Sprite;
        this._skip_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("SkipBtn") as Laya.Sprite;
        this._skip_wcjtn_OkTag = this._skip_wcjtn_Btn.getChildByName("Ok") as Laya.Sprite;
        this._skip_wcjtn_NoTag = this._skip_wcjtn_Btn.getChildByName("No") as Laya.Sprite;

        this._ad_wcjtn_Toggle.visible = (0 == Math.floor(Math.random() * 2));
        this.on_wcjtn_AdToggle_wcjtn_StateChange(this._ad_wcjtn_Toggle.visible);

        this._signedTag = this._center_wcjtn_Zone.getChildByName("SignedTag") as Laya.Sprite;
        this._signedTag.visible = false
    }

    onStart()
    {
        super.onStart();
        let self = this;
        Http_wcjtn_Unit.GetSignIn((res)=>
        {
            let isSign : number = res.data.is_sign;
            let signDays : number = res.data.sign_day_num;
            self.refreshSignInState(signDays);
        },(res)=>
        {
            //todo:获取签到状态失败
        })
    }

    add_wcjtn_Event()
    {
        super.add_wcjtn_Event();
        this._signInBtn.on(Laya.Event.CLICK,this,this.onSignInBtn);
        this._ad_wcjtn_Toggle.on(Laya.Event.CLICK,this,this.onAdToggle);
        this._skip_wcjtn_Btn.on(Laya.Event.CLICK,this,this.onSkipBtn);
    }

    remove_wcjtn_Event()
    {
        super.remove_wcjtn_Event();
        this._signInBtn.off(Laya.Event.CLICK,this,this.onSignInBtn);
        this._ad_wcjtn_Toggle.off(Laya.Event.CLICK,this,this.onAdToggle);
        this._skip_wcjtn_Btn.off(Laya.Event.CLICK,this,this.onSkipBtn);
    }

    //刷新签到状态
    protected refreshSignInState(days : number)
    {
        let left = days % 7;
        if(0 == days)
        {
            for(let i=0;i < this._signIcons.length;++i)
            {
                this._signIcons[i].visible = false;
                this._signMasks[i].visible = false;
            }
        }
        else
        {
            if(0 == left)
            {
                for(let i=0;i < this._signIcons.length;++i)
                {
                    this._signIcons[i].visible = true;
                    this._signMasks[i].visible = false;
                }
            }
            else
            {
                for(let i=0;i < this._signIcons.length;++i)
                {
                    this._signIcons[i].visible = i < left;
                    this._signMasks[i].visible = i > left;
                }
            }
        }
    }

    protected onSignInBtn()
    {
        if(this._signIning)
            return;//请在签到中点击无效
        this._signIning = true;
        let self = this;
        TT_wcjtn_API.show_wcjtn_Rewarded_wcjtn_VideoAd((ok)=>
        {
            if(ok)
            {
                //todo：看视频成功
                Http_wcjtn_Unit.SignIn((res)=>
                {
                    let code = res.code;
                    if(1 == code)
                    {
                        //todo:签到成功,多倍奖励
                        Http_wcjtn_Unit.GetSignIn((res)=>
                        {
                            let isSign : number = res.data.is_sign;
                            let signDays : number = res.data.sign_day_num;
                            self.refreshSignInState(signDays);
                            self._signIning = false;
                            
                        },(res)=>
                        {
                            self._signIning = false;
                        })
                    }
                    else
                    {
                        console.log("签到失败 ： code",code);
                        self._signIning = false;
                        //todo:签到失败
                    }
    
                },()=>
                {
                    //todo:签到失败
                    self._signIning = false;
                })
            }
            else
            {
                //todo:未完整观看视频
                self._signIning = false;
            }
        },()=>
        {
            //todo:看视屏失败
            self._signIning = false;
        })
    }

    protected onAdToggle()
    {
        if(this._signIning)
            return;//请在签到中点击无效
        this._ad_wcjtn_ToggleTag.visible = !this._ad_wcjtn_ToggleTag.visible;
        this.on_wcjtn_AdToggle_wcjtn_StateChange(this._ad_wcjtn_ToggleTag.visible);
    }

    protected onSkipBtn()
    {
        if(this._signIning)
            return;//请在签到中点击无效
        this._signIning = true;
        let self = this;
        if(this._ad_wcjtn_ToggleTag.visible)
        {
            TT_wcjtn_API.show_wcjtn_Rewarded_wcjtn_VideoAd((ok)=>
            {
                if(ok)
                {
                    //todo：看视频成功
                    Http_wcjtn_Unit.SignIn((res)=>
                    {
                        let code = res.code;
                        if(1 == code)
                        {
                            //todo:签到成功,多倍奖励
                            Http_wcjtn_Unit.GetSignIn((res) =>  
                            {
                                let isSign: number = res.data.is_sign;
                                let signDays: number = res.data.sign_day_num;
                                self.refreshSignInState(signDays);
                                self._signIning = false;
                            }, 
                            (res) =>  
                            {
                                self._signIning = false;
                                //todo:获取签到状态失败
                            })
                        }
                        else
                        {
                            console.log("签到失败 ： code",code);
                            self._signIning = false;
                            //todo:签到失败
                        }
    
                    },()=>
                    {
                        //todo:签到失败
                        self._signIning = false;
                    })
                }
                else
                {
                    //todo:未完整观看视频
                    self._signIning = false;
                }
            },()=>
            {
                //todo:看视屏失败
                self._signIning = false;
            })
        }
        else
        {
            Http_wcjtn_Unit.SignIn((res)=>
            {
                let code = res.code;
                if(1 == code)
                {
                    //todo:签到成功,正常奖励
                    self._signIning = false;
                    Http_wcjtn_Unit.GetSignIn((res)=>
                    {
                        let isSign : number = res.data.is_sign;
                        let signDays : number = res.data.sign_day_num;
                        self.refreshSignInState(signDays);
                    },(res)=>
                    {
                        
                    })
                }
                else
                {
                    console.log("签到失败 ： code",code);
                    self._signIning = false;
                    //todo:签到失败
                }

            },()=>
            {
                //todo:签到失败
                self._signIning = false;
            })
        }
    }

    protected on_wcjtn_AdToggle_wcjtn_StateChange(visible : boolean)
    {
        if(visible)
        {
            this._skip_wcjtn_OkTag.visible = true;
            this._skip_wcjtn_NoTag.visible = false;
        }
        else
        {
            this._skip_wcjtn_OkTag.visible = false;
            this._skip_wcjtn_NoTag.visible = true;
        }
    }
}