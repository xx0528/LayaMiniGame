import PropManager from "../Manager/PropManager";
import Us_sdlyg_er from "../../User/User";
import PlayerManager from "../Manager/PlayerManager";
import GameManager from "../Manager/GameManager";
import View_sdlyg_Mgr, { View_sdlyg_Def } from "../../Mgr/ViewMgr";
import WXAPI from "../../WXAPI";
import Event_sdlyg_Mgr from "../../Event/EventMgr";
import { Event_sdlyg_Def } from "../../Event/EventDef";
import GameSwitchConfig from "../../Config/GameSwitchConfig";
import NativeCallback from "../../NativeCallback";

export default class TrySkinBtn extends Laya.Script {

    private m_icon:Laya.Image;
    private try_type:string;
    private try_id:number;

    private path:string;
    
    constructor() { super(); }
    
    onAwake(){
        this.m_icon = this.owner.getChildByName("display").getChildByName("icon") as Laya.Image;
        this.owner.on(Laya.Event.CLICK,this,this.clickTry);
    }

    onStart(){
        this.setIcon();
    }

    setIcon(){
        do {
            let id = Math.floor(Math.random()*PropManager.getInstance().getPropTypeNum());     //随机得到一个类型的 id
            let amount = PropManager.getInstance().getPropBase(id).amount;
            this.try_type = PropManager.getInstance().getPropBase(id).type;
            this.try_id = Math.floor(Math.random()*amount);
            this.path = "subRes/propsLogo/"+this.try_type+this.try_id+".png";
        } while (Us_sdlyg_er.ownerProp(this.try_type+this.try_id));
        this.m_icon.skin = this.path;
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
    }

    onRewardVidewoFail() {
        GameManager.Instance().gameStart();        
        View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.TrySkinView);   
    }

    onRewardVidewoSuccess() {
        PlayerManager.Instance().onChooseProp(this.try_type+this.try_id); 
        GameManager.Instance().gameStart();        
        View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.TrySkinView);   
    }
    
    clickTry(){
        if (GameSwitchConfig.getInstance().openVideo != 1) {
            GameManager.Instance().gameStart();        
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.TrySkinView);   
            return;
        }
        let success = Laya.Handler.create(this,()=>{
            PlayerManager.Instance().onChooseProp(this.try_type+this.try_id); 
        })
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback.CallNativeFunc("showRewardVideo");
        }
        else if (Laya.Browser.onIOS) {

        }
        else {
            WXAPI.showRewardedVideoAd((res)=>{
                if(res){
                    success.method();
                    GameManager.Instance().gameStart();        
                    View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.TrySkinView);   
                }else{
                    console.log("试用皮肤失败视频未完整观看");
                    GameManager.Instance().gameStart();        
                    View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.TrySkinView);   
                }
            },()=>{
                console.log("试用皮肤广告加载失败");
                GameManager.Instance().gameStart();        
                View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.TrySkinView);   
            })
        }
        
    }
}