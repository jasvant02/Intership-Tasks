import { useState } from "react";
import { Budget } from "./componets/Budget";
import { Remaining } from "./componets/Remaining";
import { Expense } from "./componets/Expense";
import { Paginationalter } from "./componets/Paginationalter";

function App() {
  return (
    <>
      <h1>Expense Tracker</h1>
      <Budget />
      <Remaining />
      <Expense />
      {/* <Paginationalter /> */}
    </>
  );
}

export default App;
