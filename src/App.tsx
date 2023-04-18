import { Carts } from "./tasks/Carts";
import { Products } from "./tasks/Products";
import { Users } from "./tasks/Users";

function App() {
  return (
    <div className="App">
      <Products />
      <Users />
      <Carts />
    </div>
  );
}

export default App;
