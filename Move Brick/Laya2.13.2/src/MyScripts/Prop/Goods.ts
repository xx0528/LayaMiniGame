export default class Goods extends Laya.Script3D {
    protected _sprite3D: Laya.Sprite3D = null;
    protected _nInitScal :Laya.Vector3  = new Laya.Vector3(1,1,1);

    onAwake() {
        super.onAwake();
        this._sprite3D = this.owner as Laya.Sprite3D;
        this._nInitScal = this._sprite3D.transform.getWorldLossyScale().clone();
    }

    onUpdate(){
        super.onUpdate();
        this._sprite3D.transform.setWorldLossyScale(this._nInitScal);
    }
}