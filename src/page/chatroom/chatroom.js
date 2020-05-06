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

        //console.log('chatroom/' + this.props.ChatRoomID + '/chatroom');
        // if(this.state.PostChatRoomID != this.state.ChatRoomID)
        // {
        this.ChatRoomList = [];
        let first_count = 0;
        let second_count = 0;
        firebase.database().ref('chatroom/' + this.props.ChatRoomID + '/chatroom')
        .on('child_added',(data)=>{
            
            second_count += 1;
            if (second_count > first_count) {
                //console.log(data.val());
                this.ChatRoomList[this.ChatRoomList.length] = this.createChatRoomListItem(data.val().user_name + ' Say : ' + data.val().user_commit , null);
                first_count = this.ChatRoomList.length;
                this.ProcessNotisfication(data.val().user_name,data.val().user_commit );
                this.forceUpdate();
                
            }
        });
        // }
        

        this.props.FinishTask();

    }
    // componentWillUpdate()
    // {
        
    //     // console.log(this.props.ChatRoomID);
    //     //this.setState({ifUpdated : true});
        
    // }
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

    // strip(html){
    //     var doc = new DOMParser().parseFromString(html, 'text/html');
    //     return doc.body.textContent;
    //  }

    SendText()
    {
        let txt = document.getElementById('textInput');

        if(txt.value == "") return;
        //console.log(txt.value);

        //console.log(this.strip(txt.value));

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
    NotifyMsg(Who , What) {
        var option = {
            tag: 'Notification',
            body: What,
            data: 'Information',
            icon: '' //可以自訂ICON
        }

        var n = new Notification("ChatRoom : " + Who, option);
        setTimeout(n.close.bind(n), 5000);
        console.log(n.data);
       
        n.onclick = function (event) {
            event.preventDefault(); // prevent the browser from focusing the Notification's tab
            window.open('https://chatroomapplication-7419f.web.app', '_blank');
        }
    }
    //Notisfication
    ProcessNotisfication(Who , What){

        if(document.hasFocus() == false || document.visibilityState != 'visible')
        {
            // If the user agreed to get notified
            // Let's try to send ten notifications
            if(window.Notification && Notification.permission === "granted") 
            {
                this.NotifyMsg(Who , What);                
            }
            // If the user hasn't told if he wants to be notified or not
            // Note: because of Chrome, we are not sure the permission property
            // is set, therefore it's unsafe to check for the "default" value.
            else if (window.Notification && Notification.permission !== "denied") {
                Notification.requestPermission(function (status) {
                    if (status === "granted") 
                    {
                        this.NotifyMsg(Who , What);
                    }
                        // Otherwise, we can fallback to a regular modal alert
                    else 
                    {
                        alert(Who + ' say : ' + What);
                    }
                });
            }
                // If the user refuses to get notified
            else {
                // We can fallback to a regular modal alert
            alert(Who + ' say : ' + What);
            }
        }
        
    };

}