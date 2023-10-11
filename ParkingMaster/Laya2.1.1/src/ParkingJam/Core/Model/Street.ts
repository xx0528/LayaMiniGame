import GameObjcet from "./GameObject";

export default class Street extends GameObjcet {
    public defaultSize: Laya.Size = new Laya.Size(1, 1);
    
    constructor() { super(); }

    onAwake(): void {
        super.onAwake();

        this.unitScale.setValue(1, 1, 1);
        this.setLastPos(this.sprite.transform.localPosition);
    }
    
    onEnable(): void {
    }

    onDisable(): void {
    }

    setDefaultSize(w: number, h: number): void {
        this.defaultSize = new Laya.Size(w, h);
    }
    
    setPosByAnchor(anchor: Laya.Vector3, offsetX: number, offsetZ: number): void {
        var pos = anchor.clone();
        pos.x += offsetX;
        pos.z += offsetZ;
        pos.y = this.sprite.transform.localPositionY;
        this.sprite.transform.localPosition = pos;
    }

    onTriggerEnter() {
        console.log("street collision");
    }

}