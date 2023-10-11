/**
 * 用于使用路径点计算Catmull_Rom曲线的工具类，若无必要不需要修改
 * 
 * @export
 * @class PathGenerator
 */
export default class PathGenerator {
    /**
     * 最正统的Catmull_Rom曲线计算函数
     * 给这个函数输入n(n>=4)个点，会生成n-3条线段
     * 每条线段中按照距离生成对应的路径点
     * 
     * @param {Array<Laya.Vector3>} path 
     * @param {boolean} isClose 
     * @param {number} [byDistance=0] 
     * @returns {Array<Laya.Vector3>} 
     * @memberof TrackManager
     */
    public static savePathCatmullRom(path: Array<Laya.Vector3>, byDistance: number = 0): Array<Laya.Vector3> //main function to calculate the Path
    {
        let length = path.length;
        let temp = new Array<Laya.Vector3>();
        if (path == null || length < 4) {
            return temp;
        }
        for (let i = 1; i < length - 2; i++) {
            let step = 0.01;
            if (byDistance > 0) {
                let distance = Laya.Vector3.distance(path[i], path[i + 1]);
                step = byDistance / distance;
            }

            for (let u = 0; u < 1.0; u += step) {
                let p0 = i - 1 < 0 ? path[length - 1] : path[i - 1];
                let p1 = path[i];
                let p2 = path[i + 1];
                let p3 = path[i + 2];
                let vec = this.interpolatedPosition //call to Catmull-Rom
                    (
                    p0,
                    p1,
                    p2,
                    p3,
                    u
                    );
                temp.push(vec); //store each value
            }
        }
        temp.push(path[length - 2]);
        return temp;
    }

    /**
     * 输入4点按照u计算Catmull点的方法
     * 
     * @param {Laya.Vector3} p0 
     * @param {Laya.Vector3} p1 
     * @param {Laya.Vector3} p2 
     * @param {Laya.Vector3} p3 
     * @param {number} u 
     * @returns 
     * @memberof TrackManager
     */
    public static interpolatedPosition(p0: Laya.Vector3, p1: Laya.Vector3, p2: Laya.Vector3, p3: Laya.Vector3, u: number): Laya.Vector3 {
        let u3 = u * u * u;
        let u2 = u * u;
        let f1 = -0.5 * u3 + u2 - 0.5 * u;
        let f2 = 1.5 * u3 - 2.5 * u2 + 1.0;
        let f3 = -1.5 * u3 + 2.0 * u2 + 0.5 * u;
        let f4 = 0.5 * u3 - 0.5 * u2;
        let result = new Laya.Vector3();
        result.x = p0.x * f1 + p1.x * f2 + p2.x * f3 + p3.x * f4;
        result.y = p0.y * f1 + p1.y * f2 + p2.y * f3 + p3.y * f4;
        result.z = p0.z * f1 + p1.z * f2 + p2.z * f3 + p3.z * f4;
        return result;
    }
}