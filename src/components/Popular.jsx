import { useEffect, useState } from "react";
import styled from "styled-components";
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

function Popular() {

  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  },[]);
  // Empty array, to only run it when component gets mounted

  // Fetching the recipes from Spoonacular API
  const getPopular = async () => {

    // Storing API to local storage
    const check = localStorage.getItem('popular');
    if(check){
      setPopular(JSON.parse(check));
    }else{
      const api = await fetch (`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=15`);
      const data =await api.json();

      localStorage.setItem('popular', JSON.stringify(data.recipes));
      console.log(data);
      setPopular(data.recipes)
    }
  }


  return (
    <div>
      <Wrapper>
        <h3>Popular Recipes</h3>
        <Splide options={{
          perPage: 4,
          arrows: false,
          pagination: true,
          drag: 'free',
          gap: '5rem',
        }}>
          {popular.map((recipe) => {
            return(
              <SplideSlide key={recipe.id}>
                <Card>
                <p>{recipe.title}</p>
                <img src={recipe.image} alt={recipe.title} />
                <Gradient />
              </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  )
  
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  p {
    position: absolute;
    z-index: 5;
    left: 50%
    top: 0%;
    height: 40%;
    width: 100%;
    color: white;
    text-align: center;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  height: 100%;
  width: 100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`

export default Popular