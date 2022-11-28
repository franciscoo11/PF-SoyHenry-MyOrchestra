import axios from "axios";
import { useEffect, useState } from "react";
import { Orquestas, Users, Comments } from "../../utils/fakeDB";

export default function UserComments({ comment }: any) {
  const { content, userId } = comment;
  const [image, setImage] = useState();

  useEffect(() => {
    axios
      .get(`/api/user?userId=${userId}`)
      .then((res) => setImage(res.data.avatar));
  }, []);

  return (
    <>
      <div className="users-comments-container">
        <div
          className="user-pic"
          style={{
            backgroundImage: `url(${image ? image : "/blank_profile.png"})`,
          }}
        ></div>
        <div className="user-comment">
          <p>{content}</p>
        </div>
      </div>
    </>
  );
}
