import React from "react";

import GenreCard from "./genreCard";

import gold from "./gold.png";
import grey from "./grey.png";

import { url } from "../globals";

class TrackGenres extends React.Component {
  constructor() {
    super();
    this.state = {
      stars: [],
      genres: [],
      newAddGenre: "",
      addInput: { name: "", rating: 0, genres: [""] },
    };
  }

  renderStars = () => {
    // console.log(this.state.addInput.rating);
    let newArr = [];
    let starCount = 0;
    for (let i = 0; i < this.state.addInput.rating; i++) {
      starCount++;
      newArr.push(
        <img
          key={i + 10}
          src={gold}
          id="idStarImg"
          alt=""
          onClick={() => this.pressedStar(i)}
        ></img>
      );
    }
    for (let i = starCount; i < 5; i++) {
      starCount++;
      newArr.push(
        <img
          key={i}
          id="idStarImg"
          src={grey}
          alt=""
          onClick={() => this.pressedStar(i)}
        ></img>
      );
    }
    this.setState({ stars: newArr });
  };

  componentDidMount = () => {
    let newAddInput = {
      name: this.props.info.name,
      rating: this.props.info.userRating,
      genres: this.props.info.genres,
    };
    let newGenres = [];
    for (let i = 0; i < this.props.info.genres.length; i++) {
      newGenres.push(
        <GenreCard
          delete={this.deleteGenre}
          key={i}
          genre={this.props.info.genres[i]}
        />
      );
    }
    this.setState({ addInput: newAddInput, genres: newGenres });
    this.renderStars();
  };

  deleteGenre = (genre) => {
    let newAddinput = this.state.addInput;
    let index = newAddinput.genres.indexOf(genre);
    newAddinput.genres.splice(index, 1);
    this.setState({ addInput: newAddinput, genres: newAddinput.genres });
  };

  pressedStar = (i) => {
    // console.log(`pressed Star ${i + 1}`);
    let newAddInput = this.state.addInput;
    newAddInput.rating = i + 1;
    this.setState({ addInput: newAddInput });
    this.renderStars();
  };

  componentDidUpdate = (PP, PS, SS) => {
    if (PS.addInput.rating !== this.state.addInput.rating) {
      this.renderStars();
    }
    if (PP.info._id !== this.props.info._id) {
      let newAddInput = {
        name: this.props.info.name,
        rating: this.props.info.userRating,
        genres: this.props.info.genres,
      };
      let newGenres = [];
      for (let i = 0; i < this.props.info.genres.length; i++) {
        newGenres.push(
          <GenreCard
            delete={this.deleteGenre}
            key={i}
            genre={this.props.info.genres[i]}
          />
        );
      }
      this.setState({ addInput: newAddInput, genres: newGenres });
      this.renderStars();
    }
    // if (PP.info.genres !== this.props.info.genres) {
    //   let newAddInput = {
    //     name: this.props.info.name,
    //     rating: this.props.info.userRating,
    //     genres: this.props.info.genres,
    //   };
    //   let newGenres = [];
    //   for (let i = 0; i < this.props.info.genres.length; i++) {
    //     newGenres.push(
    //       <div key={i} className="clTracksGenre">
    //         {" "}
    //         {this.props.info.genres[i]}
    //       </div>
    //     );
    //   }
    //   this.setState({addInput: newAddInput, genres: newGenres });
    // }
    if (PS.genres.length !== this.state.genres.length) {
      let newGenres = [];
      for (let i = 0; i < this.state.genres.length; i++) {
        newGenres.push(
          <GenreCard
            delete={this.deleteGenre}
            key={i}
            genre={this.props.info.genres[i]}
          />
        );
      }
      this.setState({ genres: newGenres });
    }
  };

  handleTypeGenre = (e) => {
    this.setState({ newAddGenre: e.target.value });
  };

  handleTypeName = (e) => {
    let newAddInput = this.state.addInput;
    newAddInput.name = e.target.value;
    this.setState({
      addInput: newAddInput,
    });
  };

  addGenre = () => {
    let newAddInput = this.state.addInput;
    newAddInput.genres.push(this.state.newAddGenre);
    let newGenres = this.state.genres;
    newGenres.push(
      <GenreCard
        delete={this.deleteGenre}
        key={this.state.newAddGenre}
        genre={this.state.newAddGenre}
      />
    );
    this.setState({
      addInput: newAddInput,
      genres: newGenres,
      newAddGenre: "",
    });
  };

  deleteSong=async()=>{
    let id = this.props.info._id
    const response = await fetch(url + "songs", {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(id),
    });
    const resp = await response.json();
    console.log(resp.message);
    this.props.update();
    this.props.afterDelete()
  }

  saveSong = async () => {
    const data = { data: this.state.addInput, _id: this.props.info._id };
    console.log(data);
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
    this.setState({ addGenre: "" });
    this.props.update();
  };

  render() {
    // console.log(this.props.info);
    return (
      <div>
        <input
          className="idAddBox"
          value={this.state.addInput.name}
          onChange={this.handleTypeName}
          type="text"
        ></input>
        <div>
          <div id="idGenres">{this.state.genres}</div>
          <div>
            <input
              className="idAddBox"
              value={this.state.newAddGenre}
              onChange={this.handleTypeGenre}
              type="text"
            ></input>
            <button id="idAddButton" onClick={this.addGenre}>
              Add Genre
            </button>
          </div>
          <div className="clStars" onClick={this.onPress}>
            {this.state.stars}
          </div>
          <button id="idAddButton" onClick={this.saveSong}>
            Save
          </button>
          <button id="idAddButton" onClick={this.deleteSong}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default TrackGenres;
