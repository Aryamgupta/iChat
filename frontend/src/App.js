import "./App.css";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import HomePage from "./Components/HomePage";
import ChatPage from "./Components/ChatPage";

function App() {
  return (
    <div className="App">
      <Route path="/" component={HomePage} exact />
      <Route path="/chats" component={ChatPage} exact />
    </div>
  );
}

export default App;
