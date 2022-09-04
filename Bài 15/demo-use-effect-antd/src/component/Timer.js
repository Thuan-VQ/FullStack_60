import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";

export default function Timer () {

    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const start = () => {
        setIsActive(true)
    };

    const stop = () => {
        setIsActive(false)
    };

    const reset = () => {
        setTime(0)
    };

    useEffect(() => {
        if (isActive) {
            const interval = setInterval(() => {
                setTime(time + 1)
            }, 1000)
            return () => clearInterval(interval)
        }

    }, [time, isActive]);

    return(
        <>
            <h1> useEffect() Hook Example </h1>
            <h3> Timer that uses the useEffect() and useState() hook </h3>
            <p> Timer: {time}</p>
            {isActive 
                ? <Button variant="danger" size="lg"  onClick={stop} className="w-50"> Stop</Button>
                : <Button variant="success" size="lg" onClick={start} className="w-50"> Start </Button>
            } <br />
            <Button variant="secondary" size="lg" onClick={reset} className="w-50 mt-3"> Reset</Button>
        </>
    );
;}