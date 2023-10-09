export default class BarrierRock extends Laya.Script3D {
    protected _sprite3D: Laya.Sprite3D = null;
    protected _collider: Laya.PhysicsCollider = null;
    protected _animator: Laya.Animator = null;

    onAwake() {
        super.onAwake();
        this._sprite3D = this.owner as Laya.Sprite3D;
        this._collider = this.owner.getComponent(Laya.PhysicsCollider);
        this._animator = this._sprite3D.getComponent(Laya.Animator) as Laya.Animator;

        this._animator.enabled = false;
        this.BeHitted();
    }

    onEnable(): void {
        super.onEnable();
    }

    onDisable(): void {
        super.onDisable();
        Laya.timer.frameOnce(1, this, () => {
            this._sprite3D.destroy();
        })
    }

    onDestroy() {
        super.onDestroy();
        Laya.timer.clearAll(this);
    }

    protected BeHitted() {
        this._collider.enabled = false;
        this._animator.enabled = true;

        Laya.timer.once(2200, this, this.DestroySelf, null, false)
        console.log("BeHitted");
    }

    protected DestroySelf() {
        this._sprite3D.active = false;
    }
}