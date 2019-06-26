
import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inntekt: 0,
      måneder: 0,
      result: false
    };
  }



  render() {
    var result = this.state.result ? "ja" : "nei";
    console.log(this.props);
    console.log(window.location.pathname);
    const pn = getQueryVariable("pn", window.location.pathname);
    return (
      <div className="App">
        <h1>Vår info </h1>
        <div>Din inntekt siste {this.props.month} måneder: {this.state.inntekt} </div>
        <div>Ansettelse siste {this.props.month} måneder: {this.state.måneder} </div>
        <div>Kvalifisert for dagpenger: {result} </div>
        <div>Hvis noe av oppgitt data her er feil, kontakt oss på nav.no </div>
        <div>Personnummeret ditt er: {pn} </div>
      </div>
    );
  }


  componentDidMount() {
    this.setState({
      inntekt: 490300,
      month : 12, 
      måneder: 8,
      result: true
    });
  }
}


function getQueryVariable(variable, path) {
  const query = path.substring(1);
  console.log(query);
  const vars = query.split("&");
  console.log(vars);
  for (let i = 0; i<vars.length; i++) {
    let pair = vars[i].split("=");
    console.log(pair);
    if(pair[0] === variable) {
      return pair[1];
    }
  }
  return (false);
}


export default App;
