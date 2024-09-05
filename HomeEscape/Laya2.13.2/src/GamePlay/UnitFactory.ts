import { ryw_UnitType } from "./UnitType";
import Unit_JJVW_Base from "./Unit_JJVW_Base";
import LevelBase from "./Level/LevelBase";
import Warrior from "./Role/Warrior";
import Queen from "./Role/Queen";
import Pike from "./Prop/Pike";
import Arrow from "./Prop/Arrow";
import Bomb from "./Prop/Bomb";
import Cannon from "./Prop/Cannon";
import Bear from "./Animal/Bear";
import Tiger from "./Animal/Tiger";
import Wolf from "./Animal/Wolf";
import Cannonball from "./Prop/Cannonball";
import CannonGravity from "./Prop/CannonGravity";

export default class UnitFactory {

    protected ryw__level : LevelBase;

    constructor(level : LevelBase)
    {
        this.ryw__level = level;
    }

    public ryw_create(unitType : ryw_UnitType,prefabName ? : string) : Unit_JJVW_Base
    {

        var name : string = null == prefabName ? String(unitType) : prefabName;
        if(name)
        {
            var ins = this.ryw__level.Scene3D.getChildByName(name) as Laya.Sprite3D;
            if(ins)
            {
                console.log("UnitFactory  name = " + name);
                var unitComponent : Unit_JJVW_Base = null;
                switch(unitType)
                {
                    case ryw_UnitType.ryw_Warrior:
                        unitComponent = ins.addComponent(Warrior);
                    break;
                    case ryw_UnitType.ryw_Queen:
                        unitComponent = ins.addComponent(Queen);
                    break;
                    // case UnitType.Pike:
                    //     Unit_JJVW_Base = ins.addComponent(Pike);
                    // break;
                    case ryw_UnitType.ryw_Arrow:
                        unitComponent = ins.addComponent(Arrow);
                    break;
                    case ryw_UnitType.ryw_Bomb:
                        unitComponent = ins.addComponent(Bomb);
                    break;
                    case ryw_UnitType.ryw_Cannon:
                        unitComponent = ins.addComponent(Cannon);
                    break;
                    case ryw_UnitType.ryw_CannonGravity:
                        unitComponent = ins.addComponent(CannonGravity);
                    break;
                    case ryw_UnitType.ryw_Cannonball:
                        unitComponent = ins.addComponent(Cannonball);
                    break;
                    case ryw_UnitType.ryw_Bear:
                        unitComponent = ins.addComponent(Bear);
                    break;
                    case ryw_UnitType.ryw_Tiger:
                        unitComponent = ins.addComponent(Tiger);
                    break;
                    case ryw_UnitType.ryw_Wolf:
                        unitComponent = ins.addComponent(Wolf);
                    break;
                    default: 
                        unitComponent = ins.addComponent(Unit_JJVW_Base);
                    break;
                }
                if(unitType)
                {
                    if(unitType==ryw_UnitType.ryw_CannonGravity){
                        unitType = ryw_UnitType.ryw_Cannon;
                    }
                    (unitComponent as any).ryw_onInit(this.ryw__level.Scene3D, unitType);
                }
                return unitComponent;
            }
        }
        return null;
    }
}