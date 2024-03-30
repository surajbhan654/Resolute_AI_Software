import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/Valildate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile } from "firebase/auth"; //for pass authentication
import { auth } from '../utils/Firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import toast from 'react-hot-toast';


const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null)
  const email = useRef(null)
  const password = useRef(null)
  const navigate = useNavigate();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
  }

  const handleButtonClick = () => {

    console.log(email.current.value);
    console.log(password.current.value);
    const message = checkValidData(email.current.value, password.current.value)
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      //sign up
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;

          //update url is called after create user by that time displayName and photoURL is not update 
          //so we have to call again addUser of slice
          updateProfile(user, {
            displayName: name.current.value, photoURL: `https://api.dicebear.com/5.x/initials/svg?seed=${name.current.value}`
          })
          .then(() => { 
            //this data is not come from above(user) because user doesn't have updated value,
            // it is come from utility function i.e auth
            const {uid, email, displayName, photoURL} = auth.currentUser;
            dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}));
            navigate('/browse')
            toast.success("User Registered")
            })
          .catch((error) => { setErrorMessage(error)});

          console.log(user);

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage)
        });

    } else {
      //sign in
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          navigate('/browse')
          toast.success('SignIn Successfully')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }

  }

  return (
    <div className='bg-slate-900'>
      <Header />
      
      <form
        onSubmit={(e) => e.preventDefault()}
        className='bg-black rounded-lg p-12 w-[30%] absolute mx-auto left-0 right-0 my-36 text-white bg-opacity-80'>

        <h1 className='text-3xl text-center py-4 font-bold'>{isSignInForm ? "Sign in" : "Sign Up"}</h1>

        {
          !isSignInForm &&
          <input type='text' placeholder='Full Name'
            ref={name}
            className='my-2 p-2 w-full rounded-md bg-gray-700' />
        }
        <input type='text' placeholder='Email'
          ref={email}
          className='my-2 p-2 w-full rounded-md bg-gray-700' />

        <input type='password' placeholder='Password'
          ref={password}
          className='my-2 p-2 w-full rounded-md bg-gray-700' />

        <p className='text-red-500'>{errorMessage}</p>

        <button className='bg-red-700 w-full p-2 my-4 rounded-md' onClick={handleButtonClick}>{isSignInForm ? "Sign in" : "Sign Up"}</button>

        <p className='py-4 cursor-pointer font-bold' onClick={toggleSignInForm} >
          {isSignInForm ? "New User ? Sign Up" : "Already Registered Sign In Now"}
        </p>

      </form>
    </div>
  )
}

export default Login