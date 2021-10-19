import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";

const Calendar = () => {
  return (
    <FullCalendar
      height={650}
      header={{
        left: "prev,next",
        center: "title",
        right: "dayGridDay,dayGridWeek,dayGridMonth",
      }}
      //   businessHours={{ startTime: "08:00", endTime: "19:00" }}
      eventTimeFormat={{
        hour: "numeric",
        minute: "2-digit",
        meridiem: false,
      }}
      displayEventTime={true}
      //   hiddenDays={[0]}
      firstDay={1}
      plugins={[timeGridPlugin]}
      initialView="timeGridWeek"
      timeFormat={"H(:mm)"}
      slotMinTime={"08:00:00"}
      slotMaxTime={"19:30:00"}
      allDaySlot={false}
      nowIndicator
    />
  );
};

export default Calendar;
