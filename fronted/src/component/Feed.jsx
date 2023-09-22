 import React from 'react'
import FeedBox from './FeedBox'
import Post from './Post'
import axios from 'axios'
import { useEffect ,useState} from 'react'

const Feed = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/questions")
      .then((res) => {
        console.log(res.data.reverse());
        setPosts(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className='flex flex-col '>
        <FeedBox/>
        {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
        {/* <Post/> */}
     
    </div>
  )

        }
export default Feed
