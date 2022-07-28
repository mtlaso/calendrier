import React, { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";

import "./App.css";
import "./Styles/CalendarStyles.css";
import "./Styles/ModalStyles.css";

import { IDay } from "./Interfaces/IDay";
import { IEvent } from "./Interfaces/IEvent";
import { IWeekDays } from "./Interfaces/IWeekDays";

import Header from "./Components/Header";
import Calendar from "./Components/Calendar";
import AddEventModal from "./Components/AddEventModal";

import { LoadCalendar } from "./Helpers/LoadCalendar";

import { eventsState } from "./State/EventsState";

import { MAX_LENGTH_EVENT } from "./config";

function App() {
  const dt = useRef(new Date()); // Empêcher de 're-render' à chaque fois

  const [eventText, setEventText] = useState<string>("");
  const [showAddEventModal, setShowAddEventModal] = useState<"block" | "none">("none");
  const [dateOfEvent, setDateOfEvent] = useState<{
    year: number;
    month: number;
    date: number;
  } | null>(null);

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

  // Afficher modal
  const OpenAddEventModal = (year: number, month: number, date: number) => {
    setShowAddEventModal("block");
    setDateOfEvent({ year: year, month: month, date: date });
  };

  // Créer un évènement
  const CreateEvent = () => {
    // Valider texte
    if (eventText.trim().length > MAX_LENGTH_EVENT || eventText.trim().length <= 0) {
      alert(`Text length has to be less than ${MAX_LENGTH_EVENT} characters.`);
      return;
    }

    // Nouveau évènement à ajouter
    const newEvent: IEvent = {
      id: Math.random().toString(),
      date: `${dateOfEvent?.year}-${dateOfEvent?.month}-${dateOfEvent?.date}`,
      title: eventText.trim(),
      isCompleted: false,
    };

    setCalendarEvents([...calendarEvents, newEvent]); // Rafréchit automatiquement le calendrier grâce à "useRecoilState"

    // Effacer texte
    setEventText("");

    // Fermer AddEventModal
    setShowAddEventModal("none");
  };

  return (
    <>
      <AddEventModal display={showAddEventModal}>
        <div className="modal-content">
          <h1>Add event for {`${dateOfEvent?.month}/${dateOfEvent?.date}/${dateOfEvent?.year}`}</h1>
          <textarea
            name="text"
            placeholder="Add New Event"
            autoFocus
            maxLength={MAX_LENGTH_EVENT}
            onChange={(e) => {
              setEventText(e.target.value);
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

      <Header clickNext={ClickNext} clickBack={ClickBack} />

      {isLoading ? (
        <span>loading...</span>
      ) : (
        <Calendar
          dateDisplay={dateDisplay}
          paddingDays={paddingDays}
          days={days}
          onAddEvent={OpenAddEventModal}
          calendarEvents={calendarEvents}
        />
      )}
    </>
  );
}

export default App;
