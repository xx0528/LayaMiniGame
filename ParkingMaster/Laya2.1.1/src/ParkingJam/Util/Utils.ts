export default class Utils {

    public static getInstance() : Utils
    {
        if(null == Utils._instance)
        {
            Utils._instance = new Utils();
        }
        return Utils._instance
    }
    protected static _instance: Utils;

    randomRange(min: number, max: number): number {
        return Math.round(Math.random() * (max - min)) + min;
    }

    randomMax(max: number): number {
        return Math.round(Math.random() * max);
    }

    floatRandomRange(min: number, max: number): number {
        return (Math.random() * (max - min)) + min;
    }
}