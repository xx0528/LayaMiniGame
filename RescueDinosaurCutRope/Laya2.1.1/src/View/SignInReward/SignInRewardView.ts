import ViewBase from "../ViewBase";
import Us_JJKLBB_er from "../../User/User";
import WXAPI from "../../WXAPI";
import GameComm_JJKLBB_onConfig from "../../Config/GameCommonConfig";

export default class SignInRewardView extends ViewBase
{

    protected _centerZone : Laya.Clip;
    protected _signInBtn : Laya.Sprite;
    protected _normalSignInBtn : Laya.Sprite;
    protected _rewardText : Laya.Text;
    protected _closeBtn : Laya.Sprite;

    onAwake()
    {
        this._centerZone = this.owner.getChildByName("CenterZone") as Laya.Clip;
        this._signInBtn = this._centerZone.getChildByName("SignInBtn") as Laya.Sprite;
        this._normalSignInBtn = this._centerZone.getChildByName("NormalSignInBtn") as Laya.Sprite;
        this._rewardText = this._centerZone.getChildByName("RewardText") as Laya.Text;
        this._closeBtn = this._centerZone.getChildByName("CloseBtn") as Laya.Sprite;
    }

    addEvent()
    {
        this._signInBtn.on(Laya.Event.CLICK,this,this.onSignInBtn);
        this._normalSignInBtn.on(Laya.Event.CLICK,this,this.onNormalSignInBtn);
        this._closeBtn.on(Laya.Event.CLICK,this,this.closeView);
    }

    removeEvent()
    {
        this._signInBtn.off(Laya.Event.CLICK,this,this.onSignInBtn);
        this._normalSignInBtn.off(Laya.Event.CLICK,this,this.onNormalSignInBtn);
        this._closeBtn.off(Laya.Event.CLICK,this,this.closeView);
    }

    public openView(data?: any): void 
    {
        super.openView(data);
        this._rewardText.text = "x" + GameComm_JJKLBB_onConfig.getIn_JJKLBB_stance().getGame_JJKLBB_ConfigData().signGetDiamond;
    }

    protected onSignInBtn()
    {
        if(this.canSignIn())
        {
            var self = this;
            this._signInBtn.visible = false;
            WXAPI.showRewardedVideoAd((ok)=>
            {   
                if(ok)
                {
                    Us_JJKLBB_er.setlast_JJKLBB_SignInTime(Date.now());
                    var reward = GameComm_JJKLBB_onConfig.getIn_JJKLBB_stance().getGame_JJKLBB_ConfigData().signGetDiamond;
                    Us_JJKLBB_er.addCrys_JJKLBB_tal(reward * 3);
                }
                else
                {

                }
                self.refreshSignInBtnState()
            },()=>
            {
                self.refreshSignInBtnState()
            })
        }
    }

    protected onNormalSignInBtn()
    {
        if(this.canSignIn())
        {
            Us_JJKLBB_er.setlast_JJKLBB_SignInTime(Date.now());
            var reward = GameComm_JJKLBB_onConfig.getIn_JJKLBB_stance().getGame_JJKLBB_ConfigData().signGetDiamond;
            Us_JJKLBB_er.addCrys_JJKLBB_tal(reward);
            this.refreshSignInBtnState()
        }
    }

    protected canSignIn() : boolean
    {
        var lastDate = new Date(Us_JJKLBB_er.getlast_JJKLBB_SignInTime());
        var curDate = new Date(Date.now());
        if(Date.now() - Us_JJKLBB_er.getlast_JJKLBB_SignInTime() >= 86400000 || lastDate.getUTCDay() != curDate.getUTCDay())
        {
            return true;
        }
        return false;
    }

    protected refreshSignInBtnState()
    {
        this._signInBtn.visible = this.canSignIn();
    }
}