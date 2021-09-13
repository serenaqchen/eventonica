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
        <h1>Eventonica</h1>
      </header>

      <main>
        <aside className="user-and-events">
          <Users />
        </aside>
        <div>

        </div>
        <Events />
        <div className="search-toolbar">
            <h3>Find Events</h3>
            <form id="search" action="#">
              <fieldset>
                <label htmlFor="date-search">Date</label>
                <input type="text" id="date-search" placeholder="YYYY-MM-DD" />
              </fieldset>
              <fieldset>
                <label htmlFor="category-search">Category</label>
                <input type="text" id="category-search" />
              </fieldset>

              <input type="submit" value="Search" />
            </form>
        </div>
      </main>

      <Footer /> 

    </div>
  );
}

export default App;
