import "./App.css";
import useRateLimitReset from "./app/rateLimitObserver";
import Feed from "./components/feed/Feed";

function App() {
  useRateLimitReset();

  return (
    <>
      <header>
        <aside>
          <nav></nav>
        </aside>
      </header>
      <main>
        <Feed />
      </main>
    </>
  )
}

export default App
