import React from 'react';
import {
  FaCalendarCheck,
  FaLayerGroup,
  FaMars,
  FaPhone,
  FaTrash,
  FaVenus,
  FaWhatsapp,
} from 'react-icons/fa';
import styles from '../AdminPanel.module.css';
import { PLAN_OPTIONS, ROLE_OPTIONS } from '../utils/adminUsers';

function UserCard({ user, daysLeft, isActive, onDelete, onFieldChange, onFieldBlur, onQuickRenew }) {
  return (
    <div className={`${styles.userCard} ${isActive ? styles.activeCard : ''}`}>
      <div className={styles.cardHeader}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {user.gender === 'female' ? (
              <FaVenus color="#ec4899" />
            ) : user.gender === 'male' ? (
              <FaMars color="#3b82f6" />
            ) : (
              '?'
            )}
          </div>
          <div>
            <h3 className={styles.userName}>{user.name || 'بدون اسم'}</h3>
            <span className={styles.userEmail}>{user.email}</span>
          </div>
        </div>

        <div className={styles.headerActions}>
          <select
            value={user.role}
            onChange={(e) => onFieldChange(user.id, 'role', e.target.value)}
            className={`${styles.roleBadge} ${styles[user.role]}`}
          >
            {ROLE_OPTIONS.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <button className={styles.deleteIcon} onClick={() => onDelete(user.id, user.name)}>
            <FaTrash />
          </button>
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.cardBody}>
        <div className={styles.fieldGroup}>
          <label>
            <FaPhone /> الهاتف
          </label>
          <div className={styles.inputWithAction}>
            <input
              type="text"
              value={user.phoneNumber}
              onChange={(e) => onFieldBlur(user.id, 'phoneNumber', e.target.value, true)}
              onBlur={(e) => onFieldBlur(user.id, 'phoneNumber', e.target.value)}
              placeholder="06..."
            />
            {user.phoneNumber && (
              <a
                href={`https://wa.me/${user.phoneNumber.replace('+', '')}`}
                target="_blank"
                rel="noreferrer"
                className={styles.waBtn}
              >
                <FaWhatsapp />
              </a>
            )}
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label>
            <FaLayerGroup /> الباقة & الفوج
          </label>
          <div className={styles.rowInputs}>
            <select value={user.planType} onChange={(e) => onFieldChange(user.id, 'planType', e.target.value)}>
              {PLAN_OPTIONS.map((plan) => (
                <option key={plan} value={plan}>
                  {plan}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={user.whatsappGroup}
              placeholder="G1.."
              onChange={(e) => onFieldBlur(user.id, 'whatsappGroup', e.target.value, true)}
              onBlur={(e) => onFieldBlur(user.id, 'whatsappGroup', e.target.value)}
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label>
            <FaCalendarCheck /> تاريخ الانتهاء
          </label>
          <div className={styles.rowInputs}>
            <input
              type="date"
              value={user.subscriptionEndDate}
              onChange={(e) => onFieldChange(user.id, 'subscriptionEndDate', e.target.value)}
            />
            <button className={styles.quickRenew} onClick={() => onQuickRenew(user.id)}>
              +30
            </button>
          </div>

          {user.role === 'premium' && (
            <div className={`${styles.daysLeft} ${daysLeft < 3 ? styles.urgent : ''}`}>
              {daysLeft >= 0 ? `🟢 باقي ${daysLeft} يوم` : `🔴 منتهي (${Math.abs(daysLeft)} يوم)`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserCard;
