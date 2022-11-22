
import Link from "next/link";
import styled from "styled-components";
import { postImageCloudinary } from "../../controllers/cloudinary";
import HomeCards from "./HomeCards";

export const StyledMain = styled.main`
  margin: 25px auto;
  width: 100%;
  max-width: 1440px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
  padding: 0 80px;

  section {
    grid-column: 1/4;

    .more-btn {
      float: right;
      font-size: 0.7em;
      padding: 6px 12px;
      color: ${({ theme }) => theme.colors.secondary};
      border: 1px solid ${({ theme }) => theme.colors.secondary};
      border-radius: 12px;
      :hover {
        background-color: ${({ theme }) => theme.colors.secondary};
        color: white;
      }
    }

    .orquestas {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 24px;
    }
  }

  aside {
    grid-column: 4/5;
    .temp-img {
      width: 100%;
    }
  }
`;

export default function HomeMainContent({ images,orchestra }:any) {
  const firstEntrys = () => {
    return orchestra.slice(0, 3);
  };




  
  let jeje= 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/421dcea1-ad22-471a-9e15-d1518417f327/dcpeb7c-f74a0627-5583-4aed-aa88-62533d2edb6e.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzQyMWRjZWExLWFkMjItNDcxYS05ZTE1LWQxNTE4NDE3ZjMyN1wvZGNwZWI3Yy1mNzRhMDYyNy01NTgzLTRhZWQtYWE4OC02MjUzM2QyZWRiNmUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Vl19MP-yBgx9ok3rdzuPUIogOAiXYKue_0qmE8_oShI';
  const updateImage= postImageCloudinary(jeje)
  return (
    <>
      <StyledMain>
        <section>
          <h2 className="section-title">
            Orquestas{" "}
            <span className="btn-container">
              <Link href={"/orchestras"} className="more-btn">
                Ver máss
                
              </Link>
              {images.map((imagess:any) =>(
                <img src={imagess.image}/>
              ))}
            </span>
          </h2>
          <div className="orquestas">
            {firstEntrys().map((orquesta: any, index: number) => (
              <HomeCards
                key={orquesta.id}
                id={orquesta.id}
                title={orquesta.name}
                subtitle={orquesta.location}
                content={orquesta.description.substr(0, 150)}
                image={jeje}
              />
            ))}
          </div>
        </section>
        <aside>
          <img
            className="temp-img"
            src="/aside_ref.png"
            alt="Campañas Solidarias"
          />
        </aside>
      </StyledMain>
    </>
  );
}
