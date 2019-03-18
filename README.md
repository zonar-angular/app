# Zonar

**PLEASE MAKE SURE YOU HAVE THE SERVER RUNNING AT PORT 3000 BEFORE STARTING!** The server can be found in the same organization in the server repo.

This is a basic Angular app that utilizes a Node.js back-end server to allow a user to add, edit, delete, or create new products in their product list. Two routes are supported.

## `:4200`
The home page. User is welcomed. Clicking on `See Your Products` will take user to products page. Using nav bar at top will redirect to home, and products pages depending on which user clicks.

## `:4200/products`
User's product page. Allows user to see all products, create new products, delete or update their existing products.

## Modules
### App
Imports and declares all necessary components and modules

### Material
Imports and exports all necessary design themes from Angular Material

### App-Routing
Routes to either `/` or `/products`

## Models
### Product
Supports SKU, description, and price. Optional ID creation purposes.

## Components
### App
App HTML is nav bar that redirects user based on click

### Welcome
Only purpose of welcome is to greet user and redirect

### Products
Allows user to interact with products

## Services
### Products
Uses HttpClient to send requests to server

## Validators
### Price
Validates price as US currency

## Development server
Run `ng serve --open` for a dev server. This command will automatically direct you to the open page.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## TO-DO
- Pages for 404 and 400
- More testing
- Implement Sass instead of CSS for better theme control
- Dialog flyout for form
- Validation for same SKU
