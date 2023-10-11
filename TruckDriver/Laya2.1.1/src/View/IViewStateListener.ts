import ViewBase from "./ViewBase";

export default interface IViewStateListener_ppxhc_
{
    onViewShow(view : ViewBase) : void;
    onViewHide(view : ViewBase) : void;
}

export function isIViewStateListener(element : any)
{
    if((null != element.onViewShow && typeof(element.onViewShow) == "function")
        && (null != element.onViewHide && typeof(element.onViewHide) == "function") )
    {
        return true;
    }
    return false;
}

