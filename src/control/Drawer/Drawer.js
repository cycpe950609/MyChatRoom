import './Drawer.css'
import { CSSTransitionGroup } from 'react-transition-group'

export class Drawer extends React.Component
{
    constructor(props) 
    { 
        super(props);
        this.state = {
            user_name : "User Email",
            ifShowSidebar: true,
            ifShowContent: true,
            ifLessThan800: false
        };

        //this.ResizeEvent(null);

        // this.onAnimationStart = this.onAnimationStart.bind(this); 
        // this.onAnimationEnd = this.onAnimationEnd.bind(this);
        this.TriggerSidebar = this.TriggerSidebar.bind(this);
    }

    componentDidMount() 
    {
       
        this.ResizeEvent();
        //window.onresize =  this.ResizeEvent;

        window.addEventListener('resize', (event)=>{
            // do stuff here
            this.ResizeEvent(event);
        });
    }

    render()
    {
        //console.log('ifShowSidebar : ' + this.state.ifShowSidebar);
        //console.log('ifShowContent : ' + this.state.ifShowContent);
        //TODO : pass TriggerSidebar into header
        //no-padding-x : set in index.css

            
            
        let new_header = React.cloneElement(this.props.Header, { TriggerSidebar :  this.TriggerSidebar } );
        
        return(
            <div className="no-padding-x display-table DrawerBody">
                <div className="no-gutters no-padding-x DrawerHead">
                    {new_header}
                </div>
                <div className="SideBarAndContent">
                    {/* <div className="DrawerSidebar" >
                        {this.props.Sidebar}
                    </div>
                    <div className="DrawerContent">
                        {this.props.children}
                    </div> */}
                    { /*當螢幕寬度小於800px時，放前面才會顯示在下層*/
                        this.state.ifLessThan800 ? 
                        <div className="DrawerContent">
                            {this.props.children}
                        </div>
                        :
                        null
                    }
                    { this.state.ifShowSidebar ? 
                        <div className="DrawerSidebarBg">
                            <div className="DrawerSidebar" >
                                {this.props.Sidebar}
                            </div>
                            <div className="SidebarCloser" onClick={this.TriggerSidebar}>
                            </div>
                        </div>
                        :
                        null             
                    }
                    { /*當螢幕寬度大於800px時，放後面才會顯示在右邊*/
                        !this.state.ifLessThan800 ? 
                        <div className="DrawerContent">
                            {this.props.children}
                        </div>
                        :
                        null
                    }
                    
                </div>
            </div>
        );
    }
    TriggerSidebar(e)
    {
        //console.log('TriggerSidebar');
        this.setState((prevState) => ({
            ifShowSidebar: !prevState.ifShowSidebar,
            ifShowContent: true
        }));
        //console.log(this.state.ifShowSidebar);
        //console.log(this.state.ifSidebarFolded);// && !this.state.ifShowSidebar ) || (  !this.state.ifSidebarFolded )  );
        this.forceUpdate();
    }

    ResizeEvent(e)
    {
        
        let match = window.matchMedia('(max-width: 800px)');
        //console.log(this.state.ifSidebarFolded);
        if (match.matches) {
            //console.log('Less than 800px');
            if(this.state.ifLessThan800 == false)
            {
                this.setState({
                    ifShowSidebar : false,
                    ifShowContent : true,
                    ifLessThan800 : true
                });
            }
        }
        else{
            //console.log('Wider than 800px');
            if(this.state.ifLessThan800 == true)
            {
                this.setState({
                    ifShowSidebar : true,
                    ifShowContent : true,
                    ifLessThan800 : false
                });
            }
        }
    }

    // onAnimationStart(e)
    // {
    //     console.log('Start : ' + e.animationName);
    //     if(e.animationName == 'unfold-sidebar')
    //     {
    //         console.log('unfold-sidebar');
            
    //     }
    //     else if(e.animationName == 'fold-sidebar')
    //     {
    //         console.log('fold-sidebar');
    //         this.setState({ 
    //             ifSidebarFolded : true ,
    //             ifShowSidebar : false
    //         });
    //     }
    // }
    // onAnimationEnd(e){
        
    //     if(e.animationName == 'unfold-sidebar')
    //     {
    //         console.log('End : ' + e.animationName);
    //         let anm = document.getElementsByClassName('DrawerSidebar')[0];
    //         anm.style.animationName = 'none';
    //         this.forceUpdate();
    //         anm.style.animationName = 'unfold-sidebar';
    //     }
    //     else if(e.animationName == 'fold-sidebar')
    //     {
    //         let anm = document.getElementsByClassName('DrawerSidebar')[0];
    //         anm.style.animationName = 'none';
    //         this.forceUpdate();
    //         anm.style.animationName = 'fold-sidebar';
    //     }
    // }
    //TODO : Add support to drawer in/out after clicking the button of menu
    //TODO : Add animation to drawer in/out
}