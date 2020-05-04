import './sidebar.css'
import '../../img/avatar.png'
import '../../img/NewFriend.png'
import '../../img/NewGroup.png'
import { Dialog } from '../../control/Dialog/Dialog';
import { NewFriendForm } from './AddNewFriendForm.js'


export class Sidebar extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state = {
            ifShowFriends:true ,// false to show Chatroom
            ifAddNewObject:false,
            user_name : null
        }   
        this.FriendsList = [];
        this.GroupsList = [];
    }

    componentDidMount()
    {
        this.props.StartTask();
        //TODO : Load List of Friends , Groups

        let user = firebase.auth().currentUser;
        //console.log('Get login user in Sidebar')
        if(user)
        {
            let uid = user.uid;
            //Get Unchecked Friends
            this.FriendsList.push(this.createDivider('New Friends'));
            let unFrdRef = firebase.database().ref('user_data/'+ uid + '/invited_friend');
            unFrdRef.on('child_added',(data)=>{
                let childData = data.val();
                this.FriendsList.push(this.createFriendsListItem(childData.Name,childData.Uid));
            });
            
            //Get Frineds
            
            //Get Groups
        
        }
        else
        {
            alert('Something Error ! Please re-sign in !');
            //location.reload();
        }

        
        
        this.forceUpdate();
        this.props.FinishTask();
    }
    //var MyFriends = [<span>My Friends is empty</span>];
    //var MyChatRoom = [<span>My ChatRooms is empty</span>];
    render()
    {
        
        //{ this.state.ifShowFriends ? this.state.MyFriends : this.state.MyChatRoom }
        return (
            //console.log(this.state.ifAddNewObject),
            <div className="SidebarDiv">
                { this.state.ifAddNewObject ? this.RenderNewObjectDialog() : this.RenderList() }
            </div>   
        );
    }

    RenderNewObjectDialog()
    {
        return (
            <Dialog BackgroundColor='whitesmoke' title={this.state.ifShowFriends ? 'Add New Friend' : 'Add New Group'}>
                {
                    this.state.ifShowFriends ?
                        <NewFriendForm FinishCancelNewFriends={()=>{ this.setState( { ifAddNewObject : false } ) }}/>
                        :
                        <span>New Group</span>    
                }
            </Dialog>
        );
    }
    RenderList()
    {
        return (
        <div className="SidebarDiv">
            <ul className="list-group SidebarList">
                { ( this.state.ifShowFriends ) ? 
                        this.FriendsList.map((item) =>(
                            <li className="list-group-item">{item}</li>))
                    :
                        this.GroupsList.map((item) =>(
                            <li className="list-group-item">{item}</li>))
                }
            </ul>
            <ul className="SiderbarTab nav  mt-auto nav-light nav-tabs nav-fill">
                <li className="nav-item" onClick={(e) => { this.setState({ ifShowFriends : true }) }}>
                    <a className="nav-link active">Friends</a>
                </li>
                <li className="nav-item" onClick={(e) => { this.setState({ ifShowFriends : false }) }}>
                    <a className="nav-link">Chatrooms</a>
                </li>
                <li className="nav-item"  >
                    <button className="btn btn-dark btnSidebarNew" 
                        style={{ backgroundImage : (this.state.ifShowFriends) ? 
                                                        "url(./img/NewFriend.png)" 
                                                        : 
                                                        "url(./img/NewGroup.png)" }}
                        onClick={ (e)=> { this.setState({ ifAddNewObject : true }) } }
                    
                    >+</button>
                </li>
            </ul>
        </div>

        );
    }

    createFriendsListItem(Name , id)
    {
        return (
            <div id={id}>
                <img className="ListItemAvatar" src="./img/avatar.png" width="50" height="50" alt=""/>
                <span className="FriendsListItem"> { Name } </span>
            </div>
        );
    }
    createDivider(Title)
    {
        return (<span>{Title}</span>);
    }

}