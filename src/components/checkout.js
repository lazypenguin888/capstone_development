import "../App.css";

export function Checkout(props) {
    return (
        <div>
            { props.displayCheckout && (
              <div>
                <h1>Checkout (pickup in store)</h1>
                  <form style={{margin: 10}}>
                    <label style={{all: "unset"}}>Name:
                      <input type="text" />
                      </label>
                  </form>
                  <form style={{margin: 10}}>
                    <label style={{all: "unset"}}>Desired pickup day:
                      <input type="text" />
                      </label>
                  </form>
                  <form style={{margin: 10}}>
                    <label style={{all: "unset"}}>Additional Comments:
                      <input type="text" />
                      </label>
                  </form>
                  <h4> Total price: {props.totalPrice} </h4>
                  <button className="price-button" onClick={props.submitCheckout} style={{background: "#754bad", marginBottom: 50}}>Checkout</button>
              </div>
            )}

            { props.displayThankMessage && (
              <div className="sub-title" style={{marginBottom: 50}}>Thank you for the order! See you soon!</div>
            )}
        </div>
    )
}
