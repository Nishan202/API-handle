import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
//import DummyMovies from './DummyMovies';
import MoviesList from './Components/MovieList';
//import AddMovie from './Components/AddMovie';

function App() {

  const [movies , setMovies] = useState([]);

  const [isLoading , setIsLoading] = useState(false);  // initially laoding will be false

  const [error , setError] = useState(null);

  /*async function fetchMovieHandler(){
    setIsLoading(true); // when the function is called then it will start loading that means loading is true
    setError(null);
    
    try{
      const response = await fetch('https://swapi.py4e.com/api/films/');

      if(!response.ok){
        throw new Error('Something went wrong');
      }
      const data = await response.json();
    const transformedMovies = data.results.map(movieData => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date
      }
    })
    setMovies(transformedMovies);
    }
    catch (error){
      setError(error.message);
    }
    
    setIsLoading(false); // after fetching data loading is false because we got data
  };*/



  // If you want to fetch the data immediately when the page is load then use useEffect

  const fetchMovieHandler = useCallback(async () =>{
    setIsLoading(true); // when the function is called then it will start loading that means loading is true
    setError(null);
    
    try{
      // const response = await fetch('https://api-project-db973-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json');
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');


      if(!response.ok){
        throw new Error('Something went wrong');
      }
      const data = await response.json();
      const loadedMovies = [];
      
      for(const key in data){
        loadedMovies.push({
          id: key,
          title: data[key].title,
          // openingText: data[key].openingText,
          // releaseDate: data[key].releaseDate
          description: data[key].body
        })
      }

    // const transformedMovies = data.results.map(movieData => {
    //   return {
    //     id: movieData.episode_id,
    //     title: movieData.title,
    //     openingText: movieData.opening_crawl,
    //     releaseDate: movieData.release_date
    //   }
    // })

    setMovies(loadedMovies);
    }
    catch (error){
      setError(error.message);
    }
    
    setIsLoading(false); // after fetching data loading is false because we got data
  }, []);

  useEffect(() =>{
    fetchMovieHandler();
  }, [fetchMovieHandler]);


  // For sending data to server

  // async function addMovieHandler(movie){
  //   const response = await fetch('https://api-project-db973-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json', {
  //     method: 'POST',
  //     body: JSON.stringify(movie),
  //     headers: {
  //       'Content-type': 'application/json'
  //     }
  //   });
  //   const data = response.json();
  //   console.log(data);
  // }

  let content = <p>To show the movie list click on above button.</p>

  if(movies.length > 0){
    content = <MoviesList movies={movies} />;
  }

  if(error){
    content = <p>{error}</p>
  }

  if(isLoading){
    content = <p>Loading ....</p>
  }

  return (
    <React.Fragment>
      {/* <section>
        <AddMovie onAddMovie = {addMovieHandler} />
      </section> */}
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
