import BaseTooth from "./BaseTooth";

export default class BraceTooth extends BaseTooth {
    constructor() {
        super()
    }
    /* 提示盒子 */
    private _cube: Laya.MeshSprite3D;
    /* 提示盒子材质 */
    private _cubeMaterial: Laya.BlinnPhongMaterial;
    /* 提示盒子材质闪烁计时器 */
    private _cubeMaterialTimer: number = 0;
    /* 箍牙器 */
    private _bracer: Laya.Sprite3D;
    /* 箍牙进度计时器 */
    private _bracerTimer: number = 0;
    onAwake() {
        super.onAwake();
    }

    /**
     * 初始化牙齿
     * 
     * @memberof BraceTooth
     */
    InitTooth() {
        this._currentToothParent = this._ownerSp3D.getChildByName("BraceTooth") as Laya.Sprite3D;
        this._cube = this._currentToothParent.getChildByName("Cube") as Laya.MeshSprite3D;
        this._cubeMaterial = this._cube.meshRenderer.material as Laya.BlinnPhongMaterial;
        this._bracer = this._currentToothParent.getChildByName("Bracer") as Laya.Sprite3D;
        for (let index = 0; index < this._ownerSp3D.numChildren; index++) {
            const tooth = this._ownerSp3D.getChildAt(index) as Laya.Sprite3D;
            // tooth.active = false;
            if (tooth != this._currentToothParent) {
                if (tooth.name == "CalculusThooth" || tooth.name == "FillTooth" || tooth.name == "CtrLoc") {
                    // console.log("保留牙齿:", tooth.name);
                    tooth.active = false;
                }
                // else {
                //     tooth.active = false;
                // }
                else {
                    // tooth.active = false;
                    // console.log("删除其他牙齿");
                    // this._ownerSp3D._children.splice(index, 1);
                    this._ownerSp3D.removeChild(tooth);
                    index--;
                    tooth.destroy();
                }
            }
            else {
                this._bracer.active = false;
                this._cubeMaterial.albedoColorA = 0;
                tooth.active = true;
            }
        }
    }

    // onStart() {
    //     this.ResetToothState();
    // }

    // public ResetToothState() {

    // }

    /**
     * 
     * 
     * @memberof BraceTooth
     */
    onToothUpdate(handle: Laya.Sprite3D): boolean {
        this._currentToothParent.active = true;
        if (super.onToothUpdate(handle)) return true;
        this._cubeMaterialTimer += (Laya.timer.delta / 200);
        this._cubeMaterial.albedoColorA = Math.sin(this._cubeMaterialTimer);
        let distance = Laya.Vector3.distanceSquared(handle.transform.position, this._cube.transform.position);
        if (Laya.Vector3.distanceSquared(handle.transform.position, this._ctrLoc.transform.position) > 0.5) {
            // console.log(this._ownerSp3D.name);
            // console.log(Laya.Vector3.distanceSquared(handle.transform.position, this._ctrLoc.transform.position));
            return false;
        }
        if (distance < 0.05 * this._controlDistance) {
            this._cube.active = false;
            this._bracer.active = true;
            handle.event("SwitchAni");
            handle.event("ShowEffect", "BraceTooth");
            this._isCleanned = true;
        }
        return false;
    }
}