import BaseTooth from "./BaseTooth";

export default class FillingTooth extends BaseTooth {
    constructor() {
        super()
    }
    private _fillHoleParent: Laya.Sprite3D;
    private _fillHoleList: Array<Laya.Sprite3D> = [];
    private _fillTooth: Laya.Sprite3D;
    //牙齿闪烁
    private _fillSpMat: Laya.BlinnPhongMaterial;
    //牙齿计时器
    private _time: number = 0;
    private _normalMat: Laya.BlinnPhongMaterial;
    onAwake() {
        super.onAwake();
    }
    /**
     * 初始化牙齿
     * 
     * @memberof CalculusThooth
     */
    InitTooth() {
        this._currentToothParent = this._ownerSp3D.getChildByName("FillTooth") as Laya.Sprite3D;
        this._fillHoleParent = this._currentToothParent.getChildByName("buya") as Laya.Sprite3D;
        for (let index = 0; index < this._fillHoleParent.numChildren; index++) {
            const fill = this._fillHoleParent.getChildAt(index) as Laya.Sprite3D;
            this._fillHoleList.push(fill);
        }
        this._fillTooth = this._currentToothParent.getChildByName("yadong") as Laya.Sprite3D;
        this._fillSpMat = (this._fillTooth.getChildAt(0) as Laya.MeshSprite3D).meshRenderer.material as Laya.BlinnPhongMaterial;
        this._finishSp = this._currentToothParent.getChildByName("ya") as Laya.Sprite3D;
        this._normalMat = (this._finishSp.getChildAt(0) as Laya.MeshSprite3D).meshRenderer.material as Laya.BlinnPhongMaterial;
    }

    onStart() {
        // Laya.timer.once(50, this, this.ResetToothState);
        this.ResetToothState();
    }

    public ResetToothState() {
        for (let index = 0; index < this._ownerSp3D.numChildren; index++) {
            const tooth = this._ownerSp3D.getChildAt(index) as Laya.Sprite3D;
            if (tooth != this._currentToothParent) {
                if (tooth.name == "BraceTooth" || tooth.name == "PaintTooth" || tooth.name == "CtrLoc") {
                    // console.log("保留牙齿:", tooth.name);
                    tooth.active = false;
                }
                else {
                    // this._ownerSp3D._children.splice(index, 1);
                    this._ownerSp3D.removeChild(tooth);
                    tooth.destroy();
                    index--;
                    //     console.log("删除其他牙齿", tooth.name);
                    //     tooth.active = false;
                }

            }
            // else {
            //     tooth.active = true;
            // }
        }
        this._currentToothParent.active = true;
        this._fillTooth.active = true;
        this._finishSp.active = false;
    }

    public onToothUpdate(handle: Laya.Sprite3D): boolean {
        if (!this._isCleanned) {
            this._time += Laya.timer.delta;
            this._fillSpMat.albedoColorR = 0.8 + (Math.sin(this._time / 200)) * 0.2;
            this._fillSpMat.albedoColorG = 0.8 + (Math.sin(this._time / 200)) * 0.2;
            this._fillSpMat.albedoColorB = 0.8 + (Math.sin(this._time / 200)) * 0.2;
        }
        if (super.onToothUpdate(handle)) return true;
        if (Laya.Vector3.distanceSquared(handle.transform.position, this._ctrLoc.transform.position) > 0.5) {
            // console.log(this._ownerSp3D.name);
            // console.log(Laya.Vector3.distanceSquared(handle.transform.position, this._ctrLoc.transform.position));
            return false;
        }
        // this._currentToothParent.active = true;
        // this._finishSp.active = false;
        let fillCount = 0;
        for (let index = 0; index < this._fillHoleList.length; index++) {
            let piece = this._fillHoleList[index] as Laya.Sprite3D;
            let distance = Laya.Vector3.distanceSquared(handle.transform.position, piece.transform.position);
            if (distance < 0.07 * this._controlDistance) {
                let litterBall = piece.getChildAt(0) as Laya.Sprite3D;
                if (litterBall.transform.localScaleX >= 7) {
                    fillCount++;
                }
                else {
                    let scale = litterBall.transform.localScaleX
                    handle.event("ShowEffect", "FillingTooth");
                    scale += 0.1;
                    litterBall.transform.localScaleX = scale;
                    litterBall.transform.localScaleY = scale;
                    litterBall.transform.localScaleZ = scale;
                }
            }
        }
        this._isCleanned = fillCount >= 3;
        if (this._isCleanned) {
            this._fillTooth.active = false;
            this._finishSp.active = true;
            this._currentToothParent.transform.localScale = new Laya.Vector3(0.9999, 0.9999, 0.9999);
        }
        return false;
    }
    onUpdate() {
        /* 待完成,牙齿碎片的缓动动画 */

    }
}