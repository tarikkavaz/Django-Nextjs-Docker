import axios from 'axios';
import Link from 'next/link';
import { GetServerSideProps, NextPage } from 'next';

interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  date_posted: string;
  author: number;
  categories: string[];
  tags: string[];
}

interface PostProps {
  post: Post;
}

const PostPage: NextPage<PostProps> = ({ post }) => {
  return (
    <div>
      <Link href={`/posts/`}><p>Back</p></Link>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {post.categories.length > 0 && (
        <div className='mt-8'>
          <h3>Categories:</h3>
          <ul>
            {post.categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </div>
      )}
      {post.tags.length > 0 && (
        <div className='mt-8'>
          <h3>Tags:</h3>
          <ul>
            {post.tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };
  const res = await axios.get(`http://localhost:8000/api/posts/${slug}`);
  const post = res.data;

  // Fetch category names
  const categoryNames = await Promise.all(post.categories.map(async (id: number) => {
    const res = await axios.get(`http://localhost:8000/api/categories/${id}`);
    return res.data.name;
}));

  // Fetch tag names
  const tagNames = await Promise.all(post.tags.map(async (id: number) => {
    const res = await axios.get(`http://localhost:8000/api/tags/${id}`);
    return res.data.name;
}));

  return {
    props: {
      post: {
        ...post,
        categories: categoryNames,
        tags: tagNames,
      },
    },
  };
};

export default PostPage;
