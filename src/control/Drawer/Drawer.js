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
            <div className="no-padding-x display-table DrawerBody">
                <div className="no-gutters no-padding-x DrawerHead">
                    {this.props.Header}
                </div>
                <div className="no-gutters no-padding-x SideBarAndContent">
                    <div className="DrawerSidebar">{this.props.Sidebar}</div>
                    <div className="DrawerContent">{this.props.children}</div>
                </div>
            </div>
        );
    }

}