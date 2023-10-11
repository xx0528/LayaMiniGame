export default class Camera extends Laya.Script3D {
    public camera: Laya.Camera;
    
    private srcPos: Laya.Vector3;
    
    constructor() { super(); }

    onAwake(): void {
        this.camera = this.owner as Laya.Camera;
        this.srcPos = this.camera.transform.position.clone();
    }
    
    onEnable(): void {
    }

    onDisable(): void {
    }

    resetPos() {
        this.camera.transform.position = this.srcPos.clone();
    }

    //设置高度偏移量
    addHeight(value: number) {
        var pos = new Laya.Vector3(0, value, 0);
        this.camera.transform.translate(pos, false);
    }

    //设置高度
    setHeight(value: number) {
        this.camera.transform.position.y = value;
    }
}