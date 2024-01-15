import { useEffect, useState } from "react";

function Popular() {

  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  },[]);
  // Empty array, to only run it when component gets mounted

  // Fetching the recipes from Spoonacular API
  const getPopular = async () => {
    const api = await fetch (`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=15`)
    const data =await api.json();
    console.log(data);
    setPopular(data.recipes)
  }


  return (
    <div>
      {popular.map((recipe) => {
        return (
          <div key={recipe.id}>
            <p>{recipe.title}</p>
          </div>
        );
      })}
    </div>
  )
  
}

export default Popular