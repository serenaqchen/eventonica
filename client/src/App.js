import logo from "./calendar.png";
import "./App.css";
import Footer from "./components/Footer";
import Users from "./components/Users";
import Events from "./components/Events";

function App() {
  return (
    <div className="App">
      <header>
        <img src={logo} alt="Calendar Star Logo" />
        <h1>eVenonicA</h1>
      </header>

      <main>
        <aside className="users">
          <Users />
        </aside>
          <Events />
      </main>

      <Footer />
    </div>
  );
}

export default App;
