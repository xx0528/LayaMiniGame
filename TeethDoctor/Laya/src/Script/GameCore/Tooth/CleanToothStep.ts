import BaseTooth from "./TypesOfTooth/BaseTooth";
import { ToothStepType } from "../../Enum";
import CalculusThooth from "./TypesOfTooth/CalculusTooth";
import BraceTooth from "./TypesOfTooth/BraceTooth";
import FillingTooth from "./TypesOfTooth/FillingTooth";
import PaintTooth from "./TypesOfTooth/PaintTooth";
import PullTooth from "./TypesOfTooth/PullTooth";
import CutTooth from "./TypesOfTooth/CutTooth";

export default class CleanToothStep extends Laya.Script3D {
    constructor() {
        super();
    }
    private _isActive: boolean = false;
    private _toothStepType: ToothStepType;
    private _toothList: Array<BaseTooth> = [];
    private _toothSp3DList: Array<Laya.Sprite3D> = [];
    private _cleanedToothCount: number = 0;
    /**
     * 当前清洁牙齿封装
     * 
     * @readonly
     * @type {ToothStepType}
     * @memberof CleanToothStep
     */
    public get ToothStepType(): ToothStepType {
        return this._toothStepType;
    }

    /**
     * 当前清洁牙齿数量
     * 
     * @readonly
     * @type {ToothStepType}
     * @memberof CleanToothStep
     */
    public get ToothList(): Array<BaseTooth> {
        return this._toothList;
    }

    /**
     * 牙齿总数量
     * 
     * @readonly
     * @type {number}
     * @memberof CleanToothStep
     */
    public get ToothCount(): number {
        return this._toothList.length;
    }

    /**
     * 已经清理的牙齿数量
     * 
     * @readonly
     * @type {number}
     * @memberof CleanToothStep
     */
    public get CleandToothCount(): number {
        return this._cleanedToothCount;
    }

    /**
     * 更新牙齿状态
     * 
     * @memberof CleanToothStep
     */
    public onToothStepUpdate(handler: Laya.Sprite3D, arg?: any): boolean {
        let updateResult = true;
        this._cleanedToothCount = 0;
        for (let index = 0; index < this._toothList.length; index++) {
            const toothScript = this._toothList[index];
            let tempResult = toothScript.onToothUpdate(handler, arg);
            if (!tempResult) {
                updateResult = false;
            }
            else {
                this._cleanedToothCount++;
            }
        }
        return updateResult;
    }

    // public ResetToothState() {
    // this._toothList.forEach(u => {
    //     u.ResetToothState();
    // });
    // }
    /**
     * 设置牙齿数组
     * 
     * @param {Array<Laya.Sprite3D>} toothArray 
     * @memberof CleanToothStep
     */
    public SetTooth(toothArray: Array<Laya.Sprite3D>, toothStep: ToothStepType) {
        this._toothStepType = toothStep;
        this._toothSp3DList = toothArray;
        for (let index = 0; index < toothArray.length; index++) {
            const tooth = toothArray[index] as Laya.Sprite3D;
            let toothScript: BaseTooth = null;
            switch (this._toothStepType) {
                case ToothStepType.CalculusTooth:
                    toothScript = tooth.addComponent(CalculusThooth);
                    break;
                case ToothStepType.BraceTooth:
                    toothScript = tooth.addComponent(BraceTooth);
                    break;
                case ToothStepType.FillingTooth:
                    toothScript = tooth.addComponent(FillingTooth);
                    break;
                case ToothStepType.PaintTooth:
                    toothScript = tooth.addComponent(PaintTooth);
                    break;
                case ToothStepType.PullTooth:
                    toothScript = tooth.addComponent(PullTooth);
                    break;
                case ToothStepType.CutTooth:
                    toothScript = tooth.addComponent(CutTooth);
                    break;
                default:
                    break;
            }
            this._toothList.push(toothScript);
        }
    }
}