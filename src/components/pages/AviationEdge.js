import {createAviationEdge } from '../../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import { getAviationEdge, listAviationEdges } from '../../graphql/queries';
import React, { useEffect, useState } from 'react';

function AviationEdge(){
    const initialState = { ACiataCode: '', ACicaoCode: '', ACtaileNumbe: '', ARicaoCode: '', DEPicaoCode: '', FlightNumber: '', FlightAltitude: 0, FlightDirection: 0, FlightLatitude: 0.0, FlightLongitude: 0.0, FlightSpeed: '', FlightStatus: '', UpdateTime: 0}
    const jsonStage={};
    const [formState, setFormState] = useState(initialState)
    const [ae, setAviationEdge] = useState([])
    
    useEffect(() => {
        fetchAviationEdge()
      }, []) 

    function setInput(key, value) {
        setFormState({ ...formState, [key]: value })
      }
      
    async function fetchAviationEdge() {
        try {
            const aeData = await API.graphql(graphqlOperation(listAviationEdges))
            const ae = aeData.data.listAviationEdges.items
            setAviationEdge(ae)
        } catch (err) { console.log('error fetching Aviation Edge API items') }
    } 

    async function retrieveAviationEdge() {
        try {
            const icao = { ...formState }.icao
            const apiUrl = "https://aviation-edge.com/v2/public/flights?key=af2520-847137&depIcao=KSYR"+icao;
            fetch(apiUrl)
                .then(response=>response.json())
                .then(response=>parseAviationEdge(response))
        } catch (err) {
          console.log('error creating todo:', err)
        }
    }
    
    function parseAviationEdge(data){
        try{
            var aircraftData = data[0].aircraft;
            jsonStage.iataCode = aircraftData.iataCode;
            jsonStage.ACiataCode = aircraftData.iataCode;
            jsonStage.ACicaoCode = aircraftData.icaoCode;
            jsonStage.ACtaileNumbe=aircraftData.regNumber;
            var arrivalData = data[0].arrival;
            jsonStage.ARicaoCode=arrivalData.icaoCode;
            var departureData = data[0].departure;
            jsonStage.DEPicaoCode=departureData.icaoCode;
            var flightData = data[0].flight;
            jsonStage.FlightNumber=flightData.number;
            var geographyData = data[0].geography;
            jsonStage.FlightAltitude=geographyData.altitude;
            jsonStage.FlightDirection=geographyData.direction;
            jsonStage.FlightLatitude=geographyData.latitude;
            jsonStage.FlightLongitude=geographyData.longitude;
            var speedData = data[0].speed;
            jsonStage.FlightSpeed=speedData.horizontal;
            var statusData = data[0].status;
            jsonStage.FlightStatus=statusData;
            var updateData = data[0].system.updated;
            jsonStage.UpdateTime=updateData;
        } catch(err){
            console.log(err);
        }
        
    }

    function getFormStateName(){
        return {...formState}.name;
    }

    return (
            <div>
                <p>{jsonStage.iataCode}</p>
            </div>
        )
    
}


export default AviationEdge;
