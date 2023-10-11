import SceneManager from "../Manager/SceneManager";
import Event_wcjtn_Mgr from "../../Event/EventMgr";
import { Event_wcjtn_Def } from "../../Event/EventDef";
import { EnvirType } from "../Manager/EnvirManager";

export default class HorizonPlane extends Laya.Script {

    private static _instance: HorizonPlane;
    public static Instance(): HorizonPlane {
        return this._instance;
    }
    private mCamera: Laya.Sprite3D;
    private mPlane: Laya.Sprite3D;
    private _mesh: Laya.MeshSprite3D;
    constructor() { super(); }

    onAwake() {
        HorizonPlane._instance = this;
        this.mCamera = SceneManager.Instance().GetChildByName("Camera");
        this.mPlane = this.owner as Laya.Sprite3D;

        this._mesh = this.owner.getChildByName("HorizonPlane").getChildByName("Plane_0") as Laya.MeshSprite3D;
        this._mesh.meshRenderer.receiveShadow = true;
    }

    onEnable() {
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.ChangeEnv, this, this.SetPlaneMat);
    }


    onDestroy() {
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.ChangeEnv, this, this.SetPlaneMat);

    }

    onUpdate() {
        this.mPlane.transform.position = this.mCamera.transform.position;
    }

    SetPlaneMat(type: EnvirType) {
        switch (type) {
            case EnvirType.CityDayTime:
                this._mesh.meshRenderer.material = this._mesh.meshRenderer.materials[2];
                break;
            case EnvirType.CityNight:
                this._mesh.meshRenderer.material = this._mesh.meshRenderer.materials[2];
                break;
            case EnvirType.DesertDayTime:
                this._mesh.meshRenderer.material = this._mesh.meshRenderer.materials[3];
                break;
            case EnvirType.DesertNight:
                this._mesh.meshRenderer.material = this._mesh.meshRenderer.materials[1];
                break;
        }
    }

}
