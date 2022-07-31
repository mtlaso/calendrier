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
 * @param {Function} onAddEvent Fonction exécutée pour l'ajout d'un évènement
 * @param {Function} onUpdateEvent Fonction exécutée pour modifier un évènement
 * @param {Function} onDeleteEvent Fonction exécutée pour supprimer un évènement
 *
 */
/** */
const Calendar = ({
  dateDisplay,
  paddingDays,
  days,
  calendarEvents,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
}: ICalendar) => {
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
        /**
         * Créer élément (day) qui sera affiché dans le calendrier
         * @param id id de la div
         * @returns L'élément div
         */
        const CreateDivElement = (id: string) => {
          const dt = new Date();

          // Créer élément
          const div = document.createElement("div");

          // Définir son id
          div.id = `container-column-${day.date}`;

          // Trouver si le ce jour est le jour actuel
          if (day.isCurrentDay && day.month === dt.getMonth()) {
            div.classList.add("container-column-box");
            div.classList.add("current-day");
          } else {
            div.classList.add("container-column-box");
          }

          return div;
        };

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
            const div = CreateDivElement(`container-column-${day.date}`);

            div.ondblclick = () => onAddEvent(day.year, day.month, day.date);
            div.appendChild(document.createTextNode(day.date.toString()));

            document.getElementById(`container-column-sun`)?.appendChild(div);
            break;

          case "Monday":
            const div1 = CreateDivElement(`container-column-${day.date}`);

            div1.appendChild(document.createTextNode(day.date.toString()));
            div1.ondblclick = () => onAddEvent(day.year, day.month, day.date);

            document.getElementById(`container-column-mon`)?.appendChild(div1);
            break;
          case "Tuesday":
            const div2 = CreateDivElement(`container-column-${day.date}`);
            div2.appendChild(document.createTextNode(day.date.toString()));
            div2.ondblclick = () => onAddEvent(day.year, day.month, day.date);

            document.getElementById("container-column-tue")?.appendChild(div2);
            break;
          case "Wednesday":
            const div3 = CreateDivElement(`container-column-${day.date}`);
            div3.appendChild(document.createTextNode(day.date.toString()));
            div3.ondblclick = () => onAddEvent(day.year, day.month, day.date);

            document.getElementById(`container-column-wed`)?.appendChild(div3);
            break;
          case "Thursday":
            const div4 = CreateDivElement(`container-column-${day.date}`);
            div4.appendChild(document.createTextNode(day.date.toString()));
            div4.ondblclick = () => onAddEvent(day.year, day.month, day.date);

            document.getElementById("container-column-thu")?.appendChild(div4);
            break;
          case "Friday":
            const div5 = CreateDivElement(`container-column-${day.date}`);
            div5.appendChild(document.createTextNode(day.date.toString()));
            div5.ondblclick = () => onAddEvent(day.year, day.month, day.date);

            document.getElementById("container-column-fri")?.appendChild(div5);
            break;
          case "Saturday":
            const div6 = CreateDivElement(`container-column-${day.date}`);
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
        const currentMonth = days[10].month; // Mois actuel
        const currentEventMonth = event.date.split("-")[1]; // Mois de l'évènement
        const currentEventDay = event.date.split("-")[2]; // Jour de l'évènement

        /**
         * Retourne le titre abrégé d'un évènement
         * @param title Titre de l'évènement
         * @returns Le titre de l'évènement abrégé
         */
        const SmallTitle = (title: string) => {
          if (title.trim().length > 50) {
            return `${event.title.slice(0, 30)}...`;
          } else {
            return event.title;
          }
        };

        // Afficher évènement sur le calendrier si le mois de l'évènement correspond au mois où nous sommes
        if (Number(currentEventMonth) === currentMonth) {
          const box = document.getElementById(`container-column-${currentEventDay}`);

          // Créer évènement
          const div = document.createElement("div");
          div.innerText = SmallTitle(event.title);
          div.classList.add("calendar-event");
          div.onclick = () => onUpdateEvent(event.id); // Onclick pour modifier l'évènement
          div.addEventListener("contextmenu", (e) => {
            // Right click pour supprimer l'évènement
            e.preventDefault();
            onDeleteEvent(event.id);
          });

          // Afficher évènement
          box?.appendChild(div);
        }
      })}
    </>
  );
};

export default Calendar;
