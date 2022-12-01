import { useRouter } from "next/router";
import Cover from "../../../frontend/components/Cover";
import MainNavBar from "../../../frontend/components/MainNavBar";
import { Orquestas, Posts, Users } from "../../../frontend/utils/fakeDB";
import OrchestraPosts from "../../../frontend/components/OrchestraPosts";
import { FiVideo, FiImage, FiFileText } from "react-icons/fi";
import Footer from "../../../frontend/components/Footer";
import AsideLeft from "../../../frontend/components/orchestras/AsideLeft";
import AsideRight from "../../../frontend/components/orchestras/AsideRight";
import { StyledMain } from "../../../frontend/styles/orchestras/sharedStyles";
import { prisma } from "../../../../lib/prisma";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import CreatePosts from "../../../frontend/components/CreatePosts";

export async function getServerSideProps({ params }: any) {
  try {
    const orchestra = await prisma.orchestras.findUnique({
      where: {
        id: params.id,
      },
    });

    const members = await prisma.users_on_orchestra.findMany({
      where: {
        orchestraId: params.id,
      },
      include: {
        user: true,
        rol: true,
      },
    });

    return { props: { orchestra, members } };
  } catch (error) {
    console.log(error);
  }
}

function OrchestraNews({ orchestra, members }: any) {
  const router = useRouter();
  const { id, name, description, logo, cover, location } = orchestra;
  const { user } = useUser();
  const [userId, setUserId] = useState();
  const [posts, setPosts] = useState({ results: 1, data: [] });
  const [loading, setLoading] = useState(true);
  const [commentPosted, setCommentPosted] = useState(false);
  const [posting, setPosting] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const postType = "clanisoey000yi5zzxnd76pwo";

  useEffect(() => {
    setLoading(true);
    if (user) {
      axios
        .get(`/api/user/${user.email}`)
        .then((res: any) => setUserId(res.data.id))
        .finally(() => setLoading(false));
    }
  }, [user]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `/api/post?orchestraId=${id}&type_PostId=${postType}&optionOrder=desc`
      )
      .then((res: any) => setPosts(res.data))
      .finally(() => setLoading(false));
  }, [commentPosted, posting]);

  const { data, results }: any = posts;
  let pages = Math.ceil(results / itemsPerPage);

  async function postAppend() {
    if (currentPage < pages - 1) {
      const nextPosts = await axios.get(
        `/api/post?orchestraId=${id}&type_PostId=${postType}&optionOrder=desc&page=${
          currentPage + 1
        }`
      );

      setPosts({ ...posts, data: data.concat(nextPosts.data.data) });
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <>
      <MainNavBar />

      <StyledMain>
        <aside className="aside-left">
          <AsideLeft logo={logo} id={id} user={user} />
        </aside>
        <section className="content">
          {/* <div className="form-container">
            <div
              className="pic"
              style={{ backgroundImage: `url(${Users[1].image})` }}
            ></div>
            <form className="post-form">
              <input
                className="post-input"
                type="text"
                placeholder="Nueva publicación..."
              />
              <div className="post-form-icons-container">
                <FiFileText />
                <FiVideo />
                <FiImage />
              </div>
            </form>
          </div> */}
          {user ? (
            <div className="form-container">
              {
                <CreatePosts
                  orchestraId={id}
                  userCreator={userId}
                  postType={postType}
                  setPosting={setPosting}
                />
              }
            </div>
          ) : null}
          {/* <div className="filter-container">
            <div className="divider"></div>
            <div className="post-filter">
              Ordenar por: <b>Mas recientes</b>
            </div>
          </div> */}

          <div className="posts">
            {loading ? (
              <p>Loading...</p>
            ) : (
              data.map((post: any) => (
                <OrchestraPosts
                  key={post.id}
                  post={post}
                  orchestra={orchestra}
                  userId={userId}
                  setCommentPosted={setCommentPosted}
                  user={user}
                />
              ))
            )}
          </div>
          {data.length ? (
            <div className="more-btn-container">
              <button
                className="more-btn"
                onClick={postAppend}
                disabled={currentPage === pages - 1}
              >
                Ver más...
              </button>
            </div>
          ) : null}
        </section>
        <aside className="aside-right">
          <AsideRight />
        </aside>
      </StyledMain>
      <Footer />
    </>
  );
}

export default OrchestraNews;
