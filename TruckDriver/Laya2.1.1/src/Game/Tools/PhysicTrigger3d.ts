export default class PhysicTrigger3d extends Laya.Script3D {

    private static readonly triggerenter = "triggerenter3d";
    private static readonly triggerstay = "triggerstay3d";
    private static readonly triggerexit = "triggerexit3d"

    private static readonly collisionStay = "CollisionStay";

    public static GetTrigger(node: Laya.Sprite3D): PhysicTrigger3d {
        let trigger = node.getComponent(PhysicTrigger3d);
        if (trigger == null) {
            trigger = node.addComponent(PhysicTrigger3d);
        }
        return trigger;
    }

    public OnTriggerEnter(caller, callBack): void {
        if (callBack) {
            this.owner.on(PhysicTrigger3d.triggerenter, caller, callBack);
        }
    }

    public OnTriggerExit(caller, callBack): void {
        if (callBack) {
            this.owner.on(PhysicTrigger3d.triggerexit, caller, callBack);
        }
    }

    public OnTriggerStay(caller, callBack): void {
        if (callBack) {
            this.owner.on(PhysicTrigger3d.triggerstay, caller, callBack);
        }
    }

    public OnCollisionStay(caller, callBack): void {
        if (callBack) {
            this.owner.on(PhysicTrigger3d.collisionStay, caller, callBack);
        }
    }

    onEnable(): void {

    }

    onDisable(): void {
        this.owner.offAll(PhysicTrigger3d.triggerenter);
        this.owner.offAll(PhysicTrigger3d.triggerstay);
        this.owner.offAll(PhysicTrigger3d.triggerexit);
    }

    onTriggerEnter(other: Laya.PhysicsComponent): void {
        this.owner.event(PhysicTrigger3d.triggerenter, [this.owner, other]);
    }

    onTriggerExit(other: Laya.PhysicsComponent): void {
        this.owner.event(PhysicTrigger3d.triggerexit, [this.owner, other]);
    }

    onTriggerStay(other: Laya.PhysicsComponent): void {
        this.owner.event(PhysicTrigger3d.triggerstay, [this.owner, other]);
    }

    onCollisionStay(collision: Laya.Collision): void {
        this.owner.event(PhysicTrigger3d.collisionStay, [this.owner, collision]);
    }
}