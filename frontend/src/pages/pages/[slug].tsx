import axios from 'axios';
import Link from 'next/link';
import { GetServerSideProps, NextPage } from 'next';

interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  date_posted: string;
  author: number;
  categories: string[];
  tags: string[];
}

interface PageProps {
  page: Page;
}

const PagePage: NextPage<PageProps> = ({ page }) => {
  return (
    <div>
      <Link href={`/pages/`}><p>Back</p></Link>
      <h1>{page.title}</h1>
      <p>{page.content}</p>
      {page.categories.length > 0 && (
        <div className='mt-8'>
          <h3>Categories:</h3>
          <ul>
            {page.categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };
  const res = await axios.get(`http://localhost:8000/api/pages/${slug}`);
  const page = res.data;

  // Fetch category names
  const categoryNames = await Promise.all(page.categories.map(async (id: number) => {
    const res = await axios.get(`http://localhost:8000/api/categories/${id}`);
    return res.data.name;
}));


  return {
    props: {
      page: {
        ...page,
        categories: categoryNames,
      },
    },
  };
};

export default PagePage;
