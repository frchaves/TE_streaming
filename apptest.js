'use strict'

// modules used : plotly


var config = require('config.json')
  , username = config['zelder']
  , apiKey = config['KF919HRjP30tknjo9QLE']
  , token = config['8q3y3wh5vw']
  , Plotly = require('plotly')("zelder", "KF919HRjP30tknjo9QLE");
  //, Signal = require('random-signal');


var te_client = require('./te_client'),
	Client = new te_client({
		url: 'ws://stream.tradingeconomics.com/',
		key: 'guest', //API_CLIENT_KEY
		secret: 'guest' //API_CLIENT_SECRET
		//reconnect: true
	});



Client.subscribe('calendar'); //recive stream data for calendar events
Client.subscribe('stream');

Client.subscribe('EURUSD');


//Client.subscribe('CL1');

global.data = [
  {
    x: [] ,
    y: [] ,
    'type':'scatter',
    'mode':'lines+markers',
    stream: {token: '8q3y3wh5vw'}
  }
  ];


Client.on('message', function(msg){
	console.log('\n Data from TradingEconomics (EURUSD) stream: ', msg.topic);
	console.log(msg);

	//parse/save msg to DB


	var data =  [
	  {
	    x: msg.topic,
	    y: msg.price,
      'type':'scatter',
      'mode':'lines+markers',
      stream: {token: '8q3y3wh5vw'}
	  }
	];



var x = getTimeString(new Date());

function getTimeString (now) {
  var year = "" + now.getFullYear();
  var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month }
  var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day }
  var hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour }
  var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute }
  var second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second }
  var ms = "" + now.getMilliseconds(); while (ms.length < 3) { ms = "0"+ms }
  return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second + "." + ms;
}


global.data[0].x.push(x);
global.data[0].y.push(data[i].y);


console.log(global.data);


var graphOptions = {
    "filename": "stream TE"
  , "fileopt": "overwrite"
  , "layout": {
      "title": "streaming TradingEconomics EURUSD data"
  }
  , "world_readable": true
}


if (global.data != undefined){


   Plotly.plot(global.data, graphOptions, function (err, resp) {
  if (err) return console.log("ERROR", err)

    console.log(resp);

    var plotlystream = Plotly.stream('8q3y3wh5vw', function (err, res) {
      console.log(err, res);
      clearInterval(loop);
    });

    var i = 0;
 var loop = setInterval(function () {
     var streamObject = global.data;
     //console.log (streamObject);
     plotlystream.write(streamObject+'\n');
     i++;
 }, 1000);

  });
}


  });
