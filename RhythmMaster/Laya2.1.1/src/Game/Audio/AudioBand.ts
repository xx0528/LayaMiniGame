export default class AudioBand {
    public bands: Band[] = new Array;
    public bandHighestBuffer: number[] = new Array;

    private static _instance: AudioBand;
    public static get Instance(): AudioBand {
        return this._instance ? this._instance : this._instance = new AudioBand; 
    }

    public Load(url, completed?: Laya.Handler, errer?: Laya.Handler) {
        this.bands = new Array;
        
        function onLoad() {
            let json = Laya.loader.getRes(url);
            if (json == null) {
                onErrer();
                return;
            }

            off();
            this.LoadJson(json);
            if (completed != null) { completed.run(); }
        }
        function onErrer() {
            off();
            if (errer != null) { errer.runWith("音频读取失败"); }
        }
        function off() { Laya.loader.off(Laya.Event.ERROR, this, onErrer); }

        Laya.loader.load(url, Laya.Handler.create(this, onLoad), null, Laya.Loader.JSON);
        Laya.loader.on(Laya.Event.ERROR, this, onErrer)
    }

    public LoadJson(json) {
        let bands = json["bands"];
        for (let i = 0; i < bands.length - 1; i++) {
            let band: Band = new Band();
            let data: string = bands[i];
            let strAry = data.split("|");
            band.timeAppear = parseFloat(strAry[0]);
            strAry = strAry[1].split(",");
            for (let j = 0; j < strAry.length; j++) {
                let num = parseFloat(strAry[j]) / 10000;
                band.buffer.push(num);
            }
            this.bands.push(band);
        }
        
        let data = bands[bands.length - 1];
        let strAry = data.split("|");
        strAry = strAry[1].split(",");
        for(let i = 0; i < strAry.length; i++) {
            this.bandHighestBuffer.push(parseFloat(strAry[i]) / 10000);
        }
    }

    public getBandChange(bandIndex, index): number {
        let band = this.bands[index];
        let p = band.buffer[bandIndex] / this.bandHighestBuffer[bandIndex];
        return p;
    }
}

class Band {
    public timeAppear: number = 0;
    public buffer: number[] = new Array;
}