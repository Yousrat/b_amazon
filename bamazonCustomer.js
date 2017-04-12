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
        idInquiry();

});

	function idInquiry(){     
	  	inquirer.prompt([
					{
					    type: "input",
					    name: "choice",
					    message: "Please enter the product id you would like to purchase:"
					}
		]).then(function(answer) {
					//var inputId = answer.choice;
					//console.log(inputId);
					connection.query("SELECT `product_name` FROM Products WHERE ?", [{
					id : answer.choice
					}], function(err, results) {
				 	if (err) throw err;
				 	console.log(results);
				 	qInquiry();	
					});
		 		});		
	}
	
	
	function qInquiry(){
		inquirer.prompt([
					  {
					    type: "input",
					    name: "quantity",
					    message: "Please enter the quantity you would like to purchase:"
					  }
		]).then(function(answer) {
						console.log(answer.quantity);
						}), function(err, results) {
					 	if (err) throw err;
					 	}
						
	}


// if (chosenItem.highest_bid < parseInt(answer.bid)) {
//         // bid was high enough, so update db, let the user know, and start over
//         connection.query("UPDATE auctions SET ? WHERE ?", [{
//           highest_bid: answer.bid
//         }, {
//           id: chosenItem.id
//         }], function(error) {
//           if (error) throw err;
//           console.log("Bid placed successfully!");
//           start();
//         });
