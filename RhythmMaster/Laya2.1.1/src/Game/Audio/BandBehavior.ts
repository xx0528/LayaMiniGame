import AudioBand from "./AudioBand";
import AudioWraper from "./AudioWraper";

export default abstract class BandBehavior extends Laya.Script3D {

    public bandIndex;

    private currIndex = 0;
    private endIndex = 0;

    public Start(): void {
        if (AudioBand.Instance.bands.length < 50) {
            return
        }

        this.currIndex = 0;
        this.endIndex = AudioBand.Instance.bands.length - 1;
        let curBand = AudioBand.Instance.bands[this.currIndex];
        let nextBand = AudioBand.Instance.bands[this.currIndex + 1];
        Laya.timer.frameLoop(1, this, this.Update);
        this.onBandChange(curBand.timeAppear, nextBand.timeAppear, nextBand.buffer[this.bandIndex]);
    }

    public Stop(): void {
        this.onBandEnd();
        Laya.timer.clearAll(this);
    }

    private Update(): void {
        if (AudioWraper.Instance.SoundChannel == null || AudioWraper.Instance.IsStoped) {
            return;
        }

        let currenTime = AudioWraper.Instance.PlayPosition;
        let curBand = AudioBand.Instance.bands[this.currIndex];
        let nextBand = AudioBand.Instance.bands[this.currIndex + 1];
        if (currenTime > nextBand.timeAppear) {
            this.currIndex += 2;
            if (this.currIndex >= this.endIndex) {
                this.Stop();
                return;
            }
            curBand = AudioBand.Instance.bands[this.currIndex];
            nextBand = AudioBand.Instance.bands[this.currIndex + 1];
            //console.log("audioPosition:" + currenTime + "timeAppear:" + nextBand.timeAppear);
            this.onBandChange(curBand.timeAppear, nextBand.timeAppear, AudioBand.Instance.getBandChange(this.bandIndex, this.currIndex));
        }
    }

    protected onBandChange(curTime, nextTime, num): void {

    }

    protected onBandEnd(): void {
    }

    private Lerp(num1, num2, t): number {
        return num1 + t * (num2 - num1);
    }
}