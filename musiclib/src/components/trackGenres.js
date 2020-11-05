import React from "react";
import { url } from "../globals";

class TrackGenres extends React.Component {
  constructor() {
    super();
    this.state = {
      genres: [],
      addGenre:"",
    };
  }


  componentDidUpdate = (PP, PS, SS) => {
    if (PP.info._id !== this.props.info._id) {
      let newGenres = [];
      for (let i = 0; i < this.props.info.genres.length; i++) {
        newGenres.push(
          <div key={i} className="clTracksGenre">
            {" "}
            {this.props.info.genres[i]}
          </div>
        );
      }
      this.setState({ genres: newGenres });
    }
  };

  handleTypeGenre=(e)=>{
    this.setState({ addGenre: e.target.value });
  }

  handleAddGenre=async()=>{
    // console.log( this.state.addGenre);
    const data = { genre: this.state.addGenre, _id:this.props.info._id };
    console.log(data.genre);
    if (data.genre !== "") {
      const response = await fetch(url + "songs", {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(data),
      });
      const resp = await response.json();
      console.log(resp.message);
    } else {
        alert('Invalid Genre')
    }
  }

  componentDidMount = () => {
    let newGenres = [];
    for (let i = 0; i < this.props.info.genres.length; i++) {
      newGenres.push(
        <div key={i} className="clTracksGenre">
          {" "}
          {this.props.info.genres[i]}
        </div>
      );
    }
    this.setState({ genres: newGenres });
  };

  render() {
    //   console.log(this.props.info.genres);
    return (
      <div>
        <div id="idGenres">{this.state.genres}</div>
        <div>
          <input
            id="idAddBox"
            value={this.state.addGenre}
            onChange={this.handleTypeGenre}
            type="text"
          ></input>
          <button id="idAddButton" onClick={this.handleAddGenre} >
            Add Genre
          </button>
        </div>
      </div>
    );
  }
}

export default TrackGenres;
