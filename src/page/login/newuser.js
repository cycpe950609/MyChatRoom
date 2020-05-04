import './newuser.css'

export class NewUserPage extends React.Component
{
    constructor(props) {
        super(props);

    
        // 為了讓 `this` 能在 callback 中被使用，這裡的綁定是必要的：
        this.SubmitHandle = this.SubmitHandle.bind(this);

    }
    render()
    {
        console.log('Render NewUserPage');
        return (
            <div className="NewUserDiv p-0" >
                <label className="new_user_title">Please fill your profile</label>

                <label htmlFor="user_email">Your Email</label>
                <input type="text" id="user_email" value={this.props.Email} readOnly/>

                <label htmlFor="user_name">Your Name</label>
                <input type="text" id="user_name" value={ this.props.Email.substring(0, this.props.Email.lastIndexOf("@")) }/>

                <label htmlFor="user_id">Your ID</label>
                <input type="text" id="user_id" value={ this.props.Email.substring(0, this.props.Email.lastIndexOf("@")) }/>

                <button type="submit" className="btn btn-primary" style={{ marginTop : '10px' }} onClick={this.SubmitHandle}>OK</button>
            </div>
        );
    }
    SubmitHandle(e)
    {
        this.props.StartTask();
        let name = document.getElementById('user_name');
        let id = document.getElementById('user_id');

        if(name.value == '')
            alert('Please enter your name');
        else if(id.value == '')
            alert('Please enter your ID');    
        else if(name.value == '' && id.value == '')
            alert('Please enter your name and ID');
        

        //Check if ID exist
        console.log('Check if ID exist');
        console.log(id.value);
        
        this.AddNewUserInDatabase()
        .then((success)=>{
            console.log('Success Add User');
            this.props.FinishTask();
            this.props.SignInSuccess()
        })
        .catch((error)=>{
            alert('Error : ' + error.message);
        })
        
        console.log('Finish Searching ');

        // this.CheckIfIDExist(id.value)
        // .then((success)=>{
        //     alert('Success Add User');
        //     this.props.FinishTask();
        //     this.props.SignInSuccess();
        // }).catch((error)=>{
        //     alert('Error Add User : ' + error.message);
        // })
        event.preventDefault;
        console.log('Finish SubmitHandle');
    }

    AddNewUserInDatabase()
    {
        return new Promise((resolve,reject)=>{
            let name = document.getElementById('user_name');
            let id = document.getElementById('user_id');
            firebase.database().ref('users_name_with_id')
            .orderByChild('common_id')
            .equalTo(id.value)
            .once('value')
            .then( 
                (snapshot) => {
                    console.log('Get result of ID checking');
                    if (snapshot.exists()){
                        alert('ID already exist. Please change a new one');
                        reject('IDExist');
                    }
                    else
                    {
                        console.log('ID doesnt used');
                        let userId = firebase.auth().currentUser.uid;
                        //Push data
                        console.log('Name : ' + name.value);
                        console.log('Email : ' + this.props.Email);
                        console.log('ID : ' + id.value);

                        firebase.database().ref('user_data/' + userId + '/setting').push({
                            user_name   : name.value,
                            user_email  : this.props.Email,
                            common_id   : id.value
                        }).then((e)=>{
                            console.log('Success Add User');
                            resolve('SuccessAddUser');
                        });
                }
            }).catch(function(error) {
                console.error(error);});
        })
    }
}