import React, { Component } from "react";
import classes from "./Layout.css"
import MenuToggle from "../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../components/Navigation/Drawer/Drawer";


class Layout extends Component {
  state = {
    menu: false,
  }
 onToggleHandler = () => {
    this.setState({menu : !this.state.menu})
  }
  
  
  render() {
    
    return (
      <div className = {classes.Layout}>
        <Drawer isOpen = {this.state.menu} onClose = {this.onToggleHandler}/>
        <MenuToggle 
          onToggle = {this.onToggleHandler}
          isOpen = {this.state.menu}
          />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
