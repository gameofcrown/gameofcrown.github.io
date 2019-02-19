function LoadMyNotice(url)
{

  var postdata = "{\"code\":\"gigaofcolony\",\"json\":true,\"limit\":\"100\",\"scope\":\"" + GLOBAL_DATA.username + "\",\"table\":\"sdnotice\"}";
  var xmlhttp;
  if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  }
  else {// code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      var a = xmlhttp.responseText;
      var jo = JSON.parse(a);
      GLOBAL_DATA.notice_list = jo;
      var noticeid=0;
      var noticelen=GLOBAL_DATA.notice_list.rows.length;
      if(noticelen>0)
      {
        noticeid=GLOBAL_DATA.notice_list.rows[noticelen-1].id;
        if(GLOBAL_DATA.notice_id!=-1)
        {
          if(GLOBAL_DATA.notice_id!=noticeid)
          {
            PushBanner("你收到了新系统消息");
          }
        }
        GLOBAL_DATA.notice_id=noticeid;
      }

     
      //console.log(jo);

      window.setTimeout(function () {
        LoadMyNotice(network.protocol + "://" + network.host + ":" + network.port + "/v1/chain/get_table_rows");
      }, 1000 * 2);
    }
  }
  xmlhttp.open("POST", url, true);
  xmlhttp.send(postdata);
}

LoadMyNotice(network.protocol+"://"+network.host+":"+network.port+"/v1/chain/get_table_rows")
