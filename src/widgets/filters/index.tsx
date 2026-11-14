import { useEffect, useState } from "react";
import { Input, Select } from "antd";
import { Funnel, ListSortAscending, Search } from "lucide-react";

import { useDebounce } from "@/shared/lib/hooks";

import { filterOptions, sortOptions } from "./model/constants";

import styles from "./styles.module.css";

interface IRunsProps {
  searchValue: string;
  filtersValue: string[];
  sortValue: string | null;
  setSearchValue: (value: string) => void;
  setFiltersValue: (value: string[]) => void;
  setSortValue: (value: string | null) => void;
  disabled?: boolean;
}

export function Filters({
  searchValue,
  filtersValue,
  sortValue,
  setSearchValue,
  setFiltersValue,
  setSortValue,
  disabled = false,
}: IRunsProps) {
  const [search, setSearch] = useState<string>(searchValue);
  const [prevSearchValue, setPrevSearchValue] = useState<string>(searchValue);

  const debouncedSearch = useDebounce(search, 250);

  // Чтобы правильно работал сброс
  if (searchValue !== prevSearchValue) {
    setPrevSearchValue(searchValue);
    setSearch(searchValue);
  }

  useEffect(() => {
    if (debouncedSearch !== searchValue) {
      setSearchValue(debouncedSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <div className={styles.filters}>
      <Input
        type="search"
        name="search"
        allowClear
        disabled={disabled}
        prefix={<Search color="var(--font-color-main)" />}
        placeholder="Search by name"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <Select
        placeholder="Filter"
        prefix={<Funnel color="var(--font-color-main)" />}
        mode="multiple"
        allowClear
        disabled={disabled}
        options={filterOptions}
        value={filtersValue}
        onChange={(values: string[]) => setFiltersValue(values)}
      />

      <Select
        placeholder="Sort"
        prefix={<ListSortAscending color="var(--font-color-main)" />}
        allowClear
        disabled={disabled}
        options={sortOptions}
        value={sortValue}
        onChange={(value: string) => setSortValue(value)}
      />
    </div>
  );
}
