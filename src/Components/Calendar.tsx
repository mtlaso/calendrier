import React from "react";

import {
  CreateFridayStructure,
  CreateMondayStructure,
  CreateSaturdayStructure,
  CreateSundayStructure,
  CreateThursdayStructure,
  CreateTuesdayStructure,
  CreateWednesayStructure,
} from "../Helpers/create-days-structure";

import { ICalendar } from "../Interfaces/ICalendar";

/**
 * Afficher (render) le calendrier
 *
 * @param {string} dateDisplay La date à afficher sur le header (ex: July 2022)
 * @param {IWeekDays[]} paddingDays Liste des jours avant le premier du mois (les cases vides sur le calendrier)
 * @param {IDay[]} days Liste des jours dans un mois donné
 * @param {IEvent[]} calendarEvents Évènements de calendrier de l'utilisateur
 * @param {Function} onAddEvent Fonction exécuté pour l'ajout d'un évènemnt
 * @param {Function} onUpdateEvent Fonction exécuté pour modifier un évènemnt
 */
/** */
const Calendar = ({ dateDisplay, paddingDays, days, calendarEvents, onAddEvent, onUpdateEvent }: ICalendar) => {
  return (
    <>
      {/* Créer le conteneur du calendrier */}
      {(() => {
        // Éffacer l'ancien calendrier si il existe
        document.getElementById("container")?.remove();

        // Créer le squelette de la page
        const div = document.createElement("div");
        div.classList.add("container");
        div.id = "container";
        document.getElementById("root")?.appendChild(div);

        // Initialiser la date "dateDisplay" dans le header
        const headerDate = document.getElementById("header-date");
        if (headerDate) {
          headerDate.textContent = dateDisplay;
        }
      })()}

      {/* Afficher les jours sur le calendrier  */}
      {days.forEach((day, index) => {
        // Créer les colonnes Sunday, Monday, Tuesday, etc.
        if (index === 0) {
          CreateSundayStructure();
          CreateMondayStructure();
          CreateTuesdayStructure();
          CreateWednesayStructure();
          CreateThursdayStructure();
          CreateFridayStructure();
          CreateSaturdayStructure();

          // Afficher les padding days (les cases vides)
          for (let i = 0; i < paddingDays.length; i++) {
            // alert(EWeekDays[paddingDays[i]]);
            // let day = paddingDays[i];
            const day = paddingDays[i].slice(0, 3).toLocaleLowerCase(); // Trouver les 3 premières lettres du jours (en anglais)

            // Créer le padding day
            const div = document.createElement("div");
            div.classList.add("container-column-box-empty");

            // Ajouter le padding day (boite vide) à la bonne colonne
            document.getElementById(`container-column-${day}`)?.appendChild(div);
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
            div.ondblclick = () => onAddEvent(day.year, day.month, day.date);
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
            div1.ondblclick = () => onAddEvent(day.year, day.month, day.date);

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
            div2.ondblclick = () => onAddEvent(day.year, day.month, day.date);

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
            div3.ondblclick = () => onAddEvent(day.year, day.month, day.date);

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
            div4.ondblclick = () => onAddEvent(day.year, day.month, day.date);

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
            div5.ondblclick = () => onAddEvent(day.year, day.month, day.date);

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
            div6.ondblclick = () => onAddEvent(day.year, day.month, day.date);

            document.getElementById("container-column-sat")?.appendChild(div6);
            break;
          default:
            break;
        }
      })}

      {/* Afficher les évènements sur le calendrier */}
      {calendarEvents.forEach((event, index) => {
        // Trouver le mois où nous sommes
        // L'index 10 doit normalement toujours exister car il y a au minimum 28 jours d'un un mois
        const currentMonth = days[10].month;
        const currentEventMonth = event.date.split("-")[1];
        const currentEventDay = event.date.split("-")[2];

        // Retourne le titre abrégé d'un évènement
        const SmallTitle = (title: string) => {
          if (title.trim().length > 50) {
            return `${event.title.slice(0, 30)}...`;
          } else {
            return event.title;
          }
        };

        // Afficher évènement sur le calendrier
        if (Number(currentEventMonth) === currentMonth) {
          const box = document.getElementById(`container-column-${currentEventDay}`);

          // Créer évènement
          const div = document.createElement("div");
          div.innerText = SmallTitle(event.title);
          div.classList.add("calendar-event");
          div.onclick = () => onUpdateEvent(event.id);

          // Afficher évènement
          box?.appendChild(div);
        }
      })}
    </>
  );
};

export default Calendar;
