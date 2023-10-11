export default class BaseTooth extends Laya.Script3D {
    constructor() {
        super();
    }
    //当前所在的牙齿的节点
    protected _ownerSp3D: Laya.Sprite3D;
    //是上牙床的牙齿还是下牙床的牙齿
    protected _jawPostion: number = 0;
    //是从左往右第几颗牙齿
    protected _toothIndex: number = 0;
    /* 补牙结束的最终效果 */
    protected _finishSp: Laya.Sprite3D;
    /* 当前需要修补的牙齿种类 */
    protected _currentToothParent: Laya.Sprite3D;
    /* 是否激活牙齿 */
    protected _toothActive: boolean = false;
    /* 牙齿控制中心点 */
    protected _ctrLoc: Laya.Sprite3D;
    //牙齿是否清除完毕
    protected _isCleanned: boolean = false;
    //控制范围,当手柄接近牙齿时，其感应范围会自动增大，给用户一个良好的体验
    protected _controlDistance: number = 1;
    //控制范围计时器
    protected _controlTimer: number = 0;
    /* 牙齿完成特效 */
    protected _cleanerEffect: Laya.Sprite3D;
    onAwake() {
        this._ownerSp3D = this.owner as Laya.Sprite3D;
        this._ctrLoc = this.owner.getChildByName("CtrLoc") as Laya.Sprite3D;
        // this._cleanerEffect = this.owner.getChildByName("xingxing") as Laya.Sprite3D;
        // console.log(this.owner.name);
        // console.log(this.owner.parent.name);
        this.InitTooth();
    }

    /**
     * 设置当前的牙齿类型
     * 
     * @memberof BaseTooth
     */
    InitTooth() {

    }
    onStart() {

    }

    // ResetToothState() {

    // }
    /**
     * 手动调用Update更新牙齿
     * 
     * @public
     * @memberof BaseTooth
     */
    public onToothUpdate(handle: Laya.Sprite3D, arg?: any): boolean {
        if (this._isCleanned) {
            return true;
        }
        let totalDis = Laya.Vector3.distanceSquared(this._ownerSp3D.transform.position, handle.transform.position);
        if (totalDis > 2) {
            this._controlTimer = 0;
            return false;
        }
        else {
            if (this._controlTimer < 1000) {
                this._controlTimer += Laya.timer.delta;
            }
            this._controlDistance = 1 + (this._controlTimer / 1000) * 2;
        }
    }
}