import EventDispatcher = Laya.EventDispatcher;
export default class Event_tippy_Mgr extends EventDispatcher {
    static event_tippy_Dispatcher: EventDispatcher = new EventDispatcher();
    public static readonly ins_tippy_tance: Event_tippy_Mgr = new Event_tippy_Mgr();;
    private constructor() {
        super();
    }

    //广播事件
    public dispatch(InName, agv?: any) {
        Event_tippy_Mgr.event_tippy_Dispatcher.event(InName, agv);
    }
    //注册事件
    public regEvemt(InName, caller, listener: Function, arg?: any[]): void {
        Event_tippy_Mgr.event_tippy_Dispatcher.on(InName, caller, listener, (arg == null) ? null : ([arg]));
    }
    //注册单次事件
    public regOnceEvent(InName, caller, listener: Function, arg?: any[]): void {
        Event_tippy_Mgr.event_tippy_Dispatcher.once(InName, caller, listener, (arg == null) ? null : ([arg]));
    }
    //移除事件注册
    public removeEvent(InName, caller, listener: Function, arg?: any[]): void {
        Event_tippy_Mgr.event_tippy_Dispatcher.off(InName, caller, listener);
    }
}