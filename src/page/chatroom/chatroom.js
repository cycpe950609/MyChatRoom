import './chatroom.css'
import '../../img/avatar.png'
import '../../img/send_message.png'


export class ChatRoom extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            ifShowFriends:false, // false to show Chatroom
            //PostChatRoomID : null,
            ChatRoomID : null,
            user_name : null,
            
            //ifUpdated : true
        }   
        //this.UpdatChatRoomID = this.UpdatChatRoomID.bind(this);
        this.SendText        = this.SendText.bind(this);

        this.ChatRoomList = [];        

    }

    static getDerivedStateFromProps(nextProps, prevState)
    {
        if(prevState.ChatRoomID != nextProps.ChatRoomID)
        {
            return {
                //PostChatRoomID : prevState.ChatRoomID,
                ChatRoomID  : nextProps.ChatRoomID
            }
        }
        return null;
    }

    componentDidMount()
    {
        console.log('Mount : ' + this.props.ChatRoomID);
        this.props.StartTask();

        if(this.state.user_name == null)
        {
            let uid = firebase.auth().currentUser.uid;
            let setRef = firebase.database().ref('user_data/'+ uid + '/setting');
            setRef.once('value',(data)=>{
                //console.log(data.val().user_name);
                this.setState({user_name : data.val().user_name });
            });
        }

        //console.log('Test5');
        //TODO : Load chatroom content
        
        //console.log('ChatRoom ID : ' + this.props.ChatRoomID);

        console.log('chatroom/' + this.props.ChatRoomID + '/chatroom');
        // if(this.state.PostChatRoomID != this.state.ChatRoomID)
        // {
        this.ChatRoomList = [];
        let first_count = 0;
        let second_count = 0;
        firebase.database().ref('chatroom/' + this.props.ChatRoomID + '/chatroom')
        .on('child_added',(data)=>{
            
            second_count += 1;
            if (second_count > first_count) {
                console.log(data.val());
                this.ChatRoomList[this.ChatRoomList.length] = this.createChatRoomListItem(data.val().user_name + ' Say : ' + data.val().user_commit , null);
                first_count = this.ChatRoomList.length;
                this.forceUpdate();
            }
        });
        // }
        

        this.props.FinishTask();

    }
    componentWillUpdate()
    {
        
        // console.log(this.props.ChatRoomID);
        //this.setState({ifUpdated : true});
        
    }
    // createChatRoomListItem(name , text)
    // {
    //     return (
    //         <span>{name + ' : ' + text }</span>
    //     );
    // }
    
    render()
    {
        //{ this.state.ifShowFriends ? this.state.MyFriends : this.state.MyChatRoom }
        return (
            
            <div className="ChatRoomDiv">
                <ul className="list-group ChatRoomList">
                    {this.ChatRoomList.map((item) =>(
                        <li className="list-group-item">{item}</li>
                    ))}
                </ul>
                <div className="ChatRoomText mt-auto input-group mb-3">
                    <input type="text" className="form-control" id="textInput"/>
                    <div className="input-group-append btnSend">
                        <button className="btn btn-dark" type="button" onClick={this.SendText}>
                            <img src="./img/send_message.png" width="30" height="30" alt=""/>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    SendText()
    {
        let txt = document.getElementById('textInput');

        if(txt.value == "") return;
        //console.log(txt.value);

        firebase.database().ref('chatroom').child(this.props.ChatRoomID).child('chatroom').push({
            user_name : this.state.user_name,
            user_commit : txt.value
        });

        txt.value = "";
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