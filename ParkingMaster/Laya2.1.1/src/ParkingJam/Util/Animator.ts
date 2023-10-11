export default class AnimatorCtrl extends Laya.Script3D {

    protected _animator: Laya.Animator = null;
    
    constructor() { super(); }

    onAwake(): void {
        this._animator = this.owner.getComponent(Laya.Animator);
        // console.log("_animator", this._animator);
    }
    
    onDisable(): void {
    }

    pause() {
        this._animator.speed = 0;
    }

    resume() {
        this._animator.speed = 1;
    }

    play(animName: string, layerIndex: number = 0, normalizeTime: number = 0) {
        this._animator.play(animName, layerIndex, normalizeTime);
    }

}