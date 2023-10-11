import ryw_TTTemplateViewBase from "../TTTemplateViewBase";
import ryw_HttpUnit from "../../../Net/HttpUnit";
import ryw_TTAPI from "../../../TTAPI";
import ryw_Utilit from "../../../Utilit";


//抖音签到界面
export default class ryw_TTSignIn extends ryw_TTTemplateViewBase 
{
    protected ryw__centerZone : Laya.Clip = null;
    
    protected ryw__signIconRoot: Laya.Sprite = null;
    protected ryw__signIcons : Array<Laya.Sprite> = [];
    protected ryw__signMasks : Array<Laya.Sprite> = [];

    protected ryw__adToggle : Laya.Sprite = null;
    protected ryw__adToggleTag : Laya.Sprite = null;
    protected ryw__signInBtn : Laya.Sprite = null;
    protected ryw__skipBtn : Laya.Sprite = null;
    protected ryw__skipOkTag : Laya.Sprite = null;
    protected ryw__skipNoTag : Laya.Sprite = null;

    protected ryw__signedTag : Laya.Sprite = null;

    protected ryw__signIning : boolean = false;//是否正在签到中

    onAwake()
    {
        this._topZone = this.ryw_View.getChildByName("TopZone") as Laya.Clip;
        this.ryw__centerZone = this.ryw_View.getChildByName("CenterZone") as Laya.Clip;
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            if(ryw_Utilit.ryw_isIphoneX())
            {
                this.ryw__centerZone.top =  this.ryw__centerZone.top + 75;
            }
        }
        
        this.ryw__signIconRoot = this.ryw__centerZone.getChildByName("SignIconRoot") as Laya.Sprite;
        for (let i = 0; i < this.ryw__signIconRoot.numChildren; ++i)  
        {
            let s = this.ryw__signIconRoot.getChildByName(String(i + 1)) as Laya.Sprite;
            let OkTag = s.getChildByName("Ok") as Laya.Sprite;
            OkTag.visible = false;
            let Mask = s.getChildByName("Mask") as Laya.Sprite;
            Mask.visible = true;
            this.ryw__signIcons.push(OkTag);
            this.ryw__signMasks.push(Mask);
        }

        this.ryw__adToggle = this.ryw__centerZone.getChildByName("AdToggle") as Laya.Sprite;
        this.ryw__adToggleTag = this.ryw__adToggle.getChildByName("Tag") as Laya.Sprite;
        this.ryw__signInBtn = this.ryw__centerZone.getChildByName("SignInBtn") as Laya.Sprite;
        this.ryw__skipBtn = this.ryw__centerZone.getChildByName("SkipBtn") as Laya.Sprite;
        this.ryw__skipOkTag = this.ryw__skipBtn.getChildByName("Ok") as Laya.Sprite;
        this.ryw__skipNoTag = this.ryw__skipBtn.getChildByName("No") as Laya.Sprite;

        this.ryw__adToggleTag.visible = (0 == Math.floor(Math.random() * 2));
        this.ryw_onAdToggleStateChange(this.ryw__adToggleTag.visible);

        this.ryw__signedTag = this.ryw__centerZone.getChildByName("SignedTag") as Laya.Sprite;
        this.ryw__signedTag.visible = false;
    }

    onStart()
    {
        super.onStart();
        let self = this;
        ryw_HttpUnit.GetSignIn((res)=>
        {
            let isSign : number = res.data.is_sign;
            let signDays : number = res.data.sign_day_num;
            self.ryw_refreshSignInState(signDays);
        },(res)=>
        {
            //todo:获取签到状态失败
        })
    }

    ryw_addEvent()
    {
        super.ryw_addEvent();
        this.ryw__signInBtn.on(Laya.Event.CLICK,this,this.ryw_onSignInBtn);
        this.ryw__adToggle.on(Laya.Event.CLICK,this,this.ryw_onAdToggle);
        this.ryw__skipBtn.on(Laya.Event.CLICK,this,this.ryw_onSkipBtn);
    }

    ryw_removeEvent()
    {
        super.ryw_removeEvent();
        this.ryw__signInBtn.off(Laya.Event.CLICK,this,this.ryw_onSignInBtn);
        this.ryw__adToggle.off(Laya.Event.CLICK,this,this.ryw_onAdToggle);
        this.ryw__skipBtn.off(Laya.Event.CLICK,this,this.ryw_onSkipBtn);
    }

    //刷新签到状态
    protected ryw_refreshSignInState(days : number)
    {
        let left = days % 7;
        if(0 == days)
        {
            for(let i=0;i < this.ryw__signIcons.length;++i)
            {
                this.ryw__signIcons[i].visible = false;
                this.ryw__signMasks[i].visible = false;
            }
        }
        else
        {
            if(0 == left)
            {
                for(let i=0;i < this.ryw__signIcons.length;++i)
                {
                    this.ryw__signIcons[i].visible = true;
                    this.ryw__signMasks[i].visible = false;
                }
            }
            else
            {
                for(let i=0;i < this.ryw__signIcons.length;++i)
                {
                    this.ryw__signIcons[i].visible = i < left;
                    this.ryw__signMasks[i].visible = i > left;
                }
            }
        }
    }

    protected ryw_onSignInBtn()
    {
        if(this.ryw__signIning)
            return;//请在签到中点击无效
        this.ryw__signIning = true;
        let self = this;
        ryw_TTAPI.ryw_showRewardedVideoAd((ok)=>
        {
            if(ok)
            {
                //todo：看视频成功
                ryw_HttpUnit.SignIn((res)=>
                {
                    let code = res.code;
                    if(1 == code)
                    {
                        //todo:签到成功,多倍奖励
                        ryw_HttpUnit.GetSignIn((res)=>
                        {
                            let isSign : number = res.data.is_sign;
                            let signDays : number = res.data.sign_day_num;
                            self.ryw_refreshSignInState(signDays);
                            self.ryw__signIning = false;
                            
                        },(res)=>
                        {
                            self.ryw__signIning = false;
                        })
                    }
                    else
                    {
                        console.log("签到失败 ： code",code);
                        self.ryw__signIning = false;
                        //todo:签到失败
                    }
    
                },()=>
                {
                    //todo:签到失败
                    self.ryw__signIning = false;
                })
            }
            else
            {
                //todo:未完整观看视频
                self.ryw__signIning = false;
            }
        },()=>
        {
            //todo:看视屏失败
            self.ryw__signIning = false;
        })
    }

    protected ryw_onAdToggle()
    {
        if(this.ryw__signIning)
            return;//请在签到中点击无效
        this.ryw__adToggleTag.visible = !this.ryw__adToggleTag.visible;
        this.ryw_onAdToggleStateChange(this.ryw__adToggleTag.visible);
    }

    protected ryw_onSkipBtn()
    {
        if(this.ryw__signIning)
            return;//请在签到中点击无效
        this.ryw__signIning = true;
        let self = this;
        if(this.ryw__adToggleTag.visible)
        {
            ryw_TTAPI.ryw_showRewardedVideoAd((ok)=>
            {
                if(ok)
                {
                    //todo：看视频成功
                    ryw_HttpUnit.SignIn((res)=>
                    {
                        let code = res.code;
                        if(1 == code)
                        {
                            //todo:签到成功,多倍奖励
                            ryw_HttpUnit.GetSignIn((res) =>  
                            {
                                let isSign: number = res.data.is_sign;
                                let signDays: number = res.data.sign_day_num;
                                self.ryw_refreshSignInState(signDays);
                                self.ryw__signIning = false;
                            }, 
                            (res) =>  
                            {
                                self.ryw__signIning = false;
                                //todo:获取签到状态失败
                            })
                        }
                        else
                        {
                            console.log("签到失败 ： code",code);
                            self.ryw__signIning = false;
                            //todo:签到失败
                        }
    
                    },()=>
                    {
                        //todo:签到失败
                        self.ryw__signIning = false;
                    })
                }
                else
                {
                    //todo:未完整观看视频
                    self.ryw__signIning = false;
                }
            },()=>
            {
                //todo:看视屏失败
                self.ryw__signIning = false;
            })
        }
        else
        {
            ryw_HttpUnit.SignIn((res)=>
            {
                let code = res.code;
                if(1 == code)
                {
                    //todo:签到成功,正常奖励
                    self.ryw__signIning = false;
                    ryw_HttpUnit.GetSignIn((res)=>
                    {
                        let isSign : number = res.data.is_sign;
                        let signDays : number = res.data.sign_day_num;
                        self.ryw_refreshSignInState(signDays);
                    },(res)=>
                    {
                        
                    })
                }
                else
                {
                    console.log("签到失败 ： code",code);
                    self.ryw__signIning = false;
                    //todo:签到失败
                }

            },()=>
            {
                //todo:签到失败
                self.ryw__signIning = false;
            })
        }
    }

    protected ryw_onAdToggleStateChange(visible : boolean)
    {
        if(visible)
        {
            this.ryw__skipOkTag.visible = true;
            this.ryw__skipNoTag.visible = false;
        }
        else
        {
            this.ryw__skipOkTag.visible = false;
            this.ryw__skipNoTag.visible = true;
        }
    }
}