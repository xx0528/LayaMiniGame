import FSMStateMachine from "../StateMachine/FSMStateMachine";
import Game from "../Game";

var getHandler = Laya.Handler.create;
export default class CameraFollow extends Laya.Script3D {
    private camera: Laya.Camera;
    private target: Laya.Sprite3D;
    private followSpeed: number = 10;
    private offsetPosition: Laya.Vector3 = new Laya.Vector3;
    private animator: Laya.Animator = null;

    private stateMachine: FSMStateMachine = null;

    private get transform(): Laya.Transform3D {
        return (this.owner as Laya.Sprite3D).transform;
    }

    public onAwake(): void {
        this.camera = this.owner.getChildByName("Main Camera") as Laya.Camera;
        this.animator = this.camera.getComponent(Laya.Animator);
        this.animator.play("Default");

        this.stateMachine = new FSMStateMachine;
        this.stateMachine.AddAction("Default", this, this.OnDefaultEnter);
        this.stateMachine.AddAction("Driving", this, this.OnDrivingEnter);
        this.stateMachine.AddAction("Win", this, this.OnWinEnter);
        this.stateMachine.AddAction("Cave", this, this.OnCaveEnter, this.OnCaveExit);

        this.stateMachine.Switch("Default");
    }

    public Switch(key: string): void {
        this.stateMachine.Switch(key);
    }

    public TweenOffset(x: number, y: number, z: number, duration: number) {
        Laya.Tween.clearTween(this.offsetPosition);
        Laya.Tween.to(this.offsetPosition, {x: x, y: y, z: z}, duration * 1000);
    }

    private OnDefaultEnter(): void {
        this.animator.play("Default");
    }

    private OnDrivingEnter(): void {
        let state = this.animator.getCurrentAnimatorPlayState(0);
        if (state._finish) {
            this.animator.crossFade("Driving", 0.1);
        }
        else {
            Laya.timer.once(state._lastElapsedTime * 1000, this, () => {
                this.animator.crossFade("Driving", 1);
            });
        }
    }

    private OnWinEnter(): void {
        Laya.timer.clearAll(this);
        this.animator.crossFade("Win", 0.2);
    }

    private OnCaveEnter(): void {
        this.animator.play("EnterCave");
    }

    private OnCaveExit(): void {
        this.animator.play("ExitCave");
    }

    public SetTarget(target: Laya.Sprite3D): void {
        if (target == null) 
            return;
        let position = target.transform.position;
        target.transform.position.cloneTo(position);
        this.transform.position = position;
        this.target = target;

        //this.target.transform.on(Laya.Event.TRANSFORM_CHANGED, this, this.OnTransformUpdate);
    }

    public onLateUpdate(): void {
        if (this.target == null || !Game.Control.InGameing) {
            return;
        }
        
        let dt = Laya.timer.delta / 1000;
        let newPosition = this.target.transform.position.clone();
        Laya.Vector3.add(newPosition, this.offsetPosition, newPosition);
        let oldPosition = this.transform.position.clone();
        Laya.Vector3.lerp(oldPosition, newPosition, /*dt * this.followSpeed*/1, newPosition);
        this.transform.position = newPosition;
    }

    public OnTransformUpdate(flag): void {
    }
}