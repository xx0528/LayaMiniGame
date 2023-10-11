import ViewBase from "../../View/ViewBase";
import Us_sdlyg_er, { UserGameData } from "../../User/User";
import HeadPic from "../Ctrl/HeadPic";
import GameManager from "../Manager/GameManager";
import View_sdlyg_Mgr, { View_sdlyg_Def } from "../../Mgr/ViewMgr";
import CameraCtrl, { CameraState } from "../Ctrl/CameraCtrl";
import WXAPI from "../../WXAPI";
import Event_sdlyg_Mgr from "../../Event/EventMgr";
import { Event_sdlyg_Def } from "../../Event/EventDef";
import NativeCallback from "../../NativeCallback";

export default class RankView extends ViewBase {

    private match:Laya.Image;
    private bg:Laya.Image;
    private btn_match:Laya.Button;
    private btn_home:Laya.Button;
    private vs:Laya.Sprite;
    private periodList:Laya.Sprite[] = new Array();
    private periodAmount:number = 6;
    private current_period=0;
    private my_head_pic:HeadPic;
    private ai_head_pic:HeadPic;

    constructor() { super(); }
    
    onAwake(){
        this.bg = this.owner.getChildByName("BG") as Laya.Image;
        this.bg.height = Laya.stage.height;
        this.match = this.owner.getChildByName("match") as Laya.Image;
        this.btn_match = this.owner.getChildByName("btn_match") as Laya.Button;
        this.btn_home = this.owner.getChildByName("btn_home") as Laya.Button;
        this.vs = this.owner.getChildByName("vs") as Laya.Sprite;
        this.my_head_pic = this.owner.getChildByName("my_head_pic").getComponent(HeadPic);
        this.ai_head_pic = this.owner.getChildByName("ai_head_pic").getComponent(HeadPic);
        
    }

    onStart(){
        this.match.visible = false;
        let peroids = this.match.getChildByName("periods") as Laya.Sprite;
        for(let i=0;i<this.periodAmount;i++){
            let p = peroids.getChildByName("period"+i) as Laya.Sprite;
            p.visible = false;
            this.periodList.push(p);
        }

        let coin = this.btn_match.getChildByName("coin") as Laya.Sprite;
        let record = this.btn_match.getChildByName("record") as Laya.Sprite;

        if(Us_sdlyg_er.getMoney()>=100){
            coin.visible = true;
            record.visible = false;
        }else{
            coin.visible = false;
            record.visible = true;
        }

        this.my_head_pic.set(Us_sdlyg_er.getRankLevel(),GameManager.Instance().getUserAvatarUrl());
        CameraCtrl.Instance().SetState(CameraState.Menu);                
    }


    addEvent(){
        this.btn_match.on(Laya.Event.CLICK,this,this.clickMatch);
        this.btn_home.on(Laya.Event.CLICK,this,this.clickHome);
    }

    clickHome(){
        Laya.timer.clearAll(this);
        View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.MenuView);
        View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.RankView);
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
    }

    onRewardVidewoSuccess() {
        this.vs.visible = false;
        this.btn_match.visible = false;
        this.showMatch();
        Laya.timer.once(Math.random()*1000+1500,this,this.hideMatch);
    }
    clickMatch(){
        let match = Laya.Handler.create(this,()=>{
            this.vs.visible = false;
            this.btn_match.visible = false;
            this.showMatch();
            Laya.timer.once(Math.random()*1000+1500,this,this.hideMatch);
        })
        if(Us_sdlyg_er.getMoney()>=100){
            Us_sdlyg_er.addMoney(-100);
            match.method();
        }else{
            if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
                NativeCallback.CallNativeFunc("showRewardVideo");
            }
            else { 
                WXAPI.showRewardedVideoAd((success)=>{
                    if(success){
                        match.method();
                    }else{
                        console.log("排位按钮视频未完整观看");
                    }
                },()=>{
                    console.log("排位按钮视频加载失败");
                })
            }
        }

    }

    showMatch(){
        this.match.visible = true;
        Laya.timer.loop(200,this,this.showPeriod);
    }

    hideMatch(){
        Laya.timer.clearAll(this);
        this.match.visible = false;
        this.vs.visible= true;
        //设置头像TODO
        let num = Math.max(0,(Us_sdlyg_er.getRankLevel()+-3+(Math.floor(Math.random()*6))));
        let path ="https://oss.renyouwangluo.cn/sdlyg/wxpic/"+Math.floor(Math.random()*100)+".jpg";
        this.ai_head_pic.set(num,path);

        Laya.timer.once(1500,this,()=>{
            // console.log("游戏开始");
            GameManager.Instance().rankStart(path);
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.RankView);
            
        })
    }

    showPeriod(){
        if(this.current_period>=this.periodAmount){
            for(let i = 0 ; i<this.periodAmount ; i++){
                this.periodList[i].visible = false;
            }
            this.current_period=0;
        }
        this.periodList[this.current_period].visible = true;
        this.current_period++;
    }

}