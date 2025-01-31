const minWaitTime = 50

let value = 1
let cash = 0
let avalue = 1
let aspeed = 2000
let valuemultiplier = 1
let avaluemultiplier = 2
let hasautounlocked = false
let speedcost = 10
let intervalId
let wincounter = 0

function Update() {
	document.querySelector("#cash").innerHTML = (cash)
	if (wincounter > 0) {
		document.querySelector("#wincounter").style.display = "flex"
		document.querySelector("#wins").innerHTML = (wincounter)
	}
	
	if (cash < 0) {
		cash = 0
	}
}

function beginauto(mult) {
	if (hasautounlocked === true) {
		cash += Math.floor(avalue * mult)
	}
	
}

function add() {
	cash += value
}

function valueincrease() {
	if (cash > value) {
		value += valuemultiplier
		cash -= value
	}
}

function auto() {
	if (hasautounlocked === true) {
		console.log("You already unlocked Auto")
	} else {
		if (cash > 100) {
			cash -= 100
			hasautounlocked = true
		} 
	}
	
}
function increaseautovalue() {
	if (hasautounlocked === true) {
		if (cash > avalue) {
		avalue *= avaluemultiplier
		cash -= avalue
	}
	}
}

function increaseautospeed() {
	if (hasautounlocked === true) {
		if (cash > speedcost) {
		aspeed *=0.5
		cash -= speedcost
		speedcost += 10
	}
	}
}


window.setInterval(Update, 0);

function getNewAspeed() {
    return aspeed;
}

function updateInterval() {
    // Clear the existing interval
    clearInterval(intervalId);
	const speed = Math.max(aspeed, minWaitTime)
    
    // Set a new interval with the current aspeed
    intervalId = setInterval(() => {
		const mult = Math.max(1, speed / aspeed)
        beginauto(mult);
        aspeed = getNewAspeed();  // Update the aspeed dynamically
        updateInterval();  // Set a new interval with the updated aspeed
    }, speed);  // Use the current value of aspeed as the wait time
}

function finish() {
	if (cash >= 1000000000) {
		value = 1
		cash = (10 * (wincounter + 1))
		avalue = 1
		aspeed = 2000
		valuemultiplier = 1
		avaluemultiplier = 2
		hasautounlocked = false
		speedcost = 10
		intervalId = 0
		wincounter += 1
	}
	
}

updateInterval();  // Start the first interval