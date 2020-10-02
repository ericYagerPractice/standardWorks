import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
//import {createAviationEdge } from '../../graphql/mutations';
import { listAviationEdges } from '../../graphql/queries';
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'


const initialState = { ACiataCode: '', ACicaoCode: '', ACtaileNumbe: '', ARicaoCode: '', DEPicaoCode: '', FlightNumber: '', FlightAltitude: 0, FlightDirection: 0, FlightLatitude: 0.0, FlightLongitude: 0.0, FlightSpeed: '', FlightStatus: '', UpdateTime: 0}

function GetAPIData() {
    const [formState, setFormState] = useState(initialState)
    const [ae, setAviationEdge] = useState([])
    const aviationItems={};
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

    async function getAviationEdge() {
        try {
            const icao = { ...formState }.icao
            const apiUrl = "https://aviation-edge.com/v2/public/flights?key=af2520-847137&depIcao="+icao;
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
            aviationItems.arIATA = aircraftData.iataCode;
            aviationItems.arICAO = aircraftData.icaoCode;
            aviationItems.arTailNum = aircraftData.regNumber;

            var arrivalData = data[0].arrival;
            aviationItems.arrivalICAO = arrivalData.icaoCode;

            var departureData = data[0].departure;
            aviationItems.departureICAO = departureData.icaoCode;            

            var flightData = data[0].flight;
            aviationItems.flightNumber = flightData.number;                      

            var geographyData = data[0].geography;
            aviationItems.currentFlightAltitude = geographyData.altitude;
            aviationItems.currentFlightDirection = geographyData.direction;
            aviationItems.currentFlightLatitude = geographyData.latitude;
            aviationItems.currentFlightLongitude = geographyData.longitude;  
            
            var speedData = data[0].speed;
            aviationItems.currentFlightSpeed = speedData.horizontal;            

            var statusData = data[0].status;
            aviationItems.flightStatus = statusData;            

            var updateData = data[0].system.updated;
            aviationItems.updateTime = updateData;
            setAviationEdge([...ae, {"blockData": aviationItems}]);
            

        } catch(err){
            console.log(err);
        }
        
    }

    
  return(
      <div>
        <div style={styles.container}>
            <input
                onChange={event => setInput('icao', event.target.value)}
                style={styles.input}
                value={formState.name} 
                placeholder="ICAO"
            />
            <button tyoe="submit" onClick={function(){
                var t0 = performance.now();
                getAviationEdge();
                var t1 = performance.now();
                console.log("Aviation Edge: ");
                console.log(t1-t0);
                }}>Return Results</button>
        </div>
        <hr />
        <div>
            <Container>
                <Row>
                    <Col>
                        <h6>Aviation Edge API</h6>
                        {
                        ae.map((item, index) => (
                            <div key={item.id ? item.id : index} style={styles.todo}>
                                <Table responsive striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                        <th>Data Type</th>
                                        <th>Data Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Aircraft IATA</td>
                                            <td>{item.blockData.arIATA}</td>
                                        </tr>
                                        <tr>
                                            <td>Aircraft ICAO</td>
                                            <td>{item.blockData.arICAO}</td>
                                        </tr>
                                        <tr>
                                            <td>Tail Number</td>
                                            <td>{item.blockData.arTailNum}</td>
                                        </tr>
                                        <tr>
                                            <td>Arriving at</td>
                                            <td>{item.blockData.arrivalICAO}</td>
                                        </tr>
                                        <tr>
                                            <td>Departed From</td>
                                            <td>{item.blockData.departureICAO}</td>
                                        </tr>
                                        <tr>
                                            <td>Flight Number</td>
                                            <td>{item.blockData.flightNumber}</td>
                                        </tr>
                                        <tr>
                                            <td>Current Flight Altitude</td>
                                            <td>{item.blockData.currentFlightAltitude}</td>
                                        </tr>
                                        <tr>
                                            <td>Current Flight Direction</td>
                                            <td>{item.blockData.currentFlightDirection}</td>
                                        </tr>
                                        <tr>
                                            <td>Current Flight Latitude</td>
                                            <td>{item.blockData.currentFlightLatitude}</td>
                                        </tr>
                                        <tr>
                                            <td>Current Flight Longitude</td>
                                            <td>{item.blockData.currentFlightLongitude}</td>
                                        </tr>
                                        <tr>
                                            <td>Current Flight Speed</td>
                                            <td>{item.blockData.currentFlightSpeed}</td>
                                        </tr>
                                        <tr>
                                            <td>Flight Status</td>
                                            <td>{item.blockData.flightStatus}</td>
                                        </tr>
                                        <tr>
                                            <td>Last API Update</td>
                                            <td>{item.blockData.updateTime}</td>
                                        </tr>
                                    </tbody>   
                                </Table>
                            </div>
                        ))
                        }
                    </Col>
                    <Col>
                        <h6>Flight Aware API</h6>
                    </Col>
                </Row>
            </Container>
        </div>
    </div>
  ) 
  
}

const styles = {
    container: { width: 400, margin: '0 auto', display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 20 },
    todo: {  marginBottom: 15 },
    input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
    todoName: { fontSize: 20, fontWeight: 'bold' },
    todoDescription: { marginBottom: 0 },
    todoanotherOne: {marginBottom: 0},
    button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
  }
  
export default GetAPIData;