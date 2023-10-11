import ViewBase from "../../View/ViewBase";
import View_sdlyg_Mgr, { View_sdlyg_Def } from "../../Mgr/ViewMgr";
import GameManager from "../Manager/GameManager";
import PropManager from "../Manager/PropManager";
import Us_sdlyg_er from "../../User/User";
import PlayerManager from "../Manager/PlayerManager";
import WXAPI from "../../WXAPI";
import Event_sdlyg_Mgr from "../../Event/EventMgr";
import { Event_sdlyg_Def } from "../../Event/EventDef";
import GameSwitchConfig from "../../Config/GameSwitchConfig";
import NativeCallback from "../../NativeCallback";

export default class TrySkinView extends ViewBase {

    private btn_giveUp:Laya.Button;
    private try0:Laya.Image;
    private try0_name:string;
    private try0_icon:Laya.Image;

    private try1:Laya.Image;
    private try1_name:string;
    private try1_icon:Laya.Image;

    private m_rewardType: number = 0;
    

    constructor() { super(); }
    
    onAwake(){
        this.btn_giveUp = this.owner.getChildByName("btn_giveUp") as Laya.Button;
        let try_window = this.owner.getChildByName("try_window") as Laya.Image;
        this.try0 = try_window.getChildByName("try0") as Laya.Image;
        this.try1 = try_window.getChildByName("try1") as Laya.Image;
        this.try0_icon = this.try0.getChildByName("display").getChildByName("icon") as Laya.Image;
        this.try1_icon = this.try1.getChildByName("display").getChildByName("icon") as Laya.Image;
        
        if (GameManager.Instance().getHighView())  {
        }
    }

    onStart(){
        super.onStart();
        this.m_rewardType = 0;
        //============================================================设置图片=================
        do {
            let id = Math.floor(Math.random()*PropManager.getInstance().getPropTypeNum());     //随机得到一个类型的 id
            let amount = PropManager.getInstance().getPropBase(id).amount;
            this.try0_name = PropManager.getInstance().getPropBase(id).type+Math.floor(Math.random()*amount);
        } while (Us_sdlyg_er.ownerProp(this.try0_name));
        this.try0_icon.skin = "subRes/propsLogo/"+this.try0_name+".png";
        do {
            let id = Math.floor(Math.random()*PropManager.getInstance().getPropTypeNum());     //随机得到一个类型的 id
            let amount = PropManager.getInstance().getPropBase(id).amount;
            this.try1_name = PropManager.getInstance().getPropBase(id).type+Math.floor(Math.random()*amount);
        } while (Us_sdlyg_er.ownerProp(this.try1_name));
        this.try1_icon.skin = "subRes/propsLogo/"+this.try1_name+".png";        
        //=========================================================================
    }

    addEvent(){
        this.btn_giveUp.on(Laya.Event.CLICK,this,this.clickGiveUp);
        this.try0.on(Laya.Event.CLICK,this,this.clickTry0);
        this.try1.on(Laya.Event.CLICK,this,this.clickTry1);
    }

    clickGiveUp(){           
        if(this._data){
            this._data.method();
        }
        View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.TrySkinView);
    }

    
    onEnable() {
        super.onEnable();
        Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.RewardVideoFail,this,this.onRewardVidewoFail);
        Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.RewardVideoSuccess,this,this.onRewardVidewoSuccess);
    }

    onDisable() {
        super.onDisable();
        Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.RewardVideoFail,this,this.onRewardVidewoFail);
        Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.RewardVideoSuccess,this,this.onRewardVidewoSuccess);
        this.m_rewardType = 0;
    }

    onRewardVidewoFail() {
        if (this.m_rewardType = 1) {
            this.clickGiveUp();
        } else if (this.m_rewardType = 2) {
            this.clickGiveUp();
        }
        this.m_rewardType = 0;
    }

    onRewardVidewoSuccess() {
        if (this.m_rewardType = 1) {
            this.clickGiveUp();
            PlayerManager.Instance().onChooseProp(this.try0_name);   
        } else if (this.m_rewardType = 2) {
            this.clickGiveUp();
            PlayerManager.Instance().onChooseProp(this.try1_name);   
        }
        this.m_rewardType = 0;
    }


    clickTry0(){
        let self = this;
        this.m_rewardType = 1;
        if (GameSwitchConfig.getInstance().openVideo != 1) {
            self.clickGiveUp();
            return;
        }
        if (Laya.Browser.onAndroid) {
            NativeCallback.CallNativeFunc("showRewardVideo");
        }
        else {
            WXAPI.showRewardedVideoAd((res)=>{
                if(res){
                    self.clickGiveUp();
                    PlayerManager.Instance().onChooseProp(self.try0_name);   
                }else{
                    self.clickGiveUp();
                    console.log("试用皮肤视频未完整观看");
                }
            },()=>{
                self.clickGiveUp();
                console.log("试用皮肤视频加载失败");
            })
        }
    }

    clickTry1(){
        let self = this;
        if (GameSwitchConfig.getInstance().openVideo != 1) {
            self.clickGiveUp();
            return;
        }
        this.m_rewardType = 2;
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback.CallNativeFunc("showRewardVideo");
        }
        else { 
            WXAPI.showRewardedVideoAd((res)=>{
                if(res){
                    self.clickGiveUp();
                    PlayerManager.Instance().onChooseProp(self.try1_name);   
                }else{
                    self.clickGiveUp();
                    console.log("试用皮肤视频未完整观看");
                }
            },()=>{
                self.clickGiveUp();
                console.log("试用皮肤视频加载失败");
            })  
        }
    }

}