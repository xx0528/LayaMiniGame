import PathGenerator from "./PathGenerator";
/**
 * 赛道管理器，负责管理赛道，以及玩家与赛道交互的逻辑
 * 
 * @export
 * @class TrackManager
 */
export default class TrackWay {
   
    /**
     * 对路径点数组_wayPoints的对外get属性封装
     * 
     * @readonly
     * @type {Array<Laya.Vector3>}
     * @memberof TrackManager
     */
    public get WayPoints(): Array<Laya.Vector3> {
        return this._wayPoints;
    }
    /* 保存计算好的路径点的数组 */
    private _wayPoints: Array<Laya.Vector3>;
    /* 跑道的总长度 */
    private _tootalLength: number;
    /* 跑道的总长度的对外get属性封装 */
    public get TotalLength(): number {
        return this._tootalLength;
    }
    public get LastPoint(): Laya.Vector3 {
        return this._wayPoints[this._wayPoints.length - 1];
    }

    // onDestroy() {
    //     TrackManager._instance = null;
    // }
    /**
     * 计算路径的方法，参数为3个
     * 
     * @param {Laya.Sprite3D} road 路径父物体，其下面挂载的子物体的transform.position为计算曲线的节点
     * @param {number} generateOption 生成选项，1是经典模式(输入n点输出n-3条曲线)，2是自动添加头尾(输入n点输出n-1条曲线)，3是自动添加头尾(输入n点输出n条曲线)且生成的曲线闭合
     * @param {number} byDistance 是否按照距离生成曲线点
     * @returns 
     * @memberof TrackManager
     */
    public CalculatePath(road: Laya.Sprite3D, generateOption: number, byDistance: number) {
        let wayPoints: Array<Laya.Vector3> = [];
        for (let index = 0; index < road.numChildren; index++) {
            let vector3 = (road._children[index] as Laya.Sprite3D).transform.position;
            wayPoints.push(vector3);
        }
        let length = wayPoints.length;
        switch (generateOption) {
            case 0:
                break;
            case 1:
                if (length >= 2) {
                    let v0 = wayPoints[0];
                    let v3 = wayPoints[length - 1];
                    wayPoints.unshift(v0);
                    wayPoints.push(v3);
                }
                break;
            case 2:
                if (length >= 2) {
                    let v0 = wayPoints[length - 1];
                    let v2 = wayPoints[0];
                    let v3 = wayPoints[1];
                    wayPoints.unshift(v0);
                    wayPoints.push(v2);
                    wayPoints.push(v3);
                }
                break;
        }
        this._wayPoints = PathGenerator.savePathCatmullRom(wayPoints, byDistance);
        let totalLenght = 0;
        for (let index = 0; index < this._wayPoints.length - 1; index++) {
            let current = this._wayPoints[index];
            let next = this._wayPoints[index + 1];
            totalLenght += Laya.Vector3.distance(current, next);
        }
        this._tootalLength = Math.floor(totalLenght);
    }
    // /**
    //  * 按照路径点得到当前路径点应该的朝向
    //  * 
    //  * @param {number} point 
    //  * @returns {Laya.Vector3} 
    //  * @memberof TrackManager
    //  */
    // public GetForwardDirection(pointIndex: number): Laya.Vector3 {
    //     let dir = Laya.Vector3._ZERO;
    //     /* 如果路径点小于2个,返回 (0,0,0)*/
    //     if (this._wayPoints.length < 2) {
    //         return dir;
    //     }
    //     let next: Laya.Vector3;
    //     let current: Laya.Vector3;
    //     /* 如果输入的路径点超出了路径边界,返回最后一个线段的方向 */
    //     if (pointIndex >= this._wayPoints.length - 1) {
    //         next = this._wayPoints[this._wayPoints.length - 1];
    //         current = this._wayPoints[this._wayPoints.length - 2];
    //     }
    //     /* 如果输入的路径点没有超出边界，返回下个点到这个点的线段*/
    //     else {
    //         next = this._wayPoints[pointIndex + 1];
    //         current = this._wayPoints[pointIndex];
    //     }
    //     /* 将方向归一化  */
    //     Laya.Vector3.subtract(next, current, dir);
    //     Laya.Vector3.normalize(dir, dir);
    //     return dir;
    // }

    /**
     * 得到两点之间归一化后的方向
     * 
     * @param {Laya.Vector3} current 
     * @param {Laya.Vector3} next 
     * @returns {Laya.Vector3} 
     * @memberof TrackManager
     */
    public GetNormalizeDirection(current: Laya.Vector3, next: Laya.Vector3): Laya.Vector3 {
        let dir = new Laya.Vector3();
        Laya.Vector3.subtract(next, current, dir);
        Laya.Vector3.normalize(dir, dir);
        return dir;
    }
    /**
     * 按照当前的位置、路径点和速度，计算出下一个点的位置和玩家朝向的角度;
     * 
     * @param {Laya.Vector3} currentPos 
     * @param {number} pointIndex 
     * @param {number} distance 
     * @returns 
     * @memberof TrackManager
     */
    public GetPointByDistance(currentPos: Laya.Vector3, pointIndex: number, distance: number): PosOnRoad {
        let dis: number = 0;
        let tempPos = currentPos.clone();
        let result: PosOnRoad = { CurrentPos: null, PointIndex: null, Direction: null };
        while (true) {
            if (pointIndex >= this._wayPoints.length - 1) {
                result.CurrentPos = this._wayPoints[this._wayPoints.length - 1];
                result.PointIndex = this._wayPoints.length - 1;
                result.Direction = Laya.Vector3._ZERO;
                // result.Direction=this.GerDir()
                return result;
            }
            let nextPoint = this._wayPoints[pointIndex + 1];
            let fooDis = Laya.Vector3.distance(tempPos, nextPoint);
            dis += fooDis;
            if (dis >= distance) {
                let t = (dis - distance) / fooDis;
                Laya.Vector3.lerp(nextPoint, tempPos, t, tempPos);
                result.CurrentPos = tempPos;
                result.PointIndex = pointIndex;
                // result.NextPos = nextPoint;
                /* 下面的函数用于计算玩家朝向 */
                let currentDirect = this.GetNormalizeDirection(this._wayPoints[pointIndex], nextPoint);
                let lastDirect = pointIndex == 0 ? currentDirect : this.GetNormalizeDirection(this._wayPoints[pointIndex - 1], this._wayPoints[pointIndex]);
                let dir = new Laya.Vector3();
                let foo = Laya.Vector3.distance(this._wayPoints[pointIndex], this._wayPoints[pointIndex + 1]);
                let foo2 = Laya.Vector3.distance(this._wayPoints[pointIndex], tempPos);
                let lerp_t = foo2 / foo;
                Laya.Vector3.lerp(lastDirect, currentDirect, lerp_t, dir);

                // let dir0 = this.GetNormalizeDirection(this._wayPoints[Math.max(0, pointIndex - 2)], this._wayPoints[Math.max(0, pointIndex - 1)]);
                // let dir1 = this.GetNormalizeDirection(this._wayPoints[Math.max(0, pointIndex - 1)], this._wayPoints[pointIndex]);
                // let dir2 = this.GetNormalizeDirection(this._wayPoints[pointIndex], this._wayPoints[Math.min(pointIndex + 1, this._wayPoints.length - 1)]);
                // let dir3 = this.GetNormalizeDirection(this._wayPoints[Math.min(pointIndex + 1, this._wayPoints.length - 1)], this._wayPoints[Math.min(pointIndex + 2, this._wayPoints.length - 1)]);

                // dir = PathGenerator.interpolatedPosition(dir0, dir1, dir2, dir3, lerp_t);

                result.Direction = dir;
                /* 返回值 */
                return result;
            }
            else {
                pointIndex++;
                tempPos = this._wayPoints[pointIndex].clone();
            }
            //     Vector3 nextPoint = _roadPointIndex + 2 <= _wayPoints.Count
            //         ? _wayPoints[_roadPointIndex + 1]
            //         : _wayPoints[0];
            //     float fooDis = Vector3.Distance(_lastPoint, nextPoint);
            //     dis += fooDis;
            //     if (dis > distance) {
            //         float t = (dis - distance) / fooDis;
            //         _lastPoint = Vector3.Lerp(nextPoint, _lastPoint, t);
            //         break;
            //     }
            //     else {
            //         if (_roadPointIndex + 1 < _wayPoints.Count) {
            //             _roadPointIndex++;
            //         }
            //         else {
            //             _roadPointIndex = 0;
            //         }

            //         _lastPoint = _wayPoints[_roadPointIndex];
            //     }
            // }
        }
    }
    /**
     * 得到路径数组点中输入参数currentPos最近的点
     * 
     * @param {Laya.Vector3} currentPos 
     * @memberof TrackManager
     */
    public GetClosetPoint(currentPos: Laya.Vector3): PosOnRoad {
        let res = new PosOnRoad();
        let distance = -1;
        let pointIndex = -1;
        /* 第一步：得到wayPoint路径数组中离落点最近的点 */
        for (let i = 0; i < this._wayPoints.length; i++) {
            let point = this._wayPoints[i];
            let tempdis = Laya.Vector3.distance(point, currentPos);
            if (distance == -1 || tempdis < distance) {
                distance = tempdis;
                pointIndex = i;
            }
        }

        // if (pointIndex > 1) {
        // }
        // else if (pointIndex + 1 <= this._wayPoints.length) {
        // }

        res.CurrentPos = this._wayPoints[pointIndex];
        res.PointIndex = pointIndex;
        if (pointIndex > 0) {
            res.Direction = this.GetNormalizeDirection(this._wayPoints[pointIndex - 1], this._wayPoints[pointIndex]);
        }
        else {
            res.Direction = Laya.Vector3._ZERO;
        }
        // if (pointIndex >= this._wayPoints.length - 1) {
        //     res.Direction = this.GetNormalizeDirection(this._wayPoints[pointIndex - 1], this._wayPoints[pointIndex]);
        // }
        // else {
        //     let currentDirect = this.GetNormalizeDirection(this._wayPoints[pointIndex], this._wayPoints[pointIndex + 1]);
        //     let lastDirect = pointIndex == 0 ? currentDirect : this.GetNormalizeDirection(this._wayPoints[pointIndex - 1], this._wayPoints[pointIndex]);
        // }
        return res;
    }
    /**
     * 得到路径点
     * 
     * @returns {number} 
     * @memberof TrackManager
     */
    public GetProgress(pointIndex: number): number {
        pointIndex = pointIndex < 0 ? 0 : pointIndex;
        pointIndex = pointIndex > this._wayPoints.length - 1 ? this._wayPoints.length - 1 : pointIndex;
        return pointIndex / (this._wayPoints.length - 1);
    }
}
/**
 * 用来保存角色在赛道路径点上的参数，包括
 * 1：当前位置
 * 2：当前路径点索引
 * 3：当前方向
 * 
 * @class PosOnRoad
 */
class PosOnRoad {
    public CurrentPos: Laya.Vector3;
    public PointIndex: number;
    public Direction: Laya.Vector3;
}