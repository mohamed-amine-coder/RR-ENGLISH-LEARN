import React from 'react';
import { FaSearch, FaSyncAlt } from 'react-icons/fa';
import styles from '../AdminPanel.module.css';

function AdminToolbar({ searchTerm, onSearchChange, onRefresh }) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.searchBox}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="ابحث عن مشترك..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <button className={styles.refreshBtn} onClick={onRefresh}>
        <FaSyncAlt /> تحديث
      </button>
    </div>
  );
}

export default AdminToolbar;
