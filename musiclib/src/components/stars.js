import React from 'react';
import gold from './gold.png';
import grey from './grey.png';

class Stars extends React.Component {
    constructor() {
      super();
      this.state = {
          stars: [],
          starsValue:0,
        };
    }

    onPress=()=>{
        // console.log('pressed stars');
    }

    renderStars=()=>{
        // console.log('rendering stars');
        let newArr=[];
        let starCount=0
        for(let i=0;i<this.state.starsValue;i++){
            starCount++;
            newArr.push(<img key={i+10} src={gold} id="idStarImg" alt="" onClick={() => this.pressedStar(i)} ></img>)
        }
        for(let i=starCount;i<5;i++){
            starCount++;
            newArr.push(<img key={i} id="idStarImg" src={grey} alt="" onClick={() =>this.pressedStar(i)}  ></img>)
        }
        this.setState({stars:newArr})
    }

    componentDidMount=()=>{
        this.setState({starsValue:this.props.stars})
        this.renderStars()
    }

    pressedStar=(i)=>{
        console.log(`pressed Star ${i+1}`);
        this.setState({starsValue:i+1})
    }

    componentDidUpdate=(PP,PS,SS)=>{
        if (PS.starsValue !== this.state.starsValue){
            this.renderStars()
        }
    }

    render() {
      return (
        <div className="clStars" onClick={this.onPress}>
           {this.state.stars}
        </div>
      )
    }
  }

export default Stars