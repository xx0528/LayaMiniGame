import Event_myqq_Mgr from "../Event/EventMgr";
import { EventDef } from "../Event/EventDef";

export default class MouseMgr {
    private static _instance: MouseMgr;

    public enable: boolean = false;

    public static get Instance(): MouseMgr {
        if (MouseMgr._instance == null)
            MouseMgr._instance = new MouseMgr();
        return MouseMgr._instance;
    }

    constructor() {
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.OnMouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.OnMoseUp);
        Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.OnMoseUp);
    }

    public isDown = false;
    public isMoving = false;
    private mouseDownPoint: Laya.Vector3 = new Laya.Vector3(0, 0, 0);
    private OnMouseDown(e: Laya.Event): void {
        if (!this.enable) {
            return;
        }

        this.isDown = true;
        this.mouseMoveOffset = new Laya.Vector3(0, 0, 0);
        this.mouseDownPoint = new Laya.Vector3(e.stageX, e.stageY, 0);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.OnMouseMove);
    }

    private mouseMoveOffset: Laya.Vector3 = new Laya.Vector3(0, 0, 0);
    private OnMouseMove(e: Laya.Event): void {
        this.isMoving = true;
        this.mouseMoveOffset = new Laya.Vector3(0, 0, 0);
        Laya.Vector3.subtract(new Laya.Vector3(e.stageX, e.stageY, 0), this.mouseDownPoint, this.mouseMoveOffset)
    }

    private OnMoseUp(): void {
        this.isDown = false;
        this.isMoving = false;
        this.ResetMouseOffset();
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.OnMouseMove);
    }

    public ResetMouseOffset(): void {
        this.isDown = false;
        this.isMoving = false;
        this.mouseDownPoint = new Laya.Vector3(Laya.stage.mouseX, Laya.stage.mouseY, 0);
        this.mouseMoveOffset = new Laya.Vector3(0, 0, 0);
    }

    public GetMouseOffsetBySize(size: number, ignoreX: boolean = false, ignoreY: boolean = false, ignoreZ: boolean = false): Laya.Vector3 {

        let offset: Laya.Vector3 = new Laya.Vector3(0, 0, 0);
        Laya.Vector3.scale(this.mouseMoveOffset, size, offset);

        if (ignoreX) offset.x = 0;
        if (ignoreY) offset.y = 0;
        if (ignoreZ) offset.z = 0;

        return offset;
    }
}