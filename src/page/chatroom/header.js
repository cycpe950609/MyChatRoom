import './header.css'
import '../../img/chatroom.png'
import '../../img/menu.png'
import '../../img/logout.png'

export class Header extends React.Component
{
    constructor(props) 
    { 
        super(props);
        this.SignOutProcess = this.SignOutProcess.bind(this);
    }

    render()
    {
        return(
            <div className="header">
                <nav className="navbar mt-auto navbar-light bg-light">
                    <div className="chatroom_header_icon"  alt=""/>
                    <span className="mx-auto my-0" id="chatroom_header_title">User's Name</span>
                    <ul className="nav navbar-nav navbar-right">
                        <li><button className="btn btn-dark" ><img src="./img/logout.png" width="30" height="30" alt=""/></button></li>
                    </ul>  
                </nav>    
            </div>
        );
    }

    SignOutProcess()
    {
        //Logout
        firebase.auth().signOut()
        .then((success)=>{

            alert("Success Sign Out");
            this.props.SignOutSuccess();

        })
        .catch((error)=>{

            alert("Error Sign Out : " + error.message);

        });
    }

}