import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { parseDate } from '../utils/parseDate';

// payload is an entry object:
// { title: String, content: String, date: Date }
function entriesReducer(entries, { type, payload }) {
  console.log('payload', payload);
  switch (type) {
    case 'create':
      const entry = { ...payload, id: entries.length };
      const updatedEntries = [entry, ...entries];
      localStorage.setItem('ENTRIES', JSON.stringify(updatedEntries));
      return updatedEntries;
    case 'reset':
      return payload;
    case 'update':
      return entries.map((entry) =>
        entry.id === payload.id ? payload : entry
      );
    case 'delete':
      const deleted = entries.filter((entry) => entry.id !== payload.id);
      localStorage.setItem('ENTRIES', JSON.stringify(deleted));
      return deleted;
    default:
      throw Error(`Unknown action: ${type}`);
  }
}

export const PlannerContext = createContext();

const PlannerProvider = ({ children }) => {
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('ENTRIES'));

    dispatch({
      type: 'reset',
      payload: data || [],
    });
  }, []);

  const [entries, dispatch] = useReducer(entriesReducer, []);

  const addEntry = (entry) => {
    const payload = {
      ...entry,
      date: parseDate(entry.date),
    };
    dispatch({ type: 'create', payload });
    return payload;
  };

  const getEntry = (id) => {
    return entries.find((note) => note.id === Number(id));
  };

  const deleteEntry = (entry) => {
    const payload = {
      ...entry,
    };
    dispatch({ type: 'delete', payload });
  };

  return (
    <PlannerContext.Provider
      value={{
        entries,
        addEntry,
        getEntry,
        deleteEntry,
      }}
    >
      {children}
    </PlannerContext.Provider>
  );
};

const useEntries = () => {
  const context = useContext(PlannerContext);

  if (context === undefined) {
    throw new Error('useEntries must be used within a PlannerProvider');
  }

  return context;
};

export { PlannerProvider, useEntries };
