# Backend E-commerce
Technical test respository for web developer in Resilia Educação.
The project is a **product management system** for an e-commerce site where the administrator can register products and categories.

 ### ○ Made With 
  <kbd> <br> Node.js <br> </kbd> ⇢ _Backend Runtime Enviroment_\
  <kbd> <br> PostgreSQL (ElephantSQL) <br> </kbd> ⇢ SQL Database_\
  <kbd> <br> ESLint <br> </kbd> ⇢ _Javascript Linting_\
  <kbd> <br> Prettier <br> </kbd> ⇢ _Code Formatter_\
  <kbd> <br> Swagger & Redocly <br> </kbd> ⇢ _Documentation_

 ### 🌐 DEPLOY 
 
[![Deploy to Cyclic](https://deploy.cyclic.app/button.svg)](https://monitoria-webdev.cyclic.app/)


## 📑 Documentation

 | Route | Description |
 | ----- | ----------- |
 | <kbd> /api-docs </kbd> | [Structured API documentation](https://monitoria-webdev.cyclic.app/api-docs/) |
 | <kbd> /swagger </kbd>  | [Swagger JSON](https://monitoria-webdev.cyclic.app/swagger/) |
 | <kbd> /docs </kbd>     | [Redocly API documentation](https://monitoria-webdev.cyclic.app/docs/) 

 ### ○ Environment Variables
```
  POSTGRES_URL=
  TOKEN_API=
```

### ○ SQL Database

<a href="https://ibb.co/ssjSLXM"><img src="https://i.ibb.co/mhJsQPM/imagem-2023-02-07-113756456.png" alt="imagem-2023-02-07-113756456" border="0" /></a>

```sql
  CREATE TABLE category (id serial PRIMARY KEY, name VARCHAR(45) UNIQUE NOT NULL);
  CREATE TABLE product (id SERIAL PRIMARY KEY, description VARCHAR(45) UNIQUE NOT NULL, 
  retail_price DECIMAL(13,2), wholesale_price DECIMAL(13,2), categories json);
```


## ⚙️ Running this project locally

<samp>
  
> **Warning** 
> Requirements: Git, Node.js, Code Editor.

</samp>

```bash
# Clone repository
$ git clone <https://github.com/ellenmariadev/monitoria-webdev.git>

# Install dependecies
$ npm install

# Run application 
$ npm run dev

# Server running at PORT 5050
$ <http://localhost:5050>
```
