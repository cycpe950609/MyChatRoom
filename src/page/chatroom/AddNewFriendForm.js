
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
        alert('A name was submitted: ' + this.state.name);
        event.preventDefault();
    }
}