export default class ryw_Utilit
{
    public static readonly ryw_OriginStageWidth = 1334;
    public static readonly ryw_OriginStageHeight = 750;


    public static readonly ryw_grayscaleMat: Array<number> =
        [0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0, 0, 0, 1, 0];
    
    public static readonly ryw_grayscaleFilter: Laya.ColorFilter = new Laya.ColorFilter(ryw_Utilit.ryw_grayscaleMat);


    protected static ryw_poinDown : Laya.Point = new Laya.Point(0,-1);
    protected static ryw_poinUp : Laya.Point = new Laya.Point(0,1);

    
    public static ryw_Lerp(form : number,to : number,delta : number) : number
    {
        if(form == to)
            return to;
        if(form > to)
        {
            var next = form - delta;
            if(next <= to)
                return to;
            return next;
        }
        else if(form < to)
        {
            var next = form + delta;
            if(next >= to)
                return to;
            return next;
        }
    }

    public static ryw_lerpEulerAngle(form : number,to : number,delta) : number
    {
        var form = form % 360;
        form = form >= 0 ? form : (360 + form);
        var to = to % 360;
        to = to >= 0 ? to : (360 + to);
        var dis = Math.abs(to - form);
        if(dis > 180)
        {
            if(form < to)
                to = to - 360
            else if(form > to)
                to = to + 360
        }
        var next = ryw_Utilit.ryw_Lerp(form,to,delta);
        return next;
    }

    public static ryw_getRotationByDir(v : Laya.Point) : number
    {   
        var dotValue = (v.x * ryw_Utilit.ryw_poinDown.x) + (v.y *  ryw_Utilit.ryw_poinDown.y);
        var cos = dotValue / (v.distance(0,0)  * ryw_Utilit.ryw_poinDown.distance(0,0));
        var radian = Math.acos(cos)
        var rotation = radian / (2 * Math.PI)  * 360;
        if(v.x < 0)
        {
            rotation = -rotation;
        }
        return rotation;
    }

    public static ryw_getRotationByDirOn3DSpace(v : Laya.Point)
    {
        var dotValue = (v.x * ryw_Utilit.ryw_poinUp.x) + (v.y *  ryw_Utilit.ryw_poinUp.y);
        var cos = dotValue / (v.distance(0,0)  * ryw_Utilit.ryw_poinUp.distance(0,0));
        var radian = Math.acos(cos)
        var rotation = radian / (2 * Math.PI)  * 360;
        if(v.x < 0)
        {
            rotation = rotation + (180 - rotation) * 2;
        }
        return rotation;
    }

    public static ryw_getDirByRotation(rotation : number) : Laya.Point
    {   
        var radian = (rotation - 90) * Math.PI / 180;// -90 是转换到场景坐标系
        var x = Math.cos(radian);
        var y = Math.sin(radian);
        var point = new Laya.Point(x,y);
        point.normalize();
        return point;
    }

    public static ryw_getDirDirAngle(dir1 : Laya.Point,dir2 : Laya.Point) : number
    {   
        var dotValue = (dir1.x * dir2.x) + (dir1.y *  dir2.y);
        var cos = dotValue / (dir1.distance(0,0)  * dir2.distance(0,0));
        var radian = Math.acos(cos)
        var angle = radian / (2 * Math.PI)  * 360;
        return angle;
    }

    public static ryw_getDirScalarLength(dir : Laya.Point) : number
    {
        var sl = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
        return sl;
    }

    public static ryw_setSpOnParentCenter(sp : Laya.Sprite)
    {
        if(null == sp.parent)
            return;
        var psp = sp.parent as Laya.Sprite;
        var x  = 0;
        var y  = 0;
        var x  = x - sp.width / 2 * sp.scaleX + psp.width / 2;
        var y  = y - sp.height / 2  * sp.scaleY  + psp.height / 2;
        sp.x = x;
        sp.y = y;
    }

    public static ryw_getPointToLineDistance(x : number,y : number,LineStart : Laya.Point,LineEnd : Laya.Point) : number
    {
        var toStartDir = new Laya.Point(x  - LineStart.x,y - LineStart.y);
        var toEndDir = new Laya.Point(x  - LineEnd.x,y - LineEnd.y);
        var lineDir = new Laya.Point(LineEnd.x - LineStart.y,LineEnd.y - LineStart.y)
        var dotToStartDir = (lineDir.x * toStartDir.x) + (lineDir.y * toStartDir.y)
        if(dotToStartDir <= 0)
        {
            return toStartDir.distance(0,0);
        }
        var dotToEndDir = (lineDir.x * toEndDir.x) + (lineDir.y * toEndDir.y)
        if (dotToEndDir <= 0)
        {
            return toEndDir.distance(0,0);
        }
        var toStartDis = toStartDir.distance(0,0);
        var lineDirDis = lineDir.distance(0,0);
        var cos = dotToStartDir / (toStartDis * lineDirDis);
        var radians = Math.acos(cos)
        var dis = Math.sin(radians) * toStartDis
        return dis;
    }


    public static ryw_isIphoneX()
    {
        if(!Laya.Browser.onIPhone)
            return false;
        if((Laya.Browser.width == 2436 && Laya.Browser.height == 1125) 
            || (Laya.Browser.height == 2436 && Laya.Browser.width == 1125))
        {
            return true
        }
        return false
    } 

    public static ryw_isIphone()
    {
        return Laya.Browser.onIPhone
    }


    public static ryw_getChild(node : Laya.Node,name : string) : Laya.Node
    {
        for(var i=0;i < node.numChildren;++i)
        {
            var child = node.getChildAt(i);
            if(child.name == name)
            {
                return child;
            }
            else
            {
                var target = ryw_Utilit.ryw_getChild(child,name);
                if(target)
                    return target;
            }
        }
        return null;
    }

    public static ryw_forEachChild(node : Laya.Node,each : Function)
    {
        for(let i=0;i < node.numChildren;++i)
        {
            let child = node.getChildAt(i);
            each(child);
            ryw_Utilit.ryw_forEachChild(child,each);
        }
    }
}