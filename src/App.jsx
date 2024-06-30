import { SkeletonTheme } from "react-loading-skeleton";
import "./App.css";
import useRateLimitReset from "./app/rateLimitObserver";
import Feed from "./components/feed/Feed";
import Navigation from "./components/nav/Navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cleanupStore } from "./features/reddit/redditSlice";

function checkColorTheme() {
  if (window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    } else {
      return 'light';
    }
  } else {
    return 'dark';
  }
}

function App() {
  useRateLimitReset();

  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener('unload', handleTabClosing)
    return () => {
      window.removeEventListener('unload', handleTabClosing)
    }
  })
  const handleTabClosing = () => {
    dispatch(cleanupStore());
  }

  const [colorTheme, setColorTheme] = useState(checkColorTheme());

  useEffect(() => {
    function handleColorTheme() {
      setColorTheme(checkColorTheme());
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleColorTheme);

    return () => mediaQuery.removeEventListener('change', handleColorTheme);
  }, []);


  return (
    <SkeletonTheme baseColor={`${colorTheme == "dark" ? "#222222" : "#ececec"}`} highlightColor={`${colorTheme == "dark" ? "#292929" : "#f3f3f3"}`}>
      <>
        <Navigation />
        <main>
          <Feed />
        </main>
      </>
    </SkeletonTheme>
  )
}

export default App
