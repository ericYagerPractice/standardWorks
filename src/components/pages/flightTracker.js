import React, { useState } from 'react';
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'


const initialState = { ACiataCode: '', ACicaoCode: '', ACtaileNumbe: '', ARicaoCode: '', DEPicaoCode: '', FlightNumber: '', FlightAltitude: 0, FlightDirection: 0, FlightLatitude: 0.0, FlightLongitude: 0.0, FlightSpeed: '', FlightStatus: '', UpdateTime: 0}

function GetAPIData() {
    const [formState, setFormState] = useState(initialState)
    const [ae, setAviationEdge] = useState([])
    const [as, setAviationStack] = useState([])
    const aviationItems={};
    const aviationStackItems={};

    function setInput(key, value) {
        setFormState({ ...formState, [key]: value })
      }
      
    async function getAviationEdge() {
        try {
            const icao = { ...formState }.icao
            const apiUrl = "https://aviation-edge.com/v2/public/flights?key=af2520-847137&depIcao="+icao;
            fetch(apiUrl)
                .then(response=>response.json())
                .then(response=>parseAviationEdge(response[0]))
        } catch (err) {
          console.log('error with Aviation Edge', err)
        }
    }

    async function getAviationStack(){
        try{
            fetch("https://api.aviationstack.com/v1/flights?access_key=c3f460aaf5bba37375304396f48ae826&dep_icao="+{ ...formState }.icao+"&limit=10")
                .then(response=>response.json())
                .then(response=>parseOpenSky(response.data[1]))
        } catch(err){
            console.log('error with open sky: ', err)
        }
    }

    function parseOpenSky(data){
        try{
            aviationStackItems.gauge = data.aircraft;

            var airlineData = data.airline;
            aviationStackItems.airline = airlineData.name;

            var arrivalData = data.arrival;
            aviationStackItems.arrivalAirport = arrivalData.airport;
            aviationStackItems.arrivalICAO = arrivalData.icao;
            aviationStackItems.arrivalGate = arrivalData.gate;
            aviationStackItems.estimatedArrival = arrivalData.estimated;

            var departureData = data.departure;
            aviationStackItems.departureAirport = departureData.airport;
            aviationStackItems.departureTime = departureData.actual;
            aviationStackItems.departureDelay = departureData.delay;
            aviationStackItems.departureICAO = departureData.icao;
            
            var flightData = data.flight;
            aviationStackItems.flightNumber = flightData.number;
            aviationStackItems.flightDate = flightData.flight_date;
            aviationStackItems.flightStatus = flightData.flight_status;

            setAviationStack([{"blockData": aviationStackItems}]);
        }catch(err){
            console.log('error with Open Sky parse: ', err)
        }
    }

    function parseAviationEdge(data){
        try{
            var aircraftData = data.aircraft;
            aviationItems.arIATA = aircraftData.iataCode;
            aviationItems.arICAO = aircraftData.icaoCode;
            aviationItems.arTailNum = aircraftData.regNumber;

            var arrivalData = data.arrival;
            aviationItems.arrivalICAO = arrivalData.icaoCode;

            var departureData = data.departure;
            aviationItems.departureICAO = departureData.icaoCode;            

            var flightData = data.flight;
            aviationItems.flightNumber = flightData.number;                      

            var geographyData = data.geography;
            aviationItems.currentFlightAltitude = geographyData.altitude;
            aviationItems.currentFlightDirection = geographyData.direction;
            aviationItems.currentFlightLatitude = geographyData.latitude;
            aviationItems.currentFlightLongitude = geographyData.longitude;  
            
            var speedData = data.speed;
            aviationItems.currentFlightSpeed = speedData.horizontal;            

            var statusData = data.status;
            aviationItems.flightStatus = statusData;            

            var updateData = data.system.updated;
            aviationItems.updateTime = updateData;
            setAviationEdge([{"blockData": aviationItems}]);
          

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
                var t2 = performance.now();
                getAviationStack()
                var t3 = performance.now();
                console.log("Aviation Stack: ");
                console.log(t3-t2);
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
                    <h6>Aviation Stack API</h6>
                        {
                        as.map((item, index) => (
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
                                            <td>Aircraft Gauge</td>
                                            <td>{item.blockData.gauge}</td>
                                        </tr>
                                        <tr>
                                            <td>Airline Name</td>
                                            <td>{item.blockData.airline}</td>
                                        </tr>
                                        <tr>
                                            <td>Arrival Airport</td>
                                            <td>{item.blockData.arrivalAirport}</td>
                                        </tr>
                                        <tr>
                                            <td>Arrival ICAO</td>
                                            <td>{item.blockData.arrivalICAO}</td>
                                        </tr>
                                        <tr>
                                            <td>Arrival Gate</td>
                                            <td>{item.blockData.arrivalGate}</td>
                                        </tr>
                                        <tr>
                                            <td>Estimated Arrival Time</td>
                                            <td>{item.blockData.estimatedArrival}</td>
                                        </tr>
                                        <tr>
                                            <td>Deoarture Airport</td>
                                            <td>{item.blockData.departureAirport}</td>
                                        </tr>
                                        <tr>
                                            <td>Departure ICAO</td>
                                            <td>{item.blockData.departureICAO}</td>
                                        </tr>
                                        <tr>
                                            <td>Departure Time</td>
                                            <td>{item.blockData.departureTime}</td>
                                        </tr>
                                        <tr>
                                            <td>Departure Delay (min)</td>
                                            <td>{item.blockData.departureDelay}</td>
                                        </tr>
                                        <tr>
                                            <td>Flight Number</td>
                                            <td>{item.blockData.flightNumber}</td>
                                        </tr>
                                        <tr>
                                            <td>Flight Date</td>
                                            <td>{item.blockData.flightDate}</td>
                                        </tr>
                                        <tr>
                                            <td>Flight Status</td>
                                            <td>{item.blockData.flightStatus}</td>
                                        </tr>
                                    </tbody>   
                                </Table>
                            </div>
                        ))
                        }
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