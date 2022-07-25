import React, { useState, useRef, useEffect } from "react";

import "./App.css";
import "./Styles/CalendarStyles.css";
import "./Styles/ModalStyles.css";

import Header from "./Components/Header";
import Calendar from "./Components/Calendar";
import AddEventModal from "./Components/AddEventModal";

import { LoadCalendar } from "./Helpers/LoadCalendar";
import { IDay } from "./Interfaces/IDay";

import { MAX_LENGTH_EVENT } from "./config";

function App() {
  const dt = useRef(new Date()); // Empêcher de 're-render' à chaque fois

  const [showAddEventModal, setShowAddEventModal] = useState<"block" | "none">(
    "none"
  );
  const [dateOfEvent, setDateOfEvent] = useState<{
    year: number;
    month: number;
    date: number;
  } | null>(null);
  const [eventText, setEventText] = useState<String>("");

  const [days, setDays] = useState<IDay[]>([]);
  const [paddingDays, setPaddingDays] = useState<string[]>([]);
  const [dateDisplay, setDateDisplay] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [nav, setNav] = useState({
    month: dt.current.getMonth(),
    year: dt.current.getFullYear(),
  });

  useEffect(() => {
    setIsLoading(true);
    const [_paddingDays, _days, _dateDisplay] = LoadCalendar(nav);

    setPaddingDays(_paddingDays as string[]);
    setDays(_days as IDay[]);
    setDateDisplay(_dateDisplay as string);

    setIsLoading(false);
  }, [nav]);

  const ClickNext = () => {
    if (nav.month === 11) {
      setNav({ month: 0, year: nav.year + 1 });
    } else {
      setNav({ month: nav.month + 1, year: nav.year });
    }
  };

  const ClickBack = () => {
    if (nav.month === 0) {
      setNav({ month: 11, year: nav.year - 1 });
    } else {
      setNav({ month: nav.month - 1, year: nav.year });
    }
  };

  const OpenAddEventModal = (year: number, month: number, date: number) => {
    // Afficher modal
    setShowAddEventModal("block");
    setDateOfEvent({ year: year, month: month, date: date });
  };

  const CreateEvent = () => {
    // Valider texte
    if (
      eventText.trim().length > MAX_LENGTH_EVENT ||
      eventText.trim().length <= 0
    ) {
      alert(`Text length has to be less than ${MAX_LENGTH_EVENT} characters.`);
      return;
    }

    // Ajouter evènement
    // Ajouter even dans la db...

    // Rafréchir le calendrier

    // Fermer modal
    setShowAddEventModal("none");
  };

  return (
    <>
      <AddEventModal display={showAddEventModal}>
        <div className="modal-content">
          <h1>
            Add event for{" "}
            {`${dateOfEvent?.month}/${dateOfEvent?.date}/${dateOfEvent?.year}`}
          </h1>
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
            onClick={() => {
              setShowAddEventModal("none");
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              CreateEvent();
            }}
          >
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
        />
      )}
    </>
  );
}

export default App;
