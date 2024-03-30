import React from 'react'
import { signOut } from "firebase/auth";
import {auth} from '../utils/Firebase'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Header = () => {

  const navigate = useNavigate();

  //now i am going to subscribe my store
  const user  = useSelector((store)=>store.user);

  const handleSignOut = () =>{
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/")
      toast.success("Signout Successfully")
    }).catch((error) => {
      // An error happened.
      //abi bnana baki h 
       navigate('/error')
    });
  }

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <div>
      <h1 className='text-5xl mt-5 font-bold text-white'> Resolute AI Software </h1>
      <p className='text-white'>I have used authentication from scratch</p>
      </div>

    {
     user && <div className='flex items-center gap-3'>
      <img alt='user_icon' 
      src={user?.photoURL} 
      className='w-8 h-8 rounded-full'/>
      <button className='bg-slate-600 rounded-lg text-white p-2'
      onClick={handleSignOut}
      > Sign Out </button>
    </div>
    }

    </div>
  )
}

export default Header