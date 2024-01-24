import { useEffect, useState } from "react";
import styled from "styled-components";
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

function Veggie() {

  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  },[]);

  const getVeggie = async () => {

    const check = localStorage.getItem('veggie');
    if(check){
      setVeggie(JSON.parse(check));
    }else{
      const api = await fetch (`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=15&tags=vegetarian`);
      const data =await api.json();

      localStorage.setItem('veggie', JSON.stringify(data.recipes));
      console.log(data);
      setVeggie(data.recipes)
    }
  }


  return (
    <div>
      <Wrapper>
        <h3>Vegetarian</h3>
        <Splide options={{
          perPage: 4,
          arrows: false,
          pagination: true,
          drag: 'free',
          gap: '5rem',
        }}>
          {veggie.map((recipe) => {
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
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    height: 40%;
    width: 100%;
    color: white;
    text-align: center;
    font-weight: 400;
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
`;

export default Veggie