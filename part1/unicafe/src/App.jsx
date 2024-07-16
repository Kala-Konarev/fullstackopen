/* eslint-disable react/prop-types */
import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const reactGood = () => setGood(good + 1);
    const reactNeutral = () => setNeutral(neutral + 1);
    const reactBad = () => setBad(bad + 1);

    const total = good + bad + neutral;
    const average = (good - bad) / total;
    const percentage = (good / total) * 100;
    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={reactGood} text="good" />
            <Button onClick={reactNeutral} text="neutral" />
            <Button onClick={reactBad} text="bad" />
            <h1>statistics</h1>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {total}</p>
            <p>average {average}</p>
            <p>percentage {percentage} %</p>
        </div>
    );
};

export default App;
