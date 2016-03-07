 var express = require("express");
 var app = express();
 var colors = require('colors');
 var term = require('terminal-kit').terminal;
 var request = require('request');
 var cron = require('node-schedule');
 var moment = require('moment');
 var crypto_list = [];

 var port = process.env.PORT || 3000;
 app.listen(port, function() {

 	var minutes = 5,
 		the_interval = minutes * 60 * 1000;
 	setInterval(function() {
 		runner();
 	}, the_interval);

 	var runner = function() {
 		request('http://coinmarketcap.northpole.ro/api/v5/all.json', function(error, response, body) {
 			if (!error && response.statusCode == 200) {
 				var fbResponse = JSON.parse(body);

 				var lngth = fbResponse.markets.length - 1;
 				var count = lngth - lngth + 1;

 				var width = term.width;
 				var height = term.height;
 				for (var i = 0; i < 30; i++) {
 					crypto_list[i] = {
 						name: fbResponse.markets[lngth].symbol,
 						price: fbResponse.markets[lngth].price,
 						change1h: fbResponse.markets[lngth].change1h,
 						change7d: fbResponse.markets[lngth].change7d
 					}
 					lngth--;
 				}
 				term.clear();
 				term.windowTitle("Crypto Ticker");

 				var line_array = ['━'];

 				for (var i = 0; i < 30; i++) {
 					var run = 0;
 					while (run < width) {
 						process.stdout.write('━'.green);
 						run++;
 					}
 					console.log();
 					process.stdout.write(' ' + crypto_list[i].name.green.bold + "  \t |  ".red + "Price:   ".green + "USD: $".cyan + parseInt(crypto_list[i].price.usd) + ' - EUR: €'.cyan + parseInt(crypto_list[i].price.eur) + ' - BTC: '.cyan + parseInt(crypto_list[i].price.btc) + "  \t |  ".red + "Change Last Hour:   ".green + " USD: $".cyan + crypto_list[i].change1h.usd + ' EUR: €'.cyan + crypto_list[i].change1h.eur + ' BTC: '.cyan + crypto_list[i].change1h.btc + "  \t   |  ".red + "Change 7 Days:   ".green + " USD: $".cyan + crypto_list[i].change7d.usd + ' EUR: €'.cyan + crypto_list[i].change7d.eur + ' BTC: '.cyan + crypto_list[i].change7d.btc);
 					console.log();
 				}

 				var run = 0;
 				while (run < width) {
 					process.stdout.write('═'.green);
 					run++;
 				}
 				console.log();
 				var run = 0;
 				while (run < width) {
 					process.stdout.write('┅'.green);
 					run++;
 				}
 				var timestamp = moment.unix(fbResponse.timestamp);
 				// console.log( timestamp.format("HH:mm:ss") );
 				console.log('  Last Updated: '.cyan + timestamp.format("HH:mm:ss").yellow);
 				var run = 0;
 				while (run < width) {
 					process.stdout.write('┅'.green);
 					run++;
 				}
 			}
 		})

 	}
 	runner();
 });
