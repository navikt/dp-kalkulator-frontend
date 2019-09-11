import React, { useEffect, useState } from 'react'
import LoadingMessage from '../information/LoadingMessage';
import api from './api';

const Kalkulator = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const localPayload = {
            aktorId: process.env.REACT_APP_aktorId,
            vedtakId: process.env.REACT_APP_vedtakId,
            beregningsdato: process.env.REACT_APP_beregningsdato
          }
          const localparams = JSON.stringify(localPayload)
        api.startBehov(localparams)
    }, [])


    // const fetchData = (url, token) => {
    //     console.log("Fetching data!")
    //     api.get(url, token)
    //       .then((personIncomeInformation) => {
    //         console.log(personIncomeInformation);
    //         setData(personIncomeInformation);
    //       })
    //       .catch((e) => {
    //         const retrievedError = e.response;
    //         setErrorObject({ data: retrievedError.data, status: retrievedError.status, statusText: retrievedError.statusText });
    //         setError(true);
    //       });
    //     setLoading(false);
    //     setEstimated(true);
    //   };
    
    //   const setData = (json) => {
    //     setDoesPersonQualify(json.oppfyllerMinstekrav);
    //     setPeriodeAntallUker(json.periodeAntalluker);
    //     setUkesats(json.ukeSats);
    //   };
    
    //   const resolveFetchData = () => {
    //     setLoading(true)
    //     const urlAPI = '/api/inntekt/';
    //     const urlMock = `${process.env.PUBLIC_URL}/mock/mockInnsyn.json`;
    //     const urlLokalApi = '/behov'
   
    
    //     const postBehov = (url) => {
    //       api.post(urlLokalApi, localparams, localToken)
    //         .then((idInformation) => {
    //           if (idInformation.status === 202 && idInformation.statusText === "Accepted" && idInformation.headers.location) {
    //             console.log(idInformation.headers.location)
    //             console.log("Start polling")
    //             setPollingApi(idInformation.headers.location)
    //           }
    //           else {
    //             console.log(idInformation)
    //             setErrorObject({ status: idInformation.status, statusText: idInformation.statusText })
    //             setError(true)
    //           }
    //         })
    //         .catch((e) => {
    //           const retrievedError = e.response;
    //           setErrorObject({ data: retrievedError.data, status: retrievedError.status, statusText: retrievedError.statusText });
    //           setError(true);
    //         });
    //     }
    
    //     if (process.env.NODE_ENV === 'production') {
    //       fetchData(urlAPI);
    //     } else {
    //       postBehov(urlMock);
    //     }
    //   }
    
    //   function sleep(milliseconds) {
    //     var start = new Date().getTime();
    //     for (var i = 0; i < 1e7; i++) {
    //       if ((new Date().getTime() - start) > milliseconds) {
    //         break;
    //       }
    //     }
    //   }
    
    //   function getSubsumsjon(url) {
    
    //     console.log("polling! polling api url: " + pollingApi + " Try #" + tries)
    //     api.get(url, localToken)
    //       .then(response => {
    //         if (response.status === 303 && response.headers.location) {
    //           console.log(response.statusText)
    //           console.log(response.headers.location)
    //           setPollingApi(false)
    //           return fetchData(response.headers.location, localToken)
    //         }
    //         if (response.status === 200 && response.data.status) {
    //           console.log("poll still pending")
    //           console.log(response)
    //           tries++
    //           if (tries < 10) {
    //             console.log("sleeping before next try")
    //             sleep(2000);
    //             console.log("done sleeping")
    //             getSubsumsjon(url)
    //           }
    
    //         }
    //         if (response.status === 200 && response.data.id) {
    //           console.log(response.data)
    //           console.log("success")
    //           var temp = {
    //             oppfyllerMinstekrav: response.data.minsteinntektResultat.oppfyllerMinsteinntekt,
    //             periodeAntalluker: response.data.periodeResultat.periodeAntallUker,
    //             ukeSats: response.data.satsResultat.ukesats
    //           }
    //           return setData(temp)
    //         }
    //         console.log("Noe gikk galt!")
    //         console.log(response)
    //       })
    //       .catch((e) => {
    //         const retrievedError = e.response;
    //         setErrorObject({ data: retrievedError.data, status: retrievedError.status, statusText: retrievedError.statusText });
    //         setError(true);
    //         setPollingApi(false)
    //       });
    //   }
    
    //   useEffect(() => {
    //     if (pollingApi) {
    //       getSubsumsjon(pollingApi)
    //     }
    //   }, [pollingApi])
    
    
    return <LoadingMessage/>
}

export default Kalkulator