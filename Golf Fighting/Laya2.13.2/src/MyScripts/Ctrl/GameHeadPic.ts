import StageManager from "../Manager/StageManager";
import AImanager from "../Manager/AIManager";
import CameraCtrl from "./CameraCtrl";
import PlayerManager from "../Manager/PlayerManager";

export default class GameHeadPic extends Laya.Script {

    private m_owner: Laya.Sprite;
    private m_camera: Laya.Camera;
    private m_pic: Laya.Image;

    constructor() { super(); }

    onAwake() {
        this.m_owner = this.owner as Laya.Sprite;
        this.m_camera = CameraCtrl.Instance().GetCamera();
        this.m_pic = this.m_owner.getChildByName("pic") as Laya.Image;


    }

    onStart() {
        //创建遮罩对象
        let mask = new Laya.Sprite();
        //画一个圆形的遮罩区域
        mask.graphics.drawCircle(this.m_pic.width / 2, this.m_pic.height/2, 30, "#ff0000");
        // mask.pos(this.m_pic.width / 2, this.m_pic.height / 2)
        mask.pos(0, 0)        
        //实现img显示对象的遮罩效果
        this.m_pic.mask = mask;
    }

    setPic(path: string) {
        this.m_pic.skin = path;
    }

    show(tarPos: Laya.Vector3){

        let outPos: Laya.Vector4 = new Laya.Vector4(0, 0, 0);
        this.m_camera.viewport.project(tarPos, this.m_camera.projectionViewMatrix, outPos);
        let x = outPos.x / Laya.stage.clientScaleX - 15*(Laya.stage.width/750);
        let y = outPos.y / Laya.stage.clientScaleY - 350*(Laya.stage.height/1334);
        this.m_owner.pos(x, y);     //340
        this.m_owner.visible = true;
    }

    hide() {
        this.m_owner.visible = false;
    }
}