import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

function Timer({ start }) {
  const ref = useRef();
  const { running } = useSelector((state) => state?.timer);
  const [timer, setTimer] = useState("00:00");
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };
  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };
  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer("20:00");

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (ref.current) clearInterval(ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    ref.current = id;
  };
  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 20 * 60);
    return deadline;
  };
  useEffect(() => {
    if (running) clearTimer(getDeadTime());
    return;
  }, [running]);

  return <div className="font-bold px-3 text-[3rem] text-primary">{timer}</div>;
}

export default Timer;
