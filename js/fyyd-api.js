var endpoint = 'https://api.fyyd.de/0.2/';
var level = 0;
var fyyd_svg = '<svg width="20" height="20" viewBox="0 0 368 368" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><path d="M 1.4,183.6 C 1.4,82.2 83.6,0 185,0 286.3,0 368.6,82.2 368.6,183.6 368.6,284.9 286.4,367.2 185,367.2 83.6,367.1 1.4,284.9 1.4,183.6 z m 149.9,119.3 c 6,6 15.5,6 21.5,0 L 281.3,194.4 c 6,-6 6,-15.5 0,-21.5 L 172.8,64.3 c -6,-6 -15.5,-6 -21.5,0 l -24.4,24.4 c -6,6 -6,15.5 0,21.5 l 73.4,73.4 -73.4,73.4 c -6,6 -6,15.5 0,21.5 l 24.4,24.4 z" style="fill:#000000" /></svg>';

function fyydCallAPI(path,params) {

	var endpoint = 'https://api.fyyd.de/0.2/';
	
	var esc = encodeURIComponent;
	var query = Object.keys(params)
		.map(k => esc(k) + '=' + esc(params[k]))
		.join('&');
	
	 return fetch(endpoint+path+'?'+query)
		.then(function (response) {
			return response.json();
		})
		
	
}
