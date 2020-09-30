import React, { useState } from 'react';

const initialState = { icao: '' }

function GetAPIData() {
    const [formState, setFormState] = useState(initialState)

    function setInput(key, value) {
        setFormState({ ...formState, [key]: value })
      }

    function fetchFlightData() {
        try {
          const icao = { ...formState }.icao
          const apiUrl = "https://aviation-edge.com/v2/public/flights?key=af2520-847137&depIcao="+icao;
          fetch(apiUrl)
            .then(response=>response.json())
            .then(response=>console.log(response))
            .then(console.log({ ...formState }))
        } catch (err) { console.log('error fetching flights') }

      }
    
  return(
      <div style={styles.container}>
        <input
            onChange={event => setInput('icao', event.target.value)}
            style={styles.input}
            value={formState.name} 
            placeholder="ICAO"
        />
        <button tyoe="submit" onClick={function(){fetchFlightData()}}>Click me</button>
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