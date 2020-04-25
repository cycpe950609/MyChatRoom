import './login.css';
import Button from 'react-bootstrap/Button'

export class LoginPage extends React.Component{
    constructor(props) {
        super(props);

    
        // 為了讓 `this` 能在 callback 中被使用，這裡的綁定是必要的：
        this.btnSignIn_onClick          = this.btnSignIn_onClick.bind(this);
        this.btnGoogleSignIn_onClick    = this.btnGoogleSignIn_onClick.bind(this);
        this.btnNewAccount_onClick      = this.btnNewAccount_onClick.bind(this);
        //this.props.SignInSuccess        = this.props.SignInSuccess.bind(this);

    }

    render() {
        return (
            <div className="LoginPageDiv">
                <input  type="email"        id="inputEmail"         className="LoginInput"  placeholder="Email address" required autoFocus />
                <input  type="password"     id="inputPassword"      className="LoginInput"  placeholder="Password" required />
                <Button variant="primary"   id='btnSignIn'          onClick={this.btnSignIn_onClick}            className="LoginButton">Sign In</Button>
                <Button variant="info"      id='btnGoogleSignIn'    onClick={this.btnGoogleSignIn_onClick}      className="LoginButton">Sign in with Google</Button>
                <Button variant="secondary" id='btnNewAccount'      onClick={this.btnNewAccount_onClick}        className="LoginButton">New account</Button>
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
        console.log(this);
        firebase.auth().signInWithPopup(gle_provider)
        .then((result) => {
            
            //alert('Success Login with Google');
            this.props.SignInSuccess();
        })
        /*.catch(function(error) {
            alert("Error Login :" + error.message);
        });*/
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