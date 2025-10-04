import { employees } from "../../data/employees";

export default function EmployeeDetail({ params }) {
  const employee = employees.find((emp) => emp.id === params.id);

  if (!employee) {
    return <h2>Employee Not Found</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{employee.name}</h1>
      <p>Role: {employee.role}</p>
      <p>ID: {employee.id}</p>

      <a href={`/employees/${employee.id}/leaves`}>
        View {employee.name}'s Leave Requests
      </a>
    </div>
  );
}
