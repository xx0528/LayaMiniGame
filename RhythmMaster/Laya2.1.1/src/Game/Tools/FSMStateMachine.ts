export default class FSMStateMachine {
    public curState: FsmState = new FsmState("", null, null, null);
    private stateHashTabel: { [index: string]: FsmState } = {}

    public AddState(state: FsmState) {
        if (state == null)
            return;
        this.stateHashTabel[state.key] = state;
    }

    public AddAction(key: any, enter: Laya.Handler = null, exit: Laya.Handler = null, update: Laya.Handler = null) {
        this.AddState(new FsmState(key, enter, exit, update));
    }

    public Switch(key: string, args: any = null) {
        let oldState = this.curState;

        let newState = this.stateHashTabel[key];
        if (newState == null || newState.key == oldState.key)
            return;

        if (oldState != null)
            oldState.OnExit();

        this.curState = newState;
        newState.OnEnter(args);
    }

    public Update(): void {
        if (this.curState == null)
            return;

        this.curState.OnUpdate();
    }
}

export class FsmState {
    public key: any;

    private enter: Laya.Handler;
    private update: Laya.Handler;
    private exit: Laya.Handler;
    constructor(key:any, enter: Laya.Handler, exit: Laya.Handler, update: Laya.Handler) {
        this.key = key;
        this.enter = enter;
        this.exit = exit;
        this.update = update;

        if (this.enter != null) this.enter.once = false;
        if (this.exit != null) this.exit.once = false;
        if (this.update != null) this.update.once = false;
    }

    public OnEnter(args) {
        if (this.enter != null)
            this.enter.runWith(args);
    }

    public OnExit() {
        if (this.exit != null)
            this.exit.run();
    }

    public OnUpdate() {
        if (this.update != null)
            this.update.run();
    }
}