import classNames from "classnames";
import { Book, CalendarClock, GitBranch, Hourglass, Info } from "lucide-react";

import { formatCreatedAt, formatDuration } from "@/shared/lib/date";

import type { Run } from "../model/types";

import styles from "./styles.module.css";

interface RunCardProps {
  run: Run;
}

export function RunCard({ run }: RunCardProps) {
  return (
    <div className={styles.runCard}>
      <h4 className={styles.runName}>{run.name}</h4>

      <div className={styles.wrapper}>
        <div className={styles.leftWrapper}>
          <div className={styles.info}>
            <div className={styles.iconWithLabel}>
              <Book />
              <b className={styles.infoLabel}>Repository:</b>
            </div>
            <p className={styles.infoValue}> {run.repository}</p>
          </div>

          <div className={styles.info}>
            <div className={styles.iconWithLabel}>
              <GitBranch />
              <b className={styles.infoLabel}>Branch:</b>
            </div>
            <p className={styles.infoValue}> {run.branch}</p>
          </div>
        </div>

        <div className={styles.rightWrapper}>
          <div className={styles.info}>
            <div className={styles.iconWithLabel}>
              <CalendarClock />
              <b className={styles.infoLabel}>Created at:</b>
            </div>
            <p className={styles.infoValue}>
              {" "}
              {formatCreatedAt(run.createdAt)}
            </p>
          </div>

          <div className={styles.info}>
            <div className={styles.iconWithLabel}>
              <Hourglass />
              <b className={styles.infoLabel}>Duration:</b>
            </div>
            <p className={styles.infoValue}>
              {run.durationSeconds
                ? `${formatDuration(run.durationSeconds)}`
                : "Unknown"}
            </p>
          </div>
        </div>
      </div>

      <button className={styles.showMoreButton}>
        <Info size={20} color="var(--font-color-accent)" />
        <span>Details</span>
      </button>

      <div className={classNames(styles.runStatus, styles[run.status])}>
        <span>{run.status.toUpperCase()}</span>
      </div>
    </div>
  );
}
