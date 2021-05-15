import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from "react-router-dom"
import db from "../firebase"

function Detail() {

    const { id } = useParams();
    const [movie, setmovie] = useState()

    useEffect(() => {
        //grab the moive from db
        db.collection("movies")
            .doc(id)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    //save the movie data
                    setmovie(doc.data());
                } else {
                    //redirect to home page
                }
            })
    }, [])
    console.log(movie);

    return (
        <Container>
            {movie && (<>
                <Background>
                    <img src={movie.backgroundImg} alt="" />
                </Background>
                <ImageTitle>
                    <img src={movie.titleImg} alt="" />
                </ImageTitle>
                <Controls>
                    <PlayButton>
                        <img src="/images/play-icon-black.png" alt="" />
                        <span>Play</span>
                    </PlayButton>
                    <TrailerButton>
                        <img src="/images/play-icon-white.png" alt="" />
                        <span>Trailer</span>
                    </TrailerButton>
                    <Addbutton>
                        <span>+</span>
                    </Addbutton>
                    <GroupWatchButton>
                        <img src="/images/group-icon.png" alt="" />
                    </GroupWatchButton>
                </Controls>
                <SubTitle>
                    {movie.subTitle}
                </SubTitle>
                <Description>
                    {movie.description}
                </Description>
                </>)
            }
        </Container>
    )
}

export default Detail

const Container = styled.div`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    position: relative;
`

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    opacity: 0.8;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const ImageTitle = styled.div`
    height: 30vh;
    min-height: 170px;
    width: 35vw;
    min-width: 200px;
    margin-top: 60px;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        // padding-top: 8vh;
    }
`

const Controls = styled.div`
    display: flex;
    align-items: center;
    margin-top: 30px;
`

const PlayButton = styled.button`
    border-radius: 4px;
    font-size: 15px;
    display: flex;
    align-items: center;
    height: 56px;
    background: rgb(249, 249, 249);
    border: none;
    padding: 0 24px;
    margin-right: 22px;
    letter-spacing: 1.8px;
    cursor: pointer;

    &:hover {
        background-color: rgb(198, 198, 198);
    }
`

const TrailerButton = styled(PlayButton)`
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgb(249, 249, 249);
    color: rgb(249, 249, 249);
    text-transform: uppercase;
`

const Addbutton = styled.button`

    width: 44px;
    height: 44px;
    margin-right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 2px solid white;
    background-color: rgba(0, 0, 0, 0.6);
    cursor: pointer;

    span {
        font-size: 30px;
        color: white;
    }
`

const GroupWatchButton = styled(Addbutton)`
    background: rgba(0, 0, 0);
`

const SubTitle = styled.div`
    color: rgb(249, 249, 249);
    font-size: 15px;
    min-height: 20px;
    margin-top: 26px;
`

const Description = styled.div`
    line-height: 1.4;
    font-size: 20px;
    margin-top: 16px;
    color: rgb(249, 249, 249);
    max-width: 700px;
`