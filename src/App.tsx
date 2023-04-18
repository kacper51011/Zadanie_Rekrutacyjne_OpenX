import { Carts } from "./carts/CartsTask";
import { Products } from "./products/ProductsTask";
import { Users } from "./users/Users";

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
