import ryw_KRQ_ViewComBase from "./KRQ_ViewComBase";
import ryw_KRQ_VLoopAd from "../Com/KRQ_LoopAd/KRQ_VLoopAd";

export default class ryw_KRQ_SidePull extends ryw_KRQ_ViewComBase
{
    protected ryw__krqVLoopAd : ryw_KRQ_VLoopAd = null;
    protected ryw__pullBtn : Laya.Sprite = null;

    onAwake()
    {
        this.ryw__krqVLoopAd = this.ryw_Sprite.getChildByName("KRQ_VLoopAd").getComponent(ryw_KRQ_VLoopAd);
        this.ryw__pullBtn = this.ryw__krqVLoopAd.ryw_Sprite.getChildByName("PullBtn") as Laya.Sprite;
        this.ryw__krqVLoopAd.ryw_Sprite.x = -this.ryw__krqVLoopAd.ryw_Sprite.width;
    }   

    onEnable()
    {
        this.ryw__pullBtn.on(Laya.Event.CLICK,this,this.ryw_onPullBtn);
    }

    onDisable()
    {
        this.ryw__pullBtn.off(Laya.Event.CLICK,this,this.ryw_onPullBtn);
    }

    protected ryw_onPullBtn()
    {
        if(this.ryw__krqVLoopAd.ryw_Sprite.x < 0)
        {
            this.ryw_pull();
        }
        else
        {
            this.ryw_push();
        }
    }

    public ryw_pull()
    {
        Laya.Tween.to(this.ryw__krqVLoopAd.ryw_Sprite,
            {
                x: 0
            }, 200, Laya.Ease.linearNone, null, 0, true)
    }

    public ryw_push()
    {
        Laya.Tween.to(this.ryw__krqVLoopAd.ryw_Sprite,
            {
                x: -this.ryw__krqVLoopAd.ryw_Sprite.width
            }, 200, Laya.Ease.linearNone, null, 0, true)
    }

    protected ryw_onShareAdFail()
    {
        this.ryw_pull();
    }
}