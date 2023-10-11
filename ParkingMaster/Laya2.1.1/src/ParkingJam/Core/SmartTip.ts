import Car from "./Model/Car";

export default class SmartTip {
    //思路 先遍历车辆检测1步是否可以移出 能移出则标记车辆移动方向并返回该辆车
    //否则 进入深度检测 检测车辆前进道路上有几辆阻挡，尝试挪动阻挡车辆，有解则记录步数塞进解集，继续检测第2俩车
    //检测完所有车辆后从解集中择优解

    check(layouts: Array<number>, cars: Array<Car>, mapSize: Laya.Size) {
        var cnt = 1;
        var str = "";
        //打印关卡数组
        // for (var i = 0; i < layouts.length; i++) {
        //     if (layouts[i] < 10)
        //         str += layouts[i] + " ,"
        //     else
        //         str += layouts[i] + ","
        //     if (cnt % mapSize.width == 0) {
        //         console.log(str);
        //         str = ""
        //     }
        //     cnt++;
        // }
        
        var tipCar = null;
        var tipDirection = -1;
        for (var car of cars) {
            if (tipCar != null) break;
            if (car.getDirection() == 1) {
                // 竖向检测
                i = car.startInLayout;
                while (tipCar == null) {
                    var j = i + car.h * mapSize.width;
                    if (j >= layouts.length) {
                        tipCar = car;
                        console.log("竖向向下");
                        tipDirection = 1;
                        break;
                    }
                    var val1 = layouts[j];
                    var val2 = layouts[j + 1];
                    if (val1 != 1 || val2 != 1)
                        break;
                    i += mapSize.width;
                }
                var i = car.startInLayout;
                while (tipCar == null) {
                    i -= mapSize.width;
                    if (i < 0) {
                        tipCar = car;
                        console.log("竖向向上");
                        tipDirection = 0;
                        break;
                    }
                    var val1 = layouts[i];
                    var val2 = layouts[i+1];
                    if (val1 != 1 || val2 != 1)
                        break;
                }
            } else {
                //横向检测
                var i = car.startInLayout;
                var row = Math.floor(i / mapSize.width);
                // console.log("row", row, i);
                while (tipCar == null) {
                    i--;
                    if (i < 0 || (i + 1) % mapSize.width == 0) {
                        tipCar = car;
                        console.log("横向向左");
                        tipDirection = 2;
                        break;
                    }
                    var val1 = layouts[i];
                    var val2 = layouts[i + mapSize.width];
                    if (val1 != 1 || val2 != 1) {
                        break;
                    }
                }
                i = car.startInLayout;
                while (tipCar == null) {
                    var j = i + car.h;
                    if (j >= layouts.length || j % mapSize.width == 0) {
                        tipCar = car;
                        console.log("横向向右");
                        tipDirection = 3;
                        break;
                    }
                    var val1 = layouts[j];
                    var val2 = layouts[j + mapSize.width];
                    if (val1 != 1 || val2 != 1)
                        break;
                    i++;
                }
            }
        }
        if (tipCar != null) {
            // console.log("tipCar", tipCar, tipCar.startInLayout);
            tipCar.tipDirection = tipDirection;
            return tipCar;
        } else
            return this.deepCheck();
    }

    deepCheck() {
        //TODO
        return null;
    }

}
