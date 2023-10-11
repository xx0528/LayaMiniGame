import ViewBase from "../../View/ViewBase";
import TreasureBox from "../Ctrl/TreasureBox";
import Us_sdlyg_er from "../../User/User";
import ConstManager from "../Manager/ConstManager";
import PropManager from "../Manager/PropManager";
import View_sdlyg_Mgr, { View_sdlyg_Def } from "../../Mgr/ViewMgr";
import CameraCtrl, { CameraState } from "../Ctrl/CameraCtrl";
import Event_sdlyg_Mgr from "../../Event/EventMgr";
import { Event_sdlyg_Def } from "../../Event/EventDef";
import Sound_sdlyg_Mgr, { SoundType } from "../../Mgr/SoundMgr";
import WXAPI from "../../WXAPI";
import GameManager from "../Manager/GameManager";
import { OverViewType } from "./OverView";
import GameSwitchConfig from "../../Config/GameSwitchConfig";
import NativeCallback from "../../NativeCallback";

export default class LotteryView extends ViewBase {
    
    // private m_treasure:TreasureBox;
    private list_award:Laya.List;
    private _array:number[]=[5,5,10,10,10,50,50,100,5,10];
    private btn_back:Laya.Button;
    private treasure_time = 1;  //可以中奖的次数
    private click_time = 0;     //点击的次数
    private best_award_url:string;   
    private best_award:Laya.Image;
    private best_coin:Laya.Sprite;

    private key:Laya.Text;
    private key_num:Laya.Text;  //文字显示当前拥有的钥匙数量
    private owner_key_num:number=0;   //拥有的钥匙数量
    private btn_getkey:Laya.Button;
    private m_bg:Laya.Image;
    
    private best_award_type:string;
    private best_award_id:number;

    private btn_lookSkin:Laya.Text;
    private btn_start:Laya.Button;

    private btn_rank:Laya.Button;
    private btn_autho:any;
    private openRewardType:number = 0;
    private param: any;

    private current_award_coin:number = 0;   //当前已获得奖励的金币

    constructor() { super(); }
    
    onAwake(){
        this.openRewardType = 0;
        this.list_award = this.owner.getChildByName("list_award") as Laya.List;
        this.btn_back = this.owner.getChildByName("btn_back") as Laya.Button;
        this.btn_getkey = this.owner.getChildByName("btn_getkey") as Laya.Button;
        this.btn_rank = this.owner.getChildByName("btn_rank") as Laya.Button;
        this.btn_start = this.owner.getChildByName("btn_start") as Laya.Button;
        
        this.btn_lookSkin = this.owner.getChildByName("btn_lookSkin") as Laya.Text;
        this.key = this.owner.getChildByName("key") as Laya.Text;
        this.key_num = this.key.getChildByName("key_num") as Laya.Text;   
        this.best_award = this.owner.getChildByName("best_award").getChildByName("best_prop") as Laya.Image;       
        this.best_coin = this.owner.getChildByName("best_award").getChildByName("coin") as Laya.Sprite;
        this.best_coin.visible = false;

        this.m_bg = this.owner.getChildByName("bg") as Laya.Image;     
        this.m_bg.height = Laya.stage.height;
        this.m_bg.width = Laya.stage.height;
        this.list_award.array = this._array;        
        this.list_award.renderHandler = Laya.Handler.create(this, this.onListRender, null, false)

        this._array.sort(()=>{return 0.5-Math.random()});    //金币的随机奖励
        if(Us_sdlyg_er.getLeveNum()>1){
            this.treasure_time+=(2+Math.floor(Math.random()*7));        //中奖次数的随机        //保证最少要看一次视频      
        }
        if(Us_sdlyg_er.ownerPropAll()){
            //全部解锁完毕，最好的奖励是金币
            this.treasure_time=10
            this.best_coin.visible = true;
        }else{
            //还未全部解锁完
            this.setBest();
        }
        console.log(GameManager.Instance().getOnerKeyNum());
        this.updateKeyNum(GameManager.Instance().getOnerKeyNum());

    }

    onDestroy(){
        super.onDestroy();
        if(this.btn_autho)this.btn_autho.destroy();
    }

    
    onStart(){
        this.btn_lookSkin.visible = false;
        this.key.pos(this.btn_getkey.x,this.btn_getkey.y-60);
        this.btn_getkey.visible = false;

        if(Us_sdlyg_er.getMoney()>=Us_sdlyg_er.getNeedCoin())this.lookSkinBtnShow();
        this.btn_rank.visible = (Us_sdlyg_er.getMoney()>=100);

        if(Laya.Browser.onMiniGame){
            let self = this;
            Laya.Browser.window["wx"].getUserInfo({
                success: function (res) {
                    var userInfo = res.userInfo;
                    var nickName = userInfo.nickName;
                    var avatarUrl = userInfo.avatarUrl;
                    console.log("用户授权了",userInfo);
                    GameManager.Instance().saveUserAvatarUrl(avatarUrl);
                },
                fail: function (res) {
                    console.log("用户没有授权");
                    self.noAuthor();
                }
            })
        }

        this.btn_start.visible= (this._data == OverViewType.ClickGetPrize);
    }


    addEvent(){
        this.btn_back.on(Laya.Event.CLICK,this,this.clickBack);
        this.btn_getkey.on(Laya.Event.CLICK,this,this.clickGetCoin);
        this.btn_lookSkin.on(Laya.Event.CLICK,this,this.clickLookSkin);
        this.btn_rank.on(Laya.Event.CLICK,this,this.clickRank);
        this.btn_start.on(Laya.Event.CLICK,this,this.clickStart);
    }
/**
 * 根据拥有的钥匙数量设置显示的钥匙
 */
    updateKeyNum(num:number = 0){
        this.owner_key_num+=num;
        this.key_num.text = this.owner_key_num.toString();
        if(this.owner_key_num<=0){
            // this.btn_getkey.visible = true;
            this.key.visible = false;
            //钥匙不够，会显示视频图标
            Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.ShowrRewardIcon);
        }
    }
/**
 * 此次界面最好的奖励   保证不重复
 */
    setBest(){
        do {
            let id = Math.floor(Math.random()*PropManager.getInstance().getPropTypeNum());     //随机得到一个类型的 id
            let amount = PropManager.getInstance().getPropBase(id).amount;
            this.best_award_type = PropManager.getInstance().getPropBase(id).type;
            this.best_award_id = Math.floor(Math.random()*amount);
            this.best_award_url = "subRes/propsLogo/"+this.best_award_type+this.best_award_id+".png";
        } while (Us_sdlyg_er.ownerProp(this.best_award_type+this.best_award_id));
        this.best_award.skin = this.best_award_url;        
    }

    lookSkinBtnShow(){
        this.btn_lookSkin.pos(Laya.stage.width,this.btn_lookSkin.y);
        this.btn_lookSkin.visible = true;        
        Laya.Tween.to(this.btn_lookSkin,{x:Laya.stage.width-this.btn_lookSkin.width},300);
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
        this.openRewardType = 0;
    }

    onRewardVidewoFail() {
        if (this.openRewardType == 1) {

        } else if (this.openRewardType == 2) {

        } else if (this.openRewardType == 3) {

        }
        this.openRewardType = 0;
    }

    onRewardVidewoSuccess(reward :string) {
        if (this.openRewardType == 1) {
            this.click_time++;
            var box = this.param as TreasureBox;
            let coin=this._array[this.click_time];        
            if(this.click_time==this.treasure_time){
                //中奖了     
                console.log("中奖了");
                box.Init(coin,this.best_award_url,Laya.Handler.create(this,()=>{
                    this.lookSkinBtnShow();
                    Us_sdlyg_er.unlockProp(this.best_award_type+this.best_award_id);
                    Sound_sdlyg_Mgr.instance.playSound(SoundType.Unlock);   
                }));   
            }else{
                //没有中奖
                console.log("没有中奖");
                if(this._data != OverViewType.ClickGetPrize)this.btn_getkey.visible = true;
                box.Init(coin);
                Us_sdlyg_er.addMoney(coin);
                Sound_sdlyg_Mgr.instance.playSound(SoundType.GetCoin);
                //记录已获得的金币数量
                this.current_award_coin+=coin;
            }
            box.showBox();
        } else if (this.openRewardType == 2) {
            this.updateKeyNum(3);
        } else if (this.openRewardType == 3) {
            Us_sdlyg_er.addMoney(this.current_award_coin*3);        //金币翻的倍数
            Sound_sdlyg_Mgr.instance.playSound(SoundType.GetCoin);
            this.btn_getkey.visible = false;        
        }
        this.openRewardType = 0;
    }

//=================================================点击事件start=============================
    clickBack(){
        View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.OverDeriveView);        
        View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.LotteryView);        
    }

    clickAward(box:TreasureBox){
        let award = Laya.Handler.create(this,()=>{
            let coin=this._array[this.click_time];        
            if(this.click_time==this.treasure_time){
                //中奖了     
                console.log("中奖了");
                box.Init(coin,this.best_award_url,Laya.Handler.create(this,()=>{
                    this.lookSkinBtnShow();
                    Us_sdlyg_er.unlockProp(this.best_award_type+this.best_award_id);
                    Sound_sdlyg_Mgr.instance.playSound(SoundType.Unlock);   
                }));   
            }else{
                //没有中奖
                console.log("没有中奖");
                if(this._data != OverViewType.ClickGetPrize)this.btn_getkey.visible = true;
                box.Init(coin);
                Us_sdlyg_er.addMoney(coin);
                Sound_sdlyg_Mgr.instance.playSound(SoundType.GetCoin);
                //记录已获得的金币数量
                this.current_award_coin+=coin;
            }
            box.showBox();
        })

        if(this.owner_key_num<=0){
            console.log("钥匙不够,看视频");
            if (GameSwitchConfig.getInstance().openVideo != 1) {
                return;
            }
            this.openRewardType = 1;
            this.param = box;
            if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
                NativeCallback.CallNativeFunc("showRewardVideo");
            }
            else {
                WXAPI.showRewardedVideoAd((res)=>{
                    if(res){
                        this.click_time++;
                        award.method();
                    }else{
                        console.log("点开宝箱视频未完整看完");
                    }
                },()=>{
                    console.log("点开宝箱视频加载失败")
                })
            }
        }else{
            this.updateKeyNum(-1);
            this.click_time++;
            if(this.click_time>=9){
                // this.btn_getkey.visible = false;
                this.key.visible = false;
            }
            award.method();
        }

    }

    clickRank(){
        Laya.Tween.clearAll(this.btn_lookSkin);        
        View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.RankView);
        View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.LotteryView);
    }

    clickStart(){
        GameManager.Instance().refreshStage();
        View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.LotteryView);
        Sound_sdlyg_Mgr.instance.playSound(SoundType.Button);
    }



    clickGetKey(){
        //通过视频获得钥匙
        if (GameSwitchConfig.getInstance().openVideo != 1) {
            return;
        }
        let self = this;
        this.openRewardType = 2;
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback.CallNativeFunc("showRewardVideo");
        }
        else {
            WXAPI.showRewardedVideoAd((complete)=>{
                if(complete){
                    self.updateKeyNum(3);
                }else{
                    console.log("获取钥匙视频未完整观看");
                }
            },()=>{
                console.log("获取钥匙视频加载失败");
            })
        }
    }

    clickGetCoin(){
        if (GameSwitchConfig.getInstance().openVideo != 1) {
            return;
        }
        let self = this;
        this.openRewardType = 3;
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback.CallNativeFunc("showRewardVideo");
        }
        else {
            WXAPI.showRewardedVideoAd((complete)=>{
                if(complete){
                    Us_sdlyg_er.addMoney(self.current_award_coin*3);        //金币翻的倍数
                    Sound_sdlyg_Mgr.instance.playSound(SoundType.GetCoin);
                    this.btn_getkey.visible = false;        
                }else{
                    console.log("金币翻倍视频未完整观看");
                }
            },()=>{
                console.log("金币翻倍视频加载失败");
            })
        }
    }

    clickLookSkin(){
        Laya.Tween.clearAll(this.btn_lookSkin);
        
        let data = {
            type:this.best_award_type,
            id:this.best_award_id
        }
        if(this.click_time>=this.treasure_time){
            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.BagView,data);                
        }else{
            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.BagView);  
        }
        CameraCtrl.Instance().SetState(CameraState.Bag);
        View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.LotteryView);                
    }

//=================================================点击事件over=============================

    protected onListRender(cell: Laya.Box, index: number): void {
        let treasureBox:TreasureBox = cell.getComponent(TreasureBox);
        treasureBox.setView(this);
    }

    noAuthor() {
        var self = this;
        var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
        var sw = sysInfo.screenWidth;
        var sh = sysInfo.screenHeight;
        var left = 0;
        var top = this.btn_rank.y / Laya.stage.height * sh;
        var width = this.btn_rank.width / Laya.stage.width * sw;
        var height = this.btn_rank.height / Laya.stage.width * sw;
        this.btn_autho = Laya.Browser.window["wx"].createUserInfoButton({
            type: 'image',
            image: "",
            style: {
                left: left,
                top: top,
                width: width,
                height: height,
            }
        })
        this.btn_autho.onTap((res) => {
            var userInfo = res.userInfo;
            var nickName = userInfo.nickName;
            var avatarUrl = userInfo.avatarUrl;
            console.log("用户授权了",userInfo);
            GameManager.Instance().saveUserAvatarUrl(avatarUrl);
            this.clickRank();
        })
    }



    
}
