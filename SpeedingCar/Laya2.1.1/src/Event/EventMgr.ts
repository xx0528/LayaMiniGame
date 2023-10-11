import EventDispatcher = Laya.EventDispatcher;
export default class Event_wcjtn_Mgr extends EventDispatcher {
    static eventDispatcher: EventDispatcher = new EventDispatcher();
    public static readonly ins_wcjtn_tance: Event_wcjtn_Mgr = new Event_wcjtn_Mgr();;
    private constructor() {
        super();
    }

    //广播事件
    public dis_wcjtn_patch(InName, agv?: any) {
        Event_wcjtn_Mgr.eventDispatcher.event(InName, agv);
    }
    //注册事件
    public reg_wcjtn_Evemt(InName, caller, listener: Function, arg?: any[]): void {
        Event_wcjtn_Mgr.eventDispatcher.on(InName, caller, listener, (arg == null) ? null : ([arg]));
    }
    //注册单次事件
    public reg_wcjtn_OnceEvent(InName, caller, listener: Function, arg?: any[]): void {
        Event_wcjtn_Mgr.eventDispatcher.once(InName, caller, listener, (arg == null) ? null : ([arg]));
    }
    //移除事件注册
    public remove_wcjtn_Event(InName, caller, listener: Function, arg?: any[]): void {
        Event_wcjtn_Mgr.eventDispatcher.off(InName, caller, listener);
    }
}