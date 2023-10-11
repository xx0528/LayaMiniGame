
export default class Sound_wcjtn_Mgr {
    public static readonly sound_wcjtn_Res_wcjtn_Path = "subRes/sound/"
    public static readonly ins_wcjtn_tance: Sound_wcjtn_Mgr = new Sound_wcjtn_Mgr();
    
    private _wcjtn_bgm_wcjtn_:any;
    private _speedSound:any;

    private constructor() {
    }

    public get _wcjtn_Enabled_wcjtn_()
    {
        return this._enabled_wcjtn_;
    }

    public set _wcjtn_Enabled_wcjtn_(e : boolean)
    {
        if(!e)
        {
            this.stop_wcjtn_BGM();
        }
        this._enabled_wcjtn_ = e;
    }

    protected _enabled_wcjtn_ : boolean = true;

    public get_wcjtn_Sound_wcjtn_Url(name: string) : string
    {
        let url = Sound_wcjtn_Mgr.sound_wcjtn_Res_wcjtn_Path + name + ".wav";
        return url;
    }

    public play_wcjtn_Sound(name: string): void {
        if(!this._enabled_wcjtn_)
            return;
        var url = this.get_wcjtn_Sound_wcjtn_Url(name);
        if (Laya.Browser.onMiniGame) {
            var sound = laya.utils.Pool.getItem(name);
            if (sound == null) {
                sound = wx.createInnerAudioContext();
                sound.src = Sound_wcjtn_Mgr.sound_wcjtn_Res_wcjtn_Path + name + ".wav";
                sound.onEnded(() => {
                    laya.utils.Pool.recover(name, sound);
                    sound.offEnded();
                })
            }
            sound.play();
            if(name == Sound_wcjtn_Type.SpeedUp){
                this._speedSound = sound;
            }
        } else {
            Laya.SoundManager.playSound(url, 1);
        }
    }

    public stopSound(name:string){
        if(!this._enabled_wcjtn_)
            return;
        var url = this.get_wcjtn_Sound_wcjtn_Url(name);
        if (Laya.Browser.onMiniGame) {
            if(name == Sound_wcjtn_Type.SpeedUp){
                if(this._speedSound){
                    this._speedSound.stop();
                }
            }else{
                var sound = laya.utils.Pool.getItem(name);
                if (sound == null) {
                    sound = wx.createInnerAudioContext();
                    sound.src = Sound_wcjtn_Mgr.sound_wcjtn_Res_wcjtn_Path + name + ".wav";
                    sound.onEnded(() => {
                        laya.utils.Pool.recover(name, sound);
                        sound.offEnded();
                    })
                }
                sound.stop();
            }
        } else {
            Laya.SoundManager.stopSound(url);
        }
    }

    public play_wcjtn_BGM(name){
        if(!this._enabled_wcjtn_)
            return;
        // let url = this.get_wcjtn_Sound_wcjtn_Url(name);
        let url = Sound_wcjtn_Mgr.sound_wcjtn_Res_wcjtn_Path + name + ".ogg";
        if (Laya.Browser.onMiniGame) {
            if(!this._wcjtn_bgm_wcjtn_)
            {
                this._wcjtn_bgm_wcjtn_ = wx.createInnerAudioContext();
            }
            this._wcjtn_bgm_wcjtn_.pause();
            this._wcjtn_bgm_wcjtn_.src = url;
            this._wcjtn_bgm_wcjtn_.loop = true;
            this._wcjtn_bgm_wcjtn_.play();
        } else {
            Laya.SoundManager.playMusic(url, 0);
        }
    }

    public stop_wcjtn_BGM(){
        if (Laya.Browser.onMiniGame) {
            if(this._wcjtn_bgm_wcjtn_){
                this._wcjtn_bgm_wcjtn_.pause();
            }
        }else{
            Laya.SoundManager.stopMusic();
        }
    }

}

export enum Sound_wcjtn_Type{
    ClickBtn = "ClickBtn",
    Crush = "Crush",
    Driving = "Driving",
    GetCoin = "GetCoin",
    SpeedUp = "跑车加速声音_C32kbps",
    Whistle = "Whistle",
    Bgm = "Bgm",
    StopSpeedUp = "引擎收尾"
}