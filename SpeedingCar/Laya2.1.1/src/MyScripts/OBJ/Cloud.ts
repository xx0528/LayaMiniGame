import PlayerManager from "../Manager/PlayerManager";
import Utilit from "../../Utilit";
import SceneManager from "../Manager/SceneManager";
import Event_wcjtn_Mgr from "../../Event/EventMgr";
import { Event_wcjtn_Def } from "../../Event/EventDef";
import { EnvirType } from "../Manager/EnvirManager";

export default class Cloud extends Laya.Script {

    private mCloud: Laya.MeshSprite3D;

    private MaxY: number = 30;
    private MinY: number = 10;
    private MinX: number = -30;
    private MaxX: number = 30;
    constructor() { super(); }

    onAwake() {
        this.mCloud = this.owner as Laya.MeshSprite3D;
    }

    onEnable() {
        // this.SetMat();

        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.ChangeRoadLevel, this, this.SetMat);
    }

    onDestroy() {
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.ChangeRoadLevel, this, this.SetMat);

    }

    onStart(){
        this.mCloud.meshRenderer.material["albedoColor"] = new Laya.Vector4(1, 1, 1, 0.8);
    }

    onUpdate() {
        if (PlayerManager.Instance().GetPlayerCar() && this.InShow()) {
            if (this.mCloud.transform.position.z - PlayerManager.Instance().GetPlayerCar().GetTailstock().z < -15) {
                this.Hide();
            }
        }
    }

    Show(dis: number) {
        let x = Utilit.getRandomByRange(this.MinX, this.MaxX);
        let y = Utilit.getRandomByRange(this.MinY, this.MaxY);
        this.mCloud.transform.position = new Laya.Vector3(x, y, dis);
        this.mCloud.active = true;
    }

    Hide() {
        this.mCloud.active = false;
    }

    InShow(): boolean {
        return this.mCloud.active;
    }

    SetMat() {
        return;
        Laya.timer.once(100,this,()=>{
            let type = SceneManager.Instance().GetEnvType;
            switch (type) {
                case EnvirType.CityDayTime:
                    this.mCloud.meshRenderer.material["albedoColor"] = new Laya.Vector4(1, 1, 1, 1);
                    break;
                case EnvirType.DesertDayTime:
                    this.mCloud.meshRenderer.material["albedoColor"] = new Laya.Vector4(1, 1, 1, 1);
                    break;
                case EnvirType.CityNight:
                    this.mCloud.meshRenderer.material["albedoColor"] = new Laya.Vector4(141 / 255, 139 / 255, 124 / 255, 255 / 255);
                    break;
                case EnvirType.DesertNight:
                    this.mCloud.meshRenderer.material["albedoColor"] = new Laya.Vector4(141 / 255, 139 / 255, 124 / 255, 255 / 255);
                    break;
            }
        })

    }

}