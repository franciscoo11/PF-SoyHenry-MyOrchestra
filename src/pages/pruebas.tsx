import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export default function Lr() {
  const cookie = new Cookies();
  const [postData, setPostData] = useState([{ title: "", id: "" }]);
  const [reactions, setReactions] = useState([
    { reaction: "", id: "" },
    { reaction: "", id: "" },
  ]);
  const [userReactions, setUserReactions] = useState([
    { postId: "", userId: "", reactionId: "" },
  ]);
   const[dataUser,setDataUser]=useState({id:""})

  async function getPostData() {
    await axios
      .get(`/api/post?orchestraId=claww4lat0003vg1wuau9d3dz`)
      .then((response) => {
        setPostData(response.data.data);
      });
  }

  async function getReactions() {
    await axios.get("http://localhost:3000/api/reaction").then((response) => {
      setReactions(response.data);
    });
  }

  const handlePostReaction = async (
    post_id: any,
    user_id: any,
    reaction_id: any
  ) => {
    await axios.post(`/api/post-reaction?id=${post_id}`, {
      userId: user_id,
      reactionId: reaction_id,
    });
    window.location.href= window.location.href
  };
  const handleRemoveReaction = async (user_id:any,post_id:any,id: any) => {
    await axios.delete(`/api/post-reaction?id=${post_id}`, {
      data: { userId: user_id, reactionId: id },
    });
    window.location.href= window.location.href
  };
  const findReaction = async () => {
    await axios
      .get(`/api/post-reaction?userId=${dataUser.id}`)
      .then((response) => setUserReactions(response.data));
  };

  const findReacionMap=(post_Id:any,user_id:any)=>{
    const casiReturn= userReactions.find((a)=>{
       return   a.postId==post_Id&&a.userId==user_id   
     })
    console.log(casiReturn?.reactionId)
     return casiReturn?.reactionId
     
   }

  useEffect(() => {
    setDataUser(cookie.get("UserloginData")) ;
    getPostData();
    getReactions();
    findReaction();
  }, []);
  

  return (
    <>
      {postData.map((propsData) => (
        <div>
          <div>{propsData.title}</div>
          <div>
            <div>
                
            </div>
            {  findReacionMap(propsData.id,dataUser.id)==reactions[0].id?<button
          
             onClick={() =>
                handleRemoveReaction(dataUser.id, propsData.id, reactions[0].id,)
              }
            >
                
              <img src={reactions[0].reaction} alt="" />
            </button>: findReacionMap(propsData.id,dataUser.id)==reactions[1].id?<button
              onClick={() =>
                handleRemoveReaction(dataUser.id, propsData.id, reactions[1].id,)
              }
            >
              <img src={reactions[1].reaction} alt="" />
            </button> :
            <div>
            <button  onClick={() =>
                handlePostReaction(propsData.id, dataUser.id, reactions[0].id)
              }><img src={reactions[0].reaction} alt="" /></button>
                  <button  onClick={() =>
                handlePostReaction(propsData.id, dataUser.id, reactions[1].id)
              }><img src={reactions[1].reaction} alt="" /></button>
            </div>
}
          </div>
        </div>
      ))}
    </>
  );
}
