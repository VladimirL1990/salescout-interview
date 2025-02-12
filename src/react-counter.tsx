import React, { useState } from 'react';

function Counter() {
    // Указываем тип данных для состояния (number)
    const [count, setCount] = useState<number>(0);

    // Явно указываем тип для prevCount
    const increase = () => setCount((prevCount: number) => prevCount + 1);
    const decrease = () => setCount((prevCount: number) => prevCount - 1);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Counter: {count}</h1>
            <button onClick={increase}>Increase</button>
            <button onClick={decrease} style={{ marginLeft: '10px' }}>Decrease</button>
        </div>
    );
}

export default Counter;
