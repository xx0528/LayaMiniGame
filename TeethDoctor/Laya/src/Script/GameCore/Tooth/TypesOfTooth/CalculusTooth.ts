import BaseTooth from "./BaseTooth";
import Uti_XYXZS_lit from "../../../../Utilit";

export default class CalculusThooth extends BaseTooth {
    constructor() {
        super();
    }
    //有结石的牙
    private _calculToothPieceParent: Laya.Sprite3D;
    //牙结石列表
    private _calculsPieceList: Array<Laya.Sprite3D> = [];
    //需要缓动的牙齿列表
    private _tweenPieceList: Array<Laya.Sprite3D> = [];
    //牙齿闪烁
    private _finishSpMat: Laya.BlinnPhongMaterial;
    //牙齿计时器
    private _time: number = 0;
    private _ctrTimer: number = 0;
    onAwake() {
        super.onAwake();
    }
    /**
     * 初始化牙齿
     * 
     * @memberof CalculusThooth
     */
    InitTooth() {
        this._currentToothParent = this._ownerSp3D.getChildByName("CalculusThooth") as Laya.Sprite3D;
        this._calculToothPieceParent = this._currentToothParent.getChildByName("yagou") as Laya.Sprite3D;
        this._finishSp = this._currentToothParent.getChildByName("ya") as Laya.Sprite3D;
        this._finishSpMat = (this._finishSp.getChildAt(0) as Laya.MeshSprite3D).meshRenderer.material as Laya.BlinnPhongMaterial;
        for (let index = 0; index < this._calculToothPieceParent.numChildren; index++) {
            const element = this._calculToothPieceParent.getChildAt(index) as Laya.Sprite3D;
            this._calculsPieceList.push(element);
        }
        for (let index = 0; index < this._calculsPieceList.length; index++) {
            const piece = this._calculsPieceList[index];
            let rd = Math.random();
            if ((Uti_XYXZS_lit.isI_XYXZS_phone && rd < 0.3) || (!Uti_XYXZS_lit.isI_XYXZS_phone && rd < 0.1)) {
                this._calculsPieceList.splice(index, 1);
                piece.destroy();
                index--;
            }
        }
    }
    onStart() {
        this.ResetToothState();
    }
    ResetToothState() {
        for (let index = 0; index < this._ownerSp3D.numChildren; index++) {
            const tooth = this._ownerSp3D.getChildAt(index) as Laya.Sprite3D;
            if (tooth != this._currentToothParent) {
                if (tooth.name == "BraceTooth" || tooth.name == "PaintTooth" || tooth.name == "CtrLoc") {
                    // console.log("保留牙齿:", tooth.name);
                    tooth.active = false;
                }
                else {
                    // console.log("删除其他牙齿", tooth.name);
                    // tooth.active = false;
                    // this._ownerSp3D._children.splice(index, 1);
                    this._ownerSp3D.removeChild(tooth);
                    tooth.destroy();
                    index--;
                }
            }
            else {
                tooth.active = true;
                // this._calculToothPieceParent.active = false;
            }
        }
    }
    public onToothUpdate(handle: Laya.Sprite3D): boolean {
        this._currentToothParent.active = true;
        if (!this._isCleanned) {
            this._time += Laya.timer.delta;
            this._finishSpMat.albedoColorR = 0.8 + (Math.sin(this._time / 200)) * 0.2
            this._finishSpMat.albedoColorG = 0.8 + (Math.sin(this._time / 200)) * 0.2;
            this._finishSpMat.albedoColorB = 0.8 + (Math.sin(this._time / 200)) * 0.2;
        }
        if (super.onToothUpdate(handle)) return true;
        if (Laya.Vector3.distanceSquared(handle.transform.position, this._ctrLoc.transform.position) > 0.5) {
            // console.log(this._ownerSp3D.name);
            // console.log(Laya.Vector3.distanceSquared(handle.transform.position, this._ctrLoc.transform.position));
            this._ctrTimer = 0;
            return false;
        }
        if (this._ctrTimer < 200) {
            this._ctrTimer += Laya.timer.delta;
            return;
        }
        for (let index = 0; index < this._calculsPieceList.length; index++) {
            let piece = this._calculsPieceList[index] as Laya.Sprite3D;
            if (piece == null || piece.transform == null || !piece.active) continue;
            let distance = Laya.Vector3.distanceSquared(handle.transform.position, piece.transform.position);
            if (distance < 0.05 * this._controlDistance) {
                this._calculsPieceList.splice(index, 1);
                this._tweenPieceList.push(piece);
                handle.event("ShowEffect", "CalculusTooth");
                index--;
                // piece.active = false;
                // this.SetRandomTween(piece);
            }
        }
        if (this._calculsPieceList.length <= 30) {
            for (let index = 0; index < this._calculsPieceList.length; index++) {
                const piece = this._calculsPieceList[index];
                this._calculsPieceList.splice(index, 1);
                this._tweenPieceList.push(piece);
                index--;
            }
        }
        this._isCleanned = this._calculsPieceList.length <= 0;
        if (this._isCleanned) {
            this._finishSpMat.albedoColor = new Laya.Vector4(1, 1, 1, 1);
            this._currentToothParent.transform.localScale = new Laya.Vector3(0.9999, 0.9999, 0.9999);
            return true;
        }
        return false;
    }

    onUpdate() {
        /* 待完成,牙齿碎片的缓动动画 */
        let count = 0;
        for (let index = 0; index < this._tweenPieceList.length; index++) {
            let tweenToothPiece = this._tweenPieceList[index];
            let trans = tweenToothPiece.transform;
            let twY = 5;
            let twZ = -7;
            let twX = 1 - Math.random() * 2
            if (this._ownerSp3D.parent.name == "TopJaw") {
                twY = -10;
                twZ = -2;
            }
            Laya.Tween.to(trans, { localPositionX: twX, localPositionY: twY, localPositionZ: twZ, localRotationEulerX: Math.random() * 5, localRotationEulerY: Math.random() * 5, localRotationEulerZ: Math.random() * 5 }, 1000
                , null, Laya.Handler.create(tweenToothPiece, () => {
                    tweenToothPiece.destroy();
                }));
            this._tweenPieceList.splice(index, 1);
            index--;
            count++;
            // tweenToothPiece.destroy();
        }
    }
}