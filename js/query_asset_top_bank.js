function LoadAssetTopBank(url)
{
  var postdata="{\"code\":\"gameofcrown2\",\"account\":\""+"gigaofcolony"+"\",\"symbol\":\""+"TOP"+"\"}";
  //var postdata="{\"code\":\"gigaofcolony\",\"json\":true,\"limit\":\"100\",\"scope\":\""+GLOBAL_DATA.username+"\",\"table\":\"topusera\"}";
 //var postdata="{\"code\":\"gigaofcolony\",\"json\":true,\"limit\":\"100\",\"scope\":\""+"clowread1234"+"\",\"table\":\"topuser\"}";

 //console.log(postdata);
  var xmlhttp;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
  
    var a=xmlhttp.responseText;
    var jo=JSON.parse(a);
    GLOBAL_DATA.TOP_BANK=jo;
   
    }
    //console.log(jo);
    window.setTimeout(function(){
      LoadAssetTopBank(network.protocol+"://"+network.host+":"+network.port+"/v1/chain/get_currency_balance");
    }, 500 * 1);

    }
   
  
xmlhttp.open("POST",url,true);
xmlhttp.send(postdata);
}

LoadAssetTopBank(network.protocol+"://"+network.host+":"+network.port+"/v1/chain/get_currency_balance")
