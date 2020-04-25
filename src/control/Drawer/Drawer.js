import './Drawer.css'

export class Drawer extends React.Component
{
    render()
    {
        return(
            <div className="DrawerBody">
                <div className="DrawerHead"></div>
                <div className="DrawerSidebar">{this.props.Sidebar}</div>
                <div className="DrawerContent">{this.props.children}</div>
            </div>
        );
    }

}