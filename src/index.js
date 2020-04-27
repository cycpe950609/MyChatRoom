import './firebase.config.js';

import { Dialogue } from './control/Dialogue/Dialogue.js'
import { LoginPage } from './page/login/login.js'
import { Drawer } from './control/Drawer/Drawer.js'
import { Header } from './page/chatroom/header.js'
import { Sidebar } from './page/chatroom/Sidebar.js'


class Application extends React.Component
{
    constructor(props) 
    { 
        super(props);
        this.state = {
            iflogin:false,
            ifCheckLogin:false,
            UserName:"User's Name"
        };

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                //console.log(this);
                this.setState({
                    iflogin : true,
                    ifCheckLogin:true
                })
            } else {
                console.log(this);
                // No user is signed in.
                this.setState({
                    iflogin : false,
                    ifCheckLogin:true
                })
            }
        });

        this.SignInSuccess = this.SignInSuccess.bind(this);
        this.SignOutSuccess = this.SignOutSuccess.bind(this);
    }

    render()
    {
        return (
            <div className="CR_Application">
                { this.state.iflogin && this.state.ifCheckLogin ? <Drawer id="CR_Drawer" Header={<Header UserName={ this.state.UserName } SignOutSuccess={this.SignOutSuccess} />} Sidebar={<Sidebar/>}></Drawer> : null }
                { !this.state.iflogin && this.state.ifCheckLogin  ? <Dialogue id="CR_Dialogue" title="Sign In"><LoginPage SignInSuccess={this.SignInSuccess} /></Dialogue> : null }
            </div>
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

//Init GUI
ReactDOM.render(<Application/>,document.getElementsByClassName('CR_Application')[0]); 





