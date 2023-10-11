//圆桌随机算法

export default class RoundTableRandom {
    private ratios: object = {};
    
    constructor() {
    }

    set(key: string, ratios: Array<number>) {
        var t = ratios.slice();

        for (var i = 0; i < t.length; i++) {
            if (i > 0) t[i] = t[i - 1] + t[i];
        }

        this.ratios[key] = t;
        console.log(this.ratios[key]);
    }

    getRandomIndex(key: string): number {
        var val = Math.random();
        var ratios = this.ratios[key];
        for (var i = 0; i < ratios.length; i++) {
            if (val <= ratios[i]) {
                return i;
            }
        }
        return 0;
    }

    randomCheck(ratio: number): boolean {
        if (Math.random() <= ratio) return true;
        return false;
    }

    clear(key: string) {
        if (key == null)
            this.ratios = {};
        else
            this.ratios[key] = null;
    }
    
}