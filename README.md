# Inventory Tracker

## About
Many businesses today are using multiple programs to keep track of their customers, employees, inventory, outgoing orders, and restocking needs. While
each program is individually effective, the complicated web leads to frequent issues where the information is not accurately communicated around. For
example, a business might try to sell something it's out of, or think it's out of something it isn't. This app works on the Inventory Tracker API to
consolidate a business' needs into one app.

For more information on how the API works, visit [the Inventory Tracker API page](https://github.com/abdih17/inventory-tracker).

### Framework
This app is built using AngularJS. Each view has a series of components that provides good separation of concerns using proper MVC structuring.

## Usage
Once a store has been created and the initial admin has been setup, an employee can begin adding products to their store's inventory.

### Managing Employees
First, visit the employee sign in page and login.

You will then be taken to the employee dashboard. From here, you can select a store that you'd like to view, seeing all employees currently assigned to that store. You can change what store you're viewing by using the dropdown menu near the top of the page.

If you've hired someone new, you can add them into your system by designating a name, email, password, and setting their admin privileges. Shipping employees can only handle outgoing orders to customers, while receiving employees can handle incoming orders to restock the warehouse. Admins can do everything.

If you have a lot of employees at a given location, you can search them using the search filter above the list of employees. Simply begin typing an employee's name, and the list will automatically be shortened to only those names that match what you've typed.

Once someone has finished their term of employment with your particular store, you can remove them from your list of employees by simply clicking on the delete button. Be careful - this can't be undone!

### Managing Product
#### Current Inventory
Navigate over to the /inventory endpoint to see a view of your store's current inventory. You can change what store you're viewing by simply selecting from the dropdown menu at the top.

You will see a list of all items you currently sell, along with their IDs, names, descriptions, how many you have left, their price, their category, and an edit button that will allow you to change anything except its ID. So if, for example, you need to change a product's name and price, all you have to do is click edit, change the fields, and click update.

If you're carrying a new product, you can simply fill out the fields at the bottom of the page and then click "add product."

#### Outgoing Orders
To view a list of any given store's outgoing orders, simply click on the outgoing tab. You will see that order's ID, the name of the person it's being shipped to, the date the order was created, and whether the customer has completed the order or if it's still pending.

### Customers
To create a new account, navigate over to the /create-account endpoint and fill out the fields. Plaintext passwords are never stored on our servers - as soon as the request is received, the password is hashed, salted, and the plaintext version is immediately deleted before the hashed version gets stored. No responses from the server will ever contain a password, hashed or not.

#### Profile Settings
To view a customer's profile, simply click on "my profile" or navigate to the /settings endpoint. Here, a customer can update their name, username, address, email, or change their password. They can also delete their account if they wish.

#### Dashboard
A customer can also view all of their previous orders by visiting the /customer-dashboard endpoint. If they have no previous orders, nothing will be displayed. Otherwise, they can see their order ID, date, ship to, and whether the order is pending or completed - just like a store's outgoing view.

### Shopping
Once a customer is logged in, they can visit the /shopping endpoint to purchase products. They can change which store they're ordering from by using the dropdown menu in the top.

If they wish to search for a product by category, they can use the filter box to begin typing in a category and the products displayed will only be those that match what the customer has typed.

#### Adding to Cart
One of the greatest strengths of Inventory Tracker is that you cannot order product that doesn't exist. Whenever the shopping view is loaded, a request is sent to the Inventory Tracker API, immediately updating the store's current inventory and remaining quantity. If a customer attempts to order more product than a store carries, nothing will be added to their cart and they will need to try again.

As soon as "add to cart" is clicked, a request is made to the API to instantly update the amount of product remaining in a store's inventory. If, for example, there were 10 hats at a clothing store, and customer A added 8 to their cart, then customer B tried to add 5 to their cart, customer B would be unable to, even though they hadn't checked out their order yet. This prevents a store from overselling product during particularly high volumes of traffic.

Each store that a customer orders from will create a separate outgoing order from that store. So, if a customer orders 10 hats from the clothing store, then changes to a pet shop and orders a fish, the customer will be able to see that they have two orders when they go to their cart to checkout.

### Cart
Once a customer has finished creating all their orders from any stores they wished to purchase from, they can click on "cart" in the top-right of the page.

Here, they can change any given order they're looking at by simply selecting from the dropdown menu near the top of the page.

They will also see the subtotals for any given item, along with a grand total for the whole order. If a customer wishes to change the amount of product they're ordering, they can also do that here by selecting "edit quantity." As with "add to cart," editing the quantity checks the API and will not allow a customer to edit their quantity to be higher than a store's current inventory - similarly, changing the quantity will immediately add or subtract the corresponding amount of product from the store's inventory.

So, if a store has 10 hats, and customer A puts 8 in their cart, then goes to their cart and tries to edit the quantity to 11, they will be unable to do so. Similarly, if they change the quantity to 9, the server will immediately update the clothing store's inventory to reflect that there is only 1 remaining, instead of 2.

A customer can also remove items from their order by simply clicking "remove from cart." This will immediately add all items back into a store's inventory.

Once a customer is pleased with their order, they can click "place order" to change its status from "pending" to "completed." Once an order has been completed, it will no longer show up in a customer's cart and they cannot make any changes to the order. They can, however, view it from their customer dashboard.
