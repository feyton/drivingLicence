import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

function Timer({ start, onFinish }) {
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
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
    if (total === 0) {
      onFinish();
    }
  };
  const clearTimer = (e) => {
    setTimer("20:00");
    if (ref.current) clearInterval(ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    ref.current = id;
  };
  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 20 * 60);
    return deadline;
  };
  useEffect(() => {
    if (running) clearTimer(getDeadTime());
    return;
  }, [running]);

  return (
    <div className="font-bold px-3 text-[3rem] text-primary">
      {running && timer}
    </div>
  );
}

export default Timer;
