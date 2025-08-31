import { useQuery } from '@tanstack/react-query';

// A function to fetch the data from the API
const fetchPosts = async () => {
  const response = await fetch('[https://jsonplaceholder.typicode.com/posts](https://jsonplaceholder.typicode.com/posts)');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const PostsComponent = () => {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Inactive cache data is garbage collected after 10 minutes
    refetchOnWindowFocus: false, // Prevents automatic refetching on window focus
    keepPreviousData: true, // Keeps old data visible while new data is being fetched
  });

  // Handle initial loading state
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl w-full text-center">
        <h2 className="text-xl font-bold mb-4">Fetching Posts...</h2>
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className="bg-red-100 p-6 rounded-lg shadow-md max-w-2xl w-full text-center">
        <h2 className="text-xl font-bold mb-4 text-red-700">Error fetching posts!</h2>
        <p className="text-red-600">{error.message}</p>
        <button
          onClick={() => refetch()}
          className="mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Display the data
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Posts</h2>
        <button
          onClick={() => refetch()}
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 flex items-center"
          disabled={isFetching}
        >
          Refetch Data
          {isFetching && (
            <span className="ml-2 animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
          )}
        </button>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {data.map((post) => (
          <div key={post.id} className="p-4 border border-gray-200 rounded-md">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="mt-1 text-gray-600 text-sm">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsComponent;

