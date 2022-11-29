# Development

### Link to Deployed Website
If you used the stencil code, this is `https://<your GitHub username>.github.io/<name of your repository>`

### Goal and Value of the Application
The goal/value of the application is for users to view items of a bakery that can be sorted by price and filtered by either vegan and gluten-free options. Each backery item has a name, description, image, price, filter tags, and option to add to cart. Also, as users can add items to cart, they can view what they have in the cart, the total price, and option to remove items from cart.

### Usability Principles Considered
Layout:
    Made a grid for all bakery items easy to view, also separated each item as a round rectangle like a card. Use of colors to match concepts, like the vegan and gluten-free filters combined with the toggle button.

Hierarchy:
    Made sure to have all bakery items the same type of card/hierachy with emphasis of the item's name and example image. Shopping cart items were also same type of card/hierachy but smaller version of the bakery items listed as description/details are not important for cart items. Also hierachy of text for categories of bakery items and cart.

### Organization of Components
Had two main components which were Item and cartItem, they are relatively similar, the major difference is that the cartItem has less details and is smaller than that of the Item component. These components were created as they are multiple bakery items and they are in the same category.

### How Data is Passed Down Through Components
Data that is passed into the Item component is data from the data.json file which contains information name, description, price, image, vegan, and gluten-free. All that information is in the form of a list for each of the 12 bakery items and then mapped into each Item compoenent.

Data that is passed into the cartItem component is similar to that of the Item component but with only information on name, price, and count. That information is passed into the cartItem component the same wasy as the item component with the use of mappings.

### How the User Triggers State Changes
Each of the buttons and toggles on the page trigger state changes which are the add/remove to cart button, sort button, and toggle switch for vegan and gluten-free options. With the use of state/setState for availableItems and cart we can keep track of which items are available to shop based on user preferences and what is in the cart so far. When sorting price or filtering by vegan/gluten-free the avaiableItems state change is triggered. When the add to or remove from cart the cart state change is triggered.
