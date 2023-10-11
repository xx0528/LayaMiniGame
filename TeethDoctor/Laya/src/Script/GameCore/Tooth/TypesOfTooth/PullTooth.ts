import BaseTooth from "./BaseTooth";

export default class PullTooth extends BaseTooth {
    constructor() {
        super()
    }

    /* 拔牙判断点 */
    private _pullLoc: Laya.Sprite3D;
    /* 有问题的牙齿 */
    private _pullTooth: Laya.MeshSprite3D;
    /* 有问题的牙齿材质 */
    private _pullToothMaterial: Laya.BlinnPhongMaterial;
    /* 有问题的牙齿材质计时器 */
    private _pullMaterialTimer: number = 0;
    /* 是否正在拔牙 */
    private _pulling: boolean = false;
    /* 有问题的牙齿原始材质颜色 */
    private _pullToothMaterialV4Orignal: Laya.Vector4;

    onAwake() {
        super.onAwake();
    }

    /**
     * 初始化牙齿
     * 
     * @memberof PullTooth
     */
    InitTooth() {
        this._currentToothParent = this._ownerSp3D.getChildByName("PullTooth") as Laya.Sprite3D;
        for (let index = 0; index < this._ownerSp3D.numChildren; index++) {
            const tooth = this._ownerSp3D.getChildAt(index);
            if (tooth != this._currentToothParent && tooth.name != "CtrLoc") {
                // console.log("删除其他牙齿",tooth.name);
                // this._ownerSp3D._children.splice(index, 1);
                this._ownerSp3D.removeChild(tooth);
                tooth.destroy();
                index--;
            }
        }
        this._pullTooth = this._currentToothParent.getChildByName("ya") as Laya.MeshSprite3D;
        this._pullLoc = this._currentToothParent.getChildByName("PullLoc") as Laya.Sprite3D;
        this._pullToothMaterial = this._pullTooth.meshRenderer.material as Laya.BlinnPhongMaterial;
        this._pullToothMaterialV4Orignal = this._pullToothMaterial.albedoColor.clone();
        this._pullToothMaterial.albedoColor = new Laya.Vector4(0.2, 0.2, 0.2, 1);
    }

    /**
     * 更新牙齿坐标
     * 
     * @returns 
     * @memberof PullTooth
     */
    onToothUpdate(handle: Laya.Sprite3D, arg?: any): boolean {
        if (super.onToothUpdate(handle)) return true;
        if (!this._pulling) {
            let distance = Laya.Vector3.distanceSquared(handle.transform.position, this._pullLoc.transform.position);
            if (distance < 0.1) {
                this._pulling = true;
                handle.event("PullingTooth", this._pullLoc.transform);
            }
            else {
                this._pullMaterialTimer += (Laya.timer.delta / 200);
                // let target = Math.min(0.4, Math.max(0.2, (0.5 + (Math.sin(this._pullMaterialTimer) * 0.5))));
                let target = 0.2 + (Math.sin(this._pullMaterialTimer) * 0.05);
                this._pullToothMaterial.albedoColor = new Laya.Vector4(target, target, target, 1);
                // this._pullToothMaterial.albedoColor.x = target;
                // this._pullToothMaterial.albedoColor.y = target;
                // this._pullToothMaterial.albedoColor.z = target;
            }
        }
        else {
            let PincersHandler = handle.getChildByName("HandlerMeshs").getChildByName("PincersHandler") as Laya.Sprite3D;
            /* 第一步,把牙齿往外面拔 */
            let localTrans = PincersHandler.transform.localPosition.clone();
            if (!arg.upJaw) {
                localTrans.y *= -1;
                localTrans.x *= -1;
                // localTrans.z *= -1;
            }
            if (arg.progress >= 0 && arg.progress < 1) {
                handle.event("ShowEffect", "PullTooth1");
                // this._pullToothMaterial.albedoColor = this._pullToothMaterialV4Orignal;
                this._pullTooth.transform.localPosition = localTrans;
            }
            /* 第二部,播放牙齿拔出去的动画 */
            else if (arg.progress >= 1 && arg.progress < 1.01) {
                handle.event("ShowEffect", "PullTooth2");
                this._pullTooth.transform.localPosition = localTrans;
            }
            else if (arg.progress >= 1.01 && arg.progress < 1.02) {
                this._pullToothMaterial.albedoColor = this._pullToothMaterialV4Orignal;
                this._pullTooth.transform.localPosition = localTrans;
            }
            /* 第三部,播放把牙齿拿回去的动画 */
            else if (arg.progress >= 1.02 && arg.progress < 2) {
                this._pullToothMaterial.albedoColor = this._pullToothMaterialV4Orignal;
                this._pullTooth.transform.localPosition = localTrans;
            }
            /* 第四部,把牙齿插回牙槽 */
            else if (arg.progress >= 2) {
                this._pullTooth.transform.localPosition = new Laya.Vector3(0,0,0); // Laya.ConchVector3.ZERO.clone();// Laya.Vector3._ZERO.clone();
                this._isCleanned = true;
            }
        }
    }
}