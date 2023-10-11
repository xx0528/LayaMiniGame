import TTTemplateViewBase from "../TTTemplateViewBase";
import HttpUnit from "../../../Net/HttpUnit";
import TTAPI from "../../../TTAPI";
import Utilit from "../../../Utilit";


//抖音签到界面
export default class TTSignIn extends TTTemplateViewBase 
{
    protected _centerZone : Laya.Clip = null;
    
    protected _signIconRoot: Laya.Sprite = null;
    protected _signIcons : Array<Laya.Sprite> = [];
    protected _signMasks : Array<Laya.Sprite> = [];

    protected _adToggle : Laya.Sprite = null;
    protected _adToggleTag : Laya.Sprite = null;
    protected _signInBtn : Laya.Sprite = null;
    protected _skipBtn : Laya.Sprite = null;
    protected _skipOkTag : Laya.Sprite = null;
    protected _skipNoTag : Laya.Sprite = null;

    protected _signedTag : Laya.Sprite = null;

    protected _signIning : boolean = false;//是否正在签到中

    onAwake()
    {
        this._topZone = this.View.getChildByName("TopZone") as Laya.Clip;
        this._centerZone = this.View.getChildByName("CenterZone") as Laya.Clip;
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            if(Utilit.isIphoneX())
            {
                this._centerZone.top =  this._centerZone.top + 75;
            }
        }
        
        this._signIconRoot = this._centerZone.getChildByName("SignIconRoot") as Laya.Sprite;
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

        this._adToggle = this._centerZone.getChildByName("AdToggle") as Laya.Sprite;
        this._adToggleTag = this._adToggle.getChildByName("Tag") as Laya.Sprite;
        this._signInBtn = this._centerZone.getChildByName("SignInBtn") as Laya.Sprite;
        this._skipBtn = this._centerZone.getChildByName("SkipBtn") as Laya.Sprite;
        this._skipOkTag = this._skipBtn.getChildByName("Ok") as Laya.Sprite;
        this._skipNoTag = this._skipBtn.getChildByName("No") as Laya.Sprite;

        this._adToggleTag.visible = (0 == Math.floor(Math.random() * 2));
        this.onAdToggleStateChange(this._adToggleTag.visible);

        this._signedTag = this._centerZone.getChildByName("SignedTag") as Laya.Sprite;
        this._signedTag.visible = false
    }

    onStart()
    {
        super.onStart();
        let self = this;
        HttpUnit.GetSignIn((res)=>
        {
            let isSign : number = res.data.is_sign;
            let signDays : number = res.data.sign_day_num;
            self.refreshSignInState(signDays);
        },(res)=>
        {
            //todo:获取签到状态失败
        })
    }

    addEvent()
    {
        super.addEvent();
        this._signInBtn.on(Laya.Event.CLICK,this,this.onSignInBtn);
        this._adToggle.on(Laya.Event.CLICK,this,this.onAdToggle);
        this._skipBtn.on(Laya.Event.CLICK,this,this.onSkipBtn);
    }

    removeEvent()
    {
        super.removeEvent();
        this._signInBtn.off(Laya.Event.CLICK,this,this.onSignInBtn);
        this._adToggle.off(Laya.Event.CLICK,this,this.onAdToggle);
        this._skipBtn.off(Laya.Event.CLICK,this,this.onSkipBtn);
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
        TTAPI.showRewardedVideoAd((ok)=>
        {
            if(ok)
            {
                //todo：看视频成功
                HttpUnit.SignIn((res)=>
                {
                    let code = res.code;
                    if(1 == code)
                    {
                        //todo:签到成功,多倍奖励
                        HttpUnit.GetSignIn((res)=>
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
        this._adToggleTag.visible = !this._adToggleTag.visible;
        this.onAdToggleStateChange(this._adToggleTag.visible);
    }

    protected onSkipBtn()
    {
        if(this._signIning)
            return;//请在签到中点击无效
        this._signIning = true;
        let self = this;
        if(this._adToggleTag.visible)
        {
            TTAPI.showRewardedVideoAd((ok)=>
            {
                if(ok)
                {
                    //todo：看视频成功
                    HttpUnit.SignIn((res)=>
                    {
                        let code = res.code;
                        if(1 == code)
                        {
                            //todo:签到成功,多倍奖励
                            HttpUnit.GetSignIn((res) =>  
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
            HttpUnit.SignIn((res)=>
            {
                let code = res.code;
                if(1 == code)
                {
                    //todo:签到成功,正常奖励
                    self._signIning = false;
                    HttpUnit.GetSignIn((res)=>
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

    protected onAdToggleStateChange(visible : boolean)
    {
        if(visible)
        {
            this._skipOkTag.visible = true;
            this._skipNoTag.visible = false;
        }
        else
        {
            this._skipOkTag.visible = false;
            this._skipNoTag.visible = true;
        }
    }
}