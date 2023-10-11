import BaseTooth from "./BaseTooth";

export default class PaintTooth extends BaseTooth {
    constructor() {
        super()
    }
    //待喷涂的牙齿碎片父组件
    private _paintTooth: Laya.Sprite3D;
    //待喷涂的牙齿碎片
    private _paintPieceList: Array<Laya.Sprite3D> = [];
    //需要缓动的牙齿列表
    private _tweenPieceList: Array<Laya.Sprite3D> = [];
    /* 结束的牙齿材质 */
    private _finishSpMat: Laya.BlinnPhongMaterial;
    onAwake() {
        super.onAwake();
    }
    InitTooth() {
        this._currentToothParent = this._ownerSp3D.getChildByName("PaintTooth") as Laya.Sprite3D;
        this._paintTooth = this._currentToothParent.getChildByName("yagou") as Laya.Sprite3D;
        this._finishSp = this._currentToothParent.getChildByName("ya") as Laya.Sprite3D;
        this._finishSpMat = (this._finishSp as Laya.MeshSprite3D).meshRenderer.material as Laya.BlinnPhongMaterial;
        for (let index = 0; index < this._paintTooth.numChildren; index++) {
            const element = this._paintTooth.getChildAt(index) as Laya.Sprite3D;
            this._paintPieceList.push(element);
        }
        for (let index = 0; index < this._ownerSp3D.numChildren; index++) {
            const tooth = this._ownerSp3D.getChildAt(index) as Laya.Sprite3D;
            if (tooth != this._currentToothParent) {
                if (tooth.name == "CalculusThooth" || tooth.name == "FillTooth" || tooth.name == "CtrLoc") {
                    tooth.active = false;
                    // console.log("保留牙齿:", tooth.name);
                }
                else {
                    // console.log("删除其他牙齿");
                    // this._ownerSp3D._children.splice(index, 1);
                    this._ownerSp3D.removeChild(tooth);
                    tooth.destroy();
                    index--;
                }
            }
            else {
                this._finishSp.active = true;
                this._paintTooth.active = false;
            }
        }
    }
    /**
     * 
     * 
     * @param {Laya.Sprite3D} handle 
     * @returns {boolean} 
     * @memberof PaintTooth
     */
    public onToothUpdate(handle: Laya.Sprite3D): boolean {
        this._currentToothParent.active = true;
        this._paintTooth.active = true;
        if (super.onToothUpdate(handle)) return true;
        if (Laya.Vector3.distanceSquared(handle.transform.position, this._ctrLoc.transform.position) > 0.5) {
            // console.log(this._ownerSp3D.name);
            // console.log(Laya.Vector3.distanceSquared(handle.transform.position, this._ctrLoc.transform.position));
            return false;
        }
        for (let index = 0; index < this._paintPieceList.length; index++) {
            let piece = this._paintPieceList[index] as Laya.Sprite3D;
            if (piece == null || piece.transform == null || !piece.active) continue;
            let distance = Laya.Vector3.distanceSquared(handle.transform.position, piece.transform.position);
            if (distance < 0.05 * this._controlDistance) {
                this._paintPieceList.splice(index, 1);
                this._tweenPieceList.push(piece);
                handle.event("ShowEffect", "PaintTooth");
                index--;
                // piece.active = false;
                // this.SetRandomTween(piece);
            }
        }
        if (this._paintPieceList.length <= 35) {
            for (let index = 0; index < this._paintPieceList.length; index++) {
                const piece = this._paintPieceList[index];
                this._paintPieceList.splice(index, 1);
                this._tweenPieceList.push(piece);
                index--;
            }
        }
        this._isCleanned = this._paintPieceList.length <= 0;
        if (this._isCleanned) {
            // this._finishSpMat.albedoColor = new Laya.Vector4(0.866, 0.16, 0.643, 1);
            // this._paintTooth.active = false;
            return true;
        }
        return false;
    }

    onUpdate() {
        /* 待完成,牙齿碎片的缓动动画 */
        let count = 0;
        for (let index = 0; index < this._tweenPieceList.length; index++) {
            if (count > 5) return;
            let tweenToothPiece = this._tweenPieceList[index] as Laya.MeshSprite3D;
            let mat = tweenToothPiece.meshRenderer.material as Laya.BlinnPhongMaterial;
            let trans = tweenToothPiece.transform;
            Laya.Tween.to(mat, { albedoColorR: 1, albedoColorG: 0.768, albedoColorB: 0.141 }, 500);
            Laya.Tween.from(trans, { localPositionZ: -0.3 }, 500);
            this._tweenPieceList.splice(index, 1);
            index--;
            count++;
        }
    }
}