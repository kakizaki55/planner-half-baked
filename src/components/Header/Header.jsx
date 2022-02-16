import { useEntries } from '../../context/PlannerContext';
import Entries from '../Planner/EntryList';
import styles from './Header.css';

export default function Header() {
  const { entries } = useEntries();

  return (
    <header className={styles.header}>
      <h2>My Planner</h2>
      <span>you have {entries.length} entries</span>
    </header>
  );
}
