import KRQ__wcjtn_View_wcjtn_Com_wcjtn_Base from "./KRQ_ViewComBase";
import KRQ_wcjtn__V_wcjtn_Loop_wcjtn_Ad from "../Com/KRQ_LoopAd/KRQ_VLoopAd";

export default class KRQ_wcjtn__Side_wcjtn_Pull extends KRQ__wcjtn_View_wcjtn_Com_wcjtn_Base
{
    protected _krq_wcjtn_VLoopAd : KRQ_wcjtn__V_wcjtn_Loop_wcjtn_Ad = null;
    protected _pull_wcjtn_Btn : Laya.Sprite = null;

    onAwake()
    {
        this._krq_wcjtn_VLoopAd = this._wcjtn_Sprite_wcjtn_.getChildByName("KRQ_VLoopAd").getComponent(KRQ_wcjtn__V_wcjtn_Loop_wcjtn_Ad);
        this._pull_wcjtn_Btn = this._krq_wcjtn_VLoopAd._wcjtn_Sprite_wcjtn_.getChildByName("PullBtn") as Laya.Sprite;
        this._krq_wcjtn_VLoopAd._wcjtn_Sprite_wcjtn_.x = -this._krq_wcjtn_VLoopAd._wcjtn_Sprite_wcjtn_.width;
    }   

    onEnable()
    {
        this._pull_wcjtn_Btn.on(Laya.Event.CLICK,this,this.onPull_wcjtn_Btn);
    }

    onDisable()
    {
        this._pull_wcjtn_Btn.off(Laya.Event.CLICK,this,this.onPull_wcjtn_Btn);
    }

    protected onPull_wcjtn_Btn()
    {
        if(this._krq_wcjtn_VLoopAd._wcjtn_Sprite_wcjtn_.x < 0)
        {
            this._wcjtn_pull_wcjtn_();
        }
        else
        {
            this._wcjtn_push_wcjtn_();
        }
    }

    public _wcjtn_pull_wcjtn_()
    {
        Laya.Tween.to(this._krq_wcjtn_VLoopAd._wcjtn_Sprite_wcjtn_,
            {
                x: 0
            }, 200, Laya.Ease.linearNone, null, 0, true)
    }

    public _wcjtn_push_wcjtn_()
    {
        Laya.Tween.to(this._krq_wcjtn_VLoopAd._wcjtn_Sprite_wcjtn_,
            {
                x: -this._krq_wcjtn_VLoopAd._wcjtn_Sprite_wcjtn_.width
            }, 200, Laya.Ease.linearNone, null, 0, true)
    }

    protected on_wcjtn_ShareAd_wcjtn_Fail()
    {
        this._wcjtn_pull_wcjtn_();
    }
}