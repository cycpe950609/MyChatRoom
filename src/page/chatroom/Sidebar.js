import './sidebar.css'
import '../../img/avatar.png'
import '../../img/NewFriend.png'
import '../../img/NewGroup.png'

export class Sidebar extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            ifShowFriends:false // false to show Chatroom
        }   
        
        //console.log(this.state.MyFriends);
    }
    //var MyFriends = [<span>My Friends is empty</span>];
    //var MyChatRoom = [<span>My ChatRooms is empty</span>];
    render()
    {
        let lst = [];
            // for (let i = 0; i < 100; i++) {
            //     lst.push(this.createFriendsListItem(i + '@gmail.com', i));
            // }
        //{ this.state.ifShowFriends ? this.state.MyFriends : this.state.MyChatRoom }
        return (
            
            <div className="SidebarDiv d-flex align-items-end flex-column">
                <ul className="list-group SidebarList">
                    {lst.map((item) =>(
                        <li className="list-group-item">{item}</li>
                    ))}
                </ul>
                <ul className="SiderbarTab nav  mt-auto nav-light nav-tabs nav-fill">
                    <li className="nav-item" onClick={(e) => { this.setState({ ifShowFriends : true }) }}>
                        <a className="nav-link active">Friends</a>
                    </li>
                    <li className="nav-item" onClick={(e) => { this.setState({ ifShowFriends : false }) }}>
                        <a className="nav-link">Chatrooms</a>
                    </li>
                    <li className="nav-item"  >
                        <button className="btn btn-dark btnSidebarNew" style={{ backgroundImage : (this.state.ifShowFriends) ? "url(./img/NewFriend.png)" : "url(./img/NewGroup.png)" }}>+</button>
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

}