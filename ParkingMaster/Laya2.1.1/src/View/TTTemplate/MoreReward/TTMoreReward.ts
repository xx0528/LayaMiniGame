import TTTemplateViewBase from "../TTTemplateViewBase";
import TTAPI from "../../../TTAPI";
import Utilit from "../../../Utilit";

export default class TTMoreReward extends TTTemplateViewBase 
{
    protected _centerZone : Laya.Clip = null;

    protected _adToggle : Laya.Sprite = null;
    protected _adToggleTag : Laya.Sprite = null;
    protected _rewardBtn : Laya.Sprite = null;
    protected _shareBtn : Laya.Sprite = null;

    protected _ading : boolean = false;//是否正在看视频中


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

        this._adToggle = this._centerZone.getChildByName("AdToggle") as Laya.Sprite;
        this._adToggleTag = this._adToggle.getChildByName("Tag") as Laya.Sprite;
        this._adToggleTag.visible = (0 == Math.floor(Math.random() * 2));
        this._rewardBtn = this._centerZone.getChildByName("RewardBtn") as Laya.Sprite;
        this._shareBtn = this._centerZone.getChildByName("ShareBtn") as Laya.Sprite;
    }

    addEvent()
    {
        super.addEvent();
        this._rewardBtn.on(Laya.Event.CLICK,this,this.onResurrectionBtn);
        this._adToggle.on(Laya.Event.CLICK,this,this.onAdToggle);
        this._shareBtn.on(Laya.Event.CLICK,this,this.onShareBtn);
    }

    removeEvent()
    {
        super.removeEvent();
        this._rewardBtn.off(Laya.Event.CLICK,this,this.onResurrectionBtn);
        this._adToggle.off(Laya.Event.CLICK,this,this.onAdToggle);
        this._shareBtn.off(Laya.Event.CLICK,this,this.onShareBtn);
    }

    protected onResurrectionBtn()  
    {
        if (this._ading)
            return;//看视频中点击无效
        this._ading = true;
        let self = this;
        if (this._adToggleTag.visible)  {
            TTAPI.showRewardedVideoAd((ok) =>  {
                if (ok)  {
                    //todo:看视频成功
                    //todo:多倍奖励
                }
                else  {
                    //todo:未完整观看视频
                    self._ading = false;
                }
            }, () =>  {
                    //todo:看视屏失败
                    self._ading = false;
                })
        }
        else  {
            //todo:正常奖励
        }
    }

    protected onAdToggle()
    {
        if (this._ading)
            return;//看视频中点击无效
        this._adToggleTag.visible = !this._adToggleTag.visible;
    }

    protected onShareBtn()
    {
        TTAPI.shareRecord(()=>
        {
            //todo:分享成功
        },()=>
        {
            //todo:分享失败
        })
    }
}