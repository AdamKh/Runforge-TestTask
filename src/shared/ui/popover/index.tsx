import { type ReactNode, useRef } from "react";

import { useOnClickOutside } from "@/shared/hooks";

import styles from "./styles.module.css";

interface IPopoverProps {
  children?: ReactNode;
  setOpen: (f: boolean) => void;
}

export function Popover({ children, setOpen }: IPopoverProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(contentRef, () => setOpen(false));

  return (
    <div className={styles.overlay}>
      <div ref={contentRef} className={styles.popoverWrapper}>
        {children}
      </div>
    </div>
  );
}
