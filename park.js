
var duration = 0;
var date = new Date();
function scanQR() {
    var v = document.createElement("video");
    v.id = "preview";
    v.style = "background:gray;width: 200px;height: 120px;display: block; margin:auto"
    var scanIcon = document.getElementById('scan')
    var parentNode = scanIcon.parentNode
    parentNode.appendChild(v);
    parentNode.removeChild(scanIcon);
    var scanner = new Instascan.Scanner(
        {
            video: document.getElementById('preview')
        });

    scanner.addListener('scan', function (content) {
        if (content.substr(0, 20) == "intelligent-park-lot") {
            var atts = content.substr(21).split(';');
            if (atts.length >= 2) {
                document.getElementById("parking-space-id").innerText = atts[1].charAt(0).toUpperCase() + atts[1].slice(1)
                parentNode.appendChild(scanIcon);
                parentNode.removeChild(v);
                scanner.removeAllListeners();
                return
            }
        }
    });
    Instascan.Camera.getCameras().then(function (cameras) {
        // on mobile pick the rear camera
        if (cameras.length > 1) {
            scanner.start(cameras[1]);
        }
        else if (cameras.length > 0) {
            scanner.start(cameras[0]);
        } else {
            console.error('No cameras found.');
        }
    }).catch(function (e) {
        console.error(e);
    });
}


//获取系统时间
function showTime() {
    //文字增加空格
    document.getElementById("nowtime").style = "white-space:pre;";
    //显示时间
    document.getElementById("nowtime").innerText = dateToString(new Date());
}
setInterval("showTime()", 1000);

function park(element) {
    duration = parseInt(document.getElementById('duration').value);
    if (!duration) {
        duration = 0;
    }
    alert('Successfully parked:' + duration + 'h')
    element.innerText = "Confirm modification!";

    var p1 = document.createElement("p")
    p1.innerText = "parking duration:" + duration + 'h'
    p1.id = 'durationLabel'
    var p2 = document.createElement("p")
    p2.innerText = "time to leave:" + dateToString(new Date(date.getTime() + duration * 3600 * 1000))
    p2.id = 'leaveTimeLabel'
    document.getElementById('state').parentNode.appendChild(p1);
    document.getElementById('state').parentNode.appendChild(p2);

    document.getElementById('state').parentNode.removeChild(document.getElementById('state'));
    document.getElementById('scan').parentNode.removeChild(document.getElementById('scan'));

    element.onclick = changeDuration;
}
function changeDuration() {
    duration = parseInt(document.getElementById('duration').value);
    if (!duration) {
        duration = 0;
    }
    alert("parking time has been modified as: " + duration + 'h');
    document.getElementById('durationLabel').innerText = "parking duration: " + duration + 'h'
    document.getElementById('leaveTimeLabel').innerText = "time to leave: " + dateToString(new Date(date.getTime() + duration * 3600 * 1000))
}
function dateToString(time) {
    year = time.getFullYear();//年
    month = time.getMonth() + 1;//月
    day = time.getDate();//日
    hour = time.getHours();//时
    minutes = time.getMinutes();//分
    seconds = time.getSeconds();//秒
    return year + "." + p(month) + "." + p(day) + " " + p(hour) + ":" + p(minutes) + ":" + p(seconds)
}
//月日时分秒小于10补0
function p(s) { return s < 10 ? '0' + s : s; }


