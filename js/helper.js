function fyyd_contrastColor(hex){
	
	threshold = 130; /* about half of 256. Lower threshold equals more dark text on dark background  */
	
	if (hex.substr(0,1)=='#') {
		hex = hex.substr(1);
	}
	
	hRed = hexToR(hex);
	hGreen = hexToG(hex);
	hBlue = hexToB(hex);
	
	function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
	function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
	function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
	function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

	cBrightness = ((hRed * 299) + (hGreen * 587) + (hBlue * 114)) / 1000;
	if (cBrightness > threshold){return "#000000";} else { return "#ffffff";}	
}
		
		

		

function wordTrim(value, length) {
    if (value.length <= length) return value;
    var strAry = value.split(' ');
    var retLen = strAry[0].length;
    for (var i = 1; i < strAry.length; i++) {
        if(retLen == length || retLen + strAry[i].length + 1 > length) break;
        retLen+= strAry[i].length + 1
    }
    return strAry.slice(0,i).join(' ') + '&hellip;';
}

