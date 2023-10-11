/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import GameMgr from "./Mgr/GameMgr"
import KRQ_LoopAdBox from "./KRQ/Com/KRQ_LoopAd/KRQ_LoopAdBox"
import KRQ_VLoopAd from "./KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd"
import KRQ_Banner from "./KRQ/Com/KRQ_Banner"
import KRQ_Export from "./KRQ/ViewCom/KRQ_Export"
import KRQ_HistoryBox from "./KRQ/Com/KRQ_History/KRQ_HistoryBox"
import KRQ_History from "./KRQ/Com/KRQ_History/KRQ_History"
import KRQ_RockSingleAd from "./KRQ/Com/KRQ_RockSingleAd"
import KRQ_Floating from "./KRQ/ViewCom/KRQ_Floating"
import KRQ_RollSingleAd from "./KRQ/Com/KRQ_RollSingleAd"
import KRQ_GameOver from "./KRQ/ViewCom/KRQ_GameOver"
import KRQ_SidePull from "./KRQ/ViewCom/KRQ_SidePull"
import KRQ_HLoopAd from "./KRQ/Com/KRQ_LoopAd/KRQ_HLoopAd"
import KRQ_Main from "./KRQ/ViewCom/KRQ_Main"
import KRQ_SingleAd from "./KRQ/Com/KRQ_SingleAd"
import KRQ_GamingBanner from "./KRQ/Com/KRQ_GamingBanner"
import TwinkleSprite from "./View/TwinkleSprite"
import ClickGetPrize from "./View/ClickGetPrize/ClickGetPrize"
import LoadingView from "./View/LoadingView/LoadingView"
import UiFuelBar from "./MyScripts/MyView/uiOBJ/UiFuelBar"
import CircularProcessBar from "./View/CircularProcessBar"
import ReliveBtn from "./View/MyViews/UIobject/ReliveBtn"
import GameView from "./MyScripts/MyView/GameView"
import SwitchBtn from "./MyScripts/MyView/uiOBJ/SwitchBtn"
import RecordBorad from "./MyScripts/MyView/uiOBJ/RecordBorad"
import ButtonAnim from "./View/ButtonAnim"
import MyMainView from "./View/MyViews/MyMainView"
import Exprot2ViewTemplate from "./View/TemplateViews/Export2/Exprot2ViewTemplate"
import ViewAutoScaleByW from "./View/Common/ViewAutoScaleByW"
import Exprot3ViewTemplate from "./View/TemplateViews/Export3/Exprot3ViewTemplate"
import ExportViewTemplate from "./View/TemplateViews/Export/ExportViewTemplate"
import GameFailViewTemplate from "./View/TemplateViews/GameFail/GameFailViewTemplate"
import GameWinViewTemplate from "./View/TemplateViews/GameWin/GameWinViewTemplate"
import InGameViewTemplate from "./View/TemplateViews/InGame/InGameViewTemplate"
import MainViewTemplate from "./View/TemplateViews/Main/MainViewTemplate"
import MiniGameViewTemplate from "./View/TemplateViews/MiniGame/MiniGameViewTemplate"
import OPPONativeAdViewTemplate from "./View/TemplateViews/OPPONativeAd/OPPONativeAdViewTemplate"
import QQCrazyClick from "./View/QQTemplate/QQCrazyClick/QQCrazyClick"
import QQCrazyClick2 from "./View/QQTemplate/QQCrazyClick/QQCrazyClick2"
import QQGameFailViewTemplate from "./View/QQTemplate/GameFail/QQGameFailViewTemplate"
import QQGameWinViewTemplate from "./View/QQTemplate/GameWin/QQGameWinViewTemplate"
import QQInGameViewTemplate from "./View/QQTemplate/InGame/QQInGameViewTemplate"
import QQMainViewTemplate from "./View/QQTemplate/Main/QQMainViewTemplate"
import RewardViewTemplate from "./View/TemplateViews/Reward/RewardViewTemplate"
import TTCrazyClick from "./View/TTTemplate/TTCrazyClick/TTCrazyClick"
import TTGameFailViewTemplate from "./View/TTTemplate/GameFail/TTGameFailViewTemplate"
import TTGameWinViewTemplate from "./View/TTTemplate/GameWin/TTGameWinViewTemplate"
import TTMainViewTemplate from "./View/TTTemplate/Main/TTMainViewTemplate"
import TTMoreReward from "./View/TTTemplate/MoreReward/TTMoreReward"
import TTResurrection from "./View/TTTemplate/Resurrection/TTResurrection"
import TTReward from "./View/TTTemplate/Reward/TTReward"
import RewardBox from "./View/TTTemplate/Reward/RewardBox"
import TTSignIn from "./View/TTTemplate/SignIn/TTSignIn"
import TTSkinTips from "./View/TTTemplate/SkinTips/TTSkinTips"
import TTStore from "./View/TTTemplate/Store/TTStore"
import StoreBox from "./View/TTTemplate/Store/StoreBox"
import PageList from "./View/TTTemplate/Store/PageList"
import VVNativeAd1View from "./View/VVTemplate/NativeAd/VVNativeAd1View"
import VVNativeAd2View from "./View/VVTemplate/NativeAd/VVNativeAd2View"
import WXCrazyClick from "./View/TemplateViews/WXCrazyClick/WXCrazyClick"
import TipsView from "./View/TipsView/TipsView"
import LoopAdBox from "./ShareAd/View/LoopAdBox"
import HorizontalLoopAdView from "./ShareAd/View/HorizontalLoopAdView"
import BannerAdView from "./ShareAd/View/BannerAdView"
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
        reg("KRQ/Com/KRQ_LoopAd/KRQ_LoopAdBox.ts",KRQ_LoopAdBox);
        reg("KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd.ts",KRQ_VLoopAd);
        reg("KRQ/Com/KRQ_Banner.ts",KRQ_Banner);
        reg("KRQ/ViewCom/KRQ_Export.ts",KRQ_Export);
        reg("KRQ/Com/KRQ_History/KRQ_HistoryBox.ts",KRQ_HistoryBox);
        reg("KRQ/Com/KRQ_History/KRQ_History.ts",KRQ_History);
        reg("KRQ/Com/KRQ_RockSingleAd.ts",KRQ_RockSingleAd);
        reg("KRQ/ViewCom/KRQ_Floating.ts",KRQ_Floating);
        reg("KRQ/Com/KRQ_RollSingleAd.ts",KRQ_RollSingleAd);
        reg("KRQ/ViewCom/KRQ_GameOver.ts",KRQ_GameOver);
        reg("KRQ/ViewCom/KRQ_SidePull.ts",KRQ_SidePull);
        reg("KRQ/Com/KRQ_LoopAd/KRQ_HLoopAd.ts",KRQ_HLoopAd);
        reg("KRQ/ViewCom/KRQ_Main.ts",KRQ_Main);
        reg("KRQ/Com/KRQ_SingleAd.ts",KRQ_SingleAd);
        reg("KRQ/Com/KRQ_GamingBanner.ts",KRQ_GamingBanner);
        reg("View/TwinkleSprite.ts",TwinkleSprite);
        reg("View/ClickGetPrize/ClickGetPrize.ts",ClickGetPrize);
        reg("View/LoadingView/LoadingView.ts",LoadingView);
        reg("MyScripts/MyView/uiOBJ/UiFuelBar.ts",UiFuelBar);
        reg("View/CircularProcessBar.ts",CircularProcessBar);
        reg("View/MyViews/UIobject/ReliveBtn.ts",ReliveBtn);
        reg("MyScripts/MyView/GameView.ts",GameView);
        reg("MyScripts/MyView/uiOBJ/SwitchBtn.ts",SwitchBtn);
        reg("MyScripts/MyView/uiOBJ/RecordBorad.ts",RecordBorad);
        reg("View/ButtonAnim.ts",ButtonAnim);
        reg("View/MyViews/MyMainView.ts",MyMainView);
        reg("View/TemplateViews/Export2/Exprot2ViewTemplate.ts",Exprot2ViewTemplate);
        reg("View/Common/ViewAutoScaleByW.ts",ViewAutoScaleByW);
        reg("View/TemplateViews/Export3/Exprot3ViewTemplate.ts",Exprot3ViewTemplate);
        reg("View/TemplateViews/Export/ExportViewTemplate.ts",ExportViewTemplate);
        reg("View/TemplateViews/GameFail/GameFailViewTemplate.ts",GameFailViewTemplate);
        reg("View/TemplateViews/GameWin/GameWinViewTemplate.ts",GameWinViewTemplate);
        reg("View/TemplateViews/InGame/InGameViewTemplate.ts",InGameViewTemplate);
        reg("View/TemplateViews/Main/MainViewTemplate.ts",MainViewTemplate);
        reg("View/TemplateViews/MiniGame/MiniGameViewTemplate.ts",MiniGameViewTemplate);
        reg("View/TemplateViews/OPPONativeAd/OPPONativeAdViewTemplate.ts",OPPONativeAdViewTemplate);
        reg("View/QQTemplate/QQCrazyClick/QQCrazyClick.ts",QQCrazyClick);
        reg("View/QQTemplate/QQCrazyClick/QQCrazyClick2.ts",QQCrazyClick2);
        reg("View/QQTemplate/GameFail/QQGameFailViewTemplate.ts",QQGameFailViewTemplate);
        reg("View/QQTemplate/GameWin/QQGameWinViewTemplate.ts",QQGameWinViewTemplate);
        reg("View/QQTemplate/InGame/QQInGameViewTemplate.ts",QQInGameViewTemplate);
        reg("View/QQTemplate/Main/QQMainViewTemplate.ts",QQMainViewTemplate);
        reg("View/TemplateViews/Reward/RewardViewTemplate.ts",RewardViewTemplate);
        reg("View/TTTemplate/TTCrazyClick/TTCrazyClick.ts",TTCrazyClick);
        reg("View/TTTemplate/GameFail/TTGameFailViewTemplate.ts",TTGameFailViewTemplate);
        reg("View/TTTemplate/GameWin/TTGameWinViewTemplate.ts",TTGameWinViewTemplate);
        reg("View/TTTemplate/Main/TTMainViewTemplate.ts",TTMainViewTemplate);
        reg("View/TTTemplate/MoreReward/TTMoreReward.ts",TTMoreReward);
        reg("View/TTTemplate/Resurrection/TTResurrection.ts",TTResurrection);
        reg("View/TTTemplate/Reward/TTReward.ts",TTReward);
        reg("View/TTTemplate/Reward/RewardBox.ts",RewardBox);
        reg("View/TTTemplate/SignIn/TTSignIn.ts",TTSignIn);
        reg("View/TTTemplate/SkinTips/TTSkinTips.ts",TTSkinTips);
        reg("View/TTTemplate/Store/TTStore.ts",TTStore);
        reg("View/TTTemplate/Store/StoreBox.ts",StoreBox);
        reg("View/TTTemplate/Store/PageList.ts",PageList);
        reg("View/VVTemplate/NativeAd/VVNativeAd1View.ts",VVNativeAd1View);
        reg("View/VVTemplate/NativeAd/VVNativeAd2View.ts",VVNativeAd2View);
        reg("View/TemplateViews/WXCrazyClick/WXCrazyClick.ts",WXCrazyClick);
        reg("View/TipsView/TipsView.ts",TipsView);
        reg("ShareAd/View/LoopAdBox.ts",LoopAdBox);
        reg("ShareAd/View/HorizontalLoopAdView.ts",HorizontalLoopAdView);
        reg("ShareAd/View/BannerAdView.ts",BannerAdView);
        reg("View/Common/UniversalBottomZone.ts",UniversalBottomZone);
    }
}
GameConfig.init();