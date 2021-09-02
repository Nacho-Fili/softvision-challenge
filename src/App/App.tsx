import React from "react";

import StepsListContainer from "../steps";

import styles from "./App.module.scss";

const App: React.FC = () => {
  return (
    <main className={styles.main}>
      <StepsListContainer />
    </main>
  );
};

export default App;
