import ryw_ViewBase from "../ViewBase";
import Pike from "../../GamePlay/Prop/Pike";
import ryw_EventMgr from "../../Event/EventMgr";
import { ryw_EventDef } from "../../Event/EventDef";
import LevelBase, { ryw_levelState } from "../../GamePlay/Level/LevelBase";
import ryw_User from "../../User/User";
import ryw_ViewMgr, { ryw_ViewDef } from "../../Mgr/ViewMgr";
import LevelTitle from "./LevelTitle";
import ryw_GameMgr from "../../Mgr/GameMgr";
import ryw_SoundMgr from "../../Mgr/SoundMgr";
import ryw_ALD, { ryw_ALDEventDef } from "../../ALD";
import ryw_AppConfig from "../../AppConfig";
import ryw_WXAPI from "../../WXAPI";
import ryw_WudianMgr from "../../Mgr/WudianMgr";
import ryw_WXADMgr, { ryw_WXBannderAd } from "../../Mgr/WXADMgr";
import ryw_KRQ_Banner from "../../KRQ/Com/KRQ_Banner";
import NativeCallback from "../../NativeCallback";
// import GameViewBanner from "./GameViewBanner";

export default class GameView extends ryw_ViewBase{


    protected _3dScene : Laya.Scene3D;
    protected _level :LevelBase;

    protected _levelTitle : LevelTitle;
    protected _currentLevel : number = 1;
    protected _showLevel : number = 1;
    protected _againBtn : Laya.Sprite = null;
    protected _tipBtn : Laya.Sprite = null; 
    protected _tipBanner : Laya.Sprite = null;
    protected _tipNormal :Laya.Sprite = null;

    protected _roundShade : Laya.Image;
    protected _turoriaUp : Laya.Image;
    protected _tipNode : Laya.Image;

    protected _isBannerLoad = true;
    protected _isSeverLevel = true;
    protected _isTipLevel = false;
    protected _adState :boolean = false;

    protected _MaxLevel = 37;
    protected _MaxlocalSave = 20;

    protected _testLevel = 0;

    onAwake(){
        this._levelTitle = (this.owner.getChildByName("LevelTitle") as Laya.Image).addComponent(LevelTitle) as LevelTitle;
        this._againBtn = this.owner.getChildByName("againImg").getChildByName("againBtn") as Laya.Sprite;

        this._roundShade = this.owner.getChildByName("roundShade") as Laya.Image;
        this._turoriaUp = this.owner.getChildByName("turoriaUp") as Laya.Image;
        this._tipBtn = this.owner.getChildByName("tipBtn") as Laya.Sprite;
        
        this._tipNode = this.owner.getChildByName("tipNode") as Laya.Image;
        this._tipNode.visible = false;
        this._tipNormal = this._tipNode.getChildByName("tipNormal") as Laya.Sprite;
        this._tipBanner = this._tipNode.getChildByName("tipBanner") as Laya.Sprite;

        console.log("this._roundShade  = ", this._roundShade);
    }

    onStart(){
        this._adState = false;
        
        // this._tipBtn.visible = false;

        this.init3dScene()

        let show = ()=>{
            if (this._adState){
                this._adState = false;
                this._isTipLevel = true;
                ryw_ALD.ryw_aldSendEvent(ryw_ALDEventDef.TipLevelGame,{
                    "提示 当前":this._showLevel,
                    "模板": this._currentLevel
                });
                this.onNextLevel();
            }
            console.log("wxShowwxShowwxShowwxShowwxShow  adTouchState.Video == this._adState = ", this._adState);
        }

        let hide = ()=>{
            if (this._adState){

            }
            console.log("wxHidewxHidewxHidewxHidewxHide   this._adState", this._adState);
        };


        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].onShow(show);
            Laya.Browser.window["wx"].onHide(hide);
        }
    }

    
    onRewardVidewoFail() {
        this._adState = true;
        this.onVideoFaild()
    }

    onRewardVidewoSuccess() {
        this._isTipLevel = true;
        this.onNextLevel();
        this._tipBtn.visible = false;
    }

    ryw_addEvent(){
        this._againBtn.on(Laya.Event.CLICK, this, this.onAgainClick);
        this._tipBtn.on(Laya.Event.CLICK, this, this.onTipClick);
    }

    ryw_removeEvent(){
        this._againBtn.off(Laya.Event.CLICK, this, this.onAgainClick);
        this._tipBtn.off(Laya.Event.CLICK, this, this.onTipClick);
    }

    onTipClick(){
        // if (true){
        //     this.onShareMyGame()
        //     return ;
        // }

        // console.log("onTipClickonTipClickonTipClick");

        if (this._level.gameState == ryw_levelState.ryw_gameover){ return ;}

        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            this._tipBtn.visible = false;
            NativeCallback.NowVideoType = "rewardAd";
            NativeCallback.CallNativeFunc("showRewardVideo");
            ryw_SoundMgr.ryw_instance.ryw_stopBGM();
        }
        else {
            this._isTipLevel = true;
            this.onNextLevel();
            this._tipBtn.visible = false;
        }

        
        // Laya.timer.once(3000, this, ()=>{
        //     this._tipBtn.visible = true;
        // });

        // ryw_WXAPI.ryw_showRewardedVideoAd((complete:boolean)=>{
        //     if(complete){
        //         console.log("提示激励视频完成");
        //         this._isTipLevel = true;
        //         // ryw_ALD.ryw_aldSendEvent(ryw_ALDEventDef.TipLevelGame,{
        //         //     "提示 当前":this._showLevel,
        //         //     "模板": this._currentLevel
        //         // });
        //         this.onNextLevel();
        //     }
        //     else{
        //         console.log("提示激励视频没看完");
        //         this._tipBtn.visible = true;
        //     }
        // }, ()=>{
        //     this._adState = true;
        //     console.log("提示激励视频加载失败");
        //     this.onVideoFaild()

        // });
        // this.onVideoFaild()

    }

    onShareMyGame(){
        console.log("onShareMyGame");

        ryw_WXAPI.ryw_share(()=>{
            console.log(" WXAPI.share")
        },"玩不过了，快来帮帮我！~","");
        Laya.timer.once(2000, this, ()=>{
            this._isTipLevel = true;
            ryw_ALD.ryw_aldSendEvent(ryw_ALDEventDef.TipLevelGame,{
                "提示 当前":this._showLevel,
                "模板": this._currentLevel
            });
            this.onNextLevel();
        })
    }

    onVideoFaild(){

        console.log("onVideoFaild  ryw_WudianMgr.ryw_WudianFlag = ",ryw_WudianMgr.ryw_WudianFlag);
        Laya.timer.once(3000, this, ()=>{
            this._tipBtn.visible = true;
        });
        //没打开，不显示banner
        this._tipNode.visible = true;
        this._tipBanner.visible = false;
        this._tipNormal.visible = true;

        let self = this;
        let yPos = this._tipNormal.y
        Laya.Tween.to(this._tipNormal,{
            y:yPos - 100,
            alpha:0
        },1000,Laya.Ease.linearNone,Laya.Handler.create(this,()=>{
            self._tipNode.visible = false;
            self._tipNormal.alpha = 1;
            self._tipNormal.y = yPos;
        }));
    }

    onAgainClick(){
        if (this._level.gameState == ryw_levelState.ryw_gameover){ return ;}
        this._isTipLevel = false;
        ryw_ALD.ryw_aldSendEvent(ryw_ALDEventDef.AgainLevelGame,{
            "重来 当前":this._showLevel,
            "模板": this._currentLevel
        });
        this.onNextLevel();
    }

    onEnable(){
        super.onEnable();
        ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.Game_onOver, this, this.onGameOver);
        ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.Game_onNextGame, this, this.onNextLevel);
        ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.Game_onShowShade, this, this.onShowShade);
        ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.Game_onMoveShade, this, this.onMoveShade);
        ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.Game_onShowGuide, this, this.onShowGuide);
        ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.Game_onHideGuide, this, this.onHideGuide);
        ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.RewardVideoFail, this, this.onRewardVidewoFail);
        ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    }
    
    
    onDisable(){
        super.onDisable();
        ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.Game_onOver, this, this.onGameOver);
        ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.Game_onNextGame, this, this.onNextLevel);
        ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.Game_onShowShade, this, this.onShowShade);
        ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.Game_onMoveShade, this, this.onMoveShade);
        ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.Game_onShowGuide, this, this.onShowGuide);
        ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.Game_onHideGuide, this, this.onHideGuide);
        ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.RewardVideoFail, this, this.onRewardVidewoFail);
        ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.RewardVideoSuccess, this, this.onRewardVidewoSuccess);

    }



    initWinLevelData(){
        console.log("initWinLevelData");

        let _winArr :Array<number> = ryw_User.getwinLevelData();
        if (_winArr==null || _winArr.length<this._showLevel){
            let _arr :Array<number> = new Array<number>();
            for (let i = 1; i < this._showLevel; i++) {
                _arr.push(i);
            }
            ryw_User.setwinLevelData(_arr);
        }
    }

    onFailLevelCheck():boolean{
        console.log("onFailLevelCheck");

        let _winArr :Array<number> = ryw_User.getwinLevelData();
        console.log("onFailLevelCheck   _winArr = ",_winArr);
        if (_winArr==null || _winArr.length==0){
            // this._currentLevel = 1;
            return true;
        }
        for (let i = this._MaxlocalSave+1; i <= this._MaxLevel; i++) {            
            if (_winArr.indexOf(i) == -1){
                this._currentLevel = i;
                console.log("onFailLevelCheck  this._currentLevel =",this._currentLevel);
                //有没通过的关卡
                return  false;
            }
        }
        //所有已上线的关卡全部通关过一次
        return true;
    }

    onGameOver(para : any){
        //先弹引导页面
        if (para.result == 1){

            this._showLevel += 1;
            console.log("onGameOver  this._isSeverLevel = ",this._isSeverLevel);
            if (this._isSeverLevel){
                ryw_User.passLevel();
            }
            else{
                ryw_User.passLoaclLevel();
            }

            ryw_User.ryw_setLeveNum(this._showLevel);
            ryw_User.addwinLevel(this._currentLevel);
        }

        if (para.result == 1){

            ryw_ALD.ryw_aldSendEvent(ryw_ALDEventDef.CompleteLevelGame,{
                "胜利 当前":this._showLevel,
                "模板": this._currentLevel
            });

        }
        else {
            ryw_ALD.ryw_aldSendEvent(ryw_ALDEventDef.FailLevelGame,{
                "失败 当前":this._showLevel,
                "模板": this._currentLevel
            });
        }


        this.onGetNextLevel();
        ryw_GameMgr.ryw_getInstance().ryw_saveGameData();

        var self = this;
        if (para.result == 1){
            ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.ryw_GameWinView,para, (v:ryw_ViewBase)=>{
                self.ryw_closeView();
            });
        }
        else {
            ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.ryw_GameFailView,para, (v:ryw_ViewBase)=>{
                self.ryw_closeView();
            });
        }

    }

    onGetNextLevel():number {
        console.log("onGetNextLevel")
        //先获取当前组剩余关卡数据
        var levelData = ryw_User.getLevelData();

        if (levelData.length==0){
            // console.log("User.getLeveNum()  = ", User.getLeveNum());
            let currIndex = ryw_User.ryw_getLeveNum()
            if (currIndex<this._MaxLevel){
                for (let i = currIndex; i <= this._MaxLevel; i++) {
                    levelData.push(i);                
                }
            }
            else{
                levelData = this.onShuffleArithmetic(this._MaxLevel);
            }
            ryw_User.setLevelData(levelData);
        }
        console.log("onGetNextLevel   levelData = ",levelData);
        this._isSeverLevel = true;
        this._currentLevel = levelData[0];
        console.log("onGetNextLevel   _currentLevel = ",this._currentLevel);
        return this._currentLevel;

    }

    //随机打散
    public onShuffleArithmetic(endIndex:number, beginIndex:number=2):Array<number> {
        let normal : Array<number> = new Array<number>();
        //第一关不参与随机
        for (let i = beginIndex; i <= endIndex; i++) {
            normal.push(i);                
        }
        let len = normal.length
        for (let i = len-1; i > 0; i--) {
            let randomIndex= Math.floor(Math.random() * (i+1)); 
            let temp = normal[i];
            normal[i] = normal[randomIndex];
            normal[randomIndex] = temp;
        }
        return  normal;
    }

    onNextLevel(){
        this._3dScene.offAll();
        
        this.destroy3dScene();

        if (null != this._3dScene){
            this._3dScene.destroy();
            this._3dScene = null;
            Laya.Resource.destroyUnusedResources();
        }

        if (null != this._level){
            this._level.destroy();
            this._level = null;
        }

        this._adState = false;

        this.onHideGuide();

        if ( this._isTipLevel){
            this._tipNode.visible = false
            this._tipBtn.visible = false;
        }
        else{
            this._tipNode.visible = true
            this._tipBtn.visible = true;
        }

        this.init3dScene();
    }

    protected init3dScene(){

        if (this._testLevel && this._testLevel != 0 ){
            this._currentLevel = this._testLevel;
            this.onLoadLocalScene()
            return ;
        }


        this._showLevel = ryw_User.ryw_getLeveNum();
        if (this._showLevel<=this._MaxlocalSave){
            // self.onInit3dLocalScene();
            this.initWinLevelData();
            this.onGetNextLevel();
            this.onLoadLocalScene();
            return ;
        }
        
        if (this.onFailLevelCheck()){
            this.onGetNextLevel();
        }

        if (this._currentLevel<= this._MaxlocalSave){
            this.onLoadLocalScene()
        }
        else{
            this.onLoadServerScene()
        }
    }

    protected onLoadLocalScene(){
        console.log("onLoadLocalScene this._currentLevel =",this._currentLevel);
        // this._currentLevel = 17;

        let self = this;
        let path :string = ryw_AppConfig.ryw_LocalTestReServer+"/LayaScene/Conventional/scene"+this._currentLevel+".ls"
        this._levelTitle.setLevelString(this._showLevel);
        Laya.Scene3D.load(path, Laya.Handler.create(this, function(scene){
            self._3dScene = scene;
            Laya.stage.addChild(scene);
            this._level = self._3dScene.addComponent(LevelBase) as LevelBase;
            this._level.ryw_onSetPikePath(this._currentLevel);
            this._level.ryw_setTipsMode(this._isTipLevel);

            ryw_SoundMgr.ryw_instance.ryw_playBGM("bg");
        }));
    }

    protected onLoadServerScene(){
        console.log("onLoadServerScene this._currentLevel = ",this._currentLevel)
        let self = this;
        this._levelTitle.setLevelString(this._showLevel);
        let path :string = ryw_AppConfig.ryw_ResServer+"/LayaScene/Conventional/scene"+this._currentLevel+".ls"
        Laya.Scene3D.load(path, Laya.Handler.create(this, function(scene){
            if (scene==null){
                self.onInit3dLocalScene();
                self.onLoadLocalScene();
                return ;
            }
            self._3dScene = scene;
            Laya.stage.addChild(scene);
            this._level = self._3dScene.addComponent(LevelBase);
            this._level.ryw_onSetPikePath(this._currentLevel);
            this._level.ryw_setTipsMode(this._isTipLevel);

            ryw_SoundMgr.ryw_instance.ryw_playBGM("bg");
        }));
    }

    protected onInit3dLocalScene(){

            //先获取当前组剩余关卡数据
        var levelData = ryw_User.getLocalLevelData();
        if (levelData==null|| levelData.length==0){
            if (this._showLevel > this._MaxlocalSave){
                levelData = this.onShuffleArithmetic(this._MaxlocalSave);
                ryw_User.setLocalLevelData(levelData);
                this._currentLevel = levelData[0];
            }
            else{
                this._currentLevel = this._showLevel
            }
        }
        else{
            this._currentLevel = levelData[0];
        }
        this._isSeverLevel = false

    }

    protected onHideGuide(){
        if (this._turoriaUp){
            this._turoriaUp.visible = false;
        }
        this._tipNode.visible = false;
        this._tipNormal.visible = false;
        this._tipBanner.visible = false;

        // Laya.timer.clear(this, this.onShowMoveGuide);
        Laya.Tween.clearAll(this);
        Laya.timer.clearAll(this);

    }

    protected onShowGuide(para){

        let x = para.x;
        let y = para.y;
        let endx = para.endX;
        let endy = para.endY;

        this._turoriaUp.visible = true;
        this._turoriaUp.pos(x,y);

        // let self = this;

        this.onShowMoveGuide(x,y, endx, endy);
        Laya.timer.loop(3000, this, this.onShowMoveGuide,[x,y,endx,endy]);
    }

    protected onShowMoveGuide(x,y, endx, endy){
        if (false==this._turoriaUp.visible){
        }
        else{
            this.moveGuide(x,y, endx, endy)
        }
    }


    protected moveGuide(x:number, y:number,endx:number, endy:number){
        // let self = this;
        Laya.Tween.to(this._turoriaUp,{
            x :endx,
            y :endy
        },1000,Laya.Ease.linearNone,Laya.Handler.create(this,()=>{
            // self._turoriaUp.pos(x,y);
            this.waitGuide(x,y);
        }));
    }

    protected waitGuide(x:number, y:number){
        // let self = this;
        Laya.timer.once(1000, this, ()=>{
            // this.moveGuide(x,y)
            if (null!=this._turoriaUp){
                this._turoriaUp.pos(x,y);
            }
        });
    }

    protected onMoveShade(para){
        console.log("onMoveShade   para.x = ",para.x);
        let x = para.x;
        let y = para.y;
        

        this._roundShade.visible = true;
        // this._roundShade.pos(x,y);
        // Position
        let self = this;
        Laya.Tween.to(self._roundShade,{
            scaleX:0.9,
            scaleY:0.9,
            x:x,
            y:y
        },500,Laya.Ease.linearNone);
    }

    protected onShowShade(para){

        this._tipBtn.visible = false;
        this._tipNode.visible = false;
        
        ryw_SoundMgr.ryw_instance.ryw_stopBGM();
        this._roundShade.visible = true;
    }

    protected destroy3dScene(){
        if (null != this._3dScene){
            this._3dScene.destroy(true);
            this._3dScene = null;
            Laya.Resource.destroyUnusedResources();
        }
        Laya.Tween.clearAll(this);
        Laya.timer.clearAll(this);
    }

    onDestroy(){
        this.destroy3dScene();
    }
}