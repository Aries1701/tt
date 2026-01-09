import { useEffect, useState } from "react";

type Props = {
    value: number;
};

const LifeCircle: React.FC<Props> = ({value}) => {
    const [count, setCount] = useState(0);

    console.log("will mount");

    useEffect(() => {
        console.log("did mount");

        const timer = setInterval(() => {
            console.log("interval running ...");
        },1000 );

        return () => {
            console.log("will mount");
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        console.log("prop value thay đổi", value);
    }, [value]);

    useEffect(() => {
        console.log("state count thay đổi", count)
    }, [count]);

    return (
        <div style={{}}>
            <h3>Life Circle</h3>

            <p>Props value: {value}</p>
            <p>State count: {count}</p>

            <button onClick={() => setCount(count + 1)}>
                Increase State
            </button>
        </div>
    );
};

export default LifeCircle;
