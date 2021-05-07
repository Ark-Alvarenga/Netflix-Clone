import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './Components/MovieRow'
import FeaturedMovie from './Components/FeaturedMovie';
import Header from './Components/Header';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(()=>{
    const loadAll = async () => {
      // Getting full list
      let list = await Tmdb.getHomeList();
      console.log(list)
      setMovieList(list);

      // getting featured
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData (chosenInfo);
      console.log(chosenInfo)

    }

    loadAll();
  }, []);
  
  useEffect (()=>{
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);
  
  
  return (
  <div className="page">

    <Header black ={blackHeader}  />

    {featuredData &&
      <FeaturedMovie item={featuredData} /> 
    }


    <section className="lists">
      {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}  />
      ))}
    </section>

    <footer>
      Made by Archimedes Alvarenga 
      <div>
      All rights reserved to Netflix   
      </div>                      
      Data gathered from Themoviedb.org                      
    </footer>

    {movieList.length <= 0 && 
    <div className="loading">
      <img src="https://i.gifer.com/8Etj.gif" alt="Loading" />
    </div>
    }
  </div>
  );
}
