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
import DeleteEventModal from "./Components/DeleteEventModal";
import GuideModal from "./Components/GuideModal";

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

  const [showDeleteEventModal, setShowDeleteEventModal] = useState<"block" | "none">("none");
  const [deleteModalText, setDeleteModalText] = useState<string>("");
  const [eventIdToDelete, setEventIdToDelete] = useState<string | null>(null);

  const [showInfoModal, setShowInfoModal] = useState<"flex" | "none">("none");

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

    // Sauvegarder id de l'évènement à modifier
    setEventIdToUpdate(eventId);

    // Afficher update modal
    setShowUpdateEventModal("block");
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

  // Afficher modal DeleteEventModal
  const OpenDeleteEventModal = (eventId: string) => {
    // Trouver évènement à supprimer
    const event = calendarEvents.find((event) => event.id === eventId);

    // Afficher texte
    setDeleteModalText(event?.title!);

    // Sauvegarder id de l'évènement à supprimer
    setEventIdToDelete(eventId);

    // Afficher delete modal
    setShowDeleteEventModal("block");
  };

  // Supprimer un évènement
  const DeleteEvent = () => {
    // Trouver évènement à supprimer
    const index = calendarEvents.findIndex((event) => event.id === eventIdToDelete);

    // Supprimer l'évènement. Calendrier est rafréchit automatiquement grâce à "useRecoilState"
    setCalendarEvents([...calendarEvents.slice(0, index), ...calendarEvents.slice(index + 1)]);

    // Effacer texte
    setDeleteModalText("");

    // Effacer id de l'évènement à supprimer
    setEventIdToDelete(null);

    // Fermer DeleteEventModal
    setShowDeleteEventModal("none");
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

      <DeleteEventModal display={showDeleteEventModal}>
        <div className="modal-content">
          <h1>Delete event</h1>
          <p>Are you sure you want to delete this event?</p>
          <p>Title : {deleteModalText}</p>
        </div>
        <hr />
        <div className="modal-buttons">
          <button
            className="button-cancel"
            onClick={() => {
              setShowDeleteEventModal("none");
            }}>
            Cancel
          </button>
          <button onClick={() => DeleteEvent()}>OK</button>
        </div>
      </DeleteEventModal>

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
                To <code>delete</code> an event, right click or long press on mobile phones on any given event (in
                blue).
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

      <Header
        clickNext={ClickNext}
        clickBack={ClickBack}
        showInfoModal={() => {
          setShowInfoModal("flex");
        }}
      />

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
          onDeleteEvent={OpenDeleteEventModal}
        />
      )}
    </>
  );
}

export default App;

// TODO : Host le projet
