import React from "react";

import {
  CreateFridayStructure,
  CreateMondayStructure,
  CreateSaturdayStructure,
  CreateSundayStructure,
  CreateThursdayStructure,
  CreateTuesdayStructure,
  CreateWednesayStructure,
} from "../Helpers/CreateDaysStructures";
import { ICalendar } from "../Interfaces/ICalendar";

const Calendar = ({
  dateDisplay,
  paddingDays,
  days,
  onAddEvent,
}: ICalendar) => {
  return (
    <>
      {(() => {
        // Éffacer ancien calendrier si il existe
        document.getElementById("container")?.remove();

        // Créer le squelette de la page
        const div = document.createElement("div");
        div.classList.add("container");
        div.id = "container";
        document.getElementById("root")?.appendChild(div);

        // Initialiser la date (header)
        const headerDate = document.getElementById("header-date");
        if (headerDate) {
          headerDate.textContent = dateDisplay;
        }
      })()}

      {days.map((day, index) => {
        if (index === 0) {
          CreateSundayStructure();
          CreateMondayStructure();
          CreateTuesdayStructure();
          CreateWednesayStructure();
          CreateThursdayStructure();
          CreateFridayStructure();
          CreateSaturdayStructure();

          // Afficher les padding days (gris)
          for (let i = 0; i < paddingDays.length; i++) {
            let dayToPad = paddingDays[i];
            dayToPad = dayToPad.slice(0, 3).toLocaleLowerCase();

            const div = document.createElement("div");
            div.classList.add("container-column-box-empty");
            document
              .getElementById(`container-column-${dayToPad}`)
              ?.appendChild(div);
          }
        }

        // Afficher les dates
        switch (day.dayName) {
          case "Sunday":
            const div = document.createElement("div");
            div.id = `container-column-${day.date}`;
            if (day.isCurrentDay) {
              div.classList.add("container-column-box");
              div.classList.add("current-day");
            } else {
              div.classList.add("container-column-box");
            }
            div.onclick = () => onAddEvent(day.year, day.month, day.date);
            div.appendChild(document.createTextNode(day.date.toString()));

            document.getElementById(`container-column-sun`)?.appendChild(div);
            break;
          case "Monday":
            const div1 = document.createElement("div");
            div1.id = `container-column-${day.date}`;
            if (day.isCurrentDay) {
              div1.classList.add("container-column-box");
              div1.classList.add("current-day");
            } else {
              div1.classList.add("container-column-box");
            }
            div1.appendChild(document.createTextNode(day.date.toString()));
            div1.onclick = () => onAddEvent(day.year, day.month, day.date);

            document.getElementById(`container-column-mon`)?.appendChild(div1);
            break;
          case "Tuesday":
            const div2 = document.createElement("div");
            div2.id = `container-column-${day.date}`;
            if (day.isCurrentDay) {
              div2.classList.add("container-column-box");
              div2.classList.add("current-day");
            } else {
              div2.classList.add("container-column-box");
            }
            div2.appendChild(document.createTextNode(day.date.toString()));
            div2.onclick = () => onAddEvent(day.year, day.month, day.date);

            document.getElementById("container-column-tue")?.appendChild(div2);
            break;
          case "Wednesday":
            const div3 = document.createElement("div");
            div3.id = `container-column-${day.date}`;
            if (day.isCurrentDay) {
              div3.classList.add("container-column-box");
              div3.classList.add("current-day");
            } else {
              div3.classList.add("container-column-box");
            }
            div3.appendChild(document.createTextNode(day.date.toString()));
            div3.onclick = () => onAddEvent(day.year, day.month, day.date);

            document.getElementById(`container-column-wed`)?.appendChild(div3);
            break;
          case "Thursday":
            const div4 = document.createElement("div");
            div4.id = `container-column-${day.date}`;
            if (day.isCurrentDay) {
              div4.classList.add("container-column-box");
              div4.classList.add("current-day");
            } else {
              div4.classList.add("container-column-box");
            }
            div4.appendChild(document.createTextNode(day.date.toString()));
            div4.onclick = () => onAddEvent(day.year, day.month, day.date);

            document.getElementById("container-column-thu")?.appendChild(div4);
            break;
          case "Friday":
            const div5 = document.createElement("div");
            div5.id = `container-column-${day.date}`;
            if (day.isCurrentDay) {
              div5.classList.add("container-column-box");
              div5.classList.add("current-day");
            } else {
              div5.classList.add("container-column-box");
            }
            div5.appendChild(document.createTextNode(day.date.toString()));
            div5.onclick = () => onAddEvent(day.year, day.month, day.date);

            document.getElementById("container-column-fri")?.appendChild(div5);
            break;
          case "Saturday":
            const div6 = document.createElement("div");
            div6.id = `container-column-${day.date}`;
            if (day.isCurrentDay) {
              div6.classList.add("container-column-box");
              div6.classList.add("current-day");
            } else {
              div6.classList.add("container-column-box");
            }
            div6.appendChild(document.createTextNode(day.date.toString()));
            div6.onclick = () => onAddEvent(day.year, day.month, day.date);

            document.getElementById("container-column-sat")?.appendChild(div6);
            break;
          default:
            break;
        }
      })}
    </>
  );
};

export default Calendar;
