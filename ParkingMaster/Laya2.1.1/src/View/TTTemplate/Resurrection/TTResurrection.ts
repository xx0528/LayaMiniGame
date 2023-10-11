import TTTemplateViewBase from "../TTTemplateViewBase";
import HttpUnit from "../../../Net/HttpUnit";
import TTAPI from "../../../TTAPI";
import Utilit from "../../../Utilit";

//抖音复活界面
export default class TTResurrection extends TTTemplateViewBase
{
    protected _centerZone : Laya.Clip = null;

    protected _adToggle : Laya.Sprite = null;
    protected _adToggleTag : Laya.Sprite = null;
    protected _resurrectionBtn : Laya.Sprite = null;
    protected _skipBtn : Laya.Sprite = null;
    protected _skipOkTag : Laya.Sprite = null;
    protected _skipNoTag : Laya.Sprite = null;
    

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
        this._resurrectionBtn = this._centerZone.getChildByName("ResurrectionBtn") as Laya.Sprite;
        this._skipBtn = this._centerZone.getChildByName("SkipBtn") as Laya.Sprite;
        this._skipOkTag = this._skipBtn.getChildByName("Ok") as Laya.Sprite;
        this._skipNoTag = this._skipBtn.getChildByName("No") as Laya.Sprite;

        this._adToggleTag.visible = (0 == Math.floor(Math.random() * 2));
        this.onAdToggleStateChange(this._adToggleTag.visible);
    }

    addEvent()
    {
        super.addEvent();
        this._resurrectionBtn.on(Laya.Event.CLICK,this,this.onResurrectionBtn);
        this._adToggle.on(Laya.Event.CLICK,this,this.onAdToggle);
        this._skipBtn.on(Laya.Event.CLICK,this,this.onSkipBtn);
    }

    removeEvent()
    {
        super.removeEvent();
        this._resurrectionBtn.off(Laya.Event.CLICK,this,this.onResurrectionBtn);
        this._adToggle.off(Laya.Event.CLICK,this,this.onAdToggle);
        this._skipBtn.off(Laya.Event.CLICK,this,this.onSkipBtn);
    }

    protected onResurrectionBtn()  
    {
        if (this._ading)
            return;//看视频中点击无效
        this._ading = true;
        let self = this;
        TTAPI.showRewardedVideoAd((ok) =>  
        {
            if (ok)  {
                //todo:看视频成功
                //todo:复活
            }
            else  {
                //todo:未完整观看视频
                self._ading = false;
            }
        }, 
        () =>  
        {
            //todo:看视屏失败
            self._ading = false;
        })
    }

    protected onAdToggle()
    {
        if (this._ading)
            return;//看视频中点击无效
        this._adToggleTag.visible = !this._adToggleTag.visible;
        this.onAdToggleStateChange(this._adToggleTag.visible);
    }

    protected onSkipBtn()
    {
        if (this._ading)
            return;//看视频中点击无效
        this._ading = true;
        let self = this;
        if (this._adToggleTag.visible)  {
            TTAPI.showRewardedVideoAd((ok) =>  {
                if (ok)  {
                    //todo:看视频成功
                    //todo:复活
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
            //todo:跳过
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