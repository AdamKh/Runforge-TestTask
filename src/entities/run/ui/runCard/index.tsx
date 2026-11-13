import { useState } from "react";
import classNames from "classnames";
import { Book, CalendarClock, GitBranch, Hourglass, Info } from "lucide-react";

import { formatCreatedAt, formatDuration } from "@/shared/lib/date";
import { InfoItem } from "@/shared/ui/info";

import type { Run } from "../../model/types";
import { PopoverWithDetails } from "../popoverWithDetails";

import styles from "./styles.module.css";

interface RunCardProps {
  run: Run;
}

export function RunCard({ run }: RunCardProps) {
  const [isPopoverOpen, setPopoverOpen] = useState<boolean>(false);

  return (
    <>
      <div className={styles.runCard}>
        <h4 className={styles.runName}>{run.name}</h4>

        <div className={styles.wrapper}>
          <div className={styles.leftWrapper}>
            <InfoItem
              icon={<Book />}
              label="Repository:"
              value={run.repository}
            />
            <InfoItem icon={<GitBranch />} label="Branch:" value={run.branch} />
          </div>

          <div className={styles.rightWrapper}>
            <InfoItem
              icon={<CalendarClock />}
              label="Created at:"
              value={formatCreatedAt(run.createdAt)}
            />
            <InfoItem
              icon={<Hourglass />}
              label="Duration:"
              value={
                run.durationSeconds
                  ? formatDuration(run.durationSeconds)
                  : "Unknown"
              }
            />
          </div>
        </div>

        <button
          type="button"
          className={styles.showMoreButton}
          onClick={() => setPopoverOpen(true)}
        >
          <Info size={20} color="var(--font-color-accent)" />
          <span>Details</span>
        </button>

        <div className={classNames(styles.runStatus, styles[run.status])}>
          <span>{run.status.toUpperCase()}</span>
        </div>
      </div>

      {isPopoverOpen && (
        <PopoverWithDetails run={run} setOpen={setPopoverOpen} />
      )}
    </>
  );
}
