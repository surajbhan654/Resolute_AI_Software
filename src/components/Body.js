import React, { useEffect } from 'react'
import Login from './Login'
import Browse from './Browse'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/Firebase';
import { addUser, removeUser } from '../utils/userSlice';
import {useDispatch} from 'react-redux'


const Body = () => {

  const dispatch = useDispatch();
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/browse',
      element: <Browse />
    },
  ])

  //when authstate change then this api is called
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid, email, displayName, photoURL} = user;
        
        dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}));
      }
       else 
       {
        // User is signed out
        dispatch(removeUser())
      }
    });
  }, [])

//we can navigate only in child of <RouterProvider/>
  return (
    <div className='bg-slate-900 h-screen'>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body