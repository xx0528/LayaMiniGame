import View_XYXZS_Base from "./ViewBase";

export default interface IViewSt_XYXZS_ateListener
{
    onView__XYXZS_XYXZS_Show(view : View_XYXZS_Base) : void;
    onViewHide(view : View_XYXZS_Base) : void;
}

export function isIView_XYXZS_StateListener(element : any)
{
    if((null != element.onViewShow && typeof(element.onViewShow) == "function")
        && (null != element.onViewHide && typeof(element.onViewHide) == "function") )
    {
        return true;
    }
    return false;
}

