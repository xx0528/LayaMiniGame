import Rope from "./Rope";
export default class MoveAnchor extends Laya.Script {
    constructor() {
        super();
    }
    private _ownerSp: Laya.Sprite;
    /** @prop {name:H_Or_V,tips:"滑动方向是水平或者垂直",type:Option,option:"Horizontal,Vertical",default:"Horizontal"}*/
    H_Or_V: String = "Horizontal";
    /** @prop {name:moveMaxRange, tips:"铰链绳子长度", type:int,default:100}*/
    public moveMaxRange: number = 130;
    private _currentMove: number = 0;
    private _moveForward: boolean;
    private _originalX: number;
    private _originalY: number;
    private _dragging: boolean = false;
    private _mouseX: number;
    private _mouseY: number;
    private _maxLength: number;
    private _ropeScript: Rope;
    private _accachedObj: Laya.Sprite;
    private _accachedObjRig: Laya.RigidBody;
    // private _ropePiecesParent: Laya.Sprite;
    onAwake() {
        this._ownerSp = this.owner as Laya.Sprite;
        this._ropeScript = this.owner.getComponent(Rope);
        if (this._ropeScript) {
            this._accachedObj = this._ropeScript.endNode;
            this._accachedObjRig = this._ropeScript.endNode.getComponent(Laya.RigidBody);
        }
        // this._ropePiecesParent = this.owner.getChildByName("RopePiecesParent") as Laya.Sprite
        // if (this._ropePiecesParent == null) {
        //     this._ropePiecesParent = new Laya.Sprite();
        //     this._ropePiecesParent.width = this._startNode.width;
        //     this._ropePiecesParent.height = this._startNode.height;
        //     this._ropePiecesParent.name = "RopePiecesParent";
        //     let index = Math.max(this._startNode.numChildren - 1, 0);
        //     this._startNode.addChildAt(this._ropePiecesParent, 0);
        // }
        // for
        this._originalX = this._ownerSp.x;
        this._originalY = this._ownerSp.y;
        // this._ownerSp.on(Laya.Event.DRAG_START, this, this.onDrag)
    }
    onStart() {

    }
    // onMouseDown(e: Laya.Event) {
    //     this._dragging = true;
    //     this._mouseX = Laya.stage.mouseX;
    //     this._mouseY = Laya.stage.mouseY;
    // }
    // onMouseUp() {
    //     this._dragging = false;
    //     this._mouseX = Laya.stage.mouseX;
    //     this._mouseY = Laya.stage.mouseY;
    //     this._accachedObjRig.linearVelocity = { x: 0, y: 0 };
    // }
    // onStageMouseUp() {
    //     this._dragging = false;
    //     this._mouseX = Laya.stage.mouseX;
    //     this._mouseY = Laya.stage.mouseY
    //     this._accachedObjRig.linearVelocity = { x: 0, y: 0 };
    // }
    onUpdate() {
        // if (!this._dragging) return;
        // if (this.H_Or_V == "Horizontal") {
        // let x = Laya.stage.mouseX;
        // let offset = (x - this._mouseX);
        // offset = offset >= 0 ? Math.min(this.moveMaxRange, offset) : Math.max(-1 * this.moveMaxRange, offset);
        // let xSpd = 0;
        // let ySpd = 0;
        // let tideObjX = this._accachedObj
        // if (offset >= 1) {
        //     // offset = Math.min(4, offset);
        //     // this._accachedObjRig.linearVelocity = { x: xSpd };
        //     // ySpd = 1.5;
        // }
        // else if (offset <= -1) {
        //     // offset = Math.max(-4, offset);
        //     xSpd = (offset * 1);
        //     ySpd = offset * 0.1;
        //     this._accachedObjRig.linearVelocity = { x: xSpd, y: ySpd };
        // }
        // this._ownerSp.x += offset;
        let spd = (Laya.timer.delta / 1000) * 40;
        if (this._moveForward) {
            if (this._currentMove < this.moveMaxRange) {
                this._currentMove += spd;
            }
            else {
                this._moveForward = false;
            }
        }
        else {
            if (this._currentMove > -1 * this.moveMaxRange) {
                this._currentMove -= spd;
            }
            else {
                this._moveForward = true;
            }
        }
        this._ownerSp.x = this._originalX + this._currentMove
        // if (this._ownerSp.x > this._originalX + this.moveMaxRange) {
        //     this._ownerSp.x = this._originalX + this.moveMaxRange
        // }
        // else if (this._ownerSp.x < this._originalX - this.moveMaxRange) {
        //     this._ownerSp.x = this._originalX - this.moveMaxRange
        // }
        // }
        // else {
        //     let y = Laya.stage.mouseY;
        //     let offset = (y - this._mouseY);
        //     offset = offset >= 0 ? Math.min(this.moveMaxRange, offset) : Math.max(-1 * this.moveMaxRange, offset);
        //     this._ownerSp.y = this._originalY + offset;
        // }
        this._mouseX = Laya.stage.mouseX;
        this._mouseY = Laya.stage.mouseY;
    }
}