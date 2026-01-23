import { formatDate } from "date-fns";

import { useCalendar } from "@/calendar/contexts/calendar-context";

export function TodayButton() {
  const { setSelectedDate } = useCalendar();

  const today = new Date();
  const handleClick = () => setSelectedDate(today);

  return (
    <button
      className="flex size-14 flex-col items-start overflow-hidden rounded-lg border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-gilroy"
      onClick={handleClick}
    >
      <p className="flex h-6 w-full items-center justify-center bg-[#017EFA] text-center text-xs font-semibold text-white">
        {formatDate(today, "MMM").toUpperCase()}
      </p>
      <p className="flex w-full items-center justify-center text-lg font-bold text-[#081A51]">{today.getDate()}</p>
    </button>
  );
}
