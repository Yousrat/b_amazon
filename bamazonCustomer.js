var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "adam123",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

connection.query("SELECT * FROM Products", function(err, results) {
    if (err) throw err;
    //console.log(results);
   //var id = [];
   //var product = [];
   //var price = [];
 console.log("Our products list:");
    for (var i = 0; i < results.length; i++) {
    	//id.push(results[i].id);
    	//product.push(results[i].product_name);
    	//price.push(results[i].price);
    	//console.log(id + product + price);
       
        console.log("Product id: " + results[i].id + ", Product name: " +results[i].product_name + ", price in $: "+results[i].price);
        }
});

      