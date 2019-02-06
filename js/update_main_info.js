function _GLOBAL_DATA()
{
    this.username="";
    this.userinfo=null;
    this.notice_list=null;
    this.notice_id=-1;

}

var GLOBAL_DATA= new _GLOBAL_DATA();

function Set_User_Info_Text(index,text)
{
    var ele=document.getElementById("USERINFOTEXT"+index);
    ele.innerText=text;
}
function ID2XY(id)
{
    var x,y;
    x=parseInt(id/65536);
    y=parseInt(id%65536);
    x=x-32768;
    y=y-32768;

    return x+":"+y;

}
function XY2ID(str)
{
var a=str.split(':');
var x,y;
x=parseInt(a[0]);
y=parseInt(a[1]);
    var res;
    res=x+32768;
    res%=65536;
    res*=65536;
    res+=(y+32768)%65536;
return res;
}