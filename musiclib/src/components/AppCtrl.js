import React from "react";
import SongCard from "./songCard";

import { url } from "../globals";

class AppCtrl extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: "",
      songs: [],
      activeSong: "",
      displaySongs:[],
    };
  }

  getSongsFromDB = async () => {
    const response = await fetch(url + "songs", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrer: "no-referrer",
      // body: JSON.stringify(data),
    });
    const resp = await response.json();
    console.log(resp.message);
    this.setState({songs:resp.songs})
    // this.makeSongCards(resp.songs);
  };

  selectSong = (e) => {
    this.setState({ activeSong: e });
  };

  makeSongCards = (songs) => {
    // console.log(songs);
    let arr1 = [];
    for (let i = 0; i < songs.length; i++) {
      arr1.push(<SongCard key={i} info={songs[i]} onPress={this.selectSong} />);
    }
    this.setState({ displaySongs: arr1 });
  };

  handleSearchChange = (e) => {
    this.setState({ searchInput: e.target.value });
    let str=e.target.value
    let tempArr = []
    for (let i=0;i<this.state.songs.length;i++){
        // console.log(this.state.songs[i].name.toLowerCase().includes(str)+ ` ${i}`);
        if (this.state.songs[i].name.toLowerCase().includes(str)){
            // console.log(this.state.songs[i]);
            tempArr.push(this.state.songs[i])
        }    
    
    }
    this.makeSongCards(tempArr);
  };

  componentDidMount=()=>{
      this.getSongsFromDB()
  }

  componentDidUpdate=(PP,PS,ss)=>{
    if(PS.songs !== this.state.songs){
        this.makeSongCards(this.state.songs)
    }
  }

  render() {
    return (
      <div className="App">
        <br />
        <input
          id="idSearchBox"
          value={this.state.searchInput}
          onChange={this.handleSearchChange}
          type="text"
          default="Search Title"
        ></input>
        {/* <button onClick={this.getSongsFromDB} type="button">
          Click Me!
        </button> */}

        <div className="clLowerDiv">
          <div className="songCardDiv">{this.state.displaySongs}</div>
          <div className="tracksDiv"> Active Song: {this.state.activeSong}</div>
        </div>
      </div>
    );
  }
}

export default AppCtrl;
