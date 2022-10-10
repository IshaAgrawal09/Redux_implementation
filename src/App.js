import "./App.css";
import "@shopify/polaris/build/esm/styles.css";
import Form from "./Components/Form";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
       <Routes>
         <Route path="/" element = {<Form />}/>
         <Route path="home" element={<Home />}/>
       </Routes>
      </div>
    </Provider>
  );
}

export default App;
