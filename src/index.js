import './firebase.config.js';

import { Dialogue } from './control/Dialogue/Dialogue.js'
import { LoginPage } from './page/login/login.js'
import { Drawer } from './control/Drawer/Drawer.js'


class Application extends React.Component
{
    constructor(props) 
    { 
        super(props);
        this.state = {
            iflogin:false,
            ifCheckLogin:false
        };

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                console.log(this);
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
    }

    render()
    {
        return (
            <div className="CR_Application">
                { this.state.iflogin && this.state.ifCheckLogin ? <Drawer id="CR_Drawer"></Drawer> : null }
                { this.state.iflogin && this.state.ifCheckLogin  ? null : <Dialogue id="CR_Dialogue" title="Sign In"><LoginPage SignInSuccess={this.SignInSuccess} /></Dialogue> }
            </div>
        );
    }



    //Function for whole Application
    SignInSuccess() 
    {
        this.setState({
            iflogin : true
        })
        this.forceUpdate();
        
        //document.getElementById("CR_Dialogue").style.display = 'none';
        //ReactDOM.render(<Drawer></Drawer>, document.getElementById("CR_Dialogue"));
    }

    SignOut() 
    {
        firebase.auth().signOut()
        .then((success)=>{

            alert("Success Log Out");
            ReactDOM.render(<Dialogue title="Sign In"><LoginPage/></Dialogue>, document.getElementById("CR_Dialogue"));

        })
        .catch((error)=>{

            alert("Error Sign Out : " + error.message);

        });
    }

}

//Init GUI
ReactDOM.render(<Application/>,document.getElementsByClassName('CR_Application')[0]); 





