import { atom } from "recoil";
import { IEvent } from "../Interfaces/IEvent";

const localStorageEffect =
  (key: string) =>
  ({
    setSelf,
    onSet,
  }: {
    setSelf: (value: any) => void;
    onSet: (callback: (...args: any) => void) => void;
  }) => {
    const savedValue = localStorage.getItem(key);

    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const eventsState = atom<IEvent[]>({
  key: "eventsState",
  default: [],
  effects: [localStorageEffect("user_events")],
});
