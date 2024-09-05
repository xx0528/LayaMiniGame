import EventDispatcher = Laya.EventDispatcher;
export default class ryw_EventMgr extends EventDispatcher {
    static ryw_eventDispatcher: EventDispatcher = new EventDispatcher();
    public static readonly ryw_instance: ryw_EventMgr = new ryw_EventMgr();;
    private constructor() {
        super();
    }

    //广播事件
    public ryw_dispatch(InName, agv?: any) {
        ryw_EventMgr.ryw_eventDispatcher.event(InName, agv);
    }
    //注册事件
    public ryw_regEvemt(InName, caller, listener: Function, arg?: any[]): void {
        ryw_EventMgr.ryw_eventDispatcher.on(InName, caller, listener, (arg == null) ? null : ([arg]));
    }
    //注册单次事件
    public ryw_regOnceEvent(InName, caller, listener: Function, arg?: any[]): void {
        ryw_EventMgr.ryw_eventDispatcher.once(InName, caller, listener, (arg == null) ? null : ([arg]));
    }
    //移除事件注册
    public ryw_removeEvent(InName, caller, listener: Function, arg?: any[]): void {
        ryw_EventMgr.ryw_eventDispatcher.off(InName, caller, listener);
    }
}