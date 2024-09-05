import ryw_TTReward from "./TTReward";

export default class ryw_RewardBox extends Laya.Script 
{
    protected ryw__view : ryw_TTReward = null;
    
    public get ryw_AdTag()
    {
        return this.ryw__adTag;
    }
    protected ryw__adTag : Laya.Sprite = null;

    public ryw_init(view : ryw_TTReward)
    {
        this.ryw__view = view;
        this.ryw__adTag = this.owner.getChildByName("AdTag") as Laya.Sprite;
    }

    onEnable()
    {
        (this.owner as Laya.Sprite).on(Laya.Event.CLICK,this,this.ryw_onSelfClick);
    }

    onDisable()
    {
        (this.owner as Laya.Sprite).off(Laya.Event.CLICK,this,this.ryw_onSelfClick);
    }

    protected ryw_onSelfClick()
    {
        if(null != this.ryw__view)
        {
            this.ryw__view.onRewardBoxClick(this);
        }
    }

}