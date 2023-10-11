
export default class SoundM_JJKLBB_gr {
    public static readonly soundRe_JJKLBB_sPath = "subRes/sound/"
    public static readonly instance: SoundM_JJKLBB_gr = new SoundM_JJKLBB_gr();
    
    private bgm:any;

    private constructor() {
    }

    public get Enabled()
    {
        return this._enabled;
    }

    public set Enabled(e : boolean)
    {
        if(!e)
        {
            this.sto_JJKLBB_pBGM();
        }
        this._enabled = e;
    }

    protected _enabled : boolean = true;

    public getSo_JJKLBB_undUrl(name: string) : string
    {
        let url = SoundM_JJKLBB_gr.soundRe_JJKLBB_sPath + name + ".ogg";
        return url;
    }

    public playS_JJKLBB_ound(name: string): void {
        if(!this._enabled)
            return;
        var url = this.getSo_JJKLBB_undUrl(name);
        if (Laya.Browser.onMiniGame) {
            var sound = laya.utils.Pool.getItem(name);
            if (sound == null) {
                sound = wx.createInnerAudioContext();
                sound.src = SoundM_JJKLBB_gr.soundRe_JJKLBB_sPath + name + ".ogg";
                sound.onEnded(() => {
                    laya.utils.Pool.recover(name, sound);
                    sound.offEnded();
                })
            }
            sound.play();
        } else {
            Laya.SoundManager.playSound(url, 1);
        }
    }

    public pla_JJKLBB_yBGM(name){
        if(!this._enabled)
            return;
        let url = this.getSo_JJKLBB_undUrl(name);
        if (Laya.Browser.onMiniGame) {
            if(!this.bgm)
            {
                this.bgm = wx.createInnerAudioContext();
            }
            this.bgm.stop();
            this.bgm.src = url;
            this.bgm.loop = true;
            this.bgm.play();
        } else {
            Laya.SoundManager.playMusic(url, 0);
        }
    }

    public sto_JJKLBB_pBGM(){
        if (Laya.Browser.onMiniGame) {
            if(this.bgm){
                this.bgm.stop();
            }
        }else{
            Laya.SoundManager.stopMusic();
        }
    }

}