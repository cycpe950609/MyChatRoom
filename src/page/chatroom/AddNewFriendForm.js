
export class NewFriendForm extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {name: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render()
    {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label for="new_friends_name">Enter Friend's Name</label>
                    <input type="text" className="form-control-file" id="new_friends_name"/>
                    <div class="btn-group btn-block" style={{ marginTop : '10px' }}>
                        <button className="btn btn-danger" onClick={(e)=> { this.props.FinishCancelNewFriends() } }>Cancel</button>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </div>
            </form>
        );
    }
    handleChange(event) 
    {
        this.setState({name: event.target.value});
    }
    
    handleSubmit(event) 
    {
        //Check if exist
        let friend_name = document.getElementById('new_friends_name').value;
        firebase.database().ref('users_name_with_id')
            .orderByChild('common_id')
            .equalTo(friend_name)
            .once('value')
            .then( 
                (snapshot) => {
                    console.log('Get result of ID checking');

                    
                    
                    if (snapshot.exists()){
                        let friend_uid;
                        let userId = firebase.auth().currentUser.uid;
                        snapshot.forEach((childSnapshot) => { friend_uid = childSnapshot.val().user_id; });
                        //write touser's inviting
                        let inviting = firebase.database().ref('user_data/' + userId + '/inviting_friend').push({
                            user_id : friend_uid
                        });

                        //write to friend's invited
                        let invited = firebase.database().ref('user_data/' + friend_uid + '/invited_friend').push({
                            user_id : userId
                        });

                        Promise.all([inviting,invited])
                        .then((result)=>{
                            alert('Success Add Friend. Wait for respond');
                            this.props.FinishCancelNewFriends();
                        })
                        .catch((error)=>{
                            alert('Error : ' + error.message);
                        })
                        //TODO : Check if this function is correct after add Cloud Function to add CommonID into users_name_with_id
                    }
                    else
                    {
                        alert("Doesn't find the name , please enter correct name.");
                        reject('NoNameExit');
                    }
                }
            );
        event.preventDefault();
    }
}