import styled from 'styled-components'

const HeroContainer = styled.div`
    box-sizing: border-box;
    width: 90%;
    height: 400px;
    background-image: url("https://cdn.pixabay.com/photo/2020/11/01/13/41/music-notes-5703813_960_720.jpg");
    background-size: cover;
    background-position: top;
    display: flex;
    margin: auto;


    div {
        box-sizing: border-box;
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding-left: 40px;

        h1 {
            color: white;
        }

    }

`

function HeroImage() {
    return (
        <>
        <HeroContainer>
            <div>
                <h1>Red de Orquestas Populares de Música Latinoamericana</h1>
                <button>Leer más</button>
            </div>
        </HeroContainer>
        </>
    )
}

export default HeroImage;