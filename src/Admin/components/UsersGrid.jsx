import React from 'react';
import styles from '../AdminPanel.module.css';
import UserCard from './UserCard';
import { getDaysLeft } from '../utils/adminUsers';

function UsersGrid({ users, onDelete, onFieldChange, onFieldBlur, onQuickRenew }) {
  return (
    <div className={styles.cardsGrid}>
      {users.map((user) => {
        const daysLeft = getDaysLeft(user.subscriptionEndDate);
        const isActive = user.role === 'premium' && daysLeft >= 0;

        return (
          <UserCard
            key={user.id}
            user={user}
            daysLeft={daysLeft}
            isActive={isActive}
            onDelete={onDelete}
            onFieldChange={onFieldChange}
            onFieldBlur={onFieldBlur}
            onQuickRenew={onQuickRenew}
          />
        );
      })}
    </div>
  );
}

export default UsersGrid;
