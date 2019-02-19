function LoadPlanetInfo(url)
{

  var postdata="{\"code\":\"gigaofcolony\",\"json\":true,\"limit\":\"100\",\"scope\":\""+GLOBAL_DATA.selected_planet+"\",\"table\":\"sdplanet\"}";
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
    GLOBAL_DATA.selected_planet_info=jo;
    //console.log(jo);

    window.setTimeout(function(){
      LoadPlanetInfo(network.protocol+"://"+network.host+":"+network.port+"/v1/chain/get_table_rows");
    }, 500 * 1);
    }
  }
xmlhttp.open("POST",url,true);
xmlhttp.send(postdata);
}

LoadPlanetInfo(network.protocol+"://"+network.host+":"+network.port+"/v1/chain/get_table_rows")
