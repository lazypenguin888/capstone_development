import "../App.css";

export function CartItem(props) {
    return (
        <div className="item-box" style={{width: "70%", padding: 10}}>
            <h4 style={{margin: 3}}>{props.item.name}</h4>
            <h5 style={{margin: 3}}>Price: {props.item.price}</h5>
            <h5 style={{margin: 3}}>Quantity: {props.item.count}</h5>
            <button onClick={() => props.addCart(props.item)} style={{margin: 3}}>Remove One From Cart</button>
        </div>
    )
}
