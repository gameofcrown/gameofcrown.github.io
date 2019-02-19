function _BANNER_DATA()
{
    this.timer=0;

}
var BANNER_DATA=new _BANNER_DATA();
function UpdateBanner()
{
  var ele=  document.getElementById( "NOTICEBANNER");
  if(BANNER_DATA.timer<134)
  {
    BANNER_DATA.timer++;
  }
  if(BANNER_DATA.timer<0)
  {
    BANNER_DATA.timer=0;
  }
  var eleleft=0;

  if(BANNER_DATA.timer<7)
  {
    eleleft=(1400/7)*BANNER_DATA.timer;
    eleleft=1400-eleleft;
  }
  if(BANNER_DATA.timer>=7 && BANNER_DATA.timer <120)
  {
    eleleft=0;
  }
  if(BANNER_DATA.timer>=121 && BANNER_DATA.timer <130)
  {
    eleleft=(1400/7)*(BANNER_DATA.timer-121);
    eleleft=-eleleft;
  }
  if(BANNER_DATA.timer>=130)
  {
    eleleft=1500
    
  }
  ele.style.left=eleleft;
  ele.style.left=ele.style.left+"px";
  window.setTimeout(function(){
    UpdateBanner()
  },20);
}
UpdateBanner();
function PushBanner( str)
{
    var ele=  document.getElementById( "NOTICETEXT");
    ele.innerText=str;
    BANNER_DATA.timer=0;
}