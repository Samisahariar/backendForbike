
```
Hey There! 🙌 
🤾 This ⭐️ is a Simple Bike Store database management . 
```
# Project Title

This is express project using Express with the TypeScript ,integrating the MongoDB with Mongoose to manage the data of an Bike Store. Exsures the data integrety using Mongoose validation.


## Technology Used
 - [TypeScript](https://www.typescriptlang.org/)
 - [Node.js](https://nodejs.org/en)
 - [Express.js](https://expressjs.com/)
 - [MongoDB ](https://www.mongodb.com/)
 - [Mongoose](https://mongoosejs.com/)


## API Reference

#### Create Data into the Database

```http
  POST /api/products
```
| Parameter | Type     | message               |
| :-------- | :------- | :------------------------- |
| `api_key` | `object` | Bike created successfully |

#### Get the Data from the Database according to the name, category and brand of the bike .

```http
  GET /api/products
```

| Parameter | Type     | message               |
| :-------- | :------- | :------------------------- |
| `value of name ,category or 
brand of the Bike` | `object` | Bike created successfully |



#### Get Specific Bike .

```http
  GET /api/products/:productId
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |



#### Update a Bike .

```http
  PUT /api/products/:productId
```

| Parameter | Type of Update| message               |
| :-------- | :------- | :------------------------- |
| `Specific id of a bike to update ` | `object` | Bike updated successfully |





#### Update a Bike .

```http
  PUT /api/products/:productId
```

| Parameter | Type of Update| message               |
| :-------- | :------- | :------------------------- |
| `Specific id of a bike to update ` | `object` | Bike updated successfully |



#### Delete a Bike by the product id ! .

```http
  DELETE /api/products/:productId
```

| Parameter | Type of Update| message               |
| :-------- | :------- | :------------------------- |
| `Specific id of a bike to update ` | `object` | Bike deleted successfully |



#### Order a Bike .

```http
  POST /api/orders
```

| Parameter | Type of the parameter | message               |
| :-------- | :------- | :------------------------- |
| `To Pass the email of the user and
the quantity of the product also with the 
product ID ` | `object` | Order Created successfully |


#### Calculate Revenue from Orders (Aggregation).

```http
  POST /api/orders/revenue
```

| Parameter | Type of the parameter | message               |
| :-------- | :------- | :------------------------- |
| `none ` | `none` | {"totalRevenue": 3600Total revenue calculated from all orders} |



















#### add(num1, num2)

Takes two numbers and returns the sum.


## Acknowledgements
- This is one of my project is given by the Programming hero from that i learned about express.js ,crud operation's of the mongodb using the mongoose integrity with the help of the typeScript.
- Libraries used in this project are given below :
     - cors
     - dotenv.
     - zod
     - mongoose
     - eslint(for schema validation)
     - prettier


![Logo](https://raw.githubusercontent.com/cdimascio/dotenv-kotlin/master/assets/kotlin-dotenv-logo.png)
![Logo](https://geekyants.github.io/express-typescript/public/images/express-typescript.png)
![Logo](https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg)
![Logo](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*rL8Buu7o6jnG-TYV1WubeQ.png)

