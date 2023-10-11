export default class Util_JJKLBB_it
{
    public static readonly OriginSt_JJKLBB_ageWidth = 1334;
    public static readonly OriginSt_JJKLBB_ageHeight = 750;


    public static readonly graysc_JJKLBB_aleMat: Array<number> =
        [0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0, 0, 0, 1, 0];
    
    public static readonly graysc_JJKLBB_aleFilter: Laya.ColorFilter = new Laya.ColorFilter(Util_JJKLBB_it.graysc_JJKLBB_aleMat);


    protected static poi_JJKLBB_nDown : Laya.Point = new Laya.Point(0,-1);
    protected static poi_JJKLBB_nUp : Laya.Point = new Laya.Point(0,1);

    
    public static Le_JJKLBB_rp(form : number,to : number,delta : number) : number
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

    public static lerpEu_JJKLBB_lerAngle(form : number,to : number,delta) : number
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
        var next = Util_JJKLBB_it.Le_JJKLBB_rp(form,to,delta);
        return next;
    }

    public static getRo_JJKLBB_tatio_JJKLBB_nByDir(v : Laya.Point) : number
    {   
        var dotValue = (v.x * Util_JJKLBB_it.poi_JJKLBB_nDown.x) + (v.y *  Util_JJKLBB_it.poi_JJKLBB_nDown.y);
        var cos = dotValue / (v.distance(0,0)  * Util_JJKLBB_it.poi_JJKLBB_nDown.distance(0,0));
        var radian = Math.acos(cos)
        var rotation = radian / (2 * Math.PI)  * 360;
        if(v.x < 0)
        {
            rotation = -rotation;
        }
        return rotation;
    }

    public static getR_JJKLBB_otationByDi_JJKLBB_rOn3DSpace(v : Laya.Point)
    {
        var dotValue = (v.x * Util_JJKLBB_it.poi_JJKLBB_nUp.x) + (v.y *  Util_JJKLBB_it.poi_JJKLBB_nUp.y);
        var cos = dotValue / (v.distance(0,0)  * Util_JJKLBB_it.poi_JJKLBB_nUp.distance(0,0));
        var radian = Math.acos(cos)
        var rotation = radian / (2 * Math.PI)  * 360;
        if(v.x < 0)
        {
            rotation = rotation + (180 - rotation) * 2;
        }
        return rotation;
    }

    public static getD_JJKLBB_irByRotat_JJKLBB_ion(rotation : number) : Laya.Point
    {   
        var radian = (rotation - 90) * Math.PI / 180;// -90 是转换到场景坐标系
        var x = Math.cos(radian);
        var y = Math.sin(radian);
        var point = new Laya.Point(x,y);
        point.normalize();
        return point;
    }

    public static getD_JJKLBB_irDirAn_JJKLBB_gle(dir1 : Laya.Point,dir2 : Laya.Point) : number
    {   
        var dotValue = (dir1.x * dir2.x) + (dir1.y *  dir2.y);
        var cos = dotValue / (dir1.distance(0,0)  * dir2.distance(0,0));
        var radian = Math.acos(cos)
        var angle = radian / (2 * Math.PI)  * 360;
        return angle;
    }

    public static get_JJKLBB_DirSca_JJKLBB_larLength(dir : Laya.Point) : number
    {
        var sl = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
        return sl;
    }

    public static setSp_JJKLBB_OnPare_JJKLBB_ntCenter(sp : Laya.Sprite)
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

    public static getP_JJKLBB_ointToLineDi_JJKLBB_stance(x : number,y : number,LineStart : Laya.Point,LineEnd : Laya.Point) : number
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


    public static isIp_JJKLBB_honeX()
    {
        if(!Laya.Browser.onIPhone)
            return false;
        var rate = 828 / 1792;
        if((Laya.Browser.width /  Laya.Browser.height <= rate) || (Laya.Browser.height /  Laya.Browser.width <= rate))
        {
            return true;
        }
        // if((Laya.Browser.width == 2436 && Laya.Browser.height == 1125) 
        //     || (Laya.Browser.height == 2436 && Laya.Browser.width == 1125))
        // {
        //     return true
        // }
        return false
    } 

    public static isIp_JJKLBB_hone()
    {
        return Laya.Browser.onIPhone
    }


    public static getC_JJKLBB_hild(node : Laya.Node,name : string) : Laya.Node
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
                var target = Util_JJKLBB_it.getC_JJKLBB_hild(child,name);
                if(target)
                    return target;
            }
        }
        return null;
    }
}