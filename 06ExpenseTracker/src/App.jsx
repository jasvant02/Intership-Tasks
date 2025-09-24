import { useState } from "react";
import { Budget } from "./componets/Budget";
import { Remaining } from "./componets/Remaining";
import { Expense } from "./componets/Expense";

function App() {
  return (
    <>
      <h1>Expense Tracker</h1>
      <Budget />
      <Remaining />
      <Expense />
    </>
  );
}

export default App;
