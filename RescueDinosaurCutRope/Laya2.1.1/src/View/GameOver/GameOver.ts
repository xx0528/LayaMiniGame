import ViewBase from "../ViewBase";
import Util_JJKLBB_it from "../../Utilit";
import Even_JJKLBB_tMgr from "../../Event/EventMgr";
import { Event_JJKLBB_Def } from "../../Event/EventDef";
import WXAPI from "../../WXAPI";
import LevelC_JJKLBB_onfig from "../../Config/LevelConfig";
import Us_JJKLBB_er from "../../User/User";
import View_JJKLBB_Mgr, { View_JJKLBB_Def } from "../../Mgr/ViewMgr";
import Game_JJKLBB_Mgr from "../../Mgr/GameMgr";
import AppSwitch_JJKLBB_Config from "../../Config/AppSwitchConfig";;
import CachedW_JJKLBB_XBannerAd from "../../CachedWXBannerAd";
import Banne_JJKLBB_rAdView from "../../ShareAd/View/BannerAdView";
import Wudi_JJKLBB_anMgr from "../../Mgr/WudianMgr";
import A_JJKLBB_LD, { ALDEv_JJKLBB_entDef } from "../../ALD";
import Shar_JJKLBB_eAd from "../../ShareAd/ShareAd";
import MyBannerAdView from "../../ShareAd/View/MyBannerAdView";
import { FreeRewardType } from "../FreeReward/FreeRewardView";

export default class GameOver extends ViewBase {
    protected _topZone : Laya.Clip;
    protected _crystalText : Laya.Text;
    protected _energyText : Laya.Text;

    protected _centerZone : Laya.Sprite;
    protected _backBtn : Laya.Sprite;
    protected _nextBtn : Laya.Sprite;
    protected _shareBtn : Laya.Sprite;
    protected _buttons : Laya.UIComponent;
    protected _winTag : Laya.Sprite;
    protected _loseTag : Laya.Sprite;
    
    protected _nextBtnWinTag : Laya.Sprite;
    protected _nextBtnLoseTag : Laya.Sprite;
    
    protected _banner:Laya.UIComponent;
    onAwake()
    {
        this._topZone = this.owner.getChildByName("TopZone") as Laya.Clip;
        if(Util_JJKLBB_it.isIp_JJKLBB_honeX())
        {
            this._topZone.top = 70;
        }
        this._crystalText = this._topZone.getChildByName("Crystal").getChildByName("Text") as Laya.Text;
        this._energyText = this._topZone.getChildByName("Energy").getChildByName("Text") as Laya.Text;

        this._buttons = this.owner.getChildByName("Buttons") as Laya.UIComponent;
        this._centerZone = this.owner.getChildByName("CenterZone") as Laya.Sprite;
        this._backBtn = this._buttons.getChildByName("BackBtn") as Laya.Sprite;
        this._nextBtn = this._buttons.getChildByName("NextBtn") as Laya.Sprite;
        this._shareBtn =  this._buttons.getChildByName("ShareBtn") as Laya.Sprite;
        this._shareBtn.visible = false;
        // this._backBtn.visible = false;

        this._winTag = this._centerZone.getChildByName("LoopAD").getChildByName("WinTag") as Laya.Sprite;
        this._loseTag = this._centerZone.getChildByName("LoopAD").getChildByName("LoseTag") as Laya.Sprite;

        this._nextBtnWinTag = this._nextBtn.getChildByName("win") as Laya.Sprite;
        this._nextBtnLoseTag = this._nextBtn.getChildByName("lose") as Laya.Sprite;
        // this._banner = this.owner.getChildByName("BannerAD") as Laya.UIComponent;
        // A_JJKLBB_LD.aldSendOnlySingleReport(ALDEv_JJKLBB_entDef.EnterGameComplateView);
    }

    addEvent()
    {
        this._backBtn.on(Laya.Event.CLICK,this,this.onBackBtn);
        this._nextBtn.on(Laya.Event.CLICK,this,this.onNextBtn);
        // this._shareBtn.on(Laya.Event.CLICK,this,this.onShareBtn);

        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange,this,this.onCrystalChange);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange,this,this.onEnergyChange);
    }

    removeEvent()
    {
        this._backBtn.off(Laya.Event.CLICK,this,this.onBackBtn);
        this._nextBtn.off(Laya.Event.CLICK,this,this.onNextBtn);
        // this._shareBtn.off(Laya.Event.CLICK,this,this.onShareBtn);

        Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange,this,this.onCrystalChange);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange,this,this.onEnergyChange);
    }

    public openView(data?: any): void 
    {
        super.openView(data);
        this._winTag.visible = this._data.isWin;
        this._loseTag.visible = !this._data.isWin;
        this._nextBtnWinTag.visible = this._data.isWin;
        this._nextBtnLoseTag.visible = !this._data.isWin;
        this._crystalText.text = String(Us_JJKLBB_er.getCr_JJKLBB_ystal());
        this._energyText.text = String(Us_JJKLBB_er.getEn_JJKLBB_ergy());
        if(Wudi_JJKLBB_anMgr.WudianFlag){
            this.InduceClick();
        }
        else{
            if(AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().popAdSwitch == 1){
                Shar_JJKLBB_eAd.Rando_JJKLBB_mJump(1);
            }
            // this._banner.addComponent(MyBannerAdView);
        }   
    }
    InduceClick() {
        this._buttons.bottom = 0;
        this._buttons.mouseEnabled = false;
        let btnMoveTimer = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().btnMov_JJKLBB_eTimer * 1000;
        let bannerMoveTimer = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().bannerMo_JJKLBB_veTimer * 1000;
        Laya.timer.once(bannerMoveTimer, this, this.InduceMethod);
        Laya.timer.once(btnMoveTimer, this, this.MoveUp);
    }
    InduceMethod() {
        // CachedW_JJKLBB_XBannerAd.show();
    }
    MoveUp() {
        this._buttons.mouseEnabled = true;
        /* if (AdvertisementView.ShowBothAd) {
            this._buttons.bottom = 500;
        }
        else */ {
            this._buttons.bottom = 320;
        }
    }
    protected onCrystalChange(para)
    {
        var curr : number = para.curr;
        var last : number = para.last;
        this._crystalText.text = String(curr);
    }

    protected onEnergyChange(para)
    {
        var curr : number = para.curr;
        var last : number = para.last;
        this._energyText.text = String(curr);
    }

    protected onBackBtn()
    {
        var self = this;
        View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.MainView);
        self.closeView();
        
        // View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.MoreGameView,{closeFunction:()=>{
        // }},()=>
        // {
        // })
        //todo:销毁游戏
    }

    protected onNextBtn()
    {
        var levelNum = this._data.levelNum;
        if(this._data.isWin){
            var levelNum = this._data.levelNum+1;  
        }
        var data = LevelC_JJKLBB_onfig.getIns_JJKLBB_tance().getLevelCon_JJKLBB_figDataB_JJKLBB_yLevelNum(levelNum);
        if(null != data)
        {
            if(1 == data.vedioCostNoEnergy)
            {
                WXAPI.showRewardedVideoAd((ok)=>
                {
                    if(ok)
                    {
                        //不消耗体力开局
                        Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.Game_Start_JJKLBB_Game,
                            {
                                levelNum : data.levelNum,
                                costEnergy : data.costEnergy * 0,
                                crystalReward : data.getDiamond,
                            })
                        this.closeView();
                    }
                    else
                    {
                        if (Us_JJKLBB_er.getEn_JJKLBB_ergy() < data.costEnergy)  {
                            View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.FreeRewardView,
                                {
                                    rewardType: FreeRewardType.Energy
                                });
                            View_JJKLBB_Mgr.insta_JJKLBB_nce.showTips("You have no energy left");
                            return;
                        }
                        //正常开局
                        Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.Game_Start_JJKLBB_Game,
                            {
                                levelNum : data.levelNum,
                                costEnergy : data.costEnergy,
                                crystalReward : data.getDiamond,
                            })
                        this.closeView();
                    }
                },()=>
                {
                    if (Us_JJKLBB_er.getEn_JJKLBB_ergy() < data.costEnergy)  {
                        View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.FreeRewardView,
                            {
                                rewardType: FreeRewardType.Energy
                            });
                        View_JJKLBB_Mgr.insta_JJKLBB_nce.showTips("You have no energy left");
                        return;
                    }
                    //正常开局
                    Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.Game_Start_JJKLBB_Game,
                        {
                            levelNum : data.levelNum,
                            costEnergy : data.costEnergy,
                            crystalReward : data.getDiamond,
                        })
                        this.closeView();   
                })
            }
            else if(1 ==  data.vedioDoubleDiamond)
            {
                if (Us_JJKLBB_er.getEn_JJKLBB_ergy() < data.costEnergy)  {
                    View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.FreeRewardView,
                        {
                            rewardType: FreeRewardType.Energy
                        });
                    View_JJKLBB_Mgr.insta_JJKLBB_nce.showTips("You have no energy left");
                    return;
                }
                WXAPI.showRewardedVideoAd((ok)=>
                {
                    if(ok)
                    {
                        //双倍奖励开局
                        Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.Game_Start_JJKLBB_Game,
                            {
                                levelNum : data.levelNum,
                                costEnergy : data.costEnergy,
                                crystalReward : data.getDiamond * 2,
                            })
                        this.closeView();
                    }
                    else
                    {
                        //正常开局
                        Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.Game_Start_JJKLBB_Game,
                            {
                                levelNum : data.levelNum,
                                costEnergy : data.costEnergy,
                                crystalReward : data.getDiamond,
                            })
                    }
                    this.closeView();
                },()=>
                {
                    //正常开局
                    Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.Game_Start_JJKLBB_Game,
                        {
                            levelNum : data.levelNum,
                            costEnergy : data.costEnergy,
                            crystalReward : data.getDiamond,
                        })
                    this.closeView();
                })
            }
            else
            {
                if (Us_JJKLBB_er.getEn_JJKLBB_ergy() < data.costEnergy)  {
                    View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.FreeRewardView,
                        {
                            rewardType: FreeRewardType.Energy
                        });
                        View_JJKLBB_Mgr.insta_JJKLBB_nce.showTips("You have no energy left");
                    return;
                }
                //正常开局
                Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.Game_Start_JJKLBB_Game,
                    {
                        levelNum : data.levelNum,
                        costEnergy : data.costEnergy,
                        crystalReward : data.getDiamond,
                    })
                    this.closeView();
            }
        }
    }

    protected onShareBtn()
    {
        // WXAPI.share((ok)=>
        // {

        // },"","");
    }

    onClose()
    {
        super.onClose();
        Game_JJKLBB_Mgr.getI_JJKLBB_nstan_JJKLBB_ce().saveGa_JJKLBB_meData();
        // CachedW_JJKLBB_XBannerAd.hide();
    }
}