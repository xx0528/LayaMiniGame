import TT_ZMDGJ_Template_ZMDGJ_View_ZMDGJ_Base from "../TTTemplateViewBase";
import Http_ZMDGJ_Unit from "../../../Net/HttpUnit";
import TT_ZMDGJ_API from "../../../TTAPI";
import Utilit_ZMDGJ_ from "../../../Utilit";


//抖音签到界面
export default class TT_ZMDGJ_SignIn extends TT_ZMDGJ_Template_ZMDGJ_View_ZMDGJ_Base 
{
    protected _center_ZMDGJ_Zone : Laya.Clip = null;
    
    protected _signIconRoot: Laya.Sprite = null;
    protected _signIcons : Array<Laya.Sprite> = [];
    protected _signMasks : Array<Laya.Sprite> = [];

    protected _ad_ZMDGJ_Toggle : Laya.Sprite = null;
    protected _ad_ZMDGJ_ToggleTag : Laya.Sprite = null;
    protected _signInBtn : Laya.Sprite = null;
    protected _skip_ZMDGJ_Btn : Laya.Sprite = null;
    protected _skip_ZMDGJ_OkTag : Laya.Sprite = null;
    protected _skip_ZMDGJ_NoTag : Laya.Sprite = null;

    protected _signedTag : Laya.Sprite = null;

    protected _signIning : boolean = false;//是否正在签到中

    onAwake()
    {
        super.onAwake();
        this._topZone = this.View_ZMDGJ_.getChildByName("TopZone") as Laya.Clip;
        this._center_ZMDGJ_Zone = this.View_ZMDGJ_.getChildByName("CenterZone") as Laya.Clip;
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            if(Utilit_ZMDGJ_.is_ZMDGJ_IphoneX())
            {
                this._center_ZMDGJ_Zone.top =  this._center_ZMDGJ_Zone.top + 75;
            }
        }
        
        this._signIconRoot = this._center_ZMDGJ_Zone.getChildByName("SignIconRoot") as Laya.Sprite;
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

        this._ad_ZMDGJ_Toggle = this._center_ZMDGJ_Zone.getChildByName("AdToggle") as Laya.Sprite;
        this._ad_ZMDGJ_ToggleTag = this._ad_ZMDGJ_Toggle.getChildByName("Tag") as Laya.Sprite;
        this._signInBtn = this._center_ZMDGJ_Zone.getChildByName("SignInBtn") as Laya.Sprite;
        this._skip_ZMDGJ_Btn = this._center_ZMDGJ_Zone.getChildByName("SkipBtn") as Laya.Sprite;
        this._skip_ZMDGJ_OkTag = this._skip_ZMDGJ_Btn.getChildByName("Ok") as Laya.Sprite;
        this._skip_ZMDGJ_NoTag = this._skip_ZMDGJ_Btn.getChildByName("No") as Laya.Sprite;

        this._ad_ZMDGJ_Toggle.visible = (0 == Math.floor(Math.random() * 2));
        this.on_ZMDGJ_AdToggle_ZMDGJ_StateChange(this._ad_ZMDGJ_Toggle.visible);

        this._signedTag = this._center_ZMDGJ_Zone.getChildByName("SignedTag") as Laya.Sprite;
        this._signedTag.visible = false
    }

    onStart()
    {
        super.onStart();
        let self = this;
        Http_ZMDGJ_Unit.GetSignIn((res)=>
        {
            let isSign : number = res.data.is_sign;
            let signDays : number = res.data.sign_day_num;
            self.refreshSignInState(signDays);
        },(res)=>
        {
            //todo:获取签到状态失败
        })
    }

    add_ZMDGJ_Event()
    {
        super.add_ZMDGJ_Event();
        this._signInBtn.on(Laya.Event.CLICK,this,this.onSignInBtn);
        this._ad_ZMDGJ_Toggle.on(Laya.Event.CLICK,this,this.onAdToggle);
        this._skip_ZMDGJ_Btn.on(Laya.Event.CLICK,this,this.onSkipBtn);
    }

    remove_ZMDGJ_Event()
    {
        super.remove_ZMDGJ_Event();
        this._signInBtn.off(Laya.Event.CLICK,this,this.onSignInBtn);
        this._ad_ZMDGJ_Toggle.off(Laya.Event.CLICK,this,this.onAdToggle);
        this._skip_ZMDGJ_Btn.off(Laya.Event.CLICK,this,this.onSkipBtn);
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
        TT_ZMDGJ_API.show_ZMDGJ_Rewarded_ZMDGJ_VideoAd((ok)=>
        {
            if(ok)
            {
                //todo：看视频成功
                Http_ZMDGJ_Unit.SignIn((res)=>
                {
                    let code = res.code;
                    if(1 == code)
                    {
                        //todo:签到成功,多倍奖励
                        Http_ZMDGJ_Unit.GetSignIn((res)=>
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
        this._ad_ZMDGJ_ToggleTag.visible = !this._ad_ZMDGJ_ToggleTag.visible;
        this.on_ZMDGJ_AdToggle_ZMDGJ_StateChange(this._ad_ZMDGJ_ToggleTag.visible);
    }

    protected onSkipBtn()
    {
        if(this._signIning)
            return;//请在签到中点击无效
        this._signIning = true;
        let self = this;
        if(this._ad_ZMDGJ_ToggleTag.visible)
        {
            TT_ZMDGJ_API.show_ZMDGJ_Rewarded_ZMDGJ_VideoAd((ok)=>
            {
                if(ok)
                {
                    //todo：看视频成功
                    Http_ZMDGJ_Unit.SignIn((res)=>
                    {
                        let code = res.code;
                        if(1 == code)
                        {
                            //todo:签到成功,多倍奖励
                            Http_ZMDGJ_Unit.GetSignIn((res) =>  
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
            Http_ZMDGJ_Unit.SignIn((res)=>
            {
                let code = res.code;
                if(1 == code)
                {
                    //todo:签到成功,正常奖励
                    self._signIning = false;
                    Http_ZMDGJ_Unit.GetSignIn((res)=>
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

    protected on_ZMDGJ_AdToggle_ZMDGJ_StateChange(visible : boolean)
    {
        if(visible)
        {
            this._skip_ZMDGJ_OkTag.visible = true;
            this._skip_ZMDGJ_NoTag.visible = false;
        }
        else
        {
            this._skip_ZMDGJ_OkTag.visible = false;
            this._skip_ZMDGJ_NoTag.visible = true;
        }
    }
}