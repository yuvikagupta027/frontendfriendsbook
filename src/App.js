import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import './App.css';
import Home from "./Home";
import Login from "./Login";
import Message from "./Message";
import Suggestions from "./Suggestions";
import Viewprofile from "./Viewprofile";
import Requests from "./Requests";
import Profile from "./Profile";
import Profile2 from "./Profile2";
import Viewprofile2 from "./Viewprofile2";
import Friendslist from "./Friendslist";
import Friends from "./Friends";
import Friendss from "./Friendss";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/Profile" element={<Profile />}></Route>
          <Route path="/Profile2" element={<Profile2 />}></Route>
          <Route path="/Message" element={<Message />}></Route>
          <Route path='/Message/:id' element={<Message />}></Route>
          <Route path="/Friends" element={<Friends />}></Route>
          <Route path="/Friendss" element={<Friendss />}></Route>
          <Route path="/Friendss/:id" element={<Friendss />}></Route> {/* used only when id is to be called on same page */}
          <Route path="/Friendslist" element={<Friendslist />}></Route>
          <Route path="/Suggestions" element={<Suggestions />}></Route>
          <Route path="/Viewprofile" element={<Viewprofile />}></Route>
          <Route path="/Viewprofile2" element={<Viewprofile2 />}></Route>
          <Route path="/Requests" element={<Requests />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;