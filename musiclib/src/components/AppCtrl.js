import React from "react";
import SongCard from "./songCard";
import AddSong from "./addSong";

import { url } from "../globals";
import EditSong from "./editSong";

class AppCtrl extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: "",
      songs: [],
      activeSong: "",
      addSongView: false,
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
    this.setState({ songs: resp.songs });
  };

  selectSong = (e) => {
    // console.log(e._id);
    this.setState({
      activeSong: <EditSong afterDelete={this.setSongAfterDelete} update={this.getSongsFromDB} makeSongCards={this.makeSongCards} songs={this.state.songs} info={e} />,
    });
  };

  setSongAfterDelete =()=>{
    this.setState({activeSong: ""})
  }

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
    let str = e.target.value;
    let tempArr = [];
    for (let i = 0; i < this.state.songs.length; i++) {
      // console.log(this.state.songs[i].name.toLowerCase().includes(str)+ ` ${i}`);
      if (this.state.songs[i].name.toLowerCase().includes(str)) {
        // console.log(this.state.songs[i]);
        tempArr.push(this.state.songs[i]);
      }
    }
    this.makeSongCards(tempArr);
  };

  addSong = () => {
    this.setState({ addSongView: true });
  };

  addsongVisible=()=>{
    this.setState({ addSongView: false });
  }

  componentDidMount = () => {
    this.getSongsFromDB();
  };

  componentDidUpdate = (PP, PS, ss) => {
    if (PS.songs !== this.state.songs) {
      this.makeSongCards(this.state.songs);
    }
  };

  render() {
    if (this.state.addSongView === false) {
      return (
        <div className="App">
          <br />
          <input
            id="idSearchBox"
            value={this.state.searchInput}
            onChange={this.handleSearchChange}
            type="text"
            placeholder="Search Title"
          ></input>
          <div className="clLowerDiv">
            <div className="songCardDiv">
              Tracks
              <div className="songCardsScroll"> {this.state.displaySongs}</div>
              <button id="idAddButton" onClick={this.addSong}>
                Add Track{" "}
              </button>
            </div>
            <div className="tracksDiv">
              {" "}
              Edit Song: {this.state.activeSong}
            </div>
          </div>
        </div>
      );
    } 
    if (this.state.addSongView === true) {
      return(
        <div className="App">
         add a song
         <AddSong update={this.getSongsFromDB} visible={this.addsongVisible} />
        </div>
      )
    }
  }
}

export default AppCtrl;
