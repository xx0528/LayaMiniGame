import BaseTooth from "./BaseTooth";

export default class CutTooth extends BaseTooth {
    constructor() {
        super();
    }
    //有结石的牙
    private _cutTooth: Laya.Sprite3D;
    //牙结石列表
    private _cutPieceList: Array<Laya.Sprite3D> = [];
    //需要缓动的牙齿列表
    private _tweenPieceList: Array<Laya.Sprite3D> = [];
    //钻牙材质
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
        this._currentToothParent = this._ownerSp3D.getChildByName("CutTooth") as Laya.Sprite3D;
        this._cutTooth = this._currentToothParent.getChildByName("zuanya") as Laya.Sprite3D;
        this._finishSp = this._currentToothParent.getChildByName("ya") as Laya.Sprite3D;
        this._finishSpMat = (this._finishSp as Laya.MeshSprite3D).meshRenderer.material as Laya.BlinnPhongMaterial;
        for (let index = 0; index < this._cutTooth.numChildren; index++) {
            const element = this._cutTooth.getChildAt(index) as Laya.Sprite3D;
            this._cutPieceList.push(element);
        }
    }
    onStart() {
        this.ResetToothState();
    }

    ResetToothState() {
        for (let index = 0; index < this._ownerSp3D.numChildren; index++) {
            const tooth = this._ownerSp3D.getChildAt(index) as Laya.Sprite3D;
            if (tooth != this._currentToothParent && tooth.name != "CtrLoc") {
                // console.log("删除其他牙齿");
                // this._ownerSp3D._children.splice(index, 1);
                this._ownerSp3D.removeChild(tooth);
                tooth.destroy();
                index--;
            }
        }
    }

    public onToothUpdate(handle: Laya.Sprite3D): boolean {
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
        for (let index = 0; index < this._cutPieceList.length; index++) {
            let piece = this._cutPieceList[index] as Laya.Sprite3D;
            if (piece == null || piece.transform == null || !piece.active) continue;
            let distance = Laya.Vector3.distanceSquared(handle.transform.position, piece.transform.position);
            if (distance < 0.05 * this._controlDistance) {
                this._cutPieceList.splice(index, 1);
                this._tweenPieceList.push(piece);
                handle.event("ShowEffect", "CutTooth");
                index--;
            }
        }
        if (this._cutPieceList.length <= 10) {
            for (let index = 0; index < this._cutPieceList.length; index++) {
                const piece = this._cutPieceList[index];
                this._cutPieceList.splice(index, 1);
                this._tweenPieceList.push(piece);
                index--;
            }
        }
        this._isCleanned = this._cutPieceList.length <= 0 && this._tweenPieceList.length <= 0;
        if (this._isCleanned) {
            this._finishSpMat.albedoColor = new Laya.Vector4(1, 1, 1, 1);
            this._currentToothParent.transform.localScale = new Laya.Vector3(0.999, 0.999, 0.999);
            return true;
        }
        return false;
    }

    onUpdate() {
        /* 待完成,牙齿碎片的缓动动画 */
        let count = 0;
        for (let index = 0; index < this._tweenPieceList.length; index++) {
            if (count > 5) return;
            let tweenToothPiece = this._tweenPieceList[index];
            let trans = tweenToothPiece.transform;
            let twY = 5;
            let twZ = -7;
            let twX = 1 - Math.random() * 2
            if (this._ownerSp3D.parent.name == "TopJaw") {
                twY = -10;
                twZ = -2;
            }
            Laya.Tween.to(trans, { localPositionX: twX, localPositionY: twY, localPositionZ: twZ, localRotationEulerX: Math.random() * 5, localRotationEulerY: Math.random() * 5, localRotationEulerZ: Math.random() * 5 }, 1000, null, Laya.Handler.create(tweenToothPiece, () => {
                tweenToothPiece.destroy();
            }));
            this._tweenPieceList.splice(index, 1);
            index--;
            count++;
        }
    }
}