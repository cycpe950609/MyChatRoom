import './Application.css'
import { LoginPage } from './page/login/login.js'
import { Drawer } from './control/Drawer/Drawer.js'
import { Header } from './page/chatroom/header.js'
import { Sidebar } from './page/chatroom/sidebar.js'
import { ChatRoom } from './page/chatroom/chatroom.js'
import { Dialog } from './control/Dialog/Dialog';
//import { Loading } from './control/Loading/loading.js'


export class Application extends React.Component
{
    constructor(props) 
    { 
        super(props);
        this.state = {
            iflogin:false,
            ifCheckLogin:false,
            ifRunTask: true,
            UserName:"User's Name"
        };

        

        this.SignInSuccess = this.SignInSuccess.bind(this);
        this.SignOutSuccess = this.SignOutSuccess.bind(this);
    }

    componentDidMount()
    {
        //console.log('Before Start Loading');
        this.props.StartTask();
        //console.log('Start Loading');
        
        this.CheckIfLogin().then(
            (user)=>{
                //console.log(user);
                if(user == 'has login')
                {
                    //console.log('Had Login');
                    // User is signed in.
                    //console.log(this);
                    this.setState({
                        iflogin : true,
                        ifCheckLogin:true,
                        ifRunTask: true
                    });
                }
                else if(user == 'hasnt login')
                {
                    //console.log("Doesn't Login");
                    //console.log(this);
                    // No user is signed in.
                    this.setState({
                        iflogin : false,
                        ifCheckLogin:true,
                        ifRunTask: true
                    });
                }
                else
                {
                    alert('Error with promise return value');
                }
                
                this.props.FinishTask();
            }
        ).catch(
            (error)=>{
                console.log('Error checking : ' + error.message);
            }
        )
    }

    CheckIfLogin()
    {
        return new Promise(
            (resolve,reject)=>{
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        resolve('has login');
                    } else {
                        resolve('hasnt login');
                    }
                });
        });
    }

    render()
    {
        //console.log('Application Render');
        return (
            <div className="CR_Application">
                { this.RenderChatRoomPage() }
                { this.RenderLoginPage() }
            </div>
        );
    }

    RenderChatRoomPage()
    {
        return ( this.state.iflogin && this.state.ifCheckLogin ? 
                    <Drawer id="CR_Drawer" 
                        Header={<Header UserName={ this.state.UserName } SignOutSuccess={this.SignOutSuccess} />} 
                        Sidebar={<Sidebar
                            StartTask={this.props.StartTask}
                            FinishTask={this.props.FinishTask}/>}
                        >
                        <ChatRoom 
                        StartTask={this.props.StartTask}
                        FinishTask={this.props.FinishTask}/>
                    </Drawer> 
                    : 
                    null 
                );
    }

    RenderLoginPage()
    {
        return ( !this.state.iflogin && this.state.ifCheckLogin  ? 
                    <Dialog id="CR_Dialogue" title="Sign In" BackgroundColor='black'>
                        <LoginPage SignInSuccess={this.SignInSuccess} 
                            StartTask={this.props.StartTask}
                            FinishTask={this.props.FinishTask}
                        />
                    </Dialog> 
                    : 
                    null 
                );
    }


    //Function for whole Application
    SignInSuccess() 
    {
        this.setState({
            iflogin : true
        })
        //this.forceUpdate();
    }

    SignOutSuccess() 
    {
        this.setState({
            iflogin : false
        })
        //this.forceUpdate();
    }

}