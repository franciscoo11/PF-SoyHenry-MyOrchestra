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
    { postId: "", userId: "", reactionsId: "" },
  ]);
  const [count, setCount] = useState(0);
  const url0 = reactions[0].reaction;
  const url1 = reactions[1].reaction;
  const id0 = reactions[0].id;
  const id1 = reactions[1].id;
  const idUser = cookie.get("UserloginData");
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
  };
  const handleRemoveReaction = async (number: any, id: any) => {
    setCount(number);
    await axios.delete("/api/post-reaction?id=claww932l0004vg1whw6e5xdx", {
      data: { userId: "d790b777-f480-4270-82bb-0939c3cfd80e", reactionId: id },
    });
  };
  const findReaction = async () => {
    const data: any = await axios
      .get(`/api/post-reaction?userId=${idUser.id}`)
      .then((response) => setUserReactions(response.data));
  };

  useEffect(() => {
    getPostData();
    getReactions();
    findReaction();
  }, []);

  return (
    <>
      {console.log(userReactions)}
      {postData.map((propsData) => (
        <div>
          <div>{propsData.title}</div>
          <div>
            <div>
                
            </div>
            <button
              onClick={() =>
                handlePostReaction(propsData.id, idUser.id, reactions[0].id)
              }
            >
              reaction{" "}
            </button>
            <div>
            {userReactions}

            </div>
          </div>
        </div>
      ))}
    </>
  );
}

// {count === 0 ? (

//     <div>
//       <button onClick={() => handlePostReaction(1, id0)}>
//         <img src={url0} width="50px" />{" "}
//       </button>
//       <button onClick={() => handlePostReaction(2, id1)}>
//         <img src={url1} width="50px" />
//       </button>
//     </div>
//   ) : count === 1 ? (
//     <button onClick={() => handleRemoveReaction(0, id0)}>
//       <img src={url0} width="100px" />
//     </button>
//   ) : count === 2 ? (
//     <button onClick={() => handleRemoveReaction(0, id1)}>
//       <img src={url1} width="100px" />
//     </button>
//   ) : (
//     "null"
//   )}
