import {useRef, useEffect} from "react";

const VISIBILITY_CHANGE = "visibilitychange";

const subscribeToVisibilityChange = (callback) =>
  document.addEventListener(VISIBILITY_CHANGE, callback);

const unsubscribeFromVisibilityChange = (callback) =>
  document.removeEventListener(callback, VISIBILITY_CHANGE);

const isPageHidden = () => document.visibilityState === "hidden";

const isPageVisible = () => document.visibilityState === "visible";

function usePageVisiblity(onHidden, onVisible) {
  const handleVisibilityChange = useRef(null);

  useEffect(() => {
    if (!handleVisibilityChange.current) {
      handleVisibilityChange.current = function () {
        if (isPageHidden()) onHidden instanceof Function && onHidden();

        if (isPageVisible()) onVisible instanceof Function && onVisible();
      };
    }

    subscribeToVisibilityChange(handleVisibilityChange.current);

    return () => {
      unsubscribeFromVisibilityChange(handleVisibilityChange.current);
    };
  }, []);
}
