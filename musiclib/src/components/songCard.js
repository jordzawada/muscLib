import React from 'react';

import Stars from './stars';

class songCard extends React.Component {
    constructor() {
      super();
      this.state = {
          genres:[]
        };
    }

    onPress=()=>{
        this.props.onPress(this.props.info)
    }

    componentDidMount=()=>{
        // console.log(this.props.info);
        let newGenres="";
        for (let i=0;i<this.props.info.genres.length;i++){
            newGenres=newGenres+`${this.props.info.genres[i]}`+" | ";
        }
        this.setState({genres:newGenres})
    }

    // componentDidUpdate=(PP,PS,SS)=>{
    //   if (PP.info!==)
    // }

    render() {
      return (
        <div className="songCard" onClick={this.onPress}>
           {this.props.info.name} [{this.state.genres}]
           <Stars stars={this.props.info.userRating}/>
        </div>
      )
    }
  }

export default songCard