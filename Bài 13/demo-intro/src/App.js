import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Member from './component/Member';
import data from './data/data';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: data
    }
  }

handleClick = () => {
    this.setState({
      list: [],
    });
    document.write('Empty List')
}

  render() {
    return (
      <div>
        {this.state.list.map(item => {
          return <Member
            name={item.name}
            age={item.age}
            address={item.address}
            email={item.email}
          />
        })}

        <button onClick={this.handleClick}> Delete all member</button>
      </div>

    )
  }
}

export default App;
