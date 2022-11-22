
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

  const jeje2 =async () => {
    const yeyo= await postImageCloudinary('https://img.freepik.com/vector-premium/dibujo-estilo-dibujos-animados-planos-negocios-conductor-musica-hombre-musico-actuar-escenario-dirigiendo-orquesta-sinfonica-conjunto-instrumental-interpretacion-musica-clasica-ilustracion-vector-diseno-grafico_620206-865.jpg?w=2000')
    const je3 = console.log(yeyo);
    return je3
  }
 

  
  

  console.log('este es images' ,images)
  console.log('este es orchestras',orchestra)
  let jeje= 'https://res.cloudinary.com/orchestrascloudinary/image/upload/v1669086402/LogoOrchestra_x8vlt7.jpg';
 
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
