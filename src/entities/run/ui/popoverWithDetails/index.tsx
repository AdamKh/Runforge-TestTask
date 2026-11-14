import {
  Book,
  CalendarClock,
  GitBranch,
  Hourglass,
  Info,
  Logs,
  Target,
  X,
} from "lucide-react";

import { formatCreatedAt, formatDuration } from "@/shared/lib/date";
import { InfoItem } from "@/shared/ui/info";
import { Popover } from "@/shared/ui/popover";

import type { Run } from "../../model/types";

import styles from "./styles.module.css";

interface IPopoverWithDetailsProps {
  setOpen: (f: boolean) => void;
  run: Run;
}

export function PopoverWithDetails({ setOpen, run }: IPopoverWithDetailsProps) {
  return (
    <Popover setOpen={setOpen}>
      <div className={styles.popover}>
        <h4 className={styles.popoverTitle}>
          <Info /> <span>Details</span>
        </h4>
        <div className={styles.detailsWrapper}>
          <div className={styles.runNameWrapper}>
            <span>Run name:</span>
            <h4 className={styles.runName}>{run.name}</h4>
          </div>
          <InfoItem
            icon={<Book />}
            label="Repository:"
            value={run.repository}
          />
          <InfoItem icon={<GitBranch />} label="Branch:" value={run.branch} />
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
          {run.result && (
            <InfoItem icon={<Target />} label="Result:" value={run.result} />
          )}
          <InfoItem icon={<Info />} label="Status:" value={run.status} />
          {run.logs?.length > 0 && (
            <InfoItem icon={<Logs />} label="Logs:">
              <div className={styles.logs}>
                {run.logs.map((log, index) => (
                  <code className={styles.log} key={`${index}_${log}`}>
                    $ {log}
                  </code>
                ))}
              </div>
            </InfoItem>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen(false)}
          className={styles.closeBtn}
        >
          <X size={32} />
        </button>
      </div>
    </Popover>
  );
}
