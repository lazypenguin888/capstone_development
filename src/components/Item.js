import "../App.css";

export function Item(props) {
    return (
        <div className="item-box">
            <img src={require("../assets/" + props.item.image)} alt={props.item.name} className="item-image"></img>
            <h2>{props.item.name}</h2>
            <h5>{props.item.description}</h5>
            <h5>Price: {props.item.price}</h5>
            {props.item.vegan === "yes" &&
                <div className="tag" style={{background: "#ff617b"}}>vegan</div>
            }
            {props.item.glutenfree === "yes" &&
                <div className="tag">gluten-free</div>
            }
            <br></br>
            <button onClick={() => props.addCart(props.item)}>Add To Cart</button>
        </div>
    )
}
