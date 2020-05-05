import './firebase.config.js';
import { Application } from './Application.js'

function StartTask()
{
    console.log('Show Loading');
    document.getElementById('LoadingPage').style.display = 'flex';
}
function FinishTask()
{
    console.log('Close Loading');
    document.getElementById('LoadingPage').style.display = 'none';
}
//Init GUI
ReactDOM.render(<Application StartTask={StartTask} FinishTask={FinishTask} />,document.getElementsByClassName('CR_Application')[0]); 

//TODO : Refact class Application to another js/css



