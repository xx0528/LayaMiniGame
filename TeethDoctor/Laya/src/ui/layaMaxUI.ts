/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import LayaView=Laya.View;
import Dialog=Laya.Dialog;
import Scene=Laya.Scene;
var REG: Function = Laya.ClassUtils.regClass;
export module ui.View {
    export class LoadingUI extends Laya.View {
        public static  uiView:any ={"type":"View","props":{"width":750,"top":0,"right":0,"left":0,"height":1334,"bottom":0},"compId":2,"child":[{"type":"Sprite","props":{"y":0,"x":0,"texture":"切图/loading/loading背景.png"},"compId":39},{"type":"Box","props":{"top":0,"right":0,"name":"Bg","left":0,"bottom":0},"compId":6,"child":[{"type":"Image","props":{"x":49,"top":150,"skin":"切图/loading/logo.png","centerX":0},"compId":37},{"type":"Image","props":{"width":725,"skin":"切图/loading/loading下条.png","sizeGrid":"10,23,10,23","name":"processBarBg","height":54,"centerX":0,"bottom":250},"compId":8,"child":[{"type":"Clip","props":{"width":713,"skin":"切图/loading/loading上条.png","sizeGrid":"12,28,10,26","pivotY":22,"name":"processBar","left":6,"height":42,"bottom":7},"compId":5},{"type":"Sprite","props":{"y":-53,"x":280,"texture":"切图/loading/LOADING.png"},"compId":38}]}]},{"type":"Script","props":{"y":0,"x":0,"runtime":"View/LoadingView/LoadingView.ts"},"compId":7}],"loadList":["切图/loading/loading背景.png","切图/loading/logo.png","切图/loading/loading下条.png","切图/loading/loading上条.png","切图/loading/LOADING.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.createView(LoadingUI.uiView);
        }
    }
    REG("ui.View.LoadingUI",LoadingUI);
}