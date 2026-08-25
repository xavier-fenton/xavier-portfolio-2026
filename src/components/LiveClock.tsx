"use client";

import { useEffect, useState } from "react";

function formatTime(timezone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).formatToParts(new Date());

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${get("hour")} : ${get("minute")} : ${get("second")} ${get("dayPeriod")}`;
}

export function LiveClock({
  timezone,
  label,
}: {
  timezone: string;
  label: string;
}) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(formatTime(timezone));
    const interval = setInterval(() => setTime(formatTime(timezone)), 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <p className="text-xs text-[color:var(--main-text)]">
      {label}, {time ?? "-- : -- : --"}
    </p>
  );
}
