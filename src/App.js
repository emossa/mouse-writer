import React, { Component } from 'react';
import './App.css';


class App extends Component {

  state = {
    counter : 'a', //letters of the alphabeth
    seconds : 0,
    idRefreshInterval : 0, //to refresh the setInterval function
    idRefreshTimeoutAddLetter : 0, //to refresh the setTimeout function
    idRefreshTimeoutAddSpace : 0,
    idRefreshTimeoutHold: 0,
    idRefreshTimeoutHoldAll : 0,
    sentence: '',
    canRun: true,
    timeNextLetter: 1500, //to change the time in relation on your needs
    timeSpace: 3500
    
  }


//to handle the left click
  clickHandler = (e)=>{ 

    clearInterval(this.state.idRefreshInterval); //REFRESH THE INTERVAL FUNCTION
    clearInterval(this.state.idRefreshTimeoutAddLetter); //REFRESH THE TIMEOUT FUNCTION (ADD LETTER)
    clearInterval(this.state.idRefreshTimeoutAddSpace); //REFRESH THE TIMEOUT FUNCTION (ADD SPACE)
    clearInterval(this.state.idRefreshTimeoutHold); //REFRESH THE TIMEOUT FUNCTION (DELETE LETTER)
    clearInterval(this.state.idRefreshTimeoutHoldAll); //REFRESH THE TIMEOUT FUNCTION (DELETE EVERYTHING)
//IF TO CHANGE CURRENT LETTER    
 
  if(this.state.canRun){
      

    let counter = this.state.counter; //reference for the state
    let tempEnd = String.fromCharCode(counter.charCodeAt(0) + 1); //increment the letter

    //Start again after letter 'z'
    if(counter==='z'){
      this.setState({
        counter: 'a'
      })
    }else
        {
          this.setState({
          counter: tempEnd //assign the incremented letter to the state
        })
      }

      // TO ADD LETTER
      let idTimeoutAddLetter = setTimeout(()=>{
        
        
              
          this.setState({
            sentence: this.state.sentence + this.state.counter
          })
            
      },this.state.timeNextLetter);

      // TO ADD SPACE
      let idTimeoutAddSpace = setTimeout(()=>{
        this.setState({
            sentence: this.state.sentence + ' '
          })
           
      },this.state.timeSpace);

      this.setState({
        idRefreshTimeoutAddLetter : idTimeoutAddLetter,
        idRefreshTimeoutAddSpace : idTimeoutAddSpace,
      })
    }
}

//TO HANDLE RIGHT CLICK
contextMenuHandler = (e)=>{ 
      e.preventDefault();
      clearInterval(this.state.idRefreshInterval); //REFRESH THE INTERVAL FUNCTION
      clearInterval(this.state.idRefreshTimeoutAddLetter); //REFRESH THE TIMEOUT FUNCTION (ADD LETTER)
      clearInterval(this.state.idRefreshTimeoutAddSpace); //REFRESH THE TIMEOUT FUNCTION (ADD SPACE)
      clearInterval(this.state.idRefreshTimeoutHold); //REFRESH THE TIMEOUT FUNCTION (DELETE LETTER)
      clearInterval(this.state.idRefreshTimeoutHoldAll); //REFRESH THE TIMEOUT FUNCTION (DELETE EVERYTHING)
      //IF TO CHANGE CURRENT LETTER    

      if(this.state.canRun){
        

      let counter = this.state.counter; //reference for the state
      let tempEnd = String.fromCharCode(counter.charCodeAt(0) - 1); //increment the letter

      //Start again after letter 'z'
      if(counter==='a'){
        this.setState({
          counter: 'z'
        })
      }else
          {
            this.setState({
            counter: tempEnd //assign the incremented letter to the state
          })
        }

        // TO ADD LETTER
        let idTimeoutAddLetter = setTimeout(()=>{
          
          
                
            this.setState({
              sentence: this.state.sentence + this.state.counter
            })
              
        },1000);

        // TO ADD SPACE
        let idTimeoutAddSpace = setTimeout(()=>{
          this.setState({
              sentence: this.state.sentence + ' ',
              
            })
            
        },2500);

        this.setState({
          idRefreshTimeoutAddLetter : idTimeoutAddLetter,
          idRefreshTimeoutAddSpace : idTimeoutAddSpace,
        })
      }
  }  
  
//TO DELETE LETTERS OR EVERYTHING
holdHandler = (e)=>{
  this.setState({
    canRun: true
  })
  let idTimeoutHold = setTimeout(()=>{
    let newValue = this.state.sentence;
    newValue = newValue.substring(0, newValue.length-1);
    this.setState({
      sentence: newValue,
      canRun: false
    })

  },1000);

  let idTimeoutHoldAll = setTimeout(()=>{
    this.setState({
      sentence: '',
      canRun: false
    })
  },2000);

  this.setState({
    idRefreshTimeoutHold: idTimeoutHold,
    idRefreshTimeoutHoldAll: idTimeoutHoldAll
  })
}
  render() {   

    return (
      <div >
        <header className="App-header" onClick={this.clickHandler} onContextMenu={this.contextMenuHandler} onMouseDown={this.holdHandler}>
          
          <h1>{this.state.counter}</h1>
          <h2>{this.state.sentence}*</h2>
        </header>
      </div>
    );
  }
}

export default App;