
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [movieList, setMovieList] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  const [final, setFinal] = useState('');

  const fetchData = (searchKey) => {
    const options = { 
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '76c6645bbdmshf825bea4b74608bp1480c6jsnc3aed6d66334',
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
      }
    };
    fetch(`https://online-movie-database.p.rapidapi.com/auto-complete?q=+${searchKey}`, options)
      .then(response => response.json())
      .then(data => {
        console.log(data.d);
        setMovieList(data.d)
      })
      .catch(err => console.error(err));
  }
  const onSubmitHandler = (e) =>{
    e.preventDefault();
    fetchData(searchKey);
  }
  
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="App">
      <form onSubmit={onSubmitHandler}>
          <input type='text' value={searchKey} onChange={(e) => setSearchKey(e.target.value)}/>
          <button type='submit'>Submit</button>
      </form>

      {
        movieList &&
        movieList.map((movie) => {
          return (
            <div key={movie.id}>
              {movie.l}
              <img scr={movie.i ? movie.i.imageUrl : '#'} alt="movie poster" />
            </div>
          )
        })
      }
      Hello
    </div>
  );
}

export default App;
