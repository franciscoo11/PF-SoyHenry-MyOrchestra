import Cover from "../../../frontend/components/Cover";
import MainNavBar from "../../../frontend/components/MainNavBar";
import OrchestraPosts from "../../../frontend/components/OrchestraPosts";
import Footer from "../../../frontend/components/Footer";
import AsideLeft from "../../../frontend/components/orchestras/AsideLeft";
import AsideRight from "../../../frontend/components/orchestras/AsideRight";
import { StyledMain } from "../../../frontend/styles/orchestras/sharedStyles";
import { prisma } from "../../../../lib/prisma";
import CreatePosts from "../../../frontend/components/CreatePosts";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";

export async function getServerSideProps({ params }: any) {
  try {
    const orchestra = await prisma.orchestras.findUnique({
      where: {
        id: params.id,
      },
    });

    return { props: { orchestra } };
  } catch (error) {
    console.log(error);
  }
}

function OrchestraDetails({ orchestra }: any) {
  const { id, name, description, logo, cover, location } = orchestra;
  const { user } = useUser();
  const [userId, setUserId] = useState();
  const [posts, setPosts] = useState({ results: 1, data: [] });
  const [loading, setLoading] = useState(true);
  const [commentPosted, setCommentPosted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

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
        `/api/post?orchestraId=${id}&type_PostId=clanisg15000wi5zzxjvr2hu8&optionOrder=desc`
      )
      .then((res: any) => setPosts(res.data))
      .finally(() => setLoading(false));
  }, [commentPosted]);

  const { data, results }: any = posts;
  let pages = Math.ceil(results / itemsPerPage);

  async function postAppend() {
    if (currentPage < pages - 1) {
      const nextPosts = await axios.get(
        `/api/post?orchestraId=${id}&type_PostId=clanisg15000wi5zzxjvr2hu8&optionOrder=desc&page=${
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
          <Cover
            cover={cover}
            title={name}
            location={location}
            id={id}
            user={user}
          />

          {user ? (
            <div className="form-container">
              {<CreatePosts orchestraId={id} userCreator={userId} />}
            </div>
          ) : null}
          <div className="filter-container">
            <div className="divider"></div>
            <div className="post-filter">
              Ordenar por: <b>Mas recientes</b>
            </div>
          </div>

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
          <div className="more-btn-container">
            <button
              className="more-btn"
              onClick={postAppend}
              disabled={currentPage === pages - 1}
            >
              Ver más...
            </button>
          </div>
        </section>
        <aside className="aside-right">
          <AsideRight />
        </aside>
      </StyledMain>
      <Footer />
    </>
  );
}

export default OrchestraDetails;
