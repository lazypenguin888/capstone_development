import "./App.css";
import { Item } from "./components/Item";
import { CartItem } from "./components/cartItem";
import { useState } from "react";
import data from "./assets/data.json";

function App() {
  const [cart, setCart] = useState([]);
  const [isVeganOnly, setIsVeganOnly] = useState(false);
  const [isGlutenFreeOnly, setIsGlutenFreeOnly] = useState(false);
  const [availableItems, setAvailableItems] = useState(data);

  function addToCart(item) {
    var inCart = false;
    const copy = [...cart];
    for (const element of copy) {
      if (item.name === element.name) {
          element.count += 1;
          inCart = true;
          break;
      }
    }

    if (inCart === false) {
      copy.push({name: item.name, price: item.price, count: 1});
    }

    setCart(copy);
  }

  function removeOneFromCart(item) {
    var newCart = []
    for (const element of cart) {
      newCart.push(element)
      if (item.name === element.name) {
        if (element.count === 1) {
          newCart.pop()
        } else {
          newCart[newCart.length - 1].count -= 1
        }
      }
    }

    setCart(newCart)
  }

  function getTotalPrice(cart) {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price * cart[i].count;
    }
    return total.toFixed(2);
  }

  function sortPrice() {
    const copy = [...availableItems];
    copy.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    setAvailableItems(copy);
  }

  function filterVegan() {
    if (isVeganOnly === false) {
      setIsVeganOnly(true);
      setAvailableItems(availableItems.filter(availableItems => availableItems.vegan === "yes"));
    } else {
      setIsVeganOnly(false);

      if (isGlutenFreeOnly === true) {
        setAvailableItems(data.filter(data => data.glutenfree === "yes"));
      } else {
        setAvailableItems(data);
      }
    }
  }

  function filterGlutenFree() {
    if (isGlutenFreeOnly === false) {
      setIsGlutenFreeOnly(true);
      setAvailableItems(availableItems.filter(availableItems => availableItems.glutenfree === "yes"));
    } else {
      setIsGlutenFreeOnly(false);

      if (isVeganOnly === true) {
        setAvailableItems(data.filter(data => data.vegan === "yes"));
      } else {
        setAvailableItems(data);
      }
    }
  }

  return (
    <div className="App">
      <h1>My Bakery</h1>

      <div className="filter-container">
        <button className="price-button" onClick={sortPrice}>Sort by Price</button>
        <div>
          <div style={{marginBottom: "-10px"}}>Vegan</div>
          <input type="checkbox" id="switchVegan" onClick={filterVegan}/><label className="vegan-label"for="switchVegan"></label>
        </div>
        <div>
          <div style={{marginBottom: "-10px"}}>Gluten-Free</div>
          <input type="checkbox" id="switchGlutenFree" onClick={filterGlutenFree}/><label for="switchGlutenFree"></label>
        </div>
      </div>

      <div class="items-wrapper">
        {availableItems.map((item, index) => (
          <Item key={index} item={item} addCart={addToCart}></Item>
        ))}
      </div>

      <div>
        <h2>Cart</h2>
        {cart.map((item, index) => (
          <CartItem key={index} item={item} addCart={removeOneFromCart}></CartItem>
        ))}
        <h2>Total price: {getTotalPrice(cart)}</h2>
      </div>

    </div>
  );
}

export default App;
