var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth*2/3-10;
canvas.height = window.innerHeight-10;
var width = canvas.width;
var height = canvas.height;
var temp = 20;
var numMols = 500;
var allParticles=[];
var PI = 3.141592;
var objectRadius = 30;
var xLocations = [];
var yLocations = [];
var tailLength = 500;

function initialize() {
	document.getElementById('numparticles').value=numMols;
	document.getElementById('temperature').value=temp;
	allParticles[0]=new Object();
	allParticles[0].radius = 30;
	allParticles[0].mass = Math.pow(allParticles[0].radius,2);
	allParticles[0].location = new Object();
	allParticles[0].velocity = new Object();
	allParticles[0].newLocation = new Object();
	allParticles[0].newVelocity = new Object();
	allParticles[0].location.x = 500;
	allParticles[0].location.y = 500;
	allParticles[0].velocity.x = 0;
	allParticles[0].velocity.y = 0;
	allParticles[0].newVelocity.y=0;
	allParticles[0].newVelocity.x=0;
	allParticles[0].newLocation.y=0;
	allParticles[0].newLocation.x=0;

	for (var i = 1; i <= numMols; i++) {
		var mol = new Object();
		mol.radius = 3*Math.random();
		mol.mass = Math.pow(mol.radius,2);
		mol.location = new Object();
		mol.velocity = new Object();
		mol.newLocation = new Object();
		mol.newVelocity = new Object();
		mol.location.x = (Math.random() * (width-mol.radius))+mol.radius;
		mol.location.y = (Math.random() * (height-mol.radius))+mol.radius;
		mol.velocity.x = (2 * Math.random() * temp) - temp;
		mol.velocity.y = (2 * Math.random() * temp) - temp;
		allParticles.push(mol);
		mol.newVelocity.y=mol.velocity.y;
		mol.newVelocity.x=mol.velocity.x;
		mol.newLocation.y=mol.location.y;
		mol.newLocation.x=mol.location.x;
	}
}

function bounce(allParticles){
	for (var a = allParticles.length-1; a >=0; a--) {
		allParticles[a].newVelocity.y=allParticles[a].velocity.y;
		allParticles[a].newVelocity.x=allParticles[a].velocity.x;
		allParticles[a].newLocation.x=allParticles[a].location.x;
		allParticles[a].newLocation.y=allParticles[a].location.y;
		for (var b = allParticles.length-1; b >= 0; b--) {
			var difX = (allParticles[a].location.x-allParticles[b].location.x);
			var difY = (allParticles[a].location.y-allParticles[b].location.y);
			var dist =Math.sqrt((Math.pow(difX,2)+Math.pow(difY,2)));
			var aAngle = 0;
			var bAngle = 0;
			var caAngle = 0;
			var difX2 = (allParticles[a].location.x-allParticles[b].location.x);
			var difY2 = (allParticles[a].location.y-allParticles[b].location.y);
			var dist2 =Math.sqrt((Math.pow(difX,2)+Math.pow(difY,2)));
			if(dist!=0&&dist<=(allParticles[a].radius+allParticles[b].radius)){
				var aSpeed = Math.sqrt(Math.pow(allParticles[a].velocity.x,2)+Math.pow(allParticles[a].velocity.y,2));
				var bSpeed = Math.sqrt(Math.pow(allParticles[b].velocity.x,2)+Math.pow(allParticles[b].velocity.y,2));
				while(bSpeed<=aSpeed&&dist2<(allParticles[a].radius+allParticles[b].radius)){
					difX2 = (allParticles[a].newLocation.x-allParticles[b].location.x);
					difY2 = (allParticles[a].newLocation.y-allParticles[b].location.y);
					dist2 =Math.sqrt((Math.pow(difX2,2)+Math.pow(difY2,2)));
					allParticles[a].newLocation.x=allParticles[a].newLocation.x-allParticles[a].velocity.x/10;
					allParticles[a].newLocation.y=allParticles[a].newLocation.y-allParticles[a].velocity.y/10;
				}
				aAngle = Math.atan2(allParticles[a].velocity.y,allParticles[a].velocity.x);
				bAngle = Math.atan2(allParticles[b].velocity.y,allParticles[b].velocity.x);
				caAngle = Math.atan2(difY,difX);
				caAngle += Math.PI/2;
				allParticles[a].newVelocity.y=(((allParticles[a].velocity.y*(allParticles[a].mass-allParticles[b].mass))+(2*allParticles[b].mass*allParticles[b].velocity.y))/(allParticles[a].mass+allParticles[b].mass));
				allParticles[a].newVelocity.x=(((allParticles[a].velocity.x*(allParticles[a].mass-allParticles[b].mass))+(2*allParticles[b].mass*allParticles[b].velocity.x))/(allParticles[a].mass+allParticles[b].mass));
			}
		}
	}
	for (var a = 0; a < allParticles.length; a++) {
		allParticles[a].location.x=allParticles[a].newLocation.x;
		allParticles[a].location.y=allParticles[a].newLocation.y;
		allParticles[a].velocity.x=allParticles[a].newVelocity.x;
		allParticles[a].velocity.y=allParticles[a].newVelocity.y;
	}
};

function moveMols(){
	bounce(allParticles);
	for (var x = 0; x < allParticles.length; x++) {
		if (allParticles[x].location.x >= canvas.width-(allParticles[x].radius)) {
			allParticles[x].velocity.x=-Math.abs(allParticles[x].velocity.x);
		}
		if(allParticles[x].location.x <= (allParticles[x].radius)){
			allParticles[x].velocity.x=Math.abs(allParticles[x].velocity.x);
		}
	        if (allParticles[x].location.y >= canvas.height-(allParticles[x].radius)) {
	        	allParticles[x].velocity.y = -Math.abs(allParticles[x].velocity.y);
		}
		if(allParticles[x].location.y <= (allParticles[x].radius)){
			allParticles[x].velocity.y = Math.abs(allParticles[x].velocity.y);
		}
		allParticles[x].location.x+=allParticles[x].velocity.x;
		allParticles[x].location.y+=allParticles[x].velocity.y;
	}
	xLocations.push(allParticles[0].location.x);
	yLocations.push(allParticles[0].location.y);
}

function drawMols() {
	ctx.fillStyle = "rgba(255,255,255,.2)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	gravity = allParticles[0];
	ctx.beginPath();
	var colorString = 'rgb(0,0,255)';
	ctx.strokeStyle = colorString;
	ctx.arc(gravity.location.x /*- (charge.radius)*/, gravity.location.y /*- (charge.radius)*/, gravity.radius, 0, 2 * PI);
	ctx.fill();
	ctx.stroke();
	for(var i = Math.max(1, xLocations.length-tailLength); i < xLocations.length; i++){
		ctx.beginPath();
		var colorString = 'rgb(0,0,0)';
		ctx.strokeStyle = colorString;
		ctx.moveTo(xLocations[i-1],yLocations[i-1]);
		ctx.lineTo(xLocations[i],yLocations[i]);
		ctx.fill();
		ctx.stroke();
	}	
}

initialize();

$("#controls-submit").click(function() {
	if(document.getElementById('temperature').value>200||document.getElementById('temperature').value<0){
		alert("please set the temperature between 0 and 200");
	}
	else if(document.getElementById('numparticles').value>1000){
		alert("please use no more than 1000 particles");
	}
	else{
		numMols=document.getElementById('numparticles').value;
		temp=document.getElementById('temperature').value;
		allParticles = [];
		xLocations = [];
		yLocations = [];
		initialize();
	}
});

function main() {
	moveMols();
	drawMols();
	requestAnimationFrame(main);
};
requestAnimationFrame(main);
