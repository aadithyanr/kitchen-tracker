# Pantry Management Application

This project is a pantry management application built with React and Firebase Firestore. It allows users to add, edit, and remove pantry items, as well as search for items within the pantry.

## Features

- Add new items to the pantry
- Edit item names and quantities
- Remove items from the pantry
- Search for items in the pantry
- Increment and decrement item quantities

## How It Works

The application uses Firebase Firestore as its database to store pantry items. Each item is stored as a document in the "pantry" collection. The frontend is built with Nextjs and Material-UI for the user interface.

### Core Functionality

1. **Adding Items:**

   - Users can add new items to the pantry by entering the item name and quantity. The item name is stored in lowercase to ensure consistency.

2. **Editing Items:**

   - Users can edit existing items by changing the name and quantity.

3. **Removing Items:**

   - Users can remove items from the pantry. If the quantity is greater than 1, it will decrement the quantity. If the quantity is 1, the item will be deleted.

4. **Searching Items:**
   - Users can search for items by name using a search field. The search is case-insensitive.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Firebase project

### Installation

1. #### Clone the repository:

```bash
git clone https://github.com/yourusername/your-repo-name.git

cd your-repo-name

Install dependencies:

npm install
# or
yarn install
```

2. #### Set up Firebase:

- Create a new Firebase project in the Firebase Console.
- Add a new web app to your Firebase project.
- Copy the Firebase configuration settings.
- Set up environment variables:

Create a .env.local file in the root directory of your project and add your Firebase configuration settings:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### Running the Application

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open your browser and navigate to http://localhost:3000 to see the application running.

### Technologies Used

- React(Nextjs)
- Firebase Firestore
- Material-UI

### Contributing

Feel free to fork this repository and submit pull requests.

### License

This project is licensed under the MIT License.
