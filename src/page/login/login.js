import './login.css';
import { NewUserPage } from './newuser.js';


export class LoginPage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            ifUserExist : true,
            user_id     : null,
            user_email  : null
        };
    
        // 為了讓 `this` 能在 callback 中被使用，這裡的綁定是必要的：
        this.btnSignIn_onClick          = this.btnSignIn_onClick.bind(this);
        this.btnGoogleSignIn_onClick    = this.btnGoogleSignIn_onClick.bind(this);
        this.btnNewAccount_onClick      = this.btnNewAccount_onClick.bind(this);
        this.btnFacebookSignIn_onClick  = this.btnFacebookSignIn_onClick.bind(this);
        //this.props.SignInSuccess        = this.props.SignInSuccess.bind(this);

    }

    render() {
        //console.log('Login Render');
        return (
            <div className="LoginPageDiv p-0">
               { (this.state.ifUserExist ) ?  this.renderLoginPage() : this.renderNewUserPage() }
            </div> 
        );
    }

    renderLoginPage()
    {
        console.log('LoginPage');
        return (
            <div className="LoginPageDiv p-0">
                <img src="./img/chatroom.png" className="center_title_image"/>
                <input  type="email"        id="inputEmail"         className="LoginInput"  placeholder="Email address" required autoFocus />
                <input  type="password"     id="inputPassword"      className="LoginInput"  placeholder="Password" required />
                <button id='btnSignIn'          onClick={this.btnSignIn_onClick}    className="LoginButton">Sign In</button>
                <button id='btnGoogleSignIn'    onClick={this.btnGoogleSignIn_onClick}    className="LoginButton">Sign in with Google</button>
                <button id='btnFacebookSignIn'  onClick={this.btnFacebookSignIn_onClick}    className="LoginButton">Sign in with Facebook</button>
                <button id='btnNewAccount'      onClick={this.btnNewAccount_onClick}    className="LoginButton">New account</button>  
            </div> 
        );
    }
    renderNewUserPage()
    {
        console.log('NewUserPage');
        return (
            <div className="LoginPageDiv p-0">
                <NewUserPage 
                    Email={this.state.user_email}
                    StartTask={this.props.StartTask}
                    FinishTask={this.props.FinishTask}
                    SignInSuccess={this.props.SignInSuccess}
                />
            </div> 
        );
    }

    btnSignIn_onClick(e) {
        let txtEmail = document.getElementById('inputEmail');
        let txtPassword = document.getElementById('inputPassword');

        this.props.StartTask();
        firebase.auth().signInWithEmailAndPassword(txtEmail.value, txtPassword.value)
        .then( (success) => {
            //alert('Success Login with email');
            this.ProcessAfterLogin();
        })
        .catch((error) => {
            var errorMessage = error.message;
            txtEmail.value = "";
            txtPassword.value = "";
            alert("Error Login :" + errorMessage);
            this.props.FinishTask();
        });
    }

    btnGoogleSignIn_onClick(e){
        this.props.StartTask();

        let gle_provider = new firebase.auth.GoogleAuthProvider();
        //console.log(this);
        firebase.auth().signInWithPopup(gle_provider)
        .then((result) => {
            
            //alert('Success Login with Google');
            this.ProcessAfterLogin();
        })
        .catch((error) => {
            alert("Error Login :" + error.message);
            this.props.FinishTask();
        });
    }

    btnFacebookSignIn_onClick(e){
        this.props.StartTask();

        let fb_provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(fb_provider)
        .then((result) => {
            //alert('Success Login with Facebook');
            this.ProcessAfterLogin();
        })
        .catch((error) => {
            alert("Error Login :" + error.message);
            this.props.FinishTask();
        });
    }

    btnNewAccount_onClick(e){
        this.props.StartTask();

        let txtEmail = document.getElementById('inputEmail');
        let txtPassword = document.getElementById('inputPassword');

        firebase.auth().createUserWithEmailAndPassword(txtEmail.value, txtPassword.value)
        .then((success)=>{
            alert('Success create account with email');
            //this.ProcessAfterLogin();
            txtEmail.value = "";
            txtPassword.value = "";
            this.props.FinishTask();
        })
        .catch((error) => {
            txtEmail.value = "";
            txtPassword.value = "";
            alert("Error create account :" + error.message);
            this.props.FinishTask();
        });

    }
    ProcessAfterLogin()
    {
        let user = firebase.auth().currentUser;
        this.CheckifUserExist(user.uid).then(
            (resolve)=>{
                //console.log(resolve);
                if(resolve == null)
                {
                    this.setState({
                            ifUserExist : false,
                            user_id     : user.uid,
                            user_email  : user.email
                        });
                    //console.log('Testing 2');
        
                    this.props.FinishTask();
                    //this.forceUpdate();
                }
                else
                {
                    console.log('Sign in Success');
                    this.props.SignInSuccess();
                }
            });
        
    }

    CheckifUserExist(uid)
    {
        return new Promise((success,failure)=>{
            firebase.database().ref('user_data/' + uid + '/setting').once("value", snapshot => {
                if (snapshot.exists()){
                   //console.log("exists!");
                   success(snapshot);
                }
                else
                {
                    //console.log('Doesnt Exist');
                    success(null);
                }
            });
        });
       
    }
}