import styled from "styled-components";

const CardStyle = styled.div`
    width: 320px;

    img {
        width: 100%;
    }
    
`

function HomeCards() {
    return (
        <>
            <CardStyle>
                <div>
                    <img src="http://placeimg.com/640/480/nightlife" alt="Nombre Orquesta" />
                </div>
                <div>
                    <h3>Tipo de Orquesta</h3>
                    <h2>Nombre de Orquesta</h2>
                    <p>Rerum a autem nihil magni quidem eligendi totam aut voluptas. Maxime architecto hic corporis itaque voluptatibus. Repellendus consequatur qui vero doloribus recusandae et atque unde qui.</p>
                </div>
                <div>
                    <div>Vistas: 1234</div>
                    <div>Comentarios: 7</div>
                    <div>Archivos: 7</div>
                </div>
                <div>
                    <button>Ver más</button>
                </div>
            </CardStyle>
        </>
    )
}

export default HomeCards;