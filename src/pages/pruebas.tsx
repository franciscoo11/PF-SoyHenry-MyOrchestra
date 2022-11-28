import axios from "axios";
import { useEffect, useState } from "react";

export default function Lr() {
  const [postData, setPostData] = useState({ title: "" });
  const [reactions, setReactions] = useState([
    { reaction: "", id: "" },
    { reaction: "", id: "" },
  ]);
  const [count, setCount] = useState(0);
  const url0 = reactions[0].reaction;
  const url1 = reactions[1].reaction;
  const id0 = reactions[0].id;
  const id1 = reactions[1].id;

  async function getPostData() {
    await axios.get("/api/post/claww932l0004vg1whw6e5xdx").then((response) => {
      setPostData(response.data[0]);
      console.log(response.data);
    });
  }

  async function getReactions() {
    await axios.get("http://localhost:3000/api/reaction").then((response) => {
      setReactions(response.data);
      console.log(response.data);
    });
  }

  const handlePostReaction = async (number: any, id: any) => {
    setCount(number);
    await axios.post(`/api/post-reaction?id=claww932l0004vg1whw6e5xdx`, {
      userId: "ac6913a8-9b0d-4277-a927-9019613f91a7",
      reactionId: id,
    });
  
  };
  const handleRemoveReaction = async (number: any, id: any) => {
    setCount(number);
    await axios.delete("/api/post-reaction?id=claww932l0004vg1whw6e5xdx", {
      data: { userId: "ac6913a8-9b0d-4277-a927-9019613f91a7", reactionId: id },
    });
  };

  useEffect(() => {
    getPostData();
    getReactions();
  }, []);

  return (
    <>
    <div> {postData.title }</div>
      {count === 0 ? (
        <div>
          <button onClick={() => handlePostReaction(1, id0)}>
            <img src={url0} width="50px" />{" "}
          </button>
          <button onClick={() => handlePostReaction(2, id1)}>
            <img src={url1} width="50px" />
          </button>
        </div>
      ) : count === 1 ? (
        <button onClick={() => handleRemoveReaction(0, id0)}>
          <img src={url0} width="100px" />
        </button>
      ) : count === 2 ? (
        <button onClick={() => handleRemoveReaction(0, id1)}>
          <img src={url1} width="100px" />
        </button>
      ) : (
        "null"
      )}
    </>
  );
}
