
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ClerkProvider } from '@clerk/clerk-react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const clerkPubKey = import.meta.env.VITE_APP_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById('root')).render(
  
    <ClerkProvider publishableKey={clerkPubKey}>
      
        <App />
        <ToastContainer />
     
    </ClerkProvider>
 
);
