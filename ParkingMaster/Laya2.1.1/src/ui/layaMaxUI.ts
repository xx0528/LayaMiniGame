/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import View=Laya.View;
import Dialog=Laya.Dialog;
import Scene=Laya.Scene;
var REG: Function = Laya.ClassUtils.regClass;
export module ui.View {
    export class LoadingUI extends Scene {
        public static  uiView:any ={"type":"Scene","props":{"width":750,"top":0,"right":0,"left":0,"height":1334,"bottom":0},"compId":2,"child":[{"type":"Image","props":{"top":-100,"skin":"GameView/轮播ad.png","right":0,"name":"bg","left":0,"bottom":-100},"compId":26},{"type":"Clip","props":{"y":0,"x":1,"width":750,"name":"Bg","height":1334},"compId":6,"child":[{"type":"Clip","props":{"right":0,"name":"BottomZone","left":0,"height":570,"bottom":100},"compId":23,"child":[{"type":"Clip","props":{"y":326,"x":376,"width":615,"skin":"Loading/loadingxiatiao.png","pivotY":22,"pivotX":308,"name":"processBarBg","height":44},"compId":8,"child":[{"type":"Clip","props":{"y":22,"x":10,"width":594,"skin":"Loading/loadingshangtiao.png","pivotY":13,"name":"processBar","left":11,"height":26,"bottom":9},"compId":5},{"type":"Text","props":{"y":-63,"x":190,"text":"Loading ...","fontSize":50,"color":"#ffffff","runtime":"laya.display.Text"},"compId":27}]}]},{"type":"Sprite","props":{"y":291,"x":22.5,"texture":"Loading/logo.png"},"compId":24}]},{"type":"Script","props":{"y":0,"x":0,"runtime":"View/LoadingView/LoadingView.ts"},"compId":7}],"loadList":["GameView/轮播ad.png","Loading/loadingxiatiao.png","Loading/loadingshangtiao.png","Loading/logo.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.createView(LoadingUI.uiView);
        }
    }
    REG("ui.View.LoadingUI",LoadingUI);
}