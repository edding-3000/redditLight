import { useEffect } from 'react';
import './App.css';
import Reddit from './redditAPI/reddit';

function App() {

  useEffect(() => {
    // console.log(Reddit.rateLimitTime);
    let rateTimer;
    if (Reddit.rateLimitTime > 0) {
      rateTimer = setTimeout(() => {
        localStorage.removeItem("rateLimitSet");
        localStorage.removeItem("rateLimitTime");
        localStorage.removeItem("numOfFetches");
      }, Reddit.rateLimitTime);
    } else {
      localStorage.removeItem("rateLimitSet");
      localStorage.removeItem("rateLimitTime");
      localStorage.removeItem("numOfFetches");
      clearTimeout(rateTimer);
    }

    return () => {
      clearTimeout(rateTimer);
    };
  }, [])

  return (
    <>
      <p>There is content :)</p>
    </>
  )
}

export default App
