"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CalendarProvider } from "@/calendar/contexts/calendar-context";
import { ClientContainer } from "@/calendar/components/client-container";
import { getCalendarEvents } from "@/app/actions/expenses";
import type { IEvent } from "@/calendar/interfaces";
import type { TCalendarView } from "@/calendar/types";

function CalendarContent() {
    const searchParams = useSearchParams();
    const view = (searchParams.get("view") as TCalendarView) || "month";

    const [events, setEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEvents() {
            const data = await getCalendarEvents();
            // @ts-ignore - mapping result to IEvent
            setEvents(data);
            setLoading(false);
        }
        fetchEvents();
    }, []);

    if (loading) {
        return (
            <div className="flex h-[400px] items-center justify-center font-gilroy text-lg text-[#017EFA]">
                Loading Calendar...
            </div>
        );
    }

    return (
        <div className="font-gilroy">
            <CalendarProvider events={events}>
                <ClientContainer view={view} />
            </CalendarProvider>
        </div>
    );
}

export default function CalendarClientPage() {
    return (
        <Suspense fallback={<div className="flex h-[400px] items-center justify-center font-gilroy text-lg text-[#017EFA]">Loading...</div>}>
            <CalendarContent />
        </Suspense>
    );
}
