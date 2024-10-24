import React, { useState } from 'react'
import './App.css'

const App = () => {

  const [hour,setHour] = useState();
  const [minutes,setMinutes] = useState();
  const [seconds,setSeconds] = useState();

  const [isTimerStarted, setIsTimerStarted] = useState(false);

  const handleHourInput = (e) =>{
    // setHour(e.target.value);
    const value = e.target.value;

    if( value === '' || (Number(value)<100)) {
      setHour(value);
    }else {
      setHour('')
      alert('Hour should be less than 100');
    }

  }

  const handleMinInput = (e) => {
      const value = e.target.value;


      if(value=== '' || value < 60) {
        setMinutes(value)
      }else {
        setMinutes('')
        alert('Minutes should be less than 60');
      }

  }

  const handleSecondsInput = (e) =>{
    // setHour(e.target.value);
    const value = e.target.value;

    if( value === '' || (Number(value)<60)) {
      setSeconds(value);
    }else {
      setSeconds('')
      alert('Seconds should be less than 60');
    }



  }

  const handleStartButton = () => {
      const hourINSeconds =  Number(hour) * 60 * 60 || 0;
      const minIndSeconds =  Number(minutes) * 60 || 0;
      const totalTime = hourINSeconds + minIndSeconds + (Number(seconds) || 0);
    
      setIsTimerStarted(true);
      
      if(isTimerStarted){
       
        setInterval(()=>{
          
          alert(totalTime)
          console.log('hours: ' + (totalTime / 3600));
          console.log('hours: ' + (totalTime / 3600));
          console.log('seconds' + (totalTime))
        },totalTime)
      }
    
  }

  return (
    <div className='container'>
      <span className='title'> <h1>Countdown Timer</h1></span>
      <div className='timer-container d-flex'>
            <input
              type="number"
              id="hour-box"
              value={hour} // Controlled input, value is tied to state
              onChange={handleHourInput} // Updates state on every change
              placeholder="HH"
              className='hour-box'
            />

            <input
                type='number'
                id='min-box'
                value={minutes}
                onChange={handleMinInput}
                placeholder='MM'
                className='min-box'
            />

            <input
                type='number'
                id='sec-box'
                value={seconds}
                onChange={handleSecondsInput}
                placeholder='SS'
                className='sec-box'
            />

            <button className='start-button' onClick={handleStartButton}>
              
              Start
            </button>
            

      </div>
    </div>
  )
}

export default App