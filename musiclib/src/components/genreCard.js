import React from "react";

class GenreCard extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  delete=()=>{
      this.props.delete(this.props.genre)
  }

  componentDidMount = () => {};

  componentDidUpdate = (PP, PS, SS) => {};

  render() {
    return ( 
    <div className="clTracksGenre">
        {this.props.genre}
        
        <button onClick={this.delete}> Delete</button>
        
    </div>

    );
  }
}

export default GenreCard;
