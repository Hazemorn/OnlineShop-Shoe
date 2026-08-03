import { useState, useRef, useMemo, type ReactNode, useEffect, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";
import s from './Tooltip.module.scss';

export type TooltipBehaviour = "click";

export interface ITooltipProps {
  behaviour?: TooltipBehaviour;
  children: ReactNode;
  className?: string;
  content: string;
  placement: string;
}

const Tooltip = ({
  behaviour,
  children,
  className,
  content,
  placement,
}: ITooltipProps) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const targetRef = useRef<HTMLButtonElement>(null);
  const transitionNodeRef = useRef<HTMLDivElement>(null);

  const handlerOutsideClick = useCallback((event: MouseEvent) => {
    if (targetRef.current && !targetRef.current.contains(event.target as Node)) {
      setIsClicked(false);
    }
  }, []);

  useEffect(() => {
    if (isClicked && behaviour === "click") {
      document.addEventListener("click", handlerOutsideClick, false);
    }
    return () => {
      document.removeEventListener("click", handlerOutsideClick, false);
    };
  }, [isClicked, behaviour]);

  const handlerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (behaviour === "click") {
      setIsClicked((prevState) => !prevState);
    }
  };

  const showToolTip = useMemo(() => {
    if (behaviour === "click") {
      return isClicked;
    }
    return false;
  }, [behaviour, isClicked]);

  return (
    <div className={classNames(s.Tooltip, className)}>
      <button
        className={s.Tooltip_Target}
        ref={targetRef}
        onClick={handlerClick}
      >
        {children}
      </button>
      <CSSTransition
        in={showToolTip}
        timeout={200}
        classNames={s.Tooltip_Transition}
        unmountOnExit
        nodeRef={transitionNodeRef}
      >
        <div
          ref={transitionNodeRef}
          className={classNames(
            s.Tooltip_CenterContainer,
            s[`Tooltip_CenterContainer__${placement}`]
          )}
        >
          <div
            className={
              s.Tooltip_Content
            }
          >
            {content}
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Tooltip;
