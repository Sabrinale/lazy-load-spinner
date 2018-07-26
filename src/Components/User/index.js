import React, { Component } from 'react';

class User extends Component {
  shouldComponentUpdate(nextProps) {
     if (this.props.data.id === nextProps.data.id) {
       return false;
     } else {
       return true;
     }
  }
  render() {
    const {
      id,
      first_name,
      avatar,
      last_name
      }
     = this.props.data;

    return (
      <div className="user">
        <div className="col" id={id}>
          <img src={avatar} alt={first_name+ + last_name+" avatar"} />
        </div>
        <div className="col" >
          <h1>{first_name} {last_name }</h1>
          <h4>Id: {id}</h4>
        </div> 
      </div>
    );
  }
}

export default User;
