import React, { Component } from 'react';


class Member extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                <b>Name</b> : {this.props.name}<br />
                <b>Age</b> : {this.props.age}<br />
                <b>Address</b> : {this.props.address}<br />
                <b>Email </b>: {this.props.email}<br />
                <br />
            </div> 
            
        )
    }
}  

export default Member