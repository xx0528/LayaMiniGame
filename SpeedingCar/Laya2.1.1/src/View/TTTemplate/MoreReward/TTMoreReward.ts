import TT_wcjtn_Template_wcjtn_View_wcjtn_Base from "../TTTemplateViewBase";
import TT_wcjtn_API from "../../../TTAPI";
import Utilit_wcjtn_ from "../../../Utilit";

export default class TT_wcjtn_More_wcjtn_Reward extends TT_wcjtn_Template_wcjtn_View_wcjtn_Base 
{
    protected _center_wcjtn_Zone : Laya.Clip = null;

    protected _ad_wcjtn_Toggle : Laya.Sprite = null;
    protected _ad_wcjtn_ToggleTag : Laya.Sprite = null;
    protected _reward_wcjtn_Btn : Laya.Sprite = null;
    protected _share_wcjtn_Btn : Laya.Sprite = null;

    protected _ad_wcjtn_ing : boolean = false;//是否正在看视频中


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

        this._ad_wcjtn_Toggle = this._center_wcjtn_Zone.getChildByName("AdToggle") as Laya.Sprite;
        this._ad_wcjtn_ToggleTag = this._ad_wcjtn_Toggle.getChildByName("Tag") as Laya.Sprite;
        this._ad_wcjtn_ToggleTag.visible = (0 == Math.floor(Math.random() * 2));
        this._reward_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("RewardBtn") as Laya.Sprite;
        this._share_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("ShareBtn") as Laya.Sprite;
    }

    add_wcjtn_Event()
    {
        super.add_wcjtn_Event();
        this._reward_wcjtn_Btn.on(Laya.Event.CLICK,this,this.on_wcjtn_Resurrection_wcjtn_Btn);
        this._ad_wcjtn_Toggle.on(Laya.Event.CLICK,this,this.on_wcjtn_Ad_wcjtn_Toggle);
        this._share_wcjtn_Btn.on(Laya.Event.CLICK,this,this.on_wcjtn_Share_wcjtn_Btn);
    }

    remove_wcjtn_Event()
    {
        super.remove_wcjtn_Event();
        this._reward_wcjtn_Btn.off(Laya.Event.CLICK,this,this.on_wcjtn_Resurrection_wcjtn_Btn);
        this._ad_wcjtn_Toggle.off(Laya.Event.CLICK,this,this.on_wcjtn_Ad_wcjtn_Toggle);
        this._share_wcjtn_Btn.off(Laya.Event.CLICK,this,this.on_wcjtn_Share_wcjtn_Btn);
    }

    protected on_wcjtn_Resurrection_wcjtn_Btn()  
    {
        if (this._ad_wcjtn_ing)
            return;//看视频中点击无效
        this._ad_wcjtn_ing = true;
        let self = this;
        if (this._ad_wcjtn_ToggleTag.visible)  {
            TT_wcjtn_API.show_wcjtn_Rewarded_wcjtn_VideoAd((ok) =>  {
                if (ok)  {
                    //todo:看视频成功
                    //todo:多倍奖励
                }
                else  {
                    //todo:未完整观看视频
                    self._ad_wcjtn_ing = false;
                }
            }, () =>  {
                    //todo:看视屏失败
                    self._ad_wcjtn_ing = false;
                })
        }
        else  {
            //todo:正常奖励
        }
    }

    protected on_wcjtn_Ad_wcjtn_Toggle()
    {
        if (this._ad_wcjtn_ing)
            return;//看视频中点击无效
        this._ad_wcjtn_ToggleTag.visible = !this._ad_wcjtn_ToggleTag.visible;
    }

    protected on_wcjtn_Share_wcjtn_Btn()
    {
        TT_wcjtn_API.share_wcjtn_Record(()=>
        {
            //todo:分享成功
        },()=>
        {
            //todo:分享失败
        })
    }
}