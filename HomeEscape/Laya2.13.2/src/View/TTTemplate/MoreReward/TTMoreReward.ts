import ryw_TTTemplateViewBase from "../TTTemplateViewBase";
import ryw_TTAPI from "../../../TTAPI";
import ryw_Utilit from "../../../Utilit";

export default class ryw_TTMoreReward extends ryw_TTTemplateViewBase 
{
    protected ryw__centerZone : Laya.Clip = null;

    protected ryw__adToggle : Laya.Sprite = null;
    protected ryw__adToggleTag : Laya.Sprite = null;
    protected ryw__rewardBtn : Laya.Sprite = null;
    protected ryw__shareBtn : Laya.Sprite = null;

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
        this.ryw__adToggleTag.visible = (0 == Math.floor(Math.random() * 2));
        this.ryw__rewardBtn = this.ryw__centerZone.getChildByName("RewardBtn") as Laya.Sprite;
        this.ryw__shareBtn = this.ryw__centerZone.getChildByName("ShareBtn") as Laya.Sprite;
    }

    ryw_addEvent()
    {
        super.ryw_addEvent();
        this.ryw__rewardBtn.on(Laya.Event.CLICK,this,this.ryw_onResurrectionBtn);
        this.ryw__adToggle.on(Laya.Event.CLICK,this,this.ryw_onAdToggle);
        this.ryw__shareBtn.on(Laya.Event.CLICK,this,this.ryw_onShareBtn);
    }

    ryw_removeEvent()
    {
        super.ryw_removeEvent();
        this.ryw__rewardBtn.off(Laya.Event.CLICK,this,this.ryw_onResurrectionBtn);
        this.ryw__adToggle.off(Laya.Event.CLICK,this,this.ryw_onAdToggle);
        this.ryw__shareBtn.off(Laya.Event.CLICK,this,this.ryw_onShareBtn);
    }

    protected ryw_onResurrectionBtn()  
    {
        if (this.ryw__ading)
            return;//看视频中点击无效
        this.ryw__ading = true;
        let self = this;
        if (this.ryw__adToggleTag.visible)  {
            ryw_TTAPI.ryw_showRewardedVideoAd((ok) =>  {
                if (ok)  {
                    //todo:看视频成功
                    //todo:多倍奖励
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
            //todo:正常奖励
        }
    }

    protected ryw_onAdToggle()
    {
        if (this.ryw__ading)
            return;//看视频中点击无效
        this.ryw__adToggleTag.visible = !this.ryw__adToggleTag.visible;
    }

    protected ryw_onShareBtn()
    {
        ryw_TTAPI.ryw_shareRecord(()=>
        {
            //todo:分享成功
        },()=>
        {
            //todo:分享失败
        })
    }
}