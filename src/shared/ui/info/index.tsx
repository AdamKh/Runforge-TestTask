import { type ReactNode } from "react";

import styles from "./styles.module.css";

interface IInfoItemProps {
  label: string;
  value?: string;
  icon?: ReactNode;
  children?: ReactNode;
}

export function InfoItem({ label, value, icon, children }: IInfoItemProps) {
  return (
    <div className={styles.info}>
      <div className={styles.iconWithLabel}>
        {icon ? icon : ""}
        <b className={styles.infoLabel}>{label}</b>
      </div>
      {value ? <p className={styles.infoValue}> {value}</p> : children}
    </div>
  );
}
