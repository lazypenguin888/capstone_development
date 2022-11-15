// TODO: create a component that displays a single bakery item
export function Item(props) {
    return (
        <div>
            <img src={props.item.image} alt="Italian Trulli"></img>
            <p>{props.item.name}</p>
            <p>About: {props.item.description}</p>
            <p>Price: {props.item.price}</p>
            <button onClick={() => props.addCart(props.item)}>Add To Cart</button>
        </div>
    )
}
