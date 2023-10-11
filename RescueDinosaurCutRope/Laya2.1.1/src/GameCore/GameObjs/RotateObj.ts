export default class RotateObj extends Laya.Script {
    constructor() {
        super();
    }
    /** @prop {name:rotateDir, tips:"旋转方向", type:Option,option:"Add,Dec",default:"Add"}*/
    public rotateDir: string = "Add";
    public OneLoopTime: number = 7000;
    private _timeScale: number;
    private _ownerSp: Laya.Sprite;
    onAwake() {
        this._ownerSp = this.owner as Laya.Sprite;
        this._timeScale = 360 / this.OneLoopTime;
    }
    onUpdate() {
        if (this.rotateDir == "Add") {
            this._ownerSp.rotation += Laya.timer.delta * this._timeScale;
        }
        else {
            this._ownerSp.rotation -= Laya.timer.delta * this._timeScale;
        }
    }
}