import './login.css';


export class LoginPage extends React.Component{
    constructor(props) {
        super(props);

    
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
            <div className="LoginPageDiv">
                <div className="TD_Background" id="td_dialog_bg">
                    <div className="Top_Dialog" id="td_dialog">
                        <div className="TD_Header">
                            <span className="TD_Title" id="td_title">Sign In </span>
                        </div>
                        <div className="TD_Body" id="td_dialog_body">
                            <input  type="email"        id="inputEmail"         className="LoginInput"  placeholder="Email address" required autoFocus />
                            <input  type="password"     id="inputPassword"      className="LoginInput"  placeholder="Password" required />
                            <button id='btnSignIn'          onClick={this.btnSignIn_onClick}    className="LoginButton">Sign In</button>
                            <button id='btnGoogleSignIn'    onClick={this.btnGoogleSignIn_onClick}    className="LoginButton">Sign in with Google</button>
                            <button id='btnFacebookSignIn'  onClick={this.btnFacebookSignIn_onClick}    className="LoginButton">Sign in with Facebook</button>
                            <button id='btnNewAccount'      onClick={this.btnNewAccount_onClick}    className="LoginButton">New account</button>
                        </div>
                    </div>
                    
                </div>

                
            </div> 
        );
    }

    btnSignIn_onClick(e) {
        let txtEmail = document.getElementById('inputEmail');
        let txtPassword = document.getElementById('inputPassword');

        firebase.auth().signInWithEmailAndPassword(txtEmail.value, txtPassword.value)
        .then( (success) => {
            //alert('Success Login with email');
            this.props.SignInSuccess();
        })
        .catch(function(error) {
            var errorMessage = error.message;
            txtEmail.value = "";
            txtPassword.value = "";
            alert("Error Login :" + errorMessage);
        });
    }

    btnGoogleSignIn_onClick(e){
        let gle_provider = new firebase.auth.GoogleAuthProvider();
        //console.log(this);
        firebase.auth().signInWithPopup(gle_provider)
        .then((result) => {
            
            //alert('Success Login with Google');
            this.props.SignInSuccess();
        })
        .catch(function(error) {
            alert("Error Login :" + error.message);
        });
    }

    btnFacebookSignIn_onClick(e){
        let fb_provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(fb_provider)
        .then((result) => {
            //alert('Success Login with Facebook');
            this.props.SignInSuccess();
        })
        .catch(function(error) {
            alert("Error Login :" + error.message);
        });
    }

    btnNewAccount_onClick(e){

        let txtEmail = document.getElementById('inputEmail');
        let txtPassword = document.getElementById('inputPassword');

        firebase.auth().createUserWithEmailAndPassword(txtEmail.value, txtPassword.value)
        .then(function(success){
            alert('Success create account with email');
        })
        .catch(function(error) {
            txtEmail.value = "";
            txtPassword.value = "";
            alert("Error create account :" + error.message);
        });

    }
}