import './Dialogue.css';

export class Dialogue extends React.Component
{
    render(){
        return (
            <div className="TD_Background" id="td_dialog_bg">
                <div className="Top_Dialog" id="td_dialog">
                    <div className="TD_Header">
                        <span className="TD_Title" id="td_title">
                            {this.props.title}
                        </span>
                    </div>
                    <div className="TD_Body" id="td_dialog_body">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
        
    }

} 