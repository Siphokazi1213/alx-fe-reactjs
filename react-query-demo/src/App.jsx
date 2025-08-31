import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostsComponent from './components/PostsComponent';
import './index.css';

// Create a client instance for React Query
const queryClient = new QueryClient();

const App = () => {
  return (
    // Wrap your application with QueryClientProvider to give it access to the client
    <QueryClientProvider client={queryClient}>
      <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
        <PostsComponent />
      </div>
    </QueryClientProvider>
  );
};

export default App;