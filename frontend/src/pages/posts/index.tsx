import axios from 'axios';
import Link from 'next/link';
import { NextPage } from 'next';

interface Post {
  id: number;
  title: string;
  slug: string;
}

interface ListProps {
  posts: Post[];
}

const List: NextPage<ListProps> = ({ posts }) => {
  return (
    <div>
      <h1>Posts</h1>
      <hr />
      {posts.map((post) => (
        <ul key={post.id}>
          <Link href={`/posts/${post.slug}`}>
            <li>{post.title}</li>
          </Link>
        </ul>
      ))}
    </div>
  );
};

List.getInitialProps = async () => {
  try {
    const res = await axios.get('http://localhost:8000/api/posts/');
    const posts = res.data;

    return {
      posts,
    };
  } catch (error) {
    console.error(error);
    return {
      posts: [],
    };
  }
};


export default List;
