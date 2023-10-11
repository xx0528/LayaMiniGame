export default class AudioWraper {
    private static _instance: AudioWraper;

    private url: string;
    private loadHander: Laya.Handler = null;
    private errorHander: Laya.Handler = null;

    public static get Instance(): AudioWraper {
        if (AudioWraper._instance == null)
            AudioWraper._instance = new AudioWraper();
        return AudioWraper._instance;
    }
    private _sound: Laya.Sound = null;
    private _soundChannel: Laya.SoundChannel = null;
    private _playPosition: number = 0;
    private _startPlayTime: number = 0;
    public get SoundChannel(): Laya.SoundChannel { return this._soundChannel; }
    public get IsStoped(): boolean { return this._soundChannel.isStopped; }

    public Load(url, completed?: Laya.Handler, errer?: Laya.Handler) {
        if (this._soundChannel != null && this._soundChannel.url == url) {
            if (completed != null) { completed.run(); }
            return;
        }
        
        this.url = url;
        this.ClearHander();
        this.loadHander = completed;
        this.errorHander = errer;
        let sound: Laya.Sound = null;
        let soundClass = Laya.SoundManager._soundClass;

        if (!Laya.Browser.onMiniGame) {sound = Laya.loader.getRes(url);}
        function onErrer() { off(); if (errer != null) { errer.runWith("音乐加载失败"); } }
        function onLoad() { off(); if (completed != null) { completed.run(); this.ClearHander();} }
        function off() {
            sound.off(Laya.Event.COMPLETE, this, onLoad);
            sound.off(Laya.Event.ERROR, this, onErrer);
        }

        if (sound != null) { 
            this._sound = sound; onLoad.call(this);
        }
        else if (soundClass != null) {
            sound = new soundClass();
            this._sound = sound;
            sound.on(Laya.Event.COMPLETE, this, onLoad);
            sound.on(Laya.Event.ERROR, this, onErrer);
            sound.load(url);
        }
    }

    public LoadPlay(url: string, startTime: number = 0, loop: number = 1): void {
        this.SoomthStop(0.5);
        // this.loadHander = Laya.Handler.create(this, () => {
        //     this.Play(0);
        //     this.ClearHander();
        // });
        this.Load(url, Laya.Handler.create(this, () => {
            this.Play(0);
            this.ClearHander();
        }));
    }

    public Play(loop: number = 1): void {
        if (!this.CheckState()) {
            return;
        }
        
        if (this._soundChannel != null) {
            if (!this._soundChannel.isStopped) {
                this._soundChannel.pause();
            }
            Laya.Tween.clearAll(this.SoundChannel);
        }

        if (this._soundChannel == null || this._soundChannel.url != this.url) {
            this._soundChannel = this._sound.play(0, loop);
        }
        else {
            if (!this._soundChannel.isStopped) {
                this._soundChannel.pause();
            }
            this._soundChannel.volume = 1;
            this._soundChannel.startTime = 0;
            this._soundChannel.loops = loop;
            this._soundChannel.play();
        }

        this._playPosition = 0;
        this._startPlayTime = (new Date).getTime();
        Laya.SoundManager._bgMusic = this._soundChannel.url;
    }

    public PlayFromTime(startTime: number, loop: number = 1): void {
        if (!this.CheckState()) {
            return;
        }

        if (this._soundChannel != null) {
            if (!this._soundChannel.isStopped) {
                this._soundChannel.pause();
            }
            Laya.Tween.clearAll(this.SoundChannel);
        }

        if (this._soundChannel == null || this._soundChannel.url != this.url) {
            this._soundChannel = this._sound.play(startTime, loop);
        }
        else {
            if (!this._soundChannel.isStopped) {
                this._soundChannel.pause();
            }
            this._soundChannel.volume = 1;
            this._soundChannel.startTime = startTime;
            this._soundChannel.loops = loop;
            this._soundChannel.play();
        }

        this._playPosition = startTime;
        this._startPlayTime = (new Date).getTime();
        Laya.SoundManager._bgMusic = this._soundChannel.url;
    }

    public Stop(): void {
        if (this.SoundChannel == null || this.IsStoped)
            return;

        if (!this._soundChannel.isStopped) {
            this._soundChannel.pause();
        }
        Laya.SoundManager._bgMusic = "";
    }

    public SoomthStop(duration: number): void {
        if (this.SoundChannel == null || this.IsStoped)
            return;

        Laya.Tween.clearAll(this.SoundChannel);
        Laya.Tween.to(this.SoundChannel, { volume: 0.1 }, duration * 1000, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
            if (!this.IsStoped) {
                this._soundChannel.pause();
            }
            Laya.SoundManager._bgMusic = "";
        }));
    }

    public Pause(): void {
        if (this.SoundChannel == null )
            return;

        this._playPosition = this.PlayPosition;
        if (!this._soundChannel.isStopped) {
            this._soundChannel.pause();
        }
    }

    public Resume(): void {
        if (this.SoundChannel == null)
            return;

        this.SoundChannel.resume();
        // this._soundChannel.startTime = this._playPosition;
        // this._soundChannel.play();
        this._startPlayTime = (new Date).getTime();
        //this._playPosition = this.SoundChannel.position;
    }

    public get PlayPosition(): number {
        if (this.IsStoped) {
            return this._playPosition;
        }
        if (Laya.Browser.onMiniGame) {
            let time = ((new Date).getTime() - this._startPlayTime);
            return this._playPosition + time * .001;
        }
        // return this.SoundChannel.position;

        let time = ((new Date).getTime() - this._startPlayTime);
        return this._playPosition + time * .001;
        // let time = ((new Date).getTime() - this._startPlayTime);
        //     return this._playPosition + time * .001;
    }

    public Clear(): void {
        this.Stop();
        if (this._sound != null) {
            this._sound.dispose();
            this._sound = null;
        }
        if (this._soundChannel != null) {
            this._soundChannel.stop();
            this._soundChannel = null;
        }
        Laya.SoundManager._bgMusic = "";
        Laya.loader.clearRes(this.url);
    }

    private ClearHander(): void {
        if (this.loadHander != null || this.loadHander) {
            this.loadHander.clear();
            this.loadHander.recover();
            this.loadHander = null;
        }

        if (this.errorHander != null || this.errorHander) {
            this.errorHander.clear();
            this.errorHander.recover();
            this.errorHander = null;
        }
    }

    private CheckState(): boolean {
        if (this._sound == null) {
            console.log("请先调用Load完成completed后 调用Play 进行播放");
            return false;
        }
        return true;
    }
}