/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import View=Laya.View;
import Dialog=Laya.Dialog;
import Scene=Laya.Scene;
var REG: Function = Laya.ClassUtils.regClass;
export module ui.View {
    export class LoadingUI extends Scene {
        public static  uiView:any ={"type":"Scene","props":{"width":1080,"top":0,"right":0,"left":0,"height":1920,"bottom":0},"compId":2,"child":[{"type":"Image","props":{"y":-172,"x":0,"width":1080,"skin":"Loading/bg.png","height":2880},"compId":9},{"type":"Clip","props":{"top":0,"right":0,"name":"Bg","left":0,"bottom":0},"compId":6,"child":[{"type":"Image","props":{"y":1273,"x":258,"skin":"Loading/微信图片_201910231521391.png","name":"processBarBg"},"compId":8,"child":[{"type":"Clip","props":{"y":24,"x":2,"width":560,"skin":"Loading/微信图片_20191023152139.png","pivotY":22,"name":"processBar"},"compId":5},{"type":"Label","props":{"y":-64,"x":185,"width":194,"valign":"middle","text":"0.00%","name":"Value","height":52,"fontSize":50,"color":"#ffffff","align":"center"},"compId":10}]}]},{"type":"Script","props":{"y":0,"x":0,"runtime":"View/LoadingView/LoadingView.ts"},"compId":7}],"loadList":["Loading/bg.png","Loading/微信图片_201910231521391.png","Loading/微信图片_20191023152139.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.createView(LoadingUI.uiView);
        }
    }
    REG("ui.View.LoadingUI",LoadingUI);
}