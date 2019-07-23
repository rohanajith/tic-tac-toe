import React, {Component} from 'react';
import {Button,Row,Col} from 'react-bootstrap';
import './style.css';

var tiedCount = 0,checker = 1;

class Game extends Component{
  constructor(props){
    super(props);
    this.state = {
      board : Array(9).fill(null),
      check : Array(9).fill(1),
      player : "X",
      p1 :  0,
      p2 :  0,
      tied: 0,
      winner:0,
      val:0,
      disqualify:0,
      timer : 10,
      gameOver:true,
    };

  }


  handleClick = index => {
    let newBoard = this.state.board;
    if(newBoard[index] === null && !this.state.winner && this.state.gameOver){  
      newBoard[index] = this.state.player;
      tiedCount += 1;
      this.setState({board:newBoard,player:this.state.player === "X" ? "O" : "X"})
      this.gameWinner();  
    }   
    if(tiedCount === 9 && this.state.gameOver && checker){
      this.matchTied(this.state.gameOver);
      this.setState({gameOver:false});
    }
  }


  matchTied = (winnerExists,champion) =>{
    if(winnerExists){
      this.setState({tied:this.state.tied + 1,val:1});
      document.getElementById("final").innerHTML = " Match Tied";
      document.getElementById("timer").style.display = "none";
      clearInterval(this.interval);
    }
    else{
       document.getElementById("final").innerHTML = champion + " won this round" ;
        this.setState({val:1});
        clearInterval(this.interval)
        document.getElementById("timer").style.display = "none";
    }
  }


  gameWinner = _ => {
    let combinations = [ [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6] ]
    let champion;
    for (var index = 0; index < combinations.length; index++) {
      const [a,b,c] = combinations[index];
      if(this.state.board[a] && this.state.board[a] === this.state.board[b] && 
        this.state.board[a] === this.state.board[c]){
        
        if(this.state.player === "X"){
          champion = "Player 1";
          this.setState({p1:this.state.p1 + 1})
        }
        else{
          champion = "Player2";
          this.setState({p2:this.state.p2 + 1});
        }
        checker = 0;
         this.setState({gameOver: false}, () => {
            console.log(this.state.gameOver);
            this.matchTied(this.state.gameOver,champion);
        });  
      }   
    } 
  }

 
  componentWillMount(){
    sessionStorage.getItem('player1') && sessionStorage.getItem('tied') 
    && sessionStorage.getItem('player2') && 
    this.setState({
      p1:JSON.parse(sessionStorage.getItem('player1')),
      tied:JSON.parse(sessionStorage.getItem('tied')),
      p2:JSON.parse(sessionStorage.getItem('player2')),
    })
  } 


  componentDidMount(){
     this.setTime();
  }


  componentWillUpdate(nextProps,nextState){
    sessionStorage.setItem('player1',nextState.p1);
    sessionStorage.setItem('tied',nextState.tied);
    sessionStorage.setItem('player2',nextState.p2);
  }


  componentWillUnmount(){
    clearInterval(this.interval)
  }


  setTime(){
    this.interval = setInterval(() => {
      if(this.state.timer > 0)
        this.setState(prevState =>({timer:prevState.timer - 1}))
      else{
        clearInterval(this.interval);
        if(this.state.player === "X"){
          document.getElementById("result").innerHTML = "Player 1 is disqualified. <span>Player 2 wins.</span>";
        }
        else{
          document.getElementById("result").innerHTML = "Player 2 is disqualified. <span>Player 1 wins.</span>";
        }
        this.setState({gameOver:false,disqualify:1});
      }
    },1000)  
  }


  resetTime(index){
    let checkValue = this.state.check
    if(this.state.board[index] && this.state.check[index] ){
          checkValue[index] = 0;
         this.setState({timer:10})
    }
  }


  startAgain(){
    sessionStorage.clear();
    window.location.replace("https://rohanajith.github.io/Tic-Tac-Toe/#/")
  }


render() {
     
    const box = this.state.board.map((box,index) => 
      <div className ="box" key={index} 
      onClick = {() => {this.handleClick(index); this.resetTime(index)}}>{box}</div>)

  return (
    <div className="App">
      <div className = "options">
        <Row className="justify-content-md-center">
          <Col><div className = "board">{box}</div></Col>
          <Col  xs lg="2" className = "font" > Player 1<Col>{this.state.p1}</Col>
            <p id="timer">Timer  : <span id="timerValue">{ this.state.timer}</span></p>
          </Col>
          <Col className = "font" md="auto">Tied<Col>{this.state.tied}</Col></Col>
          <Col className = "font" xs lg="2">Player 2<Col>{this.state.p2}</Col></Col>
        </Row>
      </div>
      <div id="final"></div>
      <div id="result"></div>
      {this.state.disqualify === 1 && 
        <Button variant = "info" id="newGame" onClick={() => {this.startAgain()}}>Start new game</Button>}
      {this.state.val === 1 && <meta httpEquiv="refresh" content="4" ></meta> }
    </div>
  );
}
}

export default Game;

