import Gam_XYXZS_eMgr from "../../Mgr/GameMgr";
import SceneManager from "../GameCore/SceneManager";

export default class Controller extends Laya.Script {
    constructor() {
        super();
    }
    private _x: number = 0;
    private _y: number = 0;
    private _mouseDown: boolean;
    onMouseDown() {
        this._mouseDown = true;
        this._x = Laya.stage.mouseX;
    }
    onMouseUp() {
        this._mouseDown = false;
    }
    onMouseMove() {
        if (this._mouseDown) {
            let movex = (Laya.stage.mouseX - this._x) / 5;
            let movey = (Laya.stage.mouseY - this._y) / 100;
            movex = Math.min(Math.max(-5, movex), 5);
            movey = Math.min(Math.max(-0.15, movey), 0.15);
            this._x = Laya.stage.mouseX;
            this._y = Laya.stage.mouseY;
            SceneManager.Instance.Input(movex, movey);
        }
    }
}