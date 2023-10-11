import { SkinCon_JJKLBB_figData } from "../../Config/SkinConfig";
import Us_JJKLBB_er from "../../User/User";
import WXAPI from "../../WXAPI";
import View_JJKLBB_Mgr, { View_JJKLBB_Def } from "../../Mgr/ViewMgr";
import NativeCallback from "../../NativeCallback";
import SoundM_JJKLBB_gr from "../../Mgr/SoundMgr";
import { Event_JJKLBB_Def } from "../../Event/EventDef";
import Even_JJKLBB_tMgr from "../../Event/EventMgr";

export default class ActorSkinBox extends Laya.Script 
{
    protected _selectBg : Laya.Sprite;
    protected _unlockBg : Laya.Sprite;
    protected _luckBg : Laya.Sprite;

    protected _crystalUnlockBtn : Laya.Sprite;
    protected _crystalCostText : Laya.Text;
    protected _vedioUnlockBtn : Laya.Sprite;
    protected _vedioCostText : Laya.Text;
    protected _showSkin:Laya.Sprite;    

    protected _data : SkinCon_JJKLBB_figData = null;

    onAwake()
    {
        this._selectBg = this.owner.getChildByName("Select") as Laya.Sprite;
        this._unlockBg = this.owner.getChildByName("Unlock") as Laya.Sprite;
        this._luckBg = this.owner.getChildByName("Lock") as Laya.Sprite;
        this._showSkin = this.owner.getChildByName("ShowSkin") as Laya.Sprite;
        this._crystalUnlockBtn = this.owner.getChildByName("CrystalUnlockBtn") as Laya.Sprite;
        this._crystalCostText = this._crystalUnlockBtn.getChildByName("Text") as Laya.Text;
        this._vedioUnlockBtn = this.owner.getChildByName("VedioUnlockBtn") as Laya.Sprite;
        this._vedioCostText = this._vedioUnlockBtn.getChildByName("Text") as Laya.Text;
    }

    onEnable()
    {
        this._unlockBg.on(Laya.Event.CLICK,this,this.onSpClick);
        this._crystalUnlockBtn.on(Laya.Event.CLICK,this,this.onCrystalUnlockBtn);
        this._vedioUnlockBtn.on(Laya.Event.CLICK,this,this.onVedioUnlockBtn);

        
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.RewardVideoFail,this,this.onRewardVidewoFail);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.RewardVideoSuccess,this,this.onRewardVidewoSuccess);
    }

    onDisable()
    {
        this._unlockBg.off(Laya.Event.CLICK,this,this.onSpClick);
        this._crystalUnlockBtn.off(Laya.Event.CLICK,this,this.onCrystalUnlockBtn);
        this._vedioUnlockBtn.off(Laya.Event.CLICK,this,this.onVedioUnlockBtn);

             
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.RewardVideoFail,this,this.onRewardVidewoFail);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.RewardVideoSuccess,this,this.onRewardVidewoSuccess);
    }

    public setData(data : SkinCon_JJKLBB_figData)
    {
        this._data = data;
        this._showSkin.loadImage("subRes/player/"+ data.ski_JJKLBB_nIndex +".png")
        this._selectBg.visible = false;
        this._unlockBg.visible = false;
        this._luckBg.visible = false;

        this._crystalUnlockBtn.visible = false;
        this._vedioUnlockBtn.visible = false;
        
        
        if(null != this._data)
        {
            if(Us_JJKLBB_er.actorSkin_JJKLBB_IsUnlock(this._data.ski_JJKLBB_nIndex))
            {
                if(Us_JJKLBB_er.getCurA_JJKLBB_ctorSkin() == this._data.ski_JJKLBB_nIndex)
                {
                    this._selectBg.visible = true;
                }
                else
                {
                    this._unlockBg.visible = true;
                }
            }
            else
            {
                this._luckBg.visible = true;
                if(this._data.costD_JJKLBB_iamond > 0 )
                {
                    this._crystalUnlockBtn.visible = true;
                    this._crystalCostText.text = String(this._data.costD_JJKLBB_iamond);
                }
                else if(this._data.ve_JJKLBB_dio > 0)
                {
                    this._vedioUnlockBtn.visible = true;
                    this._vedioCostText.text = "0/" + String(this._data.ve_JJKLBB_dio);
                }
            }
        }
    }

    protected onSpClick()
    {
        if(null != this._data && Us_JJKLBB_er.actorSkin_JJKLBB_IsUnlock(this._data.ski_JJKLBB_nIndex))
        {
            Us_JJKLBB_er.setCurA_JJKLBB_ctorSkin(this._data.ski_JJKLBB_nIndex);
        }
    }

    protected onCrystalUnlockBtn()
    {
        if(null != this._data 
            && this._data.costD_JJKLBB_iamond > 0 
            && Us_JJKLBB_er.getCr_JJKLBB_ystal() >= this._data.costD_JJKLBB_iamond)
        {
            Us_JJKLBB_er.subC_JJKLBB_rystal(this._data.costD_JJKLBB_iamond);
            var skinIndex = this._data.ski_JJKLBB_nIndex;
            if(Us_JJKLBB_er.unlock_JJKLBB_ActorSkin(skinIndex))
            {
                Us_JJKLBB_er.setCurA_JJKLBB_ctorSkin(skinIndex);
            }
        }
        else {
            View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.TipsView, "No diamonds");
        }
    }

    protected onRewardVidewoFail() {

    }

    protected onRewardVidewoSuccess() {
        if(Us_JJKLBB_er.unlock_JJKLBB_ActorSkin(this._data.ski_JJKLBB_nIndex))
        {
            Us_JJKLBB_er.setCurA_JJKLBB_ctorSkin(this._data.ski_JJKLBB_nIndex);
        }
    }

    protected onVedioUnlockBtn()
    {
        if(null != this._data && this._data.ve_JJKLBB_dio > 0)
        {
            var skinIndex = this._data.ski_JJKLBB_nIndex;
            if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
                NativeCallback.CallNativeFunc("showRewardVideo");
                Laya.SoundManager.muted = true;
            }else {
                if(Us_JJKLBB_er.unlock_JJKLBB_ActorSkin(skinIndex))
                {
                    Us_JJKLBB_er.setCurA_JJKLBB_ctorSkin(skinIndex);
                }
            }

            // WXAPI.showRewardedVideoAd((ok)=>
            // {
            //     if(ok)
            //     {
            //         if(Us_JJKLBB_er.unlock_JJKLBB_ActorSkin(skinIndex))
            //         {
            //             Us_JJKLBB_er.setCurA_JJKLBB_ctorSkin(skinIndex);
            //         }
            //     }
            // },()=>
            // {

            // })
        }
    }
}