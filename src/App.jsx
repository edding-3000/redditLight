import { SkeletonTheme } from "react-loading-skeleton";
import "./App.css";
import useRateLimitReset from "./app/rateLimitObserver";
import Feed from "./components/feed/Feed";
import Navigation from "./components/nav/Navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { cleanupStore } from "./features/reddit/redditSlice";

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

  return (
    <SkeletonTheme baseColor="#222222" highlightColor="#292929">
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
