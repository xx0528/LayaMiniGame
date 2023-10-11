import RopePieces from "./RopePieces";
import { CollisionFilterGroupEnum } from "../PhysicsUtils";
import TideObject from "./TideObject";
import Even_JJKLBB_tMgr from "../../Event/EventMgr";
import { Event_JJKLBB_Def } from "../../Event/EventDef";
import SoundM_JJKLBB_gr from "../../Mgr/SoundMgr";
export default class Rope extends Laya.Script {
    constructor() {
        super();
    }
    /** @prop {name:endNode, tips:"铰链尾链接的组件", type:Node, default:null}*/
    public endNode: Laya.Sprite = null;
    /** @prop {name:endNodePivot,tips:"铰链尾组件的刚体中心点",type:Vec,default:"SpritePivot"}*/
    public endNodePivot: any = null;
    /** @prop {name:ropeTexture, tips:"铰链绳子材质", type:string,accept:res,default:"GameObjs/Rope.png"}*/
    public ropeTexture: string = "GameObjs/Rope.png";
    /** @prop {name:ropeLength, tips:"铰链绳子长度", type:int,default:15}*/
    public ropeLength: number = 15;
    /** @prop {name:lengtRate, tips:"绳子实际物理长度与距离的比例，默认为1", type:number,default:1}*/
    public lengtRate: number = 1;
    /** @prop {name:ropeWidth, tips:"铰链绳子宽度", type:int,default:40}*/
    public ropeWidth: number = 100;
    /** @prop {name:ropeShowRate, tips:"铰链绳子实际宽度与显示宽度的比值", type:number,default:0.25}*/
    public ropeShowRate: number = 0.1;
    /** @prop {name:linearDamping,tips:"绳子阻力",type:Number,min:0,default:0.3}*/
    public linearDamping: number = 0.3;
    private _endRig: Laya.RigidBody;
    private _endPoint: Laya.Point;
    private _startNode: Laya.Sprite;
    private _startRig: Laya.RigidBody;
    private _startPoint: Laya.Point;
    private _ropePiecesParent: Laya.Sprite;
    private _ropeNodeList: Array<Laya.Sprite> = [];
    private _ropeSpriteList: Array<RopePieces> = [];
    private _cutOnce: boolean = false;
    private _tideObj: TideObject;
    private _ropeBroken: boolean = false;
    onAwake() {
        if (!this.endNode) return;
        this._tideObj = this.endNode.getComponent(TideObject) as TideObject;
        if (!this._tideObj) return;
        this._startNode = this.owner as Laya.Sprite;
        this._startRig = this._startNode.getComponent(Laya.RigidBody);
        // if (this.starNodePivot == null) {
        this._startPoint = this._startNode.localToGlobal(new Laya.Point(this._startNode.pivotX, this._startNode.pivotY));
        // }
        // else {
        // this._startPoint = this._startNode.localToGlobal(new Laya.Point(this.starNodePivot[0], this.starNodePivot[1]));
        // }
        // this._startPoint = new Laya.Point(this._startNode.x, this._startNode.y);
        this._endRig = this.endNode.getComponent(Laya.RigidBody);
        if (this.endNodePivot) {
            this._endPoint = this.endNode.localToGlobal(new Laya.Point(this.endNodePivot[0], this.endNodePivot[1]));
        }
        else {
            this._endPoint = this.endNode.localToGlobal(new Laya.Point(this.endNode.pivotX, this.endNode.pivotY));
        }
        /* 给绳子建立存储节点 */
        this._ropePiecesParent = this._startNode.getChildByName("RopePiecesParent") as Laya.Sprite
        if (this._ropePiecesParent == null) {
            this._ropePiecesParent = new Laya.Sprite();
            this._ropePiecesParent.width = this._startNode.width;
            this._ropePiecesParent.height = this._startNode.height;
            this._ropePiecesParent.name = "RopePiecesParent";
            let index = Math.max(this._startNode.numChildren - 1, 0);
            this._startNode.addChildAt(this._ropePiecesParent, 0);
        }
        this.CreatRopePieces();
        // EventMgr.instance.regOnceEvent(EventDef.Game_RestartGame, this, this.onDisable);
    }
    // onDisable() {
    //     this._ropeNodeList.forEach(u => {
    //         u.visible = false;
    //         // let ropeJoint = u.getComponent(Laya.RopeJoint) as Laya.RopeJoint;
    //         // let rigidBody = u.getComponent(Laya.RigidBody) as Laya.RigidBody;
    //         // if(ropeJoint)ropeJoint.vis(false);
    //         // if(rigidBody)rigidBody._setActive(false);
    //     });
    // }
    // onDestroy() {

    // }
    /**
     * 创造绳子的碎片
     * 
     * @memberof Rope
     */
    CreatRopePieces() {
        let distance = this._startPoint.distance(this._endPoint.x, this._endPoint.y);
        let direct = new Laya.Point(this._endPoint.x - this._startPoint.x, this._endPoint.y - this._startPoint.y);
        direct.normalize();
        let ropeCount = Math.ceil(distance / this.ropeLength);
        let upper = this._startNode;
        let upperRig = this._startRig;
        for (let index = 0; index < ropeCount; index++) {
            /* 下面的代码是制造绳子的坐标 */
            let ropeNode: Laya.Sprite = new Laya.Sprite();
            ropeNode.name = "Rope";
            this._ropePiecesParent.addChildren(ropeNode);
            let tempPoint = Laya.Point.create();
            tempPoint.setTo(direct.x * index * this.ropeLength, direct.y * index * this.ropeLength);
            // tempPoint.setTo(tempPoint.x + this._startNode.pivotX, tempPoint.y + this._startNode.pivotY);
            // if (this.starNodePivot) {
            //     tempPoint.setTo(tempPoint.x + this.starNodePivot[0], tempPoint.y + this.starNodePivot[1]);
            // }
            // else {
            tempPoint.setTo(tempPoint.x + this._startNode.pivotX, tempPoint.y + this._startNode.pivotY);
            // }
            ropeNode.width = this.ropeWidth;
            ropeNode.height = this.ropeLength * 2;
            ropeNode.pivotX = ropeNode.width / 2;
            ropeNode.pivotY = ropeNode.pivotY / 2;
            ropeNode.x = tempPoint.x;
            ropeNode.y = tempPoint.y;
            /* 下面的代码用于制造绳子的物理效果*/
            let ropeCol: Laya.CircleCollider;
            /* if (index < ropeCount)  */{
                ropeCol = ropeNode.addComponent(Laya.CircleCollider);;
                ropeCol.radius = 9;
                ropeCol.x = ropeNode.pivotX;
                ropeCol.y = ropeNode.pivotY;
                ropeCol.isSensor = true;

                // ropeCol._setActive(false);
                // ropeCol.refresh();
            }

            let ropeRigBody: Laya.RigidBody = ropeNode.addComponent(Laya.RigidBody);
            ropeRigBody.getBody().m_mass = 0.01;
            ropeRigBody.linearDamping = this.linearDamping;
            ropeRigBody.allowRotation = false;
            ropeRigBody.category = CollisionFilterGroupEnum.Rope;
            ropeRigBody.mask = CollisionFilterGroupEnum.None | CollisionFilterGroupEnum.Ground;
            let ropeJoint: Laya.RopeJoint = new Laya.RopeJoint();
            ropeJoint.otherBody = upperRig;
            ropeJoint.maxLength = this.ropeLength * this.lengtRate;
            /* 测试,给绳子加碰撞器 */
            /* 测试完毕 */
            if (ropeCount - 1 == index) {
                ropeJoint.selfBody = this._endRig;
                if (this.endNodePivot != null) {
                    ropeJoint.selfAnchor = [this.endNodePivot[0], this.endNodePivot[1]];
                }
                else {
                    ropeJoint.selfAnchor = [this.endNode.pivotX, this.endNode.pivotY];
                }
                this._tideObj.SetRopeAnchor(ropeJoint);
            }
            else {
                ropeJoint.selfAnchor = [this.ropeWidth / 2, this.ropeLength * 0.5];
            }
            if (index == 0) {
                // if (this.endNodePivot != null) {
                //     ropeJoint.otherAnchor = [this.endNodePivot[0], this.endNodePivot[1]];
                // }
                // else {
                // if (this.starNodePivot) {
                //     ropeJoint.otherAnchor = [this.starNodePivot[0], this.starNodePivot[1]];
                // }
                // else {
                ropeJoint.otherAnchor = [this._startNode.pivotX, this._startNode.pivotY];
                // }
                // }
            }
            else {
                ropeJoint.otherAnchor = [this.ropeWidth / 2, this.ropeLength * 0.5];
            }
            upperRig = ropeRigBody;
            this._ropeNodeList.push(ropeNode);
            ropeNode.addComponentIntance(ropeJoint);
            if (ropeCol) {
                ropeCol.refresh();
            }
            if (index >= 1) {
                ropeNode.once(Laya.Event.MOUSE_OVER, this, this.RopeBeenCut, [index]);
            }
        }
        // /* 下面的代码用于制造绳子的显示效果,绳子显示效果数量要比绳子节点数少1*/
        for (let index = 0; index < this._ropeNodeList.length - 1; index++) {
            const sp = this._ropeNodeList[index];
            let ropeSp = new Laya.Sprite();
            ropeSp.loadImage(this.ropeTexture, null);
            ropeSp.width = this.ropeWidth * this.ropeShowRate;
            ropeSp.height = this.ropeLength;
            ropeSp.pivotX = ropeSp.width / 2;
            ropeSp.pivotY = ropeSp.height / 2;
            ropeSp.x = sp.pivotX;
            ropeSp.y = sp.pivotY;
            ropeSp.mouseEnabled = false;
            sp.addChild(ropeSp);
            let ropePiece = ropeSp.addComponent(RopePieces) as RopePieces;
            let top = index > 0 ? this._ropeNodeList[index - 1] : this._ropeNodeList[0];
            let down = index < this._ropeNodeList.length - 1 ? this._ropeNodeList[index + 1] : this._ropeNodeList[this._ropeNodeList.length - 1];
            ropePiece.SetAngle(top, down);
            // ropePiece.SetAngle(top, down, this._ropeNodeList.length, index);
            this._ropeSpriteList.push(ropePiece);
        }
    }
    /**
     * 绳子已被切断
     * 
     * @param {number} index 
     * @memberof Rope
     */
    RopeBeenCut(index: number) {
        if (!this._ropeBroken) {
            this._tideObj.RopeCut();
            this._ropeBroken = true;
        }
        /* 防止短时间内多次切绳子 */
        if (this._cutOnce) {
            return;
        }
        this._cutOnce = true;
        Laya.timer.once(500, this, () => {
            this._cutOnce = false;
        })
        SoundM_JJKLBB_gr.instance.playS_JJKLBB_ound("tiaoxia");
        /* 第一步将当前绳子物理效果切断 */
        let ropeJoint = this._ropeNodeList[index].getComponent(Laya.RopeJoint) as Laya.RopeJoint;
        let ropeRig = this._ropeNodeList[index].getComponent(Laya.RigidBody) as Laya.RigidBody;
        ropeJoint._setActive(false);
        for (let i = index; i < this._ropeNodeList.length; i++) {
            let rope = this._ropeNodeList[i];
            Laya.timer.once(100, rope, () => {
                let rig = rope.getComponent(Laya.RigidBody) as Laya.RigidBody;
                rig.linearDamping = 0.3;

                let col = rope.getComponent(Laya.CircleCollider) as Laya.CircleCollider;
                if (col) {
                    col.isSensor = false;
                }

                // col.radius = 1
                // col.x = rope.width / 2;
                // col.y = rope.height / 2;
            })
            rope.offAll(Laya.Event.MOUSE_OVER);
        }
        /* 第二步将当前绳子显示效果切断 */
        // if (index > 0) {
        //     this._ropeSpriteList[index - 1].RopeBeenCut(false);
        // }
        // if (index < this._ropeSpriteList.length - 1) {
        //     this._ropeSpriteList[index + 1].RopeBeenCut(true);
        // }
    }
}