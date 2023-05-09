import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home, Landing, Form, Detail, NotFound } from './views';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Switch>
        <Route exact path="/"><Landing/></Route>
        <Route path="/home"><Home/></Route>
        <Route path="/create"><Form/></Route>
        <Route exact path="/pokemons/:id"><Detail/></Route>
        <Route path="*"><NotFound/></Route>
      </Switch>
    </div>
  </BrowserRouter>
  );
}

export default App;