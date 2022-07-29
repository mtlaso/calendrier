import React, { useState, useRef, useEffect } from "react";
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

import { LoadCalendar } from "./Helpers/load-calendar";

import { eventsState } from "./State/event-state";

import { MAX_LENGTH_EVENT } from "./config";

function App() {
  const dt = useRef(new Date()); // Empêcher de 're-render' à chaque fois

  const [showAddEventModal, setShowAddEventModal] = useState<"block" | "none">("none");
  const [addModalText, setAddModalText] = useState<string>("");
  const [dateOfEvent, setDateOfEvent] = useState<{
    year: number;
    month: number;
    date: number;
  } | null>(null);

  const [showUpdateEventModal, setShowUpdateEventModal] = useState<"block" | "none">("none");
  const [updateModalText, setUpdateModalText] = useState<string>("");
  const [eventIdToUpdate, setEventIdToUpdate] = useState<string | null>(null);

  const [days, setDays] = useState<IDay[]>([]);
  const [paddingDays, setPaddingDays] = useState<IWeekDays[]>([]);
  const [dateDisplay, setDateDisplay] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [nav, setNav] = useState({
    // Utilisé dans "LoadCalendar" pour gérer le changement de mois/année
    month: dt.current.getMonth(),
    year: dt.current.getFullYear(),
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
      date: `${dateOfEvent?.year}-${dateOfEvent?.month}-${dateOfEvent?.date}`,
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

  // Afficher modal UpdateEventModal
  const OpenUpdateEventModal = (eventId: string) => {
    // Trouver évènement à modifier
    const event = calendarEvents.find((event) => event.id === eventId);

    // Afficher texte
    setUpdateModalText(event?.title!);

    alert(`event : ${JSON.stringify(event)}`);

    // Sauvegarder id de l'évènement à modifier
    setEventIdToUpdate(eventId);

    // Afficher update modal
    setShowUpdateEventModal("block");

    // TODO : Ajouter DeleteEventModal
    // TODO : Pouvoir bouger les Modals
    // TODO : Ajouter tutoriel
    // TODO : Filmer un gif du projet
    // TODO : CSS prefix
    // TODO : Host le projet
  };

  // Modifier un évènement
  const UpdateEvent = () => {
    // Valider texte
    if (updateModalText.trim().length > MAX_LENGTH_EVENT || updateModalText.trim().length <= 0) {
      alert(`Text length has to be less than ${MAX_LENGTH_EVENT} characters.`);
      return;
    }

    // Trouver évènement à modifier
    let event = calendarEvents.find((event) => event.id === eventIdToUpdate) as IEvent;
    const index = calendarEvents.findIndex((event) => event.id === eventIdToUpdate);

    event = {
      ...event,
      title: updateModalText.trim(),
    };

    // Modifier l'évènement. Calendrier est rafréchit automatiquement grâce à "useRecoilState"
    setCalendarEvents([...calendarEvents.slice(0, index), event, ...calendarEvents.slice(index + 1)]);

    // Effacer texte
    setUpdateModalText("");

    // Effacer id de l'évènement à modifier
    setEventIdToUpdate(null);

    // Fermer UpdateEventModal
    setShowUpdateEventModal("none");
  };
  return (
    <>
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

      <Header clickNext={ClickNext} clickBack={ClickBack} />

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
