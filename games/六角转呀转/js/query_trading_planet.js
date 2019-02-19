function LoadTradingPlanet(url)
{

  var postdata="{\"code\":\"gigaofcolony\",\"json\":true,\"limit\":\"100\",\"scope\":\""+"gigaofcolony" +"\",\"table\":\"sdtrade\"}";
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
    GLOBAL_DATA.trading_planet=jo;
    //console.log(jo);

    window.setTimeout(function(){
      LoadTradingPlanet(network.protocol+"://"+network.host+":"+network.port+"/v1/chain/get_table_rows");
    }, 1000 * 2);
    }
  }
xmlhttp.open("POST",url,true);
xmlhttp.send(postdata);
}

LoadTradingPlanet(network.protocol+"://"+network.host+":"+network.port+"/v1/chain/get_table_rows")
