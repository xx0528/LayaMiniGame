/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import GameMgr from "./Mgr/GameMgr"
import GameView from "./View/GameView/GameView"
import ButtonAnim from "./View/ButtonAnim"
import HorizontalLayout from "./ParkingJam/Components/HorizontalLayout"
import ButtonActionTip from "./ParkingJam/Components/ButtonActionTip"
import LoadingView from "./View/LoadingView/LoadingView"
import KRQ_LoopAdBox from "./KRQ/Com/KRQ_LoopAd/KRQ_LoopAdBox"
import KRQ_VLoopAd from "./KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd"
import Exprot2ViewTemplate from "./View/TemplateViews/Export2/Exprot2ViewTemplate"
import ViewAutoScaleByW from "./View/Common/ViewAutoScaleByW"
import Exprot3ViewTemplate from "./View/TemplateViews/Export3/Exprot3ViewTemplate"
import GameWinViewTemplate from "./View/TemplateViews/GameWin/GameWinViewTemplate"
import MiniGameViewTemplate from "./View/TemplateViews/MiniGame/MiniGameViewTemplate"
import KRQ_HistoryBox from "./KRQ/Com/KRQ_History/KRQ_HistoryBox"
import KRQ_History from "./KRQ/Com/KRQ_History/KRQ_History"
import WXCrazyClick from "./View/TemplateViews/WXCrazyClick/WXCrazyClick"
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
        reg("View/GameView/GameView.ts",GameView);
        reg("View/ButtonAnim.ts",ButtonAnim);
        reg("ParkingJam/Components/HorizontalLayout.ts",HorizontalLayout);
        reg("ParkingJam/Components/ButtonActionTip.ts",ButtonActionTip);
        reg("View/LoadingView/LoadingView.ts",LoadingView);
        reg("KRQ/Com/KRQ_LoopAd/KRQ_LoopAdBox.ts",KRQ_LoopAdBox);
        reg("KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd.ts",KRQ_VLoopAd);
        reg("View/TemplateViews/Export2/Exprot2ViewTemplate.ts",Exprot2ViewTemplate);
        reg("View/Common/ViewAutoScaleByW.ts",ViewAutoScaleByW);
        reg("View/TemplateViews/Export3/Exprot3ViewTemplate.ts",Exprot3ViewTemplate);
        reg("View/TemplateViews/GameWin/GameWinViewTemplate.ts",GameWinViewTemplate);
        reg("View/TemplateViews/MiniGame/MiniGameViewTemplate.ts",MiniGameViewTemplate);
        reg("KRQ/Com/KRQ_History/KRQ_HistoryBox.ts",KRQ_HistoryBox);
        reg("KRQ/Com/KRQ_History/KRQ_History.ts",KRQ_History);
        reg("View/TemplateViews/WXCrazyClick/WXCrazyClick.ts",WXCrazyClick);
    }
}
GameConfig.init();