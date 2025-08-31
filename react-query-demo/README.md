# Advanced Data Handling with React Query

This project demonstrates how to use **React Query** for advanced data fetching, caching, and management in a React application. It fetches a list of posts from the JSONPlaceholder API.

## Features

- **Fetching Data:** Uses the `useQuery` hook to fetch data asynchronously.
- **Loading State:** Displays a clear loading indicator while data is being fetched.
- **Error Handling:** Shows an error message and a "Try Again" button if the API call fails.
- **Caching:** React Query automatically caches the fetched data. Navigate away and return to the component to see the data load instantly from the cache.
- **Manual Refetching:** Includes a button to manually trigger a data refetch, demonstrating how to update cached data.

## Getting Started

1.  **Clone the repository:** `git clone alx-fe-reactjs`
2.  **Navigate to the project directory:** `cd react-query-demo`
3.  **Install dependencies:** `npm install`
4.  **Run the application:** `npm run dev`

The application will launch in your browser, displaying the fetched posts.


