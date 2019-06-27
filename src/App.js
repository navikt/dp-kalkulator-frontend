import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inntekt: 0,
            maaneder: 0,
            result: false,
            allMonths: null
        };
    }


    render() {
        return (
            <div className="App">
                <h1>Vår info </h1>
                <div>Din totale inntekt: {this.state.totalInntekt} </div>
                <div>Laster fortsatt: {this.state.loading ? "yes" : "no"} </div>
                <div>Din inntekt siste {this.props.month} måneder: {this.state.inntekt} </div>
                <div>Ansettelse siste {this.props.month} måneder: {this.state.maaneder} </div>
                <div>Kvalifisert for dagpenger: {this.state.result} </div>
                <div>Hvis noe av oppgitt data her er feil, kontakt oss på nav.no</div>
                <div>Personnummeret ditt er: {this.state.pn} </div>
                {this.state.allMonths === null ? <div/> : <AllMonths months={this.state.allMonths}/>}

            </div>
        );
    }


    componentDidMount() {
        const result = this.state.result ? "ja" : "nei";
        const pn = getQueryVariable("pn", window.location.pathname);
        this.setState({
            inntekt: 490300,
            month: 12,
            maaneder: 8,
            pn: pn,
            result: result,
            loading: true
        });
        const json = '{"maaneder":[{"dato":"2019-07","arbeidsgivere":[{"navn":"NAV","organisasjonsID":"144132","inntekt":"58.32"}]}]}';
        const obj = JSON.parse(json);
        this.setState({
            allMonths: obj.maaneder
        });
        console.log("AllMonthsComing");
        console.log(json);
        console.log(obj);
        console.log(this.state.allMonths);
        /*fetch("foo.bar/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pn
            })
        })
            .then(result => {
                if (result.ok) {
                    return result.json();
                } else {
                    throw Error(result.statusText);
                }
            })
            .then(json => {

                this.setState({
                    isLoaded: true,
                    totalInntekt: json.totalInntekt
            })
                ;
            })
            .catch(error => console.error(error));*/
    }
}


function EmployersMonth(props) {
    return (
        <div>
            <div>Måned: {props.month.dato} </div>
            {props.month.arbeidsgivere.map(arbeidsgiver => <Employer arbeidsgiver={arbeidsgiver}/>)}
        </div>
    );
}

function Employer(props) {
    return (
        <div>
            <div>Arbeidsgiver: {props.arbeidsgiver.navn}</div>
            <div>OrganisasjonsID: {props.arbeidsgiver.organisasjonsID}</div>
            <div>Inntekt: {props.arbeidsgiver.inntekt}</div>
        </div>
    )
}

function AllMonths(props) {
    return (
        <div>
            {props.months.map(month => <EmployersMonth month={month}/>)}
        </div>
    );
}


function getQueryVariable(variable, path) {
    const query = path.substring(1);
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    return (false);
}


export default App;
