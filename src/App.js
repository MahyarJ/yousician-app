import React from 'react';
import styles from './App.module.sass';

function App() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <h1>New Songs Delivered Every Week</h1>
          <p>
            Here are the most recent additions to the Yousician App. Start playing today!
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;
