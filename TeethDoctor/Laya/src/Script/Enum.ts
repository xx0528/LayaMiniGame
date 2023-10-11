export enum ToothStepType {
    BraceTooth = 1, //箍牙
    CalculusTooth = 2,//清除牙垢
    CutTooth = 3,//钻牙
    FillingTooth = 4,//补牙
    PaintTooth = 5,//包金牙，涂牙
    PullTooth = 6,//拔牙
}
export enum HandlerState {
    Normal = 1,
    PullingTooth = 2,
    SwitchingAni = 3
}
export enum HandlerType {
    PointedHandler = 1,
    NozzleHandler = 2,
    TweezersHandler = 3,
    PincersHandler = 4
}