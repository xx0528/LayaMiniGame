import EventDispatcher = Laya.EventDispatcher;
export default class Event_sdlyg_Mgr extends EventDispatcher {
    static eventDispatcher: EventDispatcher = new EventDispatcher();
    public static readonly instance: Event_sdlyg_Mgr = new Event_sdlyg_Mgr();;
    private constructor() {
        super();
    }

    //广播事件
    public dispatch(InName, agv?: any) {
        Event_sdlyg_Mgr.eventDispatcher.event(InName, agv);
    }
    //注册事件
    public regEvemt(InName, caller, listener: Function, arg?: any[]): void {
        Event_sdlyg_Mgr.eventDispatcher.on(InName, caller, listener, (arg == null) ? null : ([arg]));
    }
    //注册单次事件
    public regOnceEvent(InName, caller, listener: Function, arg?: any[]): void {
        Event_sdlyg_Mgr.eventDispatcher.once(InName, caller, listener, (arg == null) ? null : ([arg]));
    }
    //移除事件注册
    public removeEvent(InName, caller, listener: Function, arg?: any[]): void {
        Event_sdlyg_Mgr.eventDispatcher.off(InName, caller, listener);
    }
}