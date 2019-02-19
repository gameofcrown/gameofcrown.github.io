function LoadGlobalInfo(url)
{

  var postdata="{\"code\":\"gigaofcolony\",\"json\":true,\"limit\":\"100\",\"scope\":\""+"gigaofcolony"+"\",\"table\":\"topglba\"}";
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
    GLOBAL_DATA.userinfo=jo;
    if(GLOBAL_DATA.userinfo!=null)
    {
      if(GLOBAL_DATA.userinfo.rows.length>0 && GLOBAL_DATA.gamestart==0)
      {
        try{
          GLOBAL_DATA.gamestart=1;
          gameStart();
        }catch(e)
        {

        }
      }
    }
    //console.log(jo);

    window.setTimeout(function(){
      LoadGlobalInfo(network.protocol+"://"+network.host+":"+network.port+"/v1/chain/get_table_rows");
    }, 500 * 1);
    }
  }
xmlhttp.open("POST",url,true);
xmlhttp.send(postdata);
}

LoadGlobalInfo(network.protocol+"://"+network.host+":"+network.port+"/v1/chain/get_table_rows")
