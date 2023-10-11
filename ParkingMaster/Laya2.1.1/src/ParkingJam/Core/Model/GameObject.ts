import { CarState } from "../../Constants";
import Car from "./Car";
import LevelLogic from "../LevelLogic";
import GameCtrl from "../../GameCtrl";

export default class GameObjcet extends Laya.Script3D {
    public w: number = 1;

    public h: number = 1;

    public unitScale: Laya.Vector3 = new Laya.Vector3(0, 0, 0);

    public sprite: Laya.Sprite3D;

    public lastPos: Laya.Vector3 = new Laya.Vector3(0,0,0);

    public animCtrl: Laya.Animator;

    private _color: Laya.Color;

    private _parent: Laya.Scene3D;

    private state: CarState = CarState.None;

    private levelCtrl: LevelLogic;

    private gameCtrl: GameCtrl;
    
    constructor() { super(); }

    onAwake(): void {
        this.sprite = this.owner as Laya.Sprite3D;
    }

    onPostRender(): void {
    }

    setState(val: CarState) {
        this.state = val;
    }

    getState(): CarState {
        return this.state;
    }

    setLastPos(pos: Laya.Vector3) {
        this.lastPos.x = pos.x;
        this.lastPos.y = pos.y;
        this.lastPos.z = pos.z;
    }

    setLevelCtrl(ctrl: LevelLogic, gameCtrl: GameCtrl) {
        this.levelCtrl = ctrl;
        this.gameCtrl = gameCtrl;
    }

    getLevelCtrl(): LevelLogic {
        return this.levelCtrl;
    }

    getGameCtrl(): GameCtrl {
        return this.gameCtrl;
    }

    setScale(x: number = null, z: number = null) {
        var t = this.sprite.transform.scale;
        t.x = (x==null?t.x:x*this.unitScale.x);
        t.z = (z==null?t.z:z*this.unitScale.z);
        this.sprite.transform.scale = t;
    }

}