function LoadAssetEOS(url)
{
  var postdata="{\"code\":\"eosio.token\",\"account\":\""+GLOBAL_DATA.username+"\",\"symbol\":\""+"EOS"+"\"}";
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
    GLOBAL_DATA.EOS=jo;
   
    //console.log(jo);
    window.setTimeout(function(){
      LoadAssetEOS(network.protocol+"://"+network.host+":"+network.port+"/v1/chain/get_currency_balance");
    }, 500 * 1);
  }

    }
   
  
xmlhttp.open("POST",url,true);
xmlhttp.send(postdata);
}

LoadAssetEOS(network.protocol+"://"+network.host+":"+network.port+"/v1/chain/get_currency_balance")
