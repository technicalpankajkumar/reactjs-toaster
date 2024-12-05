import { useState } from "react";
import { classNameProps, styleProps } from "../types/toastTypes";

// Create the custom hook
const useStyleHook= () => {
    // Initialize state with the provided classname
    const [className, setClassName] = useState<classNameProps>();
    const [styles, setStyles] = useState<styleProps>();

    // Define background styles based on the className props
    const backgroundColors = {
        success: className?.successBgClass || `bg-emerald-100 dark:bg-emerald-800`,
        error: className?.errorBgClass || `bg-red-100 dark:bg-red-800`,
        warning: className?.warningBgClass || `bg-yellow-100 dark:bg-yellow-800`,
        info: className?.infoBgClass || `bg-blue-100 dark:bg-blue-800`,
        loading: className?.loadingBgClass || `bg-purple-100 dark:bg-purple-800`,
    };

    // Define text colors based on the className props
    const textColors = {
        success: className?.successTextClass || 'text-emerald-500',
        error: className?.errorTextClass || 'text-red-500',
        warning: className?.warningTextClass || 'text-yellow-500',
        info: className?.infoTextClass || 'text-blue-500',
        loading: className?.loadingTextClass || 'text-purple-500',
    };

    // Define button styles based on the className props
    const progressColors = {
        success: className?.successProgClass || 'bg-emerald-900 hover:bg-emerald-600',
        error: className?.errorProgClass || 'bg-red-900 hover:bg-red-600',
        warning: className?.warningProgClass || 'bg-yellow-900 hover:bg-yellow-600',
        info: className?.infoProgClass || 'bg-blue-900 hover:bg-blue-600',
        loading: className?.loadingProgClass || 'bg-purple-900 hover:bg-purple-600',
    };

    let style: styleProps = {
        body:styles?.body,
        contentBody:styles?.contentBody,
        iconBody:styles?.iconBody,
        icon:styles?.icon,
        messageBody:styles?.messageBody,
        message:styles?.message,
        closeBtnBody:styles?.closeBtnBody,
        closeBtnIcon:styles?.closeBtnIcon,
        closeBtn:styles?.closeBtn,
        progressBody:styles?.progressBody,
        progress:styles?.progress
   }

    // Return the styles
    return { backgroundColors, textColors, progressColors ,style, setStyles, setClassName};
};

export default useStyleHook;