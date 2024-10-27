import React, { useRef, useState } from 'react'
import './App.css'

const App = () => {

  const [hour, setHour] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  const [isTimerStarted, setIsTimerStarted] = useState(false);

  const handleHourInput = (e) => {
    // setHour(e.target.value);
    const value = e.target.value;

    if (value === '' || (Number(value) < 100)) {
      setHour(value);
    } else {
      setHour('')
      alert('Hour should be less than 100');
    }

  }

  const handleMinInput = (e) => {
    const value = e.target.value;


    if (value === '' || value < 60) {
      setMinutes(value)
    } else {
      setMinutes('')
      alert('Minutes should be less than 60');
    }

  }

  const handleSecondsInput = (e) => {
    // setHour(e.target.value);
    const value = e.target.value;

    if (value === '' || (Number(value) < 60)) {
      setSeconds(value);
    } else {
      setSeconds('')
      alert('Seconds should be less than 60');
    }



  }
  let intervalRef = useRef(null);
  const pauseButton = () => {
    
    if(isTimerStarted) {
      clearInterval(intervalRef.current);
      setIsTimerStarted(false);
    }
  }

  const handleStartButton = () => {
    const hourINSeconds = Number(hour) * 60 * 60 || 0;
    const minIndSeconds = Number(minutes) * 60 || 0;
    const totalTime = hourINSeconds + minIndSeconds + (Number(seconds) || 0);

    let seconds_to_display = totalTime%60;
    let min_to_display =Math.floor((totalTime/60)%60);
    let hours_to_display = Math.floor(totalTime / (60 * 60)); 

    setIsTimerStarted(true);

    let remainingTime = totalTime;

    
    intervalRef.current = setInterval(() => {
     

      
      if(seconds_to_display===0) {
        if(remainingTime>59){
          seconds_to_display=59;
          if (min_to_display > 0) {
            min_to_display--; // Decrease minutes when seconds reset
          } else if (hours_to_display > 0) {
            min_to_display = 59; // Reset minutes to 59 if we still have hours left
            hours_to_display--; // Decrease the hour
          }
        }else{
          seconds_to_display=remainingTime;
        }
      }
      
      if (remainingTime > 0) {
        remainingTime--;
        setSeconds(seconds_to_display);
        seconds_to_display--;
        
        
       
        if (seconds_to_display === 0 && min_to_display > 0) {
          // min_to_display--;
        }
        setMinutes(min_to_display%60);
        setHour(hours_to_display);
        console.log(remainingTime);
      } else {
        clearInterval(intervalRef.current);
        setIsTimerStarted(false);
      }
    }, 1000);


  }

  return (
    <div className='container'>
      <span className='title'> <h1>Countdown Timer</h1></span>
        {isTimerStarted? 
        
        <div className='timer-container'>

          <span>{hour} : {minutes} : {seconds}</span>

          <button className='start-button' onClick={pauseButton}>
  
  Pause
</button>
        </div> :
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
  
  
        </div>}
    </div>
  )
}

export default App