$(document).ready(function() {	
  $.ajax({ 
    type: 'GET', 
    url: 'https://botw-compendium.herokuapp.com/api/v2/category/monsters', 
    dataType: 'json',
	}
).done(function(response){	
	var answer = "";
	var creatures = [];
	var i = response.data.length; while(i--){
		creatures.push(response.data[i].name);
	}
	var randNum = randNumber(0, response.data.length - 1);
	answer = creatures[randNum];
	$(".creature").attr("src", getImageRequest(answer));
	
	document.getElementById("submitGuess").addEventListener('click', function(){
		var currGuess = document.getElementById("guess").value;
		if(currGuess == answer){
			$("#response").html("Correct!");
			placeWeatherInfo();
			console.log("Correct");
		}else{
			$("#response").html("Wrong!");
			console.log("NOOOOOOOOOOO");
		}
		console.log(answer);
		console.log("Guess Submitted");
	});
})
function randNumber(min, max) { 
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getImageRequest(name){
	var url = 'https://botw-compendium.herokuapp.com/api/v2/entry/' + name + '/image'
	return url;
}
});
function placeWeatherInfo(){
	$.ajax({ 
    type: 'GET', 
    url: 'https://goweather.herokuapp.com/weather/little-rock', 
    dataType: 'json',
	}
).done(function(response){
	var weatherDesc = response.description;
	var weatherTemp = response.temperature;
	$("#weatherDesc").prepend(weatherDesc);
	$("#weatherTemp").append(weatherTemp);
})
}

//https://goweather.herokuapp.com/weather/little-rock

