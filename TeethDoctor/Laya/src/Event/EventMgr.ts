import EventDispatcher = Laya.EventDispatcher;
export default class Even_XYXZS_tMgr extends EventDispatcher {
    static eventDis_XYXZS_patcher: EventDispatcher = new EventDispatcher();
    public static readonly in_XYXZS_stance: Even_XYXZS_tMgr = new Even_XYXZS_tMgr();;
    private constructor() {
        super();
    }

    //广播事件
    public disp_XYXZS_atch(InName, agv?: any) {
        Even_XYXZS_tMgr.eventDis_XYXZS_patcher.event(InName, agv);
    }
    //注册事件
    public reg_XYXZS_Evemt(InName, caller, listener: Function, arg?: any[]): void {
        Even_XYXZS_tMgr.eventDis_XYXZS_patcher.on(InName, caller, listener, (arg == null) ? null : ([arg]));
    }
    //注册单次事件
    public reg_XYXZS_OnceEvent(InName, caller, listener: Function, arg?: any[]): void {
        Even_XYXZS_tMgr.eventDis_XYXZS_patcher.once(InName, caller, listener, (arg == null) ? null : ([arg]));
    }
    //移除事件注册
    public re_XYXZS_moveEvent(InName, caller, listener: Function, arg?: any[]): void {
        Even_XYXZS_tMgr.eventDis_XYXZS_patcher.off(InName, caller, listener);
    }
}