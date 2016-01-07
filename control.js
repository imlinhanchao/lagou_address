var state = "龙岗"; // 留空表示不限
var infos = "";
var bContinue = true;
var nTotal = 0;
function BeginGo(){
	infos = "";
	bContinue = true;
	nTotal = 0;
	readWork();
}

function readWork(){
	var nCount = $(".position_link").length;
	$(".position_link").each(function(){
		var id = this.href.match(/\d+/)[0];
		createIframe("lagouEx_ifr_" + id, this.href).onload = function(){
			if(getAddress(id).indexOf(state) >= 0)
			{
				console.log(getInfo(id));
				infos += getInfo(id);
				nTotal++;
			}
			nextPage(--nCount);
			$("#lagouEx_ifr_" + id)[0].parentNode.removeChild($("#lagouEx_ifr_" + id)[0]);
		};
	});
}

document.body.addEventListener("keydown", function(ev){
	if(27 == ev.keyCode && bContinue)
	{
		bContinue = false;
		downloadFile("works.txt", infos);
	}
});

function getInfo(id){
	return "{'id':'" + id + "','name':'" + getWorkName(id) + "', 'company':'" + getCompany(id) + "', 'address':'" + getAddress(id) + "', 'money':'" + getMoney(id) + "'}\n";
}

function getWorkName(id){
	return $("#lagouEx_ifr_" + id)[0].contentWindow.$(".join_tc_icon h1")[0].title;
}

function getCompany(id){
	return $("#lagouEx_ifr_" + id)[0].contentWindow.$(".job_company .b2")[0].alt;
}

function getAddress(id){
	return $("#lagouEx_ifr_" + id)[0].contentWindow.$("#smallmap").prev().text();
}

function getMoney(id){
	return $("#lagouEx_ifr_" + id)[0].contentWindow.$(".job_request .red").text();
}

function getCount(){
	console.log("已抓到" + nTotal + "笔记录")
}

function nextPage(n){
	if(0 != n) return false;
	if($(".pager_next").hasClass("pager_next_disabled"))
	{
		downloadFile("works.txt", infos);
		alert("完。");
		return false;
	}
	$(".pager_next").click();
	console.log("Go to Page " + $(".pager_is_current").attr("page"));
	setTimeout(readWork, 2000);
	return true;
}

function createIframe(name, link){
	var ifr = document.createElement("iframe");
	ifr.style.display = "none";
	ifr.name = name;
	ifr.id = name;
	ifr.src = link;
	document.body.appendChild(ifr);
	return ifr;
}

function downloadFile(fileName, content){
    var aLink = document.createElement('a');
    var blob = new Blob([content]);
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", false, false);
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    aLink.dispatchEvent(evt);
}

BeginGo();