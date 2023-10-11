export default class AiCar extends Laya.Script3D {

    private mRig:Laya.Rigidbody3D;

    constructor() { super(); }

    onAwake(){
        this.mRig = this.owner.getComponent(Laya.Rigidbody3D);
    }

    onUpdate(){
        this.mRig.wakeUp();
    }

    onTriggerEnter(){
        this.mRig.isKinematic = false;
        this.mRig.applyImpulse(new Laya.Vector3(20*(Math.random()*2-1),20*Math.random(),10*Math.random()+10));
        this.mRig.applyTorqueImpulse(new Laya.Vector3(Math.random(),Math.random(),Math.random()))
        this.mRig.gravity = new Laya.Vector3(0,-10,0);

    }
}