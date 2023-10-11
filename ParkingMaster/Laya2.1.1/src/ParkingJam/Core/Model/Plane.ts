import GameObjcet from "./GameObject";

export default class Plane extends GameObjcet {

    private defaultSize: Laya.Size = new Laya.Size(5, 5);

    private anchor: Laya.Vector3 = new Laya.Vector3(0,0,0);

    private srcAnchor: Laya.Vector3;
    
    constructor() { super(); }

    onAwake(): void {
        super.onAwake();

        this.unitScale.setValue(1, 1, 1);

        var pos = this.sprite.transform.localPosition;
        // pos.y += 0.09;
        this.anchor.x = -14.5;
        this.anchor.y = -2.6;
        this.anchor.z = -0.95;
        this.srcAnchor = this.anchor.clone();
        this.setLastPos(pos);
    }
    
    onEnable(): void {
    }

    onDisable(): void {
    }

    //以设置的锚点来设置坐标位置
    setPosWithAnchor(w: number, h: number) {
        var pos = this.anchor.clone();
        pos.x -= w * 0.5;
        pos.z += h * 0.5;
        this.sprite.transform.localPosition = pos;
    }

    getAnchor(): Laya.Vector3 {
        return this.anchor;
    }

    setAnchorOffset(x: number = 0, z: number = 0) {
        var vect = this.srcAnchor.clone();
        vect.x += x;
        vect.z += z;
        this.anchor = vect;
    }

}