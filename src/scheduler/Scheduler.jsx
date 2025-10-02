import React, { useEffect, useState } from "react";
import { DayPilot, DayPilotScheduler } from "@daypilot/daypilot-lite-react";

const Scheduler = () => {
  const [scheduler, setScheduler] = useState(null);
  const [resources, setResources] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setResources([
      { name: "Resource A", id: "A" },
      { name: "Resource B", id: "B" },
      { name: "Resource C", id: "C" },
      { name: "Resource D", id: "D" },
      { name: "Resource E", id: "E" },
      { name: "Resource F", id: "F" },
      { name: "Resource G", id: "G" },
    ]);

    setEvents([
      {
        id: 1,
        text: "Event 1",
        start: "2026-09-07T00:00:00",
        end: "2026-09-10T00:00:00",
        resource: "A",
      },
      {
        id: 2,
        text: "Event 2",
        start: "2026-09-08T00:00:00",
        end: "2026-09-11T00:00:00",
        resource: "C",
        barColor: "#38761d",
        barBackColor: "#93c47d",
      },
      {
        id: 3,
        text: "Event 3",
        start: "2026-09-07T00:00:00",
        end: "2026-09-12T00:00:00",
        resource: "D",
        barColor: "#f1c232",
        barBackColor: "#f1c232",
      },
      {
        id: 4,
        text: "Event 3",
        start: "2026-09-08T00:00:00",
        end: "2026-09-12T00:00:00",
        resource: "E",
        barColor: "#cc0000",
        barBackColor: "#ea9999",
      },
    ]);
    setEvents([]);
  }, []);


  const onTimeRangeSelected = async (args) => {
    const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
    scheduler.clearSelection();
    if (modal.canceled) return;
    scheduler.events.add({
      start: args.start,
      end: args.end,
      id: DayPilot.guid(),
      resource: args.resource,
      text: modal.result,
    });
  };

  const onBeforeCellDomAdd = (args) => {
    const dayOfWeek = args.cell.start.getDayOfWeek();
    const weekend = dayOfWeek === 0 || dayOfWeek === 6;
    const color = weekend ? "#cc412533" : "#93c47d33";
    if (weekend) {
      const barStyle = {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: "6px",
        backgroundColor: color,
      };
      const xStyle = {
        color: color,
        fontSize: "14px",
        position: "absolute",
        textAlign: "center",
        top: 15,
        left: 0,
        right: 0,
      };
      args.element = (
        <div>
          <div style={barStyle}></div>
          <div style={xStyle}>&#10006;</div>
        </div>
      );
    }
  };

  return (
    <div>
      <DayPilotScheduler
        controlRef={setScheduler}
        timeHeaders={[{ groupBy: "Month" }, { groupBy: "Day", format: "d" }]}
        scale="Day"
        days={30}
        startDate="2026-09-01"
        rowMarginBottom={5}
        onTimeRangeSelected={onTimeRangeSelected}
        onBeforeCellRender={onBeforeCellRender}
        onBeforeCellDomAdd={onBeforeCellDomAdd}
        resources={resources}
        events={events}
      />
    </div>
  );
};

export default Scheduler;
