import "./App.css";
import { Item } from "./components/Item";
import { CartItem } from "./components/cartItem";
import { useState } from "react";
import data from "./assets/data.json";
import { Checkout } from "./components/checkout";

function App() {
  const [cart, setCart] = useState([]);
  const [displayCart, setDisplayCart] = useState(false);
  const [displayCheckout, setDisplayCheckout] = useState(false);
  const [displayThankMessage, setDisplayThankMessage] = useState(false);
  const [isVeganOnly, setIsVeganOnly] = useState(false);
  const [isGlutenFreeOnly, setIsGlutenFreeOnly] = useState(false);
  const [availableItems, setAvailableItems] = useState(data);
  const [keyword, setKeyword] = useState("");

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
    var newCart = [];
    for (const element of cart) {
      newCart.push(element);
      if (item.name === element.name) {
        if (element.count === 1) {
          newCart.pop();
        } else {
          newCart[newCart.length - 1].count -= 1;
        }
      }
    }

    setCart(newCart);
  }

  function toggleDisplayCart() {
    setDisplayCart(!displayCart)
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

  function sortCaloricCount() {
    const copy = [...availableItems];
    copy.sort((a, b) => parseFloat(a.estimatedCalories) - parseFloat(b.estimatedCalories));
    setAvailableItems(copy);
  }

  function searchWithKeyWord(keyword) {
    let reduced = data.filter(copy => copy.name.toLowerCase().includes(keyword.toLowerCase()) === true || copy.description.toLowerCase().includes(keyword.toLowerCase()) === true);
    setAvailableItems(reduced);
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

  function resetGetAll() {
    setAvailableItems(data);
  }

  function checkoutItems() {
    document.getElementById('checkout').scrollIntoView({behavior: "smooth", block: "end"});
    setDisplayCheckout(true);
    setDisplayThankMessage(false);
  }

  function submitCheckout() {
    setCart([]);
    setDisplayCart(false);
    setDisplayCheckout(false);
    setDisplayThankMessage(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    searchWithKeyWord(keyword)
  }

  return (
    <div className="App">
      <p className="title">Pingu Pingu Bakes</p>
      <p className="sub-title">Explore Pingu's delicacy ~ SOUTH POLES BEST NOOT NOOOOOOOOT</p>
      <img src={require("./assets/images/pingu-noot.jpeg")} alt="pingu noot" className="item-image" style={{margin: 20}}></img>

      <button className="cart-button" onClick={toggleDisplayCart} style={{background: "#754bad"}}>Cart: {cart.reduce((partialSum, a) => partialSum + a.count, 0)}</button>

      { displayCart && (
        <div className="overlay">
          <div>
            <h1>Cart</h1>
            {cart.map((item, index) => (
              <CartItem key={index} item={item} addCart={removeOneFromCart}></CartItem>
            ))}
            <h2>Total price: {getTotalPrice(cart)}</h2>
            { cart.length > 0 && (
              <button className="price-button" onClick={checkoutItems} style={{background: "#754bad"}}>Checkout</button>
              // <a href="#checkout">asd</a>
            )}
          </div>
        </div>)
      }

      <form onSubmit={handleSubmit}>
        <label style={{all: "unset"}}>Search by keyword:
          <input 
            type="text" 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form>

      <div className="filter-container">
        <button className="price-button" onClick={resetGetAll} style={{background: "#66a1ed"}}>Get all items</button>
        <button className="price-button" onClick={sortPrice}>Sort by Price</button>
        <button className="price-button" onClick={sortCaloricCount}>Sort by Caloric Count</button>
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

      <h1>Contact</h1>
      <h3>Number: 999-888-7777</h3>
      <h3>Email: pingupingubakes@southpole.net</h3>
      <h3 style={{marginBottom: 120}}>Address: Some Igloo</h3>

      <div id="checkout">
        <Checkout totalPrice={getTotalPrice(cart)} submitCheckout={submitCheckout} displayCheckout={displayCheckout} displayThankMessage={displayThankMessage}/>
      </div>

    </div>
  );
}

export default App;
