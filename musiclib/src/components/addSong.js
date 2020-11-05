import React from "react";
import gold from "./gold.png";
import grey from "./grey.png";

import { url } from "../globals";

class AddSong extends React.Component {
  constructor() {
    super();
    this.state = {
      stars: [],
      starsValue: 0,
      addInput: { name: "", rating: 0, genres: ["",] },
    };
  }

  onPress = () => {
    // console.log('pressed stars');
  };

  renderStars = () => {
    // console.log('rendering stars');
    let newArr = [];
    let starCount = 0;
    for (let i = 0; i < this.state.starsValue; i++) {
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
    this.setState({ starsValue: this.props.stars });
    this.renderStars();
  };

  pressedStar = (i) => {
    // console.log(`pressed Star ${i + 1}`);
    let newAddInput = this.state.addInput;
    newAddInput.rating = i + 1;
    this.setState({ starsValue: i + 1, addInput: newAddInput });
  };

  handleAddChange = (e) => {
    let newAddInput = this.state.addInput;
    newAddInput.name=e.target.value
    this.setState({
      addInput: newAddInput }
    );
  };

  handleAddGenre =(e)=>{
    let newAddInput = this.state.addInput;
    newAddInput.genres[0]=e.target.value;
    this.setState({
      addInput: newAddInput }
    );
  }

  addSong = async () => {
    const data = this.state.addInput;
    // console.log(data);
    if (data.name !== "") {
      const response = await fetch(url + "songs", {
        method: "POST",
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
      console.log(resp.status);
      if (resp.status === 200) {
        this.props.update();
        this.props.visible();
      }
    } else {
      alert("Invalid Name");
    }
  };

  componentDidUpdate = (PP, PS, SS) => {
    if (PS.starsValue !== this.state.starsValue) {
      this.renderStars();
    }
  };

  render() {
    // console.log(this.state.addInput)
    return (
      <div >
        <div className="clAddTrack">
          <input
            className="idAddBox"
            value={this.state.addInput.name}
            onChange={this.handleAddChange}
            type="text"
            placeholder="Add Title"
          ></input>
          <input
            className="idAddBox"
            value={this.state.addInput.genre}
            onChange={this.handleAddGenre}
            type="text"
            placeholder="Add Genre"
          ></input>
          <div className="clStars" onClick={this.onPress}>
            {this.state.stars}
          </div>
          <button id="idAddButton" onClick={this.addSong}>
            Add Track{" "}
          </button>
          <button id="idAddButton" onClick={this.props.visible}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default AddSong;
