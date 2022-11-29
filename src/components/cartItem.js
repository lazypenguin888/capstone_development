import "../App.css";

export function CartItem(props) {
    return (
        <div className="item-box" style={{width: "20%"}}>
            <h3>{props.item.name}</h3>
            <h5>Price: {props.item.price}</h5>
            <h5>Quantity: {props.item.count}</h5>
            <button onClick={() => props.addCart(props.item)}>Remove One From Cart</button>
        </div>
    )
}
