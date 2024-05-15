import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import '../ClientUI/Homepage/Homepage.css';

const Counter = ({ target }) => {
    const [count, setCount] = useState(0);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5  
    });

    useEffect(() => {
        let interval = null;
        if (inView && count < target) {
            interval = setInterval(() => {
                setCount((prevCount) => (prevCount + 1 <= target ? prevCount + 1 : target));
            }, 0.5); 
        } else if (count === target && interval) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [inView, count, target]);

    return (
        <div  ref={ref}>
            <h1 className='numbercount text-center'>{count}</h1>
            
        </div>
    );
};

export default Counter;
