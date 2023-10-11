import EventDispatcher = laya.events.EventDispatcher;
export default class Even_JJKLBB_tMgr extends EventDispatcher {
    static eventDispatcher: EventDispatcher = new EventDispatcher();
    public static readonly insta_JJKLBB_nce: Even_JJKLBB_tMgr = new Even_JJKLBB_tMgr();;
    private constructor() {
        super();
    }

    //广播事件
    public dispa_JJKLBB_tch(InName, agv?: any) {
        Even_JJKLBB_tMgr.eventDispatcher.event(InName, agv);
    }
    //注册事件
    public regE_JJKLBB_vemt(InName, caller, listener: Function, arg?: any[]): void {
        Even_JJKLBB_tMgr.eventDispatcher.on(InName, caller, listener, (arg == null) ? null : ([arg]));
    }
    //注册单次事件
    public regO_JJKLBB_nceEvent(InName, caller, listener: Function, arg?: any[]): void {
        Even_JJKLBB_tMgr.eventDispatcher.once(InName, caller, listener, (arg == null) ? null : ([arg]));
    }
    //移除事件注册
    public remov_JJKLBB_eEvent(InName, caller, listener: Function, arg?: any[]): void {
        Even_JJKLBB_tMgr.eventDispatcher.off(InName, caller, listener);
    }
}