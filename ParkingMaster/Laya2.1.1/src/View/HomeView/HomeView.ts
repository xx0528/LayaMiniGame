import ViewBase from "../ViewBase";
import GameMgr from "../../Mgr/GameMgr";

export default class HomeView extends ViewBase
{

    constructor() { super(); }

    onAwake()
    {
        var layer = this.owner.getChildByName("centerButtonLayer") as Laya.UIComponent;
        var button = layer.getChildByName("Button") as Laya.Button;
        button.on(Laya.Event.CLICK, this, this._onClickFriend);
        var buttonStart = layer.getChildByName("Text") as Laya.UIComponent;
        buttonStart.once(Laya.Event.CLICK, this, this._onClickStart);
    }

    _onClickStart() {
        GameMgr.getInstance().load3DGameScene(()=>{
            this.closeView();
        });
    }

    _onClickFriend() {
    }

}