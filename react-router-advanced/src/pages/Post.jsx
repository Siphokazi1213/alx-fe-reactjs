import { useParams } from 'react-router-dom';

const Post = () => {
  const { postId } = useParams();

  return (
    <div className="text-center p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Post #{postId}</h1>
      <p className="text-gray-600">
        You are viewing a dynamically routed post. The ID is retrieved from the URL.
      </p>
    </div>
  );
};

export default Post;

