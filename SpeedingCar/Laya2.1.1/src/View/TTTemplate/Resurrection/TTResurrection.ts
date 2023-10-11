import TT_wcjtn_Template_wcjtn_View_wcjtn_Base from "../TTTemplateViewBase";
import Http_wcjtn_Unit from "../../../Net/HttpUnit";
import TT_wcjtn_API from "../../../TTAPI";
import Utilit_wcjtn_ from "../../../Utilit";

//抖音复活界面
export default class TT_wcjtn_Resurrection extends TT_wcjtn_Template_wcjtn_View_wcjtn_Base
{
    protected _center_wcjtn_Zone : Laya.Clip = null;

    protected _ad_wcjtn_Toggle : Laya.Sprite = null;
    protected _ad_wcjtn_ToggleTag : Laya.Sprite = null;
    protected _resurrection_wcjtn_Btn : Laya.Sprite = null;
    protected _skip_wcjtn_Btn : Laya.Sprite = null;
    protected _skip_wcjtn_OkTag : Laya.Sprite = null;
    protected _skip_wcjtn_NoTag : Laya.Sprite = null;
    

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
        this._resurrection_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("ResurrectionBtn") as Laya.Sprite;
        this._skip_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("SkipBtn") as Laya.Sprite;
        this._skip_wcjtn_OkTag = this._skip_wcjtn_Btn.getChildByName("Ok") as Laya.Sprite;
        this._skip_wcjtn_NoTag = this._skip_wcjtn_Btn.getChildByName("No") as Laya.Sprite;

        this._ad_wcjtn_ToggleTag.visible = (0 == Math.floor(Math.random() * 2));
        this.on_wcjtn_AdToggle_wcjtn_StateChange(this._ad_wcjtn_ToggleTag.visible);
    }

    add_wcjtn_Event()
    {
        super.add_wcjtn_Event();
        this._resurrection_wcjtn_Btn.on(Laya.Event.CLICK,this,this.on_wcjtn_Resurrection_wcjtn_Btn);
        this._ad_wcjtn_Toggle.on(Laya.Event.CLICK,this,this.on_wcjtn_Ad_wcjtn_Toggle);
        this._skip_wcjtn_Btn.on(Laya.Event.CLICK,this,this.on_wcjtn_SkipBtn);
    }

    remove_wcjtn_Event()
    {
        super.remove_wcjtn_Event();
        this._resurrection_wcjtn_Btn.off(Laya.Event.CLICK,this,this.on_wcjtn_Resurrection_wcjtn_Btn);
        this._ad_wcjtn_Toggle.off(Laya.Event.CLICK,this,this.on_wcjtn_Ad_wcjtn_Toggle);
        this._skip_wcjtn_Btn.off(Laya.Event.CLICK,this,this.on_wcjtn_SkipBtn);
    }

    protected on_wcjtn_Resurrection_wcjtn_Btn()  
    {
        if (this._ad_wcjtn_ing)
            return;//看视频中点击无效
        this._ad_wcjtn_ing = true;
        let self = this;
        TT_wcjtn_API.show_wcjtn_Rewarded_wcjtn_VideoAd((ok) =>  
        {
            if (ok)  {
                //todo:看视频成功
                //todo:复活
            }
            else  {
                //todo:未完整观看视频
                self._ad_wcjtn_ing = false;
            }
        }, 
        () =>  
        {
            //todo:看视屏失败
            self._ad_wcjtn_ing = false;
        })
    }

    protected on_wcjtn_Ad_wcjtn_Toggle()
    {
        if (this._ad_wcjtn_ing)
            return;//看视频中点击无效
        this._ad_wcjtn_ToggleTag.visible = !this._ad_wcjtn_ToggleTag.visible;
        this.on_wcjtn_AdToggle_wcjtn_StateChange(this._ad_wcjtn_ToggleTag.visible);
    }

    protected on_wcjtn_SkipBtn()
    {
        if (this._ad_wcjtn_ing)
            return;//看视频中点击无效
        this._ad_wcjtn_ing = true;
        let self = this;
        if (this._ad_wcjtn_ToggleTag.visible)  {
            TT_wcjtn_API.show_wcjtn_Rewarded_wcjtn_VideoAd((ok) =>  {
                if (ok)  {
                    //todo:看视频成功
                    //todo:复活
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
            //todo:跳过
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