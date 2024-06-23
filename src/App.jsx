import "./App.css";
import useRateLimitReset from "./app/rateLimitObserver";
import Feed from "./components/feed/Feed";
import Navigation from "./components/nav/Navigation";

function App() {
  useRateLimitReset();

  return (
    <>
      <Navigation />
      <main>
        <Feed />
      </main>
    </>
  )
}

export default App
