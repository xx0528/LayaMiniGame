import KRQ_ViewComBase from "./KRQ_ViewComBase";
import KRQ_VLoopAd from "../Com/KRQ_LoopAd/KRQ_VLoopAd";

export default class KRQ_SidePull extends KRQ_ViewComBase
{
    protected _krqVLoopAd : KRQ_VLoopAd = null;
    protected _pullBtn : Laya.Sprite = null;

    onAwake()
    {
        this._krqVLoopAd = this.Sprite.getChildByName("KRQ_VLoopAd").getComponent(KRQ_VLoopAd);
        this._pullBtn = this._krqVLoopAd.Sprite.getChildByName("PullBtn") as Laya.Sprite;
        this._krqVLoopAd.Sprite.x = -this._krqVLoopAd.Sprite.width;
    }   

    onEnable()
    {
        this._pullBtn.on(Laya.Event.CLICK,this,this.onPullBtn);
    }

    onDisable()
    {
        this._pullBtn.off(Laya.Event.CLICK,this,this.onPullBtn);
    }

    protected onPullBtn()
    {
        if(this._krqVLoopAd.Sprite.x < 0)
        {
            this.pull();
        }
        else
        {
            this.push();
        }
    }

    public pull()
    {
        Laya.Tween.to(this._krqVLoopAd.Sprite,
            {
                x: 0
            }, 200, Laya.Ease.linearNone, null, 0, true)
    }

    public push()
    {
        Laya.Tween.to(this._krqVLoopAd.Sprite,
            {
                x: -this._krqVLoopAd.Sprite.width
            }, 200, Laya.Ease.linearNone, null, 0, true)
    }

    protected onShareAdFail()
    {
        this.pull();
    }
}