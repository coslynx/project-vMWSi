import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import moment from 'moment';

const PomodoroTimer = () => {
  const [studyTime, setStudyTime] = useState(25 * 60); // 25 minutes in seconds
  const [breakTime, setBreakTime] = useState(5 * 60); // 5 minutes in seconds
  const [isStudyTime, setIsStudyTime] = useState(true);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(studyTime);

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setIsStudyTime(true);
    setTimeLeft(studyTime);
  };

  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft === 0) {
            if (isStudyTime) {
              setIsStudyTime(false);
              setTimeLeft(breakTime);
            } else {
              setIsStudyTime(true);
              setTimeLeft(studyTime);
            }
          }
          return prevTimeLeft > 0 ? prevTimeLeft - 1 : 0;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerRunning, isStudyTime, studyTime, breakTime]);

  return (
    <div>
      <div>{isStudyTime ? 'Study Time' : 'Break Time'}</div>
      <div>{moment.utc(timeLeft * 1000).format('mm:ss')}</div>
      <Button onClick={toggleTimer}>{timerRunning ? 'Pause' : 'Start'}</Button>
      <Button onClick={resetTimer}>Reset</Button>
    </div>
  );
};

export default PomodoroTimer;