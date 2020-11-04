import React from 'react';

class songCard extends React.Component {
    constructor() {
      super();
      this.state = {
          
        };
    }

    onPress=()=>{
        this.props.onPress(this.props.info.name)
    }

    render() {
      return (
        <div className="songCard" onClick={this.onPress}>
           {this.props.info.name}
        </div>
      )
    }
  }

export default songCard