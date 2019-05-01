
var audio_shake;


var SHAKE_THRESHOLD = 800;
var last_update = 0;
var x = y = z = last_x = last_y = last_z = 0;
if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', deviceMotionHandler, false);
} else {
    alert('抱歉，你的手机配置实在有些过不去，考虑换个新的再来试试吧');
}
var g_shake_times=0;
window.g_SHAKE_COUNT=0;
function deviceMotionHandler(eventData) {
    var acceleration = eventData.accelerationIncludingGravity;
    var curTime = new Date().getTime();
     
    if ((curTime - last_update) > 100) {
        var diffTime = curTime - last_update;
        last_update = curTime;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 100000;
        var status = document.getElementById("status");
        if (speed > SHAKE_THRESHOLD) {
            doResult();
            g_shake_times++;
        }
        last_x = x;
        last_y = y;
        last_z = z;
    }
}

  
  
function doResult() 
{
    window.g_SHAKE_COUNT++;
    if(window.g_Main_Scene!=null)
    {

        window.g_Main_Scene.updateshaketimes(window.g_SHAKE_COUNT);
    }
    if(g_shake_times>0){
        console.log(g_shake_times+"g_shake_times");
        return false;

    }
}
