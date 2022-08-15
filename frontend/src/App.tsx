import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

import "./Styles/calendar-styles.css";
import "./Styles/modal-styles.css";

import { IDay } from "./Interfaces/IDay";
import { IEvent } from "./Interfaces/IEvent";
import { IWeekDays } from "./Interfaces/IWeekDays";

import Header from "./Components/Header";
import Calendar from "./Components/Calendar";
import AddEventModal from "./Components/AddEventModal";
import UpdateEventModal from "./Components/UpdateEventModal";
import GuideModal from "./Components/GuideModal";

import { LoadCalendar } from "./Helpers/load-calendar";
import { DateToMonthName } from "./Helpers/date-to-month-name";

import { eventsState } from "./State/event-state";

import { MAX_LENGTH_EVENT } from "./config";

function App() {
  const dt = new Date();

  const [showAddEventModal, setShowAddEventModal] = useState<"block" | "none">("none");
  const [addModalText, setAddModalText] = useState<string>("");
  const [dateOfEvent, setDateOfEvent] = useState<{
    year: number;
    month: number;
    date: number;
  } | null>(null);

  const [showUpdateEventModal, setShowUpdateEventModal] = useState<"block" | "none">("none");
  const [updateModal, setUpdateModal] = useState<IEvent | null>(null);
  const [updateModalText, setUpdateModalText] = useState<string>("");

  const [showInfoModal, setShowInfoModal] = useState<"flex" | "none">("none");

  const [days, setDays] = useState<IDay[]>([]);
  const [paddingDays, setPaddingDays] = useState<IWeekDays[]>([]);
  const [dateDisplay, setDateDisplay] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [nav, setNav] = useState({
    // Utilisé dans "LoadCalendar" pour gérer le changement de mois/année
    month: dt.getMonth(),
    year: dt.getFullYear(),
  });

  // Charger les événements du calendrier (Recoil Js)
  const [calendarEvents, setCalendarEvents] = useRecoilState(eventsState);

  // Charger le calendrier
  useEffect(() => {
    setIsLoading(true);
    const [_paddingDays, _days, _dateDisplay] = LoadCalendar(nav);

    setPaddingDays(_paddingDays as IWeekDays[]);
    setDays(_days as IDay[]);
    setDateDisplay(_dateDisplay as string);

    setIsLoading(false);
  }, [nav]);

  // Changer de mois (avancer)
  const ClickNext = () => {
    if (nav.month === 11) {
      setNav({ month: 0, year: nav.year + 1 });
    } else {
      setNav({ month: nav.month + 1, year: nav.year });
    }
  };

  // Changer de mois (reculer)
  const ClickBack = () => {
    if (nav.month === 0) {
      setNav({ month: 11, year: nav.year - 1 });
    } else {
      setNav({ month: nav.month - 1, year: nav.year });
    }
  };

  // Afficher modal AddEventModal
  const OpenAddEventModal = (year: number, month: number, date: number) => {
    // Mettre à jour la date de l'événement
    setDateOfEvent({ year: year, month: month, date: date });

    // Afficher modal AddEventModal
    setShowAddEventModal("block");
  };

  // Afficher modal UpdateEventModal
  const OpenUpdateEventModal = (event: IEvent) => {
    // Afficher texte
    setUpdateModal(event);

    // Texte du modal
    setUpdateModalText(event.title);

    // Afficher update modal
    setShowUpdateEventModal("block");
  };

  // Créer un évènement
  const CreateEvent = () => {
    // Valider texte
    if (addModalText.trim().length > MAX_LENGTH_EVENT || addModalText.trim().length <= 0) {
      alert(`Text length has to be less than ${MAX_LENGTH_EVENT} characters.`);
      return;
    }

    // Nouveau évènement à ajouter
    const newEvent: IEvent = {
      id: Math.random().toString(),
      createdAtDate: dt.getDate().toString(),
      createdAtMonth: dt.getMonth().toString(),
      createdAtYear: dt.getFullYear().toString(),
      createdForDate: dateOfEvent?.date.toString()!,
      createdForMonth: dateOfEvent?.month.toString()!,
      createdForYear: dateOfEvent?.year.toString()!,
      title: addModalText.trim(),
      isCompleted: false,
    };

    // Sauvegarder nouveau évènement
    setCalendarEvents([...calendarEvents, newEvent]); // Rafréchit automatiquement le calendrier grâce à "useRecoilState"

    // Effacer texte
    setAddModalText("");

    // Fermer AddEventModal
    setShowAddEventModal("none");
  };

  // Modifier un évènement
  const UpdateEvent = () => {
    // Valider texte
    if (updateModalText?.trim().length! > MAX_LENGTH_EVENT || updateModalText?.trim().length! <= 0) {
      alert(`Text length has to be less than ${MAX_LENGTH_EVENT} characters.`);
      return;
    }

    // Trouver l'index de l'évènement à modifier
    const index = calendarEvents.findIndex((event) => event.id === updateModal?.id);

    // Évènement modifié
    const updatedEvent = {
      ...updateModal!,
      title: updateModalText?.trim()!,
    };

    // Modifier l'évènement. Calendrier est rafréchit automatiquement grâce à "useRecoilState"
    setCalendarEvents([
      ...calendarEvents.slice(0, Number(index)),
      updatedEvent,
      ...calendarEvents.slice(Number(index) + 1),
    ]);

    // Effacer modal
    setUpdateModal(null);

    // Effacer texte
    setUpdateModalText("");

    // Fermer UpdateEventModal
    setShowUpdateEventModal("none");
  };

  // Supprimer un évènement
  const DeleteEvent = () => {
    // Trouver évènement à supprimer
    const index = calendarEvents.findIndex((event) => event.id === updateModal?.id);

    // Supprimer l'évènement. Calendrier est rafréchit automatiquement grâce à "useRecoilState"
    setCalendarEvents([...calendarEvents.slice(0, index), ...calendarEvents.slice(index + 1)]);
  };

  return (
    <>
      <Header
        clickNext={ClickNext}
        clickBack={ClickBack}
        showInfoModal={() => {
          setShowInfoModal("flex");
        }}
      />

      <AddEventModal display={showAddEventModal}>
        <div className="modal-content">
          <h1>Add event for {`${dateOfEvent?.month}/${dateOfEvent?.date}/${dateOfEvent?.year}`}</h1>
          <textarea
            value={addModalText}
            placeholder="Add New Event"
            autoFocus
            maxLength={MAX_LENGTH_EVENT}
            onChange={(e) => {
              setAddModalText(e.target.value);
            }}
          />
        </div>
        <hr />
        <div className="modal-buttons">
          <button
            className="button-cancel"
            onClick={() => {
              setShowAddEventModal("none");
            }}>
            Cancel
          </button>
          <button
            onClick={() => {
              CreateEvent();
            }}>
            OK
          </button>
        </div>
      </AddEventModal>

      <UpdateEventModal display={showUpdateEventModal}>
        <div className="modal-content">
          <h1>Update event</h1>
          <p>
            Event created on {DateToMonthName(Number(updateModal?.createdForMonth))}, {updateModal?.createdForDate}{" "}
            {updateModal?.createdForYear}
          </p>

          <textarea
            value={updateModalText}
            placeholder={updateModalText}
            autoFocus
            maxLength={MAX_LENGTH_EVENT}
            onChange={(e) => {
              setUpdateModalText(e.target.value);
            }}
          />
        </div>
        <hr />
        <div className="modal-buttons">
          <button
            className="button-delete"
            onClick={(e) => {
              if (window.confirm("Are you sure you want to delete this event?")) {
                DeleteEvent();
                setShowUpdateEventModal("none");
              }
            }}>
            Delete
          </button>
          <button
            className="button-cancel"
            onClick={() => {
              setShowUpdateEventModal("none");
            }}>
            Cancel
          </button>
          <button
            onClick={() => {
              UpdateEvent();
            }}>
            OK
          </button>
        </div>
      </UpdateEventModal>

      <GuideModal display={showInfoModal}>
        <div className="modal-content">
          <h1>Guide</h1>

          <h2>1. Navigation</h2>
          <ul style={{ listStyle: "none" }}>
            <li>
              <p>
                Press <code>next</code> button to go to the next month.
              </p>
            </li>
            <li>
              <p>
                Press <code>back</code> button to go to the previous month.
              </p>
            </li>
          </ul>

          <h2>2. Events</h2>
          <ul style={{ listStyle: "none" }}>
            <li>
              <p>
                To <code>add</code> an event, double click on any given day.
              </p>
            </li>
            <li>
              <p>
                To <code>update</code> an event, click on any given event (in blue).
              </p>
            </li>
            <li>
              <p>
                To <code>delete</code> an event, click on any given event (in blue) and click the <code>delete</code>{" "}
                button.
              </p>
            </li>
          </ul>

          <h2>3. Guide</h2>
          <p>
            To show this guide, press the <code>info</code> button on top of the page.
          </p>

          <h2>4. Source code</h2>
          <p>
            Find the source code on{" "}
            <a href="https://github.com/euuuuh/calendar" rel="noreferrer" target={"_blank"}>
              GitHub
            </a>
            . Thank you!
          </p>
        </div>
        <hr />
        <div className="modal-buttons">
          <button
            className="button-cancel"
            onClick={() => {
              setShowInfoModal("none");
            }}>
            Close
          </button>
        </div>
      </GuideModal>

      {isLoading ? (
        <span>loading...</span>
      ) : (
        <Calendar
          dateDisplay={dateDisplay}
          paddingDays={paddingDays}
          days={days}
          calendarEvents={calendarEvents}
          onAddEvent={OpenAddEventModal}
          onUpdateEvent={OpenUpdateEventModal}
        />
      )}
    </>
  );
}

export default App;
