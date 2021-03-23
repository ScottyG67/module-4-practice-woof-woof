import React from 'react';
import './App.css';
import './components/PupsBar'
import PupsBar from './components/PupsBar';
import Pup from './components/Pup'

class App extends React.Component {
  state= {
    renderPup:false,
    pups:[],
    filter:false
  }

  componentDidMount(){
    fetch('http://localhost:3000/pups').then(res=>res.json()).then(pupList=>this.setState({pups:pupList}))
  }

  findPup=(pupId)=>{
    // const pup = this.state.pups.find(pup => pup.id === pupId)
    this.setState({renderPup: pupId})
  }

  toggleGoodDog = (pupId) => {
    const pup = this.state.pups.find(pup => pup.id === pupId)
    pup.isGoodDog = !pup.isGoodDog

    let reqObj = {
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
      body: JSON.stringify(pup),
    };

    fetch('http://localhost:3000/pups/' + pup.id, reqObj)
      .then((res) => res.json())
      .then(updatedPup => {
        const index = this.state.pups.findIndex((existingPup) => existingPup.id === updatedPup.id)
        const previousState = this.state.pups
        previousState[index] = updatedPup
        this.setState({pups: previousState})
        this.setState({renderPup: updatedPup.id})
      })
  }

  pupDetail = (id) => {
    return this.state.pups.find(pup => pup.id === id)
  }

  toggleFilterDogs = () => {
    this.setState(previousState => {return {filter:!previousState.filter}})
  }

  renderPupList = () => {
    let pupList = this.state.pups.map(pup => pup)
    if(this.state.filter){
      pupList = pupList.filter(pup => pup.isGoodDog===true)
    }
    return pupList.map(pup => <PupsBar pup={pup} key={pup.id} showPup={this.findPup}/>)
  }




  
  render(){
  return (
      <div className="App">
        <div id="filter-div">
          <button id="good-dog-filter" onClick={this.toggleFilterDogs}>Filter good dogs: {this.state.filter? 'ON':'OFF'}</button>
        </div>
        <div id="dog-bar">
          {this.renderPupList()}
        </div>
        <div id="dog-summary-container">
          <h1>DOGGO:</h1>
          <div id="dog-info">
            {this.state.renderPup ? <Pup pup={this.pupDetail(this.state.renderPup)} toggleGoodDog={this.toggleGoodDog} />:null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
