import Link from "next/link";
export default function SideNav() {
  return (
    <nav>
      <ul className="space-y-2">
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/dashboard/customers">Customers</Link>
        </li>
        <li>
          <Link href="/dashboard/invoices">Invoices</Link>
        </li>
        <li>
          <Link href="/dashboard/products">Products</Link>
        </li>
      </ul>
    </nav>
  );
}
