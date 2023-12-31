import { Avatar } from "@material-ui/core";
import { useState } from 'react'
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,

} from "@material-ui/icons";
import '../css/Post.css'
import { Modal } from 'react-responsive-modal'
import CloseIcon from '@material-ui/icons/Close'
import 'react-responsive-modal/styles.css'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import ReactTimeAgo from "react-time-ago";
import axios from 'axios';
import { useSelector } from "react-redux";
import { selectUser } from "../feature/userSlice";



function LastSeen({ date }) {
  return (
    <div>
      <ReactTimeAgo date={date} locale="en-US" timeStyle="round" />
    </div>
  );
}
const Post = ({ post }) => {
  const [answer, setAnswer] = useState("");
  const [IsModalOpen, setIsModalOpen] = useState(false)
  const Close = (<CloseIcon />)
  const [showAnswers, setShowAnswers] = useState(false);
  const user = useSelector(selectUser);

  const handleQuill = (value) => {
    setAnswer(value);
  };

  const toggleAnswers = () => {
    setShowAnswers(!showAnswers);
  };
  const handleSubmit = async () => {
    if (post?._id && answer !== "") {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        answer: answer,
        questionId: post?._id,
        user: user,

      };
      await axios
        .post("http://localhost:3000/api/answers", body, config)
        .then((res) => {
          console.log(res.data);
          alert("Answer added succesfully");
          setIsModalOpen(false);
          window.location.href = "/";
          toast.success('Answer added successfully!', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        })
        .catch((e) => {
          console.log(e);
          alert(e)
        });
    }
  };

  return (
    <div className="flex flex-col p-2 bg-white mt-3 ml-8 max-md:ml-0 border border-lightgray rounded-lg w-[80%] max-md:w-[100%] shadow-md">
      <div className="flex items-center">
        <Avatar src={post?.user?.photo} />
        <h4 className="ml-2 cursor-pointer text-sm">{post?.user?.userName}</h4>
        {post?.createdAt && (
          <small className="ml-2">
            <LastSeen date={post.createdAt} />
          </small>
        )}
      </div>
      <div className="flex flex-col">
        <div className="mt-5 font-bold mb-5 cursor-pointer flex items-center flex-1">
          <p>{post?.questionName}</p>
          <button onClick={() => setIsModalOpen(true)} className='ml-auto cursor-pointer px-3 py-1 bg-gray-800 outline-none border-none text-gray-100 font-light text-sm rounded-md'>Answer</button>

          <Modal open={IsModalOpen} CloseIcon={Close}
            onClose={() => setIsModalOpen(false)}
            center classNames={{
              modal:'postModal1'
            }}>
            <div className="flex flex-col items-center mt-3">
              <h1 className=" text-3xl max-md:text-2xl text-red-700 font-semibold">{post?.questionName}</h1>
              <p className="text-gray-500 text-sm"> Asked by{" "} <span className="font-bold">{post?.user?.userName}</span > on <span className="font-bold">  {new Date(post?.createdAt).toLocaleString()}</span ></p>
            </div>
            <div class="modal__answer flex pt-2 flex-1">
              <ReactQuill value={answer} onChange={handleQuill} placeholder="Enter Your Answer" />
            </div>
            <div className="flex items-center justify-between mt-10 w-full">
              <button onClick={() => setIsModalOpen(false)} className='   hover:text-red-500 border-none m-2 max-md:mt-10 md:mt-5 outline-none bg-gray-300 text-gray-500 font-semibold px-4 py-2 rounded-full cursor-pointer'>Cancel</button>
              <button onClick={handleSubmit} type='submit' className='border-none outline-none m-2 max-md:mt-10 md:mt-5 bg-gray-900 text-white hover:bg-gray-300 hover:text-gray-900 font-bold px-4 py-2 rounded-full cursor-pointer w-1/2'> Add Answer</button>

            </div>
          </Modal>
        </div>
        {post.questionUrl !== "" && <img src={post.questionUrl} alt="url" />}
      </div>

      <p
        style={{

          fontSize: "12px",
          fontWeight: "bold",
          margin: "10px 0",
          font: "semibold",
        }}
      >
        {post?.allAnswers.length} Answer(s)
      </p>

      <div className="flex justify-end mt-2">
        <button
          onClick={toggleAnswers}
          className="bg-blue-500 rounded ml-5  px-3 py-1 cursor-pointer hover:bg-blue-800"
        >
          {showAnswers ? (
            <>
              <ArrowUpwardOutlined /> Hide Answers
            </>
          ) : (
            <>
              <ArrowDownwardOutlined /> Show Answers
            </>
          )}
        </button>
      </div>
      {showAnswers && (
        <div className="mt-4">
          {post?.allAnswers?.map((_a) => (

            <div key={_a._id} className="border-t border-gray-300 pt-4">

              <div
                className="post-answer"
                dangerouslySetInnerHTML={{ __html: _a?.answer }}
              ></div>


              <div className="flex items-center text-gray-500 text-sm mt-2">
                <p className="font-semibold">{_a?.user?.userName}</p>
                <span className="mx-2">&bull;</span>
                <LastSeen date={_a?.createdAt} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



export default Post
