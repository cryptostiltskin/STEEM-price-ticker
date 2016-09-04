//by johnerfx (MIT Licensed)
function checkTicker() {
  var ticker = new XMLHttpRequest();
	ticker.open("GET", "https://api.coinmarketcap.com/v1/ticker/", true);
	ticker.onreadystatechange = function() {
	if (ticker.readyState == 4 && ticker.status == 200) {
		var jsonresponse=JSON.parse(ticker.responseText);
		for (i=0;i<jsonresponse.length;i++) {
			if (jsonresponse[i]['id']=='steem') {
				//chrome.extension.getBackgroundPage().console.log(jsonresponse[i]);
				var steem_btc=jsonresponse[i]['price_btc'];
				var steem_usd=jsonresponse[i]['price_usd'];
				var steem_percent1h=jsonresponse[i]['percent_change_1h'];
				var steem_percent24h=jsonresponse[i]['percent_change_24h'];
				var steem_percent7d=jsonresponse[i]['percent_change_7d'];
				var steem_marketcap=jsonresponse[i]['market_cap_usd'];
				var steem_volume=jsonresponse[i]['24h_volume_usd'];
			}
			else if (jsonresponse[i]['id']=='steem-dollars') {
				//chrome.extension.getBackgroundPage().console.log(jsonresponse[i]);
				var sbd_btc=jsonresponse[i]['price_btc'];
				var sbd_usd=jsonresponse[i]['price_usd'];
				var sbd_percent1h=jsonresponse[i]['percent_change_1h'];
				var sbd_percent24h=jsonresponse[i]['percent_change_24h'];
				var sbd_percent7d=jsonresponse[i]['percent_change_7d'];
				var sbd_marketcap=jsonresponse[i]['market_cap_usd'];
				var sbd_volume=jsonresponse[i]['24h_volume_usd'];
			}
		}
		chrome.browserAction.setBadgeText({text: parseFloat(steem_usd).toFixed(2)});
		var lines=["STEEM assets price ticker (price taken from 'www.coinmarketcap.com')\n"];
		lines.push("\n");
		lines.push("STEEM "+FixIfNotNull(steem_btc,8)+"BTC\n");
		lines.push("STEEM "+FixIfNotNull(steem_usd,4)+"$\n");
		lines.push("STEEM Marketcap "+steem_marketcap.toLocaleString(window.navigator.language,{ style: 'currency', currency: 'USD'})+"\n");
		lines.push("STEEM 24h change "+FixIfNotNull(steem_percent24h,2)+"%\n");
		lines.push("STEEM 24h Volume "+steem_volume.toLocaleString(window.navigator.language,{ style: 'currency', currency: 'USD'})+"\n");
		lines.push("\n");
		lines.push("SBD "+FixIfNotNull(sbd_btc,8)+"BTC\n");
		lines.push("SBD "+FixIfNotNull(sbd_usd,4)+"$\n");
		lines.push("SBD 24h Volume "+sbd_volume.toLocaleString(window.navigator.language,{ style: 'currency', currency: 'USD'})+"\n");
		lines.push("\n");
		lines.push(Date());
		var title_lines="";
		for (j=0;j<lines.length;j++) {
			title_lines=title_lines+lines[j];
		}
		chrome.browserAction.setTitle({title:title_lines});
		}
	}
ticker.send();
}
function FixIfNotNull(variable,decimals) {
	//Function passess variable toFixed only if it is no null (edge case)
	//then returns fixed_var as string
	var fixed_var="UNAVAILABLE";
	if (variable) {
		fixed_var=parseFloat(variable).toFixed(decimals);
	}
	return fixed_var.toString()
}
chrome.browserAction.onClicked.addListener(function(activeTab)
    {
		    chrome.runtime.reload();
    });
window.setInterval(checkTicker, 240000); //4 minutes
checkTicker();
