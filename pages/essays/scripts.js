i = 1
var typer = new TypeIt('#contents', {
	speed: 100,
	autoStart: false,
    lifeLike: true,
    beforeString: function(step, queue, instance){
    	if (!title.hasBeenDestroyed){
    		title.destroy()
    	}   	
    },
    afterString: function(step, queue, instance){
    	typer.break()
    	typer.break()
    	typer.type(texts[0][i])
    	i++
    },
    afterStep: function(step, queue, instance){
    	if (step[1] == " "){
		    var computerScore = document.getElementById('count');
		    var number = computerScore.innerHTML;
		    number++;
		    computerScore.innerHTML = number;
		}
    }
}, false);

var title = new TypeIt('#title', {
	speed: 100,
    autoStart: false,
    breakLines: true,
    lifeLike: true,
    beforeString: function(step, queue, instance){
    	author.destroy()
    },
    afterComplete: function(step, queue, instance){
    	typer.init()
    	typer.type(texts[0][0])
    },
    afterStep: function(step, queue, instance){
    	if (step[1] == " "){
		    var computerScore = document.getElementById('count');
		    var number = computerScore.innerHTML;
		    number++;
		    computerScore.innerHTML = number;
		}
    }
}, false);


var author = new TypeIt('#header', {
	speed: 100,
    autoStart: true,
    lifeLike: true,
    breakLines: true,
    afterComplete: function(step, queue, instance){
    	title.init()
    	title.type("Life in the Liberal Arts")
    	title.pause(1000)
    },
    afterStep: function(step, queue, instance){
    	if (step[1] == " "){
		    var computerScore = document.getElementById('count');
		    var number = computerScore.innerHTML;
		    number++;
		    computerScore.innerHTML = number;
		}
    }
    
});


var objToday = new Date(),
    dayOfMonth = objToday.getDate(),
    months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
    curMonth = months[objToday.getMonth()],
    curYear = objToday.getFullYear()

var today = dayOfMonth + curMonth + curYear;

author.type("Rudolf")
author.break()
author.type(today)
author.break()
author.type("Class on Hitting the Word Count")
author.pause(3000)