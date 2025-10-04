export default function EmployeeLeaves({ params }) {
  return (
    <div>
      <h1>Leave Requests for Employee {params.id}</h1>
      <ul>
        <li>Annual Leave - Approved </li>
        <li>Sick Leave - Pending </li>
      </ul>
    </div>
  );
}
