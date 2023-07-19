import axios from 'axios';
import Link from 'next/link';
import { NextPage } from 'next';

interface Page {
  id: number;
  title: string;
  slug: string;
}

interface ListProps {
  pages: Page[];
}

const List: NextPage<ListProps> = ({ pages }) => {
  return (
    <div>
      <h1>Pages</h1>
      <hr />
      {pages.map((page) => (
        <ul key={page.id}>
          <Link href={`/pages/${page.slug}`}>
            <li>{page.title}</li>
          </Link>
        </ul>
      ))}
    </div>
  );
};

List.getInitialProps = async () => {
  try {
    const res = await axios.get('http://localhost:8000/api/pages/');
    const pages = res.data;

    return {
      pages,
    };
  } catch (error) {
    console.error(error);
    return {
      pages: [],
    };
  }
};


export default List;
