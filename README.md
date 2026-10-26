# PeopleDesk — Employee Dashboard (React)

A responsive employee dashboard assignment built with **React**, **React Router**, **Vite**, and **Bootstrap**.

## Features

- Navbar with **Home** and **Employee Form** links
- Home dashboard fetches user data from the JSONPlaceholder API:
  https://jsonplaceholder.typicode.com/users
- Employee directory table displaying **ID, Name, and Email**
- Employee form with **Name, Designation, Location, and Salary** fields
- React Router navigation between the dashboard and employee form
- Responsive styling using Bootstrap and custom CSS
- No POST requests; submitting the form only validates the fields locally

## Requirements

- Node.js (Node.js 18 or later recommended)
- npm

## Run the project locally

1. Download and extract this ZIP file.
2. Open the extracted `Employee_Dashboard_React` folder in VS Code.
3. Open the VS Code terminal (**Terminal → New Terminal**).
4. Make sure the terminal is in the same folder as `package.json`.
5. Install dependencies:

   ```bash
   npm install
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Open the local URL printed in the terminal, usually `http://localhost:5173/`.

## Build for production

```bash
npm run build
```

The production build will be created in the `dist` folder.

## Project structure

```text
Employee_Dashboard_React/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    └── styles.css
```

## GitHub repository submission

1. Create a new repository on GitHub.
2. Upload or push all files from this project folder. Do not upload `node_modules`.
3. Commit the changes.
4. Submit the repository URL as your assignment requires.

## Notes

- Dashboard users are fetched from JSONPlaceholder when the page loads. An internet connection is required for this API data.
- The employee form is a front-end demonstration. It does **not** send data to an API or save employee records, as required by the assignment.
