import EventDispatcher = Laya.EventDispatcher;
export default class Event_ppxhc_Mgr extends EventDispatcher {
    static eventDispatcher: EventDispatcher = new EventDispatcher();
    public static readonly instance: Event_ppxhc_Mgr = new Event_ppxhc_Mgr();;
    private constructor() {
        super();
    }

    //广播事件
    public dispatch_(InName, agv?: any) {
        Event_ppxhc_Mgr.eventDispatcher.event(InName, agv);
    }
    //注册事件
    public regEvemt_(InName, caller, listener: Function, arg?: any[]): void {
        Event_ppxhc_Mgr.eventDispatcher.on(InName, caller, listener, (arg == null) ? null : ([arg]));
    }
    //注册单次事件
    public regOnceEvent_(InName, caller, listener: Function, arg?: any[]): void {
        Event_ppxhc_Mgr.eventDispatcher.once(InName, caller, listener, (arg == null) ? null : ([arg]));
    }
    //移除事件注册
    public removeEvent_(InName, caller, listener: Function, arg?: any[]): void {
        Event_ppxhc_Mgr.eventDispatcher.off(InName, caller, listener);
    }
}