import React from 'react';
import { Link } from 'react-router-dom';
import { useUser, useClerk, UserButton } from '@clerk/clerk-react';
import { Button } from "@/components/ui/button"; // Ensure this is correctly imported
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Ensure this is correctly imported
import { CalendarIcon, UserIcon, LogOutIcon } from 'lucide-react'; // Ensure lucide-react is installed and imported correctly

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  console.log(isSignedIn);
  const { signOut } = useClerk();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              {/* Ensure CalendarIcon renders */}
              <CalendarIcon className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-800">MyCalendar</span>
            </Link>
          </div>
          <div className="flex items-center">
            {isSignedIn ? (
                <div className='flex items-center gap-4'>
                 <h2 className='text-xl font-bold text-gray-800'>My Account</h2>
               <UserButton/>
               </div>
            ) : (
              <>
                {/* <Link to="/signup">
                  <Button  className="mr-2">Sign up</Button>
                </Link>
                <Link to="/login">
                  <Button>Log in</Button>
                </Link> */}

                <p></p>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
