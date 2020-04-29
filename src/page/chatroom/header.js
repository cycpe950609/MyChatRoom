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
        this.btnIcon_onClick = this.btnIcon_onClick.bind(this);
    }

    render()
    {
        return(
            <div className="header">
                <nav className="navbar mt-auto navbar-light bg-light">
                    <div className="chatroom_header_icon"  alt="" onClick={this.btnIcon_onClick}/>
                    <span className="mx-auto my-0" id="chatroom_header_title">User's Name</span>
                    <ul className="nav navbar-nav navbar-right">
                        <li><button className="btn btn-dark" onClick={this.SignOutProcess}><img src="./img/logout.png" width="30" height="30" alt=""/></button></li>
                    </ul>  
                </nav>    
            </div>
        );
    }

    btnIcon_onClick(e)
    {
        alert('btnIcon Click');
    }

    btnLogout_onClick(e)
    {
        firebase.auth().signOut()
        .then((e)=> {
            this.props.SignOutSuccess();
        })
        .catch((e)=> {
            alert('Sign Out Error : ' + error.message);
        });
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
//TODO : Add logout event to Button of Logout