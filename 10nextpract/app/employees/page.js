import Link from "next/link";
import { employees } from "../data/employees";

export default function EmployeesPage() {
  return (
    <div>
      <h1>Employee List</h1>
      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            <Link href={`/employees/${emp.id}`}>
              {emp.name} - {emp.role}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
