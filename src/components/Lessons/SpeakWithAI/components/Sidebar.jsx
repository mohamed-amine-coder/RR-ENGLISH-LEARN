import React from 'react';
import styles from '../SpeakWithAI.module.css';

export default function Sidebar({ scenarios, selectedScenario, onSelectScenario }) {
  return (
    <div className={styles.sidebar}>
      <h3 className={styles.sidebarTitle}>الشخصيات المتاحة</h3>
      <div className={styles.scenarioList}>
        {scenarios.map((scenario) => (
          <div 
            key={scenario.id} 
            className={`${styles.scenarioItem} ${selectedScenario?.id === scenario.id ? styles.activeScenario : ''}`}
            onClick={() => onSelectScenario(scenario)}
            style={{ borderLeftColor: selectedScenario?.id === scenario.id ? scenario.color : 'transparent' }}
          >
            <div className={styles.scenarioIcon} style={{ color: scenario.color, backgroundColor: `${scenario.color}20` }}>
              {scenario.icon}
            </div>
            <div className={styles.scenarioInfo}>
              <h4>{scenario.title}</h4>
              <span>{scenario.subtitle}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}