import { SkeletonTheme } from "react-loading-skeleton";
import "./App.css";
import useRateLimitReset from "./app/rateLimitObserver";
import Feed from "./components/feed/Feed";
import Navigation from "./components/nav/Navigation";

function App() {
  useRateLimitReset();

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
