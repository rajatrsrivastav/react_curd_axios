import { useEffect, useState } from "react";
import { deletePost, getPost } from "../services/postApi";

function Post() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [newPost,setNewPost] = useState({
    title:"",
    body:""
  });

  const getPostData = async () => {
    const res = await getPost();
    setPosts(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    getPostData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status===200){
        const newUpdatedPosts =posts.filter((post)=>{
        return post.id!==id;
      });
      setPosts(newUpdatedPosts)
      }
    } catch(error) {
        console.log(error)
    }
  };
  return (
    <div className="bg-[#0d1117] min-h-screen py-8 px-6 text-white">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-10">
        <input
          type="text"
          placeholder="Add Title"
          className="w-full sm:w-60 px-4 py-2 rounded shadow outline-none bg-white text-black"
          onChange={(e)=>{e.target}}
        />
        <input
          type="text"
          placeholder="Add Post"
          className="w-full sm:w-60 px-4 py-2 rounded shadow outline-none bg-white text-black"
        />
        <button className="bg-teal-400 hover:bg-teal-500 text-black font-bold py-2 px-6 rounded shadow" onClick={()=>handleAdd()}>
          ADD
        </button>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((currElem, index) => (
          <li key={currElem.id} className="bg-[#1c2532] p-4 rounded shadow-lg">
            <p className="mb-2 font-semibold text-sm">
              <span className="text-teal-400 mr-1">{index + 1}.</span>
              <span>Title:</span> {currElem.title}
            </p>
            <p className="mb-4 text-gray-300">
              <span className="font-semibold text-white">News:</span>{" "}
              {currElem.body}
            </p>
            <div className="flex gap-4">
              <button className="bg-teal-400 hover:bg-teal-500 text-black font-semibold py-1 px-4 rounded">
                EDIT
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded"
                onClick={() => handleDelete(currElem.id)}
              >
                DELETE
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Post;
