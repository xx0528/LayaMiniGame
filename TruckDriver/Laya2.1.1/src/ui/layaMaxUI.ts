/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import View=Laya.View;
import Dialog=Laya.Dialog;
import Scene=Laya.Scene;
var REG: Function = Laya.ClassUtils.regClass;
export module ui.View {
    export class LoadingUI extends Scene {
        public static  uiView:any ={"type":"Scene","props":{"width":750,"top":0,"right":0,"left":0,"height":1334,"bottom":0},"compId":2,"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"View/LoadingView/LoadingView.ts"},"compId":7},{"type":"Image","props":{"y":-208,"x":0,"width":750,"skin":"subRes/image/bg.jpg","name":"Background","height":3149},"compId":35},{"type":"Clip","props":{"top":0,"right":0,"name":"Bg","left":0,"bottom":0},"compId":17,"child":[{"type":"Sprite","props":{"y":121,"x":95,"texture":"Loading/logo.png","name":"logo"},"compId":9},{"type":"Sprite","props":{"y":348,"x":161,"texture":"Loading/sp_carlogo.png","name":"mainlogo"},"compId":10},{"type":"Clip","props":{"skin":"comp/clip_num.png","right":0,"name":"BottomZone","left":0,"height":570,"bottom":100},"compId":18,"child":[{"type":"Clip","props":{"y":326,"x":376,"width":615,"skin":"Loading/loadingxiatiao.png","pivotY":22,"pivotX":308,"name":"processBarBg","height":44,"sizeGrid":"0,25,0,25"},"compId":19,"child":[{"type":"Clip","props":{"y":22,"x":10,"width":594,"skin":"Loading/loadingshangtiao.png","pivotY":13,"name":"processBar","left":11,"height":26,"bottom":9,"sizeGrid":"0,12,0,12"},"compId":20,"child":[{"type":"Text","props":{"y":-54,"x":186,"text":"Loading... ...","fontSize":40,"color":"#ffffff","runtime":"laya.display.Text"},"compId":37}]}]}]}]}],"loadList":["subRes/image/bg.jpg","Loading/logo.png","Loading/sp_carlogo.png","comp/clip_num.png","Loading/loadingxiatiao.png","Loading/loadingshangtiao.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.createView(LoadingUI.uiView);
        }
    }
    REG("ui.View.LoadingUI",LoadingUI);
}