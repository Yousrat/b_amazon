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
				 	 for (var i = 0; i < results.length; i++) {
    	//id.push(results[i].id);
    	//product.push(results[i].product_name);
    	//price.push(results[i].price);
        console.log("You chose to buy: " +results[i].product_name);

        }
				 	//console.log(results);
				 	qInquiry(answer.choice);	
					});
		 		});		
	}
	
	
	function qInquiry(item){
		inquirer.prompt([
					  {
					    type: "input",
					    name: "quantity",
					    message: "Please enter the quantity you would like to purchase:"
					  }
		]).then(function(answer) {
						
		connection.query("SELECT `stock_quantity`,`price` FROM Products WHERE ?", [{

						id : item
						}], function(err, results) {
								if (err) throw err;
					 			//console.log("We have "+results[j].stock_quantity + " left in stock");
					 			for (var j = 0; j < results.length; j++) {
					   console.log("Price of 1 item is : $"+results[j].price);
					   console.log("We have "+results[j].stock_quantity + " left in stock");
	        			if (answer.quantity < parseInt(results[j].stock_quantity)){
	        				connection.query("UPDATE Products SET ? WHERE ?", [{
          					stock_quantity: parseInt(results[j].stock_quantity)-1
        				}, { id: item

        				 }], function(error) {
								if (err) throw err;

							});		
							console.log("The total cost of your purchase is "+ results[j].price * answer.quantity);
							console.log("Your items will be shipped right away, Thank you");
							console.log("now we have "+results[j].stock_quantity + " of this item left in stock");

						}
									 	//  if (answer.quantity === 0 ){
											// console.log("zero");
									 	// }
									 	
									 	 if (answer.quantity > parseInt(results[j].stock_quantity)){
											console.log("Oh sorry, we only have "+results[j].stock_quantity+ " of this item left in stock" );
									 	}
        						 }
        						 
		});		
								 
		});
	}




