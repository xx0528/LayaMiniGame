export default class FSMStateMachine {
    public curState: FsmState = new FsmState("", null, null, null, null);
    private stateHashTabel: { [index: string]: FsmState } = {}

    public AddState(state: FsmState) {
        if (state == null)
            return;
        this.stateHashTabel[state.key] = state;
    }

    public AddAction(key: any, caller: any = null, enter: Function = null, exit: Function = null, update: Function = null) {
        this.AddState(new FsmState(key, caller, enter, exit, update));
    }

    public Switch(key: string, args: any = null) {
        let oldState = this.curState;

        let newState = this.stateHashTabel[key];
        if (newState == null || newState.key == oldState.key)
            return;

        this.curState = newState;
        if (oldState != null)
            oldState.OnExit();
        newState.OnEnter(args);
    }

    public MachineExit(): void {
        if (this.curState == null) {
            return;
        }
        this.curState.OnExit();
        this.curState = null;
    }

    public Update(): void {
        if (this.curState == null)
            return;

        this.curState.OnUpdate();
    }
}

export class FsmState {
    public key: any;
    public caller: any
    private enter: Function;
    private update: Function;
    private exit: Function;

    constructor(key:any, caller, enter: Function, exit: Function, update: Function) {
        this.key = key;
        this.caller = caller;
        this.enter = enter;
        this.exit = exit;
        this.update = update;
    }

    public OnEnter(args) {
        if (this.enter != null) {
            if (args != null) {
                if (!args.unshift) {
                    this.enter.call(this.caller, args);
                } else {
                    this.enter.apply(this.caller, args);
                }
            }
            else {
                this.enter.call(this.caller, args);
            }
        }
    }

    public OnExit() {
        if (this.exit != null)
            this.exit.call(this.caller);
    }

    public OnUpdate() {
        if (this.update != null)
            this.update.call(this.caller);
    }
}