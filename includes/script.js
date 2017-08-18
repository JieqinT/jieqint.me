var icons =
[
	{
		url:"http://youtube.com/feed/subscriptions",
		image:"images/black/youtube.png"
	}, {
		url:"http://plex.tv/web/app",
		image:"images/black/plex.png"
	}, {
		url:"http://transmission.jieqint.com:9091/transmission/web/",
		image:"images/black/bittorrent.png"
	}, {
		url:"http://whatismyipaddress.com",
		image:"images/black/whatismyip.png"
	}, {
		url:"https://internet.ocbc.com/internet-banking/",
		image:"images/black/ocbc.png"
	}, {
		url:"http://showrss.info",
		image:"images/black/tv.png"
	}, {
		url:"http://cheeaun.github.io/busrouter-sg/#/",
		image:"images/black/bus.png"
	}, {
		url:"http://tools.jieqint.com",
		image:"images/black/download.png"
	}, {
		url:"http://cnb.jieqint.com",
		image:"images/black/cnb_bus.png"
	}, {
		url:"http://www.dropitto.me/jieqin",
		image:"images/black/upload.png"
	}, {
		url:"http://sw.jieqint.com",
		image:"images/black/summoners.png"
	}, {
		url:"http://www.mp3juices.cc",
		image:"images/black/music.png"
	}
];

var monthT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
var dayT = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

function getDate(now){
	var date = now.getDate();
	var day = now.getDay();
	var month = now.getMonth();
	var year = now.getFullYear();

	return dayT[day] + ", " + date + " " + monthT[month] + ", " + year;
}
function getTime(now, with_seconds, with_space){
	var hours = now.getHours();
	var mins = now.getMinutes();
	var sec = now.getSeconds();

	hours = hours>9?hours:"0"+hours;
	mins = mins>9?mins:"0"+mins;
	sec = sec>9?sec:"0"+sec;

	var tmp = "";
	if(with_space)
		tmp = hours + " : " + mins;
	else
		tmp = hours + "" + mins;

	if(with_seconds)
		tmp += " : " + sec;

	return tmp;
}

function setTime() {
	var now = new Date();

	document.getElementById("date").innerText = getDate(now);
	document.getElementById("time").innerText = getTime(now, true, true);
}

function daysTo(year, month, day) {
	var now = new Date();
	var future = new Date(year, month, day);

	var diff = future.getTime()-now.getTime();

	var days = Math.ceil(diff/1000/60/60/24);
	if(days<0)
		days*=-1;
	var dayOrDays = days<=1&&days>=-1?" Day":" Days";

	return days + dayOrDays;
}
function daysToDate(future) {
	var now = new Date();

	var diff = future.getTime()-now.getTime();

	var days = Math.ceil(diff/1000/60/60/24);
	if(days<0)
		days*=-1;
	var dayOrDays = days<=1&&days>=-1?" Day":" Days";

	return days + dayOrDays;
}
function weekendsTo(year, month, day, occasion) {
	var now = new Date();
	var future = new Date(year, month, day);

	var diff = future.getTime()-now.getTime();

	var color="green";

	var weeks = Math.ceil(diff/1000/60/60/24/30*4);
	if(weeks<0){
		weeks*=-1;
		color="red";
	}
	var weekOrWeeks = weeks<=1&&weeks>=-1?" Weekend":" Weekends";

	document.getElementById("countdown").innerHTML += occasion + " : <span style=\"color:"+color+"\">" + (weeks+1) + "</span>" + weekOrWeeks;
}
function monthsTo(year, month, day, occasion) {
	var now = new Date();
	var future = new Date(year, month-1, day);

	var diff = future.getTime()-now.getTime();

	var color="green";

	var months = Math.floor(diff*3.80517503805E-10);//1000/60/60/24/30);
	if(months<0){
		months*=-1;
		color="red";
	}
	var monthOrMonths = months<=1&&months>=-1?" Month":" Months";

	document.getElementById("countdown").innerHTML += occasion + " : <span style=\"color:"+color+"\">" + months + "~</span>" + monthOrMonths;
}

function load_more(id, btn_id, show_more, amount, category) {
	if(document.getElementById(id).style.display == "none" || document.getElementById(id).style.display == null || document.getElementById(id).style.display == ""){
		document.getElementById(id).style.display = "block";
		document.getElementById(btn_id).value = "Show "+amount+" Lesser "+category;
	}
	else{
		document.getElementById(id).style.display = "none";
		document.getElementById(btn_id).value = "Show "+amount+" More "+category;
	}
}

function goTo(value, link){
	window.location.href=link.replace('{query}', value);
}

function refreshNews(){
	document.getElementById("news_section").innerHTML = "<a href='javascript:refreshNews();'><div id='title'>LATEST NEWS</div></a><br /><iframe src='includes/iframes/news' id='news_frame' frameborder=0 width=100% height=50%'></iframe>";
}
function getNextHoliday(){
	getJSON("api/holiday/singapore.json", function(text){
		var data = JSON.parse(text);
		var holis = data.singapore[0];
		holis = holis.year == new Date().getFullYear() ? holis.data : data.singapore[1].data;
		var now = new Date();
		var d;
		for(var i = 0; i < holis.length; ++i){
			d = new Date(holis[i].date);
			if(now < d){
				var str = holis[i].name + " (" + daysToDate(d) + ")";
				document.getElementById('next_holi').innerHTML = str;
				break;
			}
		}
	});
}
function getIPAddress(){
	getJSON("https://www.trackip.net/ip?json", function(text){
		var data = JSON.parse(text);
		document.getElementById('ip_add').innerHTML = data.IP;
	});
}
function getRedditPosts(count, div){
	getJSON("https://reddit.com/r/singapore/new/.json", function(text){
		var json = JSON.parse(text);
		var str = "";
		for(var i = 0; i < count; ++i){
			var data = json.data.children[i].data;
			str += "<div class='tiny'>";
			str += "<a href='https://reddit.com" + data.permalink + "' target='_blank'>";
			str += data.title + "</a></div><div class='puny'>" + (data.ups) + " upvotes, "+data.num_comments+" comments";
			if(count != i+1)
				str += "<hr class='divider'>";
			str+="</div>";
		}
		document.getElementById(div).innerHTML = str;
		document.getElementById(div).style.height = 'auto';
	});
}

function getJSON(url, callback) {
	var rawFile = new XMLHttpRequest();
	if ("withCredentials" in rawFile)
		rawFile.open("GET", url, true);	
	else{
		console.log("CORS is not supported");
		return;
	}
	try{
		rawFile.overrideMimeType("application/json");
	}catch(e){}
	rawFile.onreadystatechange = function() {
		if(rawFile.readyState == 4){
			if (rawFile.status == "200" || rawFile.status == 0) {
				callback(rawFile.responseText);
			}else{
				console.log("Error Status : " + rawFile.status);
			}
		}
	}
	rawFile.send(null);
}
