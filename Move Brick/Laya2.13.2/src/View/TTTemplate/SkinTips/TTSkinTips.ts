import TT_ZMDGJ_Template_ZMDGJ_View_ZMDGJ_Base from "../TTTemplateViewBase";
import TT_ZMDGJ_API from "../../../TTAPI";
import Utilit_ZMDGJ_ from "../../../Utilit";

export default class TT_ZMDGJ_SkinTips extends TT_ZMDGJ_Template_ZMDGJ_View_ZMDGJ_Base
{
    protected _center_ZMDGJ_Zone : Laya.Clip = null;

    protected _ad_ZMDGJ_Toggle : Laya.Sprite = null;
    protected _ad_ZMDGJ_ToggleTag : Laya.Sprite = null;
    protected _okBtn : Laya.Sprite = null;
    protected _skip_ZMDGJ_Btn : Laya.Sprite = null;
    protected _skip_ZMDGJ_OkTag : Laya.Sprite = null;
    protected _skip_ZMDGJ_NoTag : Laya.Sprite = null;

    protected _skinAnchor : Laya.Clip = null;

    protected _ad_ZMDGJ_ing : boolean = false;//是否正在看视频中

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

        this._ad_ZMDGJ_Toggle = this._center_ZMDGJ_Zone.getChildByName("AdToggle") as Laya.Sprite;
        this._ad_ZMDGJ_ToggleTag = this._ad_ZMDGJ_Toggle.getChildByName("Tag") as Laya.Sprite;
        this._okBtn = this._center_ZMDGJ_Zone.getChildByName("OkBtn") as Laya.Sprite;
        this._skip_ZMDGJ_Btn = this._center_ZMDGJ_Zone.getChildByName("SkipBtn") as Laya.Sprite;
        this._skip_ZMDGJ_OkTag = this._skip_ZMDGJ_Btn.getChildByName("Ok") as Laya.Sprite;
        this._skip_ZMDGJ_NoTag = this._skip_ZMDGJ_Btn.getChildByName("No") as Laya.Sprite;

        this._ad_ZMDGJ_ToggleTag.visible = (0 == Math.floor(Math.random() * 2));
        this.on_ZMDGJ_AdToggle_ZMDGJ_StateChange(this._ad_ZMDGJ_ToggleTag.visible);

        this._skinAnchor = this._center_ZMDGJ_Zone.getChildByName("SkinAnchor") as Laya.Clip;
    }

    add_ZMDGJ_Event()
    {
        super.add_ZMDGJ_Event();
        this._okBtn.on(Laya.Event.CLICK,this,this.onOkBtn);
        this._ad_ZMDGJ_Toggle.on(Laya.Event.CLICK,this,this.onAdToggle);
        this._skip_ZMDGJ_Btn.on(Laya.Event.CLICK,this,this.onSkipText);
    }

    remove_ZMDGJ_Event()
    {
        super.remove_ZMDGJ_Event();
        this._okBtn.off(Laya.Event.CLICK,this,this.onOkBtn);
        this._ad_ZMDGJ_Toggle.off(Laya.Event.CLICK,this,this.onAdToggle);
        this._skip_ZMDGJ_Btn.off(Laya.Event.CLICK,this,this.onSkipText);
    }

    protected onOkBtn()  
    {
        if (this._ad_ZMDGJ_ing)
            return;//看视频中点击无效
        this._ad_ZMDGJ_ing = true;
        let self = this;
        TT_ZMDGJ_API.show_ZMDGJ_Rewarded_ZMDGJ_VideoAd((ok) =>  
        {
            if (ok)  {
                //todo:看视频成功
                //todo:试用皮肤
            }
            else  {
                //todo:未完整观看视频
                self._ad_ZMDGJ_ing = false;
            }
        }, 
        () =>  
        {
            //todo:看视屏失败
            self._ad_ZMDGJ_ing = false;
        })
    }

    protected onAdToggle()
    {
        if (this._ad_ZMDGJ_ing)
            return;//看视频中点击无效
        this._ad_ZMDGJ_ToggleTag.visible = !this._ad_ZMDGJ_ToggleTag.visible;
        this.on_ZMDGJ_AdToggle_ZMDGJ_StateChange(this._ad_ZMDGJ_ToggleTag.visible);
    }

    protected onSkipText()
    {
        if (this._ad_ZMDGJ_ing)
            return;//看视频中点击无效
        this._ad_ZMDGJ_ing = true;
        let self = this;
        if (this._ad_ZMDGJ_ToggleTag.visible)  {
            TT_ZMDGJ_API.show_ZMDGJ_Rewarded_ZMDGJ_VideoAd((ok) =>  {
                if (ok)  {
                    //todo:看视频成功
                    //todo:试用皮肤
                }
                else  {
                    //todo:未完整观看视频
                    self._ad_ZMDGJ_ing = false;
                }
            }, () =>  {
                    //todo:看视屏失败
                    self._ad_ZMDGJ_ing = false;
                })
        }
        else  {
            //todo:正常进入游戏，不试用皮肤
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