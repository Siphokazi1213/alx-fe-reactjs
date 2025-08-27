import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'; // Optional but very helpful for debugging

// Create a client instance of QueryClient.
// This client will hold the cache and options for all queries.
const queryClient = new QueryClient();

// This component is responsible for fetching and displaying posts.
const PostsComponent = () => {
  // useQuery is the core hook for data fetching.
  // The first argument is the "queryKey," a unique identifier for this query.
  // The second argument is the "queryFn," an async function that returns a Promise.
  const { isLoading, isError, data, error, refetch } = useQuery('posts', async () => {
    // The query function makes the API call.
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }, {
    // Optional: Add a staleTime to demonstrate caching.
    // Data will not be refetched for 5 seconds after the first successful fetch.
    staleTime: 5000,
  });

  // Handle the different states of the query.
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-lg font-semibold text-gray-700">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold text-red-500 mb-2">Error!</h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  // If data is available, render the list of posts.
  return (
    <div className="p-4 bg-gray-100 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Posts</h1>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Refetch Posts
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map(post => (
            <div
              key={post.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
              <p className="text-gray-600 text-sm">{post.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// The main App component, which sets up React Query for the entire application.
const App = () => {
  return (
    // QueryClientProvider provides the client to all components wrapped inside it.
    // This allows any child component to use the hooks from React Query.
    <QueryClientProvider client={queryClient}>
      <PostsComponent />
      {/* The devtools are very useful for visualizing the cache and debugging */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;