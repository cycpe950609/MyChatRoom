import './firebase.config.js';
import { Application } from './Application.js'

function StartTask()
{
    //console.log('Show Loading');
    document.getElementById('LoadingPage').style.display = 'flex';
}
function FinishTask()
{
    //console.log('Close Loading');
    document.getElementById('LoadingPage').style.display = 'none';
}
//Init GUI
ReactDOM.render(<Application StartTask={StartTask} FinishTask={FinishTask} />,document.getElementsByClassName('CR_Application')[0]); 

//TODO : Refact class Application to another js/css

window.addEventListener('load', function () {
    //確認使用者是否允許跳窗，如果沒有，就跳窗取權限
    if (window.Notification && Notification.permission !== "granted") {
        Notification.requestPermission(function (status) {
            if (Notification.permission !== status) {
                Notification.permission = status;
            }
        });
        
    }
});



