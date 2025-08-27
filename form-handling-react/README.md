# Form Handling in React with Controlled Components and Formik

This project demonstrates two approaches to handling forms in a React application: using traditional controlled components and then refactoring to use the Formik library for a more robust solution.

## Controlled Components

The `RegistrationForm` component, located in `src/components`, manages form state manually using React's `useState` hook. It handles field updates and performs basic validation to ensure all fields are filled before submission.

## Formik

The `FormikForm` component, also in `src/components`, showcases a more advanced form handling approach. It leverages the Formik library to manage form state, and it uses Yup for a schema-based validation approach, providing a cleaner and more scalable solution for complex forms.

## Getting Started

1.  **Clone the repository:** `git clone alx-fe-reactjs`
2.  **Navigate to the project directory:** `cd form-handling-react`
3.  **Install dependencies:** `npm install`
4.  **Run the application:** `npm run dev`

The application will run in your browser, displaying the user registration form. You can switch between the controlled and Formik versions by changing the component rendered in `src/App.jsx`.