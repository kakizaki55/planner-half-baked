import { useEntries } from '../../context/PlannerContext';
import Entries from '../Planner/EntryList';
import styles from './Header.css';

export default function Header() {
  const { entries } = useEntries();

  return (
    <header className={styles.header}>
      <h2>My Planner</h2>
      {/* TODO: Replace hard-coded count with the actual number of entries */}
      <span>you have {entries.length} entries</span>
    </header>
  );
}
