import React, { useState } from 'react'
import Homeicon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
import Feature from '@material-ui/icons/FeaturedPlayListOutlined'
import {Avatar,Input} from '@material-ui/core'
import Logo from '../assets/48.jpg'
import CloseIcon from '@material-ui/icons/Close'
import '../css/Header.css'
import {Modal} from 'react-responsive-modal'
import axios from 'axios';
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";
import { logout, selectUser } from "../feature/userSlice";
import { useDispatch, useSelector } from "react-redux";


import {AssignmentTurnedInOutlined,NotificationsOutlined,PeopleAltOutlined,Search,ExpandMore} from'@material-ui/icons'
import 'react-responsive-modal/styles.css'

const Header = () => {

  const [IsModalOpen, setIsModalOpen] = useState(false)
  const Close = (<CloseIcon />)
  const [InputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleSubmit = async (e) => {
  e.preventDefault();
    try {
      if (question !== "") {

        const body = {
          questionName: question,
          questionUrl: InputUrl,
          user:user,
        }
        const result = await axios.post("http://localhost:3000/api/questions", { data : body });
        console.log(result);
        if (result.data.status) {
          alert(result.data.message);
          window.location.href = "/";
        }

      }
    }
    catch (e) {
      console.log(e);
      alert("Error in adding question");

    }
  }

  const handleLogout = () => {
    if (window.confirm("Are you sure to logout ?")) {
      signOut(auth)
        .then(() => {
          dispatch(logout());
          console.log("Logged out");
        })
        .catch(() => {
          console.log("error in logout");
        });
    }
  };

  
  return (
    <div className=' bg-white sticky top-0 z-10 shadow-md p-1px flex items-center justify-center'>
    <div className='flex items-center justify-between'>
<div className="qHeader__logo">
<img className="h-14 object-contain" src={Logo} alt="Logo" />
</div>

<div className="flex items-center ml-5">
<span onClick={handleLogout}>
            <Avatar src={user?.photo} />
          </span>
</div>
<div className="bg-blue-500 rounded ml-5 px-3 py-1 cursor-pointer hover:bg-blue-800">
    <Button onClick={()=> setIsModalOpen(true)} >Add Question</Button>
</div>
<Modal  open={IsModalOpen} CloseIcon={Close}
onClose={()=>setIsModalOpen(false)}
center
>
 
  <div className="flex items-center mb-5 border-b border-opacity-50 border-gray-500">
              <h5 className='text-gray-500 text-2xl cursor-pointer font-semibold mr-8 hover:text-red-600'>Add Question</h5>
              <h5 className='text-gray-500 text-2xl cursor-pointer font-semibold mr-8 hover:text-red-600'>Share Link</h5>
            </div>
            <div className="flex items-center mt-10">
            <Avatar src={user?.photo}/>
              <div className="flex items-center text-gray-600 px-2 ml-2 bg-gray-300 rounded-full cursor-pointer">
                <PeopleAltOutlined/>
                <p className='ml-2 text-sm text-gray-500'>Public</p>
                <ExpandMore/>
              </div>
            </div>
            <div className="flex flex-col mt-10 flex-1 mb-">
            <Input value={question} onChange={(e)=>setQuestion(e.target.value)} type='text'placeholder='Start Your question ' />
            <div style={{
              display:"flex",
              flexDirection:'column'
            }}>
              <input value={InputUrl}
            onChange={(e)=>setInputUrl(e.target.value)} style={{margin:'5px 0',border:'1px solid lightgray',padding:'10px',outline:'2px solid #000'}} type='text' placeholder='Optional:include a link that gives content' className='flex-1 border-none outline-none ml-2 '/>
            {InputUrl !==""&&<img  style={{
                      height: "40vh",
                      objectFit: "contain",
                    }} src={InputUrl} alt='displayimage'/>}
            </div>
            </div>
            <div className="flex flex-col-reverse mt-10 items-center">
            <button onClick={()=>setIsModalOpen(false)} className='mt-10 border-none outline-none text-gray-500 font-semibold py-2 px-5 rounded-full cursor-pointer'>Cancel</button>
            <button onClick={handleSubmit} type='submit'  className='border-none outline-none mt-10 bg-gray-800 text-white font-bold py-2 px-5 rounded-full cursor-pointer w-1/2'> Add Question</button>

            </div>
</Modal>

    </div>
    </div>
  )
}

export default Header
