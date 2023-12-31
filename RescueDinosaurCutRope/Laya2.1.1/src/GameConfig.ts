/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import GameMgr from "./Mgr/GameMgr"
import ExitPoint from "./GameCore/GameObjs/ExitPoint"
import RotateObj from "./GameCore/GameObjs/RotateObj"
import Rope from "./GameCore/GameObjs/Rope"
import TideObject from "./GameCore/GameObjs/TideObject"
import PlaneBlocker from "./GameCore/GameObjs/PlaneBlocker"
import Enemy from "./GameCore/GameObjs/Enemy"
import DangerZone from "./GameCore/GameObjs/DangerZone"
import Player from "./GameCore/GameObjs/Player"
import Guider from "./GameCore/Guider"
import TwinkleSprite from "./View/TwinkleSprite"
import MoveAnchor from "./GameCore/GameObjs/MoveAnchor"
import ButtonAnim from "./View/ButtonAnim"
import ViewAutoScaleByW from "./View/Tools/ViewAutoScaleByW"
import MiddleAnchor from "./View/Tools/MiddleAnchor"
import ActorSkinBox from "./View/ActorSkin/ActorSkinBox"
import ActorSkinView from "./View/ActorSkin/ActorSkinView"
import ClickGetPrize_2 from "./View/ClickGetPrize/ClickGetPrize_2"
import FreeRewardView from "./View/FreeReward/FreeRewardView"
import GameOver from "./View/GameOver/GameOver"
import GameOverSkin from "./GameCore/MyView/GameOverSkin"
import GameRewardView from "./View/GameReward/GameRewardView"
import GameView from "./View/GameView/GameView"
import LevelStateView from "./View/LevelStateView/LevelStateView"
import LevelStateBox from "./View/LevelStateView/LevelStateBox"
import LoadingView from "./View/LoadingView/LoadingView"
import MainView from "./View/MainView/MainView"
import FakePlayer from "./GameCore/FakePlayer"
import ViewAutoScale from "./View/Tools/ViewAutoScale"
import ScaleBreathingAni from "./View/ScaleBreathingAni"
import LoopAdBox from "./ShareAd/View/LoopAdBox"
import ExLoopAdView from "./ShareAd/View/ExLoopAdView"
import MoreGameView from "./View/MoreGameView/MoreGameView"
import BannerAdView from "./ShareAd/View/BannerAdView"
import SignInRewardView from "./View/SignInReward/SignInRewardView"
import TipsView from "./View/TipsView/TipsView"
import HorizontalLoopAdView from "./ShareAd/View/HorizontalLoopAdView"
import UniversalBottomZone from "./View/Common/UniversalBottomZone"
/*
* 游戏初始化配置;
*/
export default class GameConfig{
    static width:number=750;
    static height:number=1334;
    static scaleMode:string="fixedwidth";
    static screenMode:string="vertical";
    static alignV:string="middle";
    static alignH:string="center";
    static startScene:any="GameMain.scene";
    static sceneRoot:string="";
    static debug:boolean=false;
    static stat:boolean=false;
    static physicsDebug:boolean=false;
    static exportSceneToJson:boolean=true;
    constructor(){}
    static init(){
        var reg: Function = Laya.ClassUtils.regClass;
        reg("Mgr/GameMgr.ts",GameMgr);
        reg("GameCore/GameObjs/ExitPoint.ts",ExitPoint);
        reg("GameCore/GameObjs/RotateObj.ts",RotateObj);
        reg("GameCore/GameObjs/Rope.ts",Rope);
        reg("GameCore/GameObjs/TideObject.ts",TideObject);
        reg("GameCore/GameObjs/PlaneBlocker.ts",PlaneBlocker);
        reg("GameCore/GameObjs/Enemy.ts",Enemy);
        reg("GameCore/GameObjs/DangerZone.ts",DangerZone);
        reg("GameCore/GameObjs/Player.ts",Player);
        reg("GameCore/Guider.ts",Guider);
        reg("View/TwinkleSprite.ts",TwinkleSprite);
        reg("GameCore/GameObjs/MoveAnchor.ts",MoveAnchor);
        reg("View/ButtonAnim.ts",ButtonAnim);
        reg("View/Tools/ViewAutoScaleByW.ts",ViewAutoScaleByW);
        reg("View/Tools/MiddleAnchor.ts",MiddleAnchor);
        reg("View/ActorSkin/ActorSkinBox.ts",ActorSkinBox);
        reg("View/ActorSkin/ActorSkinView.ts",ActorSkinView);
        reg("View/ClickGetPrize/ClickGetPrize_2.ts",ClickGetPrize_2);
        reg("View/FreeReward/FreeRewardView.ts",FreeRewardView);
        reg("View/GameOver/GameOver.ts",GameOver);
        reg("GameCore/MyView/GameOverSkin.ts",GameOverSkin);
        reg("View/GameReward/GameRewardView.ts",GameRewardView);
        reg("View/GameView/GameView.ts",GameView);
        reg("View/LevelStateView/LevelStateView.ts",LevelStateView);
        reg("View/LevelStateView/LevelStateBox.ts",LevelStateBox);
        reg("View/LoadingView/LoadingView.ts",LoadingView);
        reg("View/MainView/MainView.ts",MainView);
        reg("GameCore/FakePlayer.ts",FakePlayer);
        reg("View/Tools/ViewAutoScale.ts",ViewAutoScale);
        reg("View/ScaleBreathingAni.ts",ScaleBreathingAni);
        reg("ShareAd/View/LoopAdBox.ts",LoopAdBox);
        reg("ShareAd/View/ExLoopAdView.ts",ExLoopAdView);
        reg("View/MoreGameView/MoreGameView.ts",MoreGameView);
        reg("ShareAd/View/BannerAdView.ts",BannerAdView);
        reg("View/SignInReward/SignInRewardView.ts",SignInRewardView);
        reg("View/TipsView/TipsView.ts",TipsView);
        reg("ShareAd/View/HorizontalLoopAdView.ts",HorizontalLoopAdView);
        reg("View/Common/UniversalBottomZone.ts",UniversalBottomZone);
    }
}
GameConfig.init();