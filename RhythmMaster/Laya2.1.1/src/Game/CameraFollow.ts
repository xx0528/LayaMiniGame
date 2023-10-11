import BallController from "./BallController";

export default class CameraFollow extends Laya.Script3D {
    private camera: Laya.Camera;
    private targetBall: BallController;
    private offsetPosition: Laya.Vector3;
    
    public maxOffset: number = 1.0

    public get gameObject(): Laya.Sprite3D {
        return this.owner as Laya.Sprite3D;
    }

    onAwake(): void {
        this.camera = this.owner.getChildByName("Camera") as Laya.Camera;
    }

    public SetTaget(ballController: BallController): void {
        this.targetBall = ballController;
        this.offsetPosition = new Laya.Vector3();;
        Laya.Vector3.subtract(this.gameObject.transform.position, this.targetBall.gameObject.transform.position, this.offsetPosition);
    }

    onLateUpdate(): void {
        if (this.targetBall == null)
            return;

        let position = new Laya.Vector3;
        Laya.Vector3.add(this.targetBall.gameObject.transform.position, this.offsetPosition, position);
        let x = this.maxOffset * this.targetBall.OffsetPercent();
        position.setValue(x, position.y, position.z);
        this.gameObject.transform.position = position.clone();
    }
}