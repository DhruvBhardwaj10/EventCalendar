import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Calendar from './components/Calendar';
import EventForm from './components/EventForm';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <div>
      
      <Router>
      <Navbar/>
        <SignedIn>
          <Routes>
            <Route path="/" element={<Calendar />} />
            <Route path="/event" element={<EventForm />} />
            <Route path="/event/:id" element={<EventForm />} />
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </Router>
      </div>
  );
}

export default App;