
import React from 'react'
import { SignUp } from '@clerk/clerk-react'
export default function Signup() {
  return (
    <div className='flex justify-center items-center mt-8'>
        { <SignUp path="/signup" routing="path" /> }
    </div>

    
  )
}