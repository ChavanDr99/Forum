import React from 'react'
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../Firebase";
import Logo from '../../assets/48.jpg'
const Login = () => {
    const handleSubmit = async () => {
        await signInWithPopup(auth, provider)
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      return (
        <div className="flex items-center justify-center h-screen w-screen box-border">
          <div className="flex items-center flex-col">
            <img
              src={Logo}
              alt="logo" className='w-48 h-auto mb-5'
            />
            <button onClick={handleSubmit} className="px-4 py-2 mt-10 bg-black text-white outline-none rounded-md font-mono cursor-pointer hover:bg-gray-800 focus:outline-none">
              Login to continue
            </button>
          </div>
        </div>
      );
    }
    
    export default Login;
