import Layout from "../components/Layout";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Calendar data for January 2026
const calendarWeeks = [
  [
    { day: 10, isCurrentMonth: true, hasBill: true },
    { day: 11, isCurrentMonth: true, hasBill: true },
    { day: 12, isCurrentMonth: true, hasBill: true },
    { day: 13, isCurrentMonth: true, hasBill: true },
    { day: 14, isCurrentMonth: true, hasBill: true },
    { day: 15, isCurrentMonth: true, hasBill: true },
    { day: 16, isCurrentMonth: true, hasBill: true, isHighlighted: true },
  ],
  [
    { day: 17, isCurrentMonth: true, hasBill: true },
    { day: 18, isCurrentMonth: true, hasBill: true },
    { day: 19, isCurrentMonth: true, hasBill: true },
    { day: 20, isCurrentMonth: true, hasBill: true },
    { day: 21, isCurrentMonth: true, hasBill: true },
    { day: 22, isCurrentMonth: true, hasBill: true },
    { day: 23, isCurrentMonth: true, hasBill: true, isHighlighted: true },
  ],
  [
    { day: 24, isCurrentMonth: true, hasBill: true },
    { day: 25, isCurrentMonth: true, hasBill: true },
    { day: 26, isCurrentMonth: true, hasBill: true },
    { day: 27, isCurrentMonth: true, hasBill: true },
    { day: 28, isCurrentMonth: true, hasBill: true },
    { day: 29, isCurrentMonth: true, hasBill: true },
    { day: 30, isCurrentMonth: true, hasBill: true },
  ],
  [
    { day: 31, isCurrentMonth: true, hasBill: true },
    { day: 1, isCurrentMonth: false, hasBill: false },
    { day: 2, isCurrentMonth: false, hasBill: false },
    { day: 3, isCurrentMonth: false, hasBill: false },
    { day: 4, isCurrentMonth: false, hasBill: false },
    { day: 5, isCurrentMonth: false, hasBill: false },
    { day: 6, isCurrentMonth: false, hasBill: false },
  ],
];

import CalendarClientPage from "./CalendarClientPage";

export default function UpcomingBills() {
  return (
    <Layout pageTitle="Upcoming bills">
      <div className="px-4 sm:px-8 lg:px-14 py-8 lg:py-14">
        <div className="max-w-[1200px] mx-auto">
          <CalendarClientPage />
        </div>
      </div>
    </Layout>
  );
}
