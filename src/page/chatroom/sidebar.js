import './sidebar.css'
import '../../img/avatar.png'
import '../../img/NewFriend.png'
import '../../img/NewGroup.png'
import { Dialog } from '../../control/Dialog/Dialog';
import { NewFriendForm } from './AddNewFriendForm.js'
import  { PinInput } from 'react-pin-input'


export class Sidebar extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            ifCreateGroup : false,
            ifCreateEnter : false
        };


        this.GroupsList = [];
        this.GroupsList.push(this.createDivider('My Group'));



        this.btnEnterGroup = this.btnEnterGroup.bind(this);
        this.btnCreateGroup = this.btnCreateGroup.bind(this);
    }
    render()
    {
        return(
            <div className="SidebarDiv">
                { this.state.ifCreateEnter ? this.RenderCreateEnterGroup() : this.RenderList()}
            </div>
        );
    }

    createDivider(Title)
    {
        return (<span>{Title}</span>);
    }

    RenderList()
    {
        return (
        <div className="SidebarDiv">
            <ul className="list-group SidebarList">
                { 
                        this.GroupsList.map((item) =>(
                            <li className="list-group-item">{item}</li>))
                }
            </ul>
            <ul className="SiderbarTab nav  mt-auto nav-light nav-tabs nav-fill">
                <li className="nav-item"  >
                    <label>Create a new one </label>
                    <button type="button" className="btn btn-dark btnSidebarNew" 
                        style={{ backgroundImage : "url(./img/NewGroup.png)" }} onClick={this.btnCreateGroup}
                    >+</button>
                    <label>Enter a exist one </label>
                    <button type="button" className="btn btn-dark btnSidebarNew" onClick={this.btnEnterGroup}
                        style={{ backgroundImage : "url(./img/NewGroup.png)" }}
                    >+</button>
                </li>
            </ul>
        </div>

        );
    }
    RenderCreateEnterGroup()
    {
        return(
            <Dialog BackgroundColor='whitesmoke' title={this.state.ifCreateGroup ? 'Create a new Group' : 'Enter a exist Group'}>
                <div className="CreateEnterDiv">
                    <img src="./img/chatroom.png" className="center_title_image"/>
                    <input type="text" id="inputname"  className="GroupInput" placeholder="Name of ChatRoom" required />
                    <input  type="password"     id="inputPassword"      className="GroupInput"  placeholder="Password of ChatRoom" required />
                    <div class="btn-group btn-block" style={{ marginTop : '10px' }}>
                        <button className="btn btn-danger" onClick={(e)=> { this.FinishCancelNewFriends() } }>Cancel</button>
                        <button className="btn btn-primary">{this.state.ifCreateGroup ? 'Create' : 'Enter'}</button>
                    </div>
                </div>
                
            </Dialog>
        )
    }

    FinishCancelNewFriends()
    {
        this.setState({
            ifCreateEnter : false
        })
    }

    btnCreateGroup(e)
    {
        this.setState({
            ifCreateGroup : true,
            ifCreateEnter : true
        })
    }
    btnEnterGroup(e)
    {
        this.setState({
            ifCreateGroup : false,
            ifCreateEnter : true
        })
    }
}





/*
export class Sidebar extends React.Component
{
    constructor(props)
    {
        super(props);
        this.props.StartTask();
        this.state = {
            ifShowFriends:true ,// false to show Chatroom
            ifAddNewObject:false,
            user_name : null
        }   
        this.FriendsList = [];
        this.GroupsList = [];

        this.getFriendID()
        .then((success1)=>{
            this.getFriendName(success1)
            .then((success2)=>{
                this.FriendsList.push( this.createFriendsListItem(success2,success2) );
                //console.log('SuccessAddList');
                this.props.FinishTask();
                this.forceUpdate();
            })
            .catch((error)=> console.error(error));
        })
        .catch((error)=> console.error(error));;
    }

    getFriendID()
    {

        return new Promise((resolve,reject)=>{
            this.props.StartTask();
            //TODO : Load List of Friends , Groups
    
            let user = firebase.auth().currentUser;
            //console.log('Get login user in Sidebar')
            if(user)
            {
    
    
                let uid = user.uid;
                //Get Unchecked Friends
                this.FriendsList.push(this.createDivider('New Friends'));
                //this.FriendsList.push( this.createFriendsListItem('Testing',123456) );
                let unFrdRef = firebase.database().ref('user_data/'+ uid + '/invited_friend');
                unFrdRef.on('child_added', (data) => {
                    var childData = data.val();

                    resolve(childData.user_id);
                    
                    
                });
            
    
    
                // let unFrdRef = firebase.database().ref('user_data/'+ uid + '/invited_friend');
                // unFrdRef.on('value',(data)=>{
                //     let childData = data.val();
    
                //     //let usr_name = this.getUserName(childData.user_id);
                //     this.FriendsList.push( this.createFriendsListItem('Test',childData.user_id) );
                // });
                
                //Get Frineds
                
                //Get Groups
            }
            else
            {
                alert('Something Error ! Please re-sign in !');
                //location.reload();
            } 
            //this.forceUpdate();
            this.props.FinishTask();
        });
    }

    getFriendName(UID)
    {
        return new Promise((resolve,reject)=>{
            let frdNameRef = firebase.database().ref('user_data/'+ UID + '/setting');
            //console.log(frdNameRef.child('user_name'));

            frdNameRef.child('user_name')
            .on('value',(frddata)=>{
                //console.log(frddata.val());
                resolve(frddata.val());
                // this.FriendsList.push( this.createFriendsListItem(frddata.val(),frddata.val()) );
                // console.log('SuccessAddList');
                // resolve('SuccessAddList');
            });
        });
    }

    componentDidMount()
    {
        // console.log('Did mount');
        // this.forceUpdate();
    }
    
    //var MyFriends = [<span>My Friends is empty</span>];
    //var MyChatRoom = [<span>My ChatRooms is empty</span>];
    render()
    {
        console.log('Sidebar Render');
        console.log(this.FriendsList.length);
        
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
*/