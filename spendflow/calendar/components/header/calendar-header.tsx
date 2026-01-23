import Link from "next/link";
import { Columns, Grid3x3, List, Plus, Grid2x2, CalendarRange } from "lucide-react";

import { Button } from "@/components/ui/button";

import { TodayButton } from "@/calendar/components/header/today-button";
import { DateNavigator } from "@/calendar/components/header/date-navigator";
import { AddEventDialog } from "@/calendar/components/dialogs/add-event-dialog";

import type { IEvent } from "@/calendar/interfaces";
import type { TCalendarView } from "@/calendar/types";

interface IProps {
  view: TCalendarView;
  events: IEvent[];
}

export function CalendarHeader({ view, events }: IProps) {
  return (
    <div className="flex flex-col gap-4 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <TodayButton />
        <DateNavigator view={view} events={events} />
      </div>

      <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:justify-between">
        <div className="flex w-full items-center gap-1.5">
          <div className="inline-flex first:rounded-r-none last:rounded-l-none [&:not(:first-child):not(:last-child)]:rounded-none">
            <Button
              asChild
              aria-label="View by week"
              size="icon"
              variant={view === "week" ? "default" : "outline"}
              className="rounded-r-none [&_svg]:size-5 bg-[view===week?#017EFA:transparent] text-[view===week?white:inherit]"
            >
              <Link href="?view=week">
                <Columns strokeWidth={1.8} />
              </Link>
            </Button>

            <Button
              asChild
              aria-label="View by month"
              size="icon"
              variant={view === "month" ? "default" : "outline"}
              className="-ml-px rounded-none [&_svg]:size-5 bg-[view===month?#017EFA:transparent] text-[view===month?white:inherit]"
            >
              <Link href="?view=month">
                <Grid2x2 strokeWidth={1.8} />
              </Link>
            </Button>

            <Button
              asChild
              aria-label="View by year"
              size="icon"
              variant={view === "year" ? "default" : "outline"}
              className="-ml-px rounded-none [&_svg]:size-5 bg-[view===year?#017EFA:transparent] text-[view===year?white:inherit]"
            >
              <Link href="?view=year">
                <Grid3x3 strokeWidth={1.8} />
              </Link>
            </Button>

            <Button
              asChild
              aria-label="View by agenda"
              size="icon"
              variant={view === "agenda" ? "default" : "outline"}
              className="-ml-px rounded-l-none [&_svg]:size-5 bg-[view===agenda?#017EFA:transparent] text-[view===agenda?white:inherit]"
            >
              <Link href="?view=agenda">
                <CalendarRange strokeWidth={1.8} />
              </Link>
            </Button>
          </div>
        </div>

        <Button asChild className="w-full sm:w-auto bg-[#017EFA] hover:bg-[#017EFA]/90">
          <Link href="/add-expense">
            <Plus />
            Add Bill
          </Link>
        </Button>
      </div>
    </div>
  );
}
