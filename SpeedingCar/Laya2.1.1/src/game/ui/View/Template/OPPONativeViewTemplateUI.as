/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
package game.ui.View.Template {
	import laya.ui.*;import laya.display.*; 
	import OPPO_wcjtn_NativeAd_wcjtn_ViewTemplate;

	public class OPPONativeViewTemplateUI extends View {

		public static var uiView:Object =/*[STATIC SAFE]*/{"type":"View","props":{"width":750,"top":0,"right":0,"left":0,"height":1334,"bottom":0},"compId":2,"child":[{"type":"Box","props":{"top":0,"styleSkin":"Lottery/BG_Menu.min.png","right":0,"name":"BG","left":0,"bottom":0,"bgColor":"#3777a1"},"compId":3},{"type":"Sprite","props":{"y":399,"x":27,"width":696,"name":"CenterZone","height":535},"compId":4,"child":[{"type":"Sprite","props":{"width":696,"name":"Display","height":535},"compId":5},{"type":"Sprite","props":{"y":588,"x":348,"width":152,"texture":"Template/继续游戏 拷贝.png","pivotY":20,"pivotX":76,"name":"OkBtn","height":40},"compId":7},{"type":"Sprite","props":{"y":17,"x":20,"width":54,"texture":"Template/关闭X.png","pivotY":28,"pivotX":27,"name":"CloseBtn","height":56},"compId":6}]},{"type":"Script","props":{"runtime":"OPPO_wcjtn_NativeAd_wcjtn_ViewTemplate"},"compId":11}],"loadList":["Lottery/BG_Menu.min.png","Template/继续游戏 拷贝.png","Template/关闭X.png"],"loadList3D":[]};
		override protected function createChildren():void {
			super.createChildren();
			createView(uiView);

		}

	}
}