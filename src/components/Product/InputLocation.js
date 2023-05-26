import React, { Component,useEffect, useRef, useState } from "react";
import { async_function, trD, trO, trC, trcDropDown} from "./Location 2";
import { getShowDistance } from "./Location 2";
//import CallingPoints from "./callingPoints";
import Select from 'react-select';
import { stCoord } from "./LocationCalcDIstance";
import { GetMiles } from "./GetMiles";
import LoadingIcons from 'react-loading-icons'
import { Puff } from 'react-loading-icons';




export let originStation;
const currDateTime =  new Date().toLocaleDateString('en-ca')+'T'+new Date().toLocaleTimeString();

export class InputLocation extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {value: '', trD: trD, date: '',showHideLD: false,showHideErr: false};
    

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleChangeDate = this.handleChangeDate.bind(this);

  }


  handleChange(event) {
    this.setState({value: event.target.value});
    setTimeout(
      function() {
        this.setState({value: event.target.value, trD: trD});
      }
      .bind(this),
      6000
    );
    setTimeout(
      function() {
        this.setState({value: event.target.value, trD: trD});
      }
      .bind(this),
      10000
    );
    setTimeout(
    function() {
        this.setState({value: event.target.value, trD: trD});
      }
      .bind(this),
      20000
    );
  }

  handleChangeDate(event) {
    this.setState({trD, date: event.target.value});

  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({trD: ""});
    this.setState({showHideLD: !this.state.showHideRail});
    originStation = this.state.value;
    let date = this.state.date;
    let date1Year = date.slice(0,4);
    let date1Month = date.slice(5,7);
    let date1Day = date.slice(8,10);
    let date1Time = date.slice(11,date.length);
    date = date1Day + "/" + date1Month + "/" + date1Year + " " + date1Time + ":00";
    //alert(date);

    async_function(date);

    setTimeout(
      function() {
        this.setState({value: event.target.value, trD: trD});
        this.setState({showHideLD: this.state.showHideRail});
        console.log("TRD AFTER 7 is", this.state.trD);
        if (this.state.trD == "Enter a station above to view destinations" || this.state.trD == ""){
          this.setState({showHideErr: true});
        } else {
          this.setState({showHideErr: false});
        }
      }
      .bind(this),
      11500
    );

    setTimeout(
      function() {
        this.setState({value: event.target.value, trD: trD});
      }
      .bind(this),
      20000
    );

    this.setState({value: event.target.value, trD: trD});


  }

  render() {
    const {showHideLD, showHideErr} = this.state;
    return (
        <div className = "divRailInput">
          <div>
            <h3 style={{textAlign: "center"}}>National Rail Input</h3>
          <form onSubmit={this.handleSubmit}>
            <label>
            &nbsp;Date of travel{" "}<br/>
            &nbsp;<input style = {{backgroundColor: "#cfcfcf", border: "0", borderRadius: "2px"}} type="datetime-local" value={this.state.date} max={currDateTime} onChange={this.handleChangeDate} />
            <br/><br/>
            &nbsp;Origin station{" "}<br/>
            &nbsp;<input style = {{backgroundColor: "#cfcfcf", border: "0", borderRadius: "2px"}} type="text" value={this.state.value} onInput={this.handleChange} onFocus={this.handleChange}/>
            </label><br/>
            <br/>
            <input style = {{border: "0"}} id = "railSubmitButton" type="submit" value="☑ Submit" />
            {showHideLD && <Puff id = "puff1" stroke="#000000"/> }
            {showHideErr && "⚠️ Please try again later" }
            <p style={{fontWeight: "bold"}}>
            &nbsp;Destinations on this route:</p> <p style={{maxWidth: "400px", paddingLeft: "4px"}}>{/*trD*/}{this.state.trD}</p>
            <p style={{fontWeight: "bold"}}> &nbsp;Select your journey:</p>
            {trcDropDown}
            <br/>
          </form>
        </div>
      </div>

    );
  }
}