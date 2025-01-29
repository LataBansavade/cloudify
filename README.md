
## 🛠️ Installation and Setup

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Recommended: Latest LTS version)
- [Git](https://git-scm.com/) (Optional but recommended)

###  Clone the Repository
```sh
git clone <repository-url>
cd <project-folder>
```

###  Install Dependencies
```sh
npm install
```

###  Start the Development Server
```sh
npm run dev
```
The application should now be running at [**http://localhost:5173/**](http://localhost:5173/) (default Vite port).


---

## 🔗 Commands

| Command           | Description               |
| ----------------- | ------------------------- |
| `npm install`     | Install dependencies      |
| `npm run dev`     | Start development server  |

---
## ✅ Features

- Implemented **single select dropdown** for Column 1.
- Prevented duplicate selections in different rows.
- Created a **multi-select dropdown** for Column 2.
- Integrated **"Add New Item"** functionality inside the second dropdown.
- Added **"Add New Row"** button.
- Maintained **data consistency** across dropdowns.
- Designed a **responsive** layout for different screen sizes.
-  **Local storage persistence** (Refresh support).
- **"Select All" functionality** in multi-select dropdown.
-**Input validation & error handling** (prevents adding duplicate items).
- **Click-outside detection** for dropdowns to close.
- **Keyboard accessibility** for navigation through dropdown.
- **Clear Error feedback** for user actions.
- **Delete button** (×) for each row.
- **"Delete All Rows" button** with a trash icon.
