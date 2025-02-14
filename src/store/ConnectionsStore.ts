import { atom, createStore } from "jotai/vanilla";
import type { Connection } from "@utils/types";
const store = createStore();
const connectionsAtom = atom<Connection[]>();

export const setConnectionsData = (connections: Connection[]) => {
  store.set(connectionsAtom, connections);
};
export const getConnectionsData = () => {
  return store.get(connectionsAtom);
};

export const subscribeConnectionsData = (
  callback: (connections?: Connection[]) => void,
) => {
  store.sub(connectionsAtom, () => {
    const connections = getConnectionsData();
    callback(connections);
  });
};
