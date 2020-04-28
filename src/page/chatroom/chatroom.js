import './chatroom.css'
import '../../img/avatar.png'
import '../../img/send_message.png'


export class ChatRoom extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            ifShowFriends:false // false to show Chatroom
        }   
    }

    componentDidMount()
    {
        this.props.StartTask();
        //TODO : Load chatroom content
        this.props.FinishTask();

    }
    
    render()
    {
        let lst = [];
            for (let i = 0; i < 100; i++) {
                lst.push(this.createChatRoomListItem(i + '@gmail.com', i));
            }
        //{ this.state.ifShowFriends ? this.state.MyFriends : this.state.MyChatRoom }
        return (
            
            <div className="ChatRoomDiv">
                <ul className="list-group ChatRoomList">
                    {lst.map((item) =>(
                        <li className="list-group-item">{item}</li>
                    ))}
                </ul>
                <div className="ChatRoomText mt-auto input-group mb-3">
                    <input type="text" className="form-control"/>
                    <div className="input-group-append">
                        <button className="btn btn-dark" type="button">
                            <img src="./img/send_message.png" width="30" height="30" alt=""/>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    createChatRoomListItem(Name , id)
    {
        return (
            <div id={id}>
                <img className="ListItemAvatar" src="./img/avatar.png" width="50" height="50" alt=""/>
                <span className="ChatRoomListItem"> { Name } </span>
            </div>
        );
    }

}