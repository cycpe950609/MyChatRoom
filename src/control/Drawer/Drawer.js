import './Drawer.css'


export class Drawer extends React.Component
{
    constructor(props) 
    { 
        super(props);
        this.state = {
            user_name : "User Email"
        };

    }

    render()
    {
        //no-padding-x : set in index.css
        return(
            <div className="container-fluid no-padding-x display-table DrawerBody">
                <div className="row no-gutters no-padding-x">
                    {this.props.Header}
                </div>
                <div className="row no-gutters no-padding-x">
                    <div className="col-3 DrawerSidebar display-table-cell">{this.props.Sidebar}</div>
                    <div className="col-9 DrawerContent display-table-cell">{this.props.children}</div>
                </div>
            </div>
        );
    }

}