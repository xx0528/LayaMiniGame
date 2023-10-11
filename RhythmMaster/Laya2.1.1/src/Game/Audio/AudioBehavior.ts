import AudioWraper from "./AudioWraper";

export default class AudioBehavior extends Laya.Script3D {
    private rTime: number;
    private pTime: number;
    private lAudioTime: number;
    private musicDelay: number;
    private syncCounter: number;
    protected currentTime: number;
    protected inSimulation: boolean = false;

    public StartTimeRun(musicDelay: number) {
        if (this.inSimulation) {
            this.StopTimeRun();
        }
        this.inSimulation = true;
        this.musicDelay = musicDelay;
        this.OnStartedSetup();
        Laya.timer.frameLoop(1, this, this.TimeDelayLogic);
    }

    public StopTimeRun(clearTime: boolean = true): void {
        this.inSimulation =false;
        Laya.timer.clear(this, this.TimeDelayLogic);
        Laya.timer.clear(this, this.SongPlayLogic);
        if (clearTime) { this.ClearSyncAudioTime(); }
        this.OnStopedSetup()
    }

    protected OnStartedSetup(): void {
        
    }

    protected OnStopedSetup(): void {

    }

    private TimeDelayLogic(): void {
        if (this.currentTime < this.musicDelay) {
            this.currentTime += (Laya.timer.delta / 1000);
            this.OnTimeRefresh(this.currentTime);
            return;
        }
        Laya.timer.clear(this, this.TimeDelayLogic);
        this.lAudioTime = AudioWraper.Instance.PlayPosition + this.musicDelay;
        this.rTime = this.currentTime, this.pTime = this.currentTime;
        Laya.timer.frameLoop(1, this, this.SongPlayLogic);
    }

    private SongPlayLogic(): void {
        this.OnTimeRefresh(this.currentTime);
        this.SyncAudioTime(0.2);
    }

    private SyncAudioTime(p: number = 0.2) {
        let deltaTime = (Laya.timer.delta / 1000);
        this.rTime += deltaTime;

        if (this.syncCounter > 0) {
            this.syncCounter--;
            this.pTime += deltaTime;
        }
        else if (AudioWraper.Instance.IsStoped) {
            this.pTime = this.rTime;
        }
        else {
            let time = AudioWraper.Instance.PlayPosition;
            if (Math.abs(this.lAudioTime - time) < 0.001) {
                this.pTime += deltaTime;
            }
            else {
                const sysncEventFrame: number = 10;
                this.syncCounter = sysncEventFrame;
                this.pTime = time + this.musicDelay;
            }
            //console.log("currentTime:" + this.currentTime + "AudioTime:" + time + "c:" + Math.abs(this.lAudioTime - time));
        }
        this.currentTime = this.TimeLerp(this.rTime, this.pTime, p);
        this.rTime = this.currentTime;
        this.lAudioTime = this.pTime;
    }

    protected OnTimeRefresh(time) {

    }

    protected ClearSyncAudioTime() {
        this.musicDelay = 0;
        this.syncCounter = 0;
        this.currentTime = 0;
        this.lAudioTime = this.rTime = this.pTime = 0;
    }

    private TimeLerp(num1, num2, t): number {
        return num1 + t * (num2 - num1);
    }
}