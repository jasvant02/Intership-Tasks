import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
};

type Props = {
  params: {
    page: string;
  };
};

export default async function getServerSideProps({ params }: Props) {
  const page = parseInt(params.page, 10);

  const skip = (page - 1) * 10;

  if (isNaN(page) || page < 1) {
    return <CustomNotFound page={params.page} />;
  }

  const res = await fetch(
    `https://dummyjson.com/products?limit=10&skip=${skip}&select=title,price`
  );

  if (!res.ok) {
    return <CustomNotFound page={params.page} />;
  }

  const data = await res.json();
  const products: Product[] = data.products || [];
  const totalPages = Math.ceil(data.total / 10);

  if (products.length === 0 || page > totalPages) {
    return <CustomNotFound page={params.page} />;
  }

  const getPaginationRange = () => {
    const DOTS = "...";
    const range: (number | string)[] = [];

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    range.push(1);
    if (start > 2) range.push(DOTS);
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    if (end < totalPages - 1) range.push(DOTS);
    if (!range.includes(totalPages)) range.push(totalPages);

    return range;
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, index) => (
            <tr key={index}>
              <td>{p.id}</td>
              <td>{p.title}</td>
              <td>{p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {page > 1 && (
          <Link href={`/products/page/${page - 1}`}>
            <button>Previous</button>
          </Link>
        )}

        {getPaginationRange().map((item, index) =>
          item === "..." ? (
            <span key={index}> ... </span>
          ) : (
            <Link key={index} href={`/products/page/${item}`}>
              <button>{item}</button>
            </Link>
          )
        )}

        {page < totalPages && (
          <Link href={`/products/page/${page + 1}`}>
            <button>Next</button>
          </Link>
        )}
      </div>
    </div>
  );
}

function CustomNotFound({ page }: { page: string }) {
  return (
    <div>
      <h2>Page "{page}" not found.</h2>
      <p>The page number you entered does not exist.</p>
      <Link href="/products/page/1">
        <button>Go to First Page</button>
      </Link>
    </div>
  );
}
