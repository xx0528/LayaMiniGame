import ryw_TTTemplateViewBase from "../TTTemplateViewBase";
import ryw_HttpUnit from "../../../Net/HttpUnit";
import ryw_TTAPI from "../../../TTAPI";
import ryw_Utilit from "../../../Utilit";

//抖音复活界面
export default class ryw_TTResurrection extends ryw_TTTemplateViewBase
{
    protected ryw__centerZone : Laya.Clip = null;

    protected ryw__adToggle : Laya.Sprite = null;
    protected ryw__adToggleTag : Laya.Sprite = null;
    protected ryw__resurrectionBtn : Laya.Sprite = null;
    protected ryw__skipBtn : Laya.Sprite = null;
    protected ryw__skipOkTag : Laya.Sprite = null;
    protected ryw__skipNoTag : Laya.Sprite = null;
    

    protected ryw__ading : boolean = false;//是否正在看视频中

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

        this.ryw__adToggle = this.ryw__centerZone.getChildByName("AdToggle") as Laya.Sprite;
        this.ryw__adToggleTag = this.ryw__adToggle.getChildByName("Tag") as Laya.Sprite;
        this.ryw__resurrectionBtn = this.ryw__centerZone.getChildByName("ResurrectionBtn") as Laya.Sprite;
        this.ryw__skipBtn = this.ryw__centerZone.getChildByName("SkipBtn") as Laya.Sprite;
        this.ryw__skipOkTag = this.ryw__skipBtn.getChildByName("Ok") as Laya.Sprite;
        this.ryw__skipNoTag = this.ryw__skipBtn.getChildByName("No") as Laya.Sprite;

        this.ryw__adToggleTag.visible = (0 == Math.floor(Math.random() * 2));
        this.ryw_onAdToggleStateChange(this.ryw__adToggleTag.visible);
    }

    ryw_addEvent()
    {
        super.ryw_addEvent();
        this.ryw__resurrectionBtn.on(Laya.Event.CLICK,this,this.ryw_onResurrectionBtn);
        this.ryw__adToggle.on(Laya.Event.CLICK,this,this.ryw_onAdToggle);
        this.ryw__skipBtn.on(Laya.Event.CLICK,this,this.ryw_onSkipBtn);
    }

    ryw_removeEvent()
    {
        super.ryw_removeEvent();
        this.ryw__resurrectionBtn.off(Laya.Event.CLICK,this,this.ryw_onResurrectionBtn);
        this.ryw__adToggle.off(Laya.Event.CLICK,this,this.ryw_onAdToggle);
        this.ryw__skipBtn.off(Laya.Event.CLICK,this,this.ryw_onSkipBtn);
    }

    protected ryw_onResurrectionBtn()  
    {
        if (this.ryw__ading)
            return;//看视频中点击无效
        this.ryw__ading = true;
        let self = this;
        ryw_TTAPI.ryw_showRewardedVideoAd((ok) =>  
        {
            if (ok)  {
                //todo:看视频成功
                //todo:复活
            }
            else  {
                //todo:未完整观看视频
                self.ryw__ading = false;
            }
        }, 
        () =>  
        {
            //todo:看视屏失败
            self.ryw__ading = false;
        })
    }

    protected ryw_onAdToggle()
    {
        if (this.ryw__ading)
            return;//看视频中点击无效
        this.ryw__adToggleTag.visible = !this.ryw__adToggleTag.visible;
        this.ryw_onAdToggleStateChange(this.ryw__adToggleTag.visible);
    }

    protected ryw_onSkipBtn()
    {
        if (this.ryw__ading)
            return;//看视频中点击无效
        this.ryw__ading = true;
        let self = this;
        if (this.ryw__adToggleTag.visible)  {
            ryw_TTAPI.ryw_showRewardedVideoAd((ok) =>  {
                if (ok)  {
                    //todo:看视频成功
                    //todo:复活
                }
                else  {
                    //todo:未完整观看视频
                    self.ryw__ading = false;
                }
            }, () =>  {
                    //todo:看视屏失败
                    self.ryw__ading = false;
                })
        }
        else  {
            //todo:跳过
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