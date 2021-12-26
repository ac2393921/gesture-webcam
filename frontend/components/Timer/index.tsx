import * as React from 'react';
import styled from "styled-components";

import Controls from "../Controls";

type Props = {
    hours: number|string
    minutes: number|string
    seconds: number|string
    handlePlayButton: () => void
    handleStopButton: () => void
    handleResetButton: () => void
}

const Timer = (props: Props) => {
    const { handlePlayButton, handleStopButton, handleResetButton } = props;

    return (
        <div className="ml-10">
            <TimeWrapper>
                <p>{props.hours}</p>
                <TimeSpan>:</TimeSpan>
                <p>{props.minutes}</p>
                <TimeSpan>:</TimeSpan>
                <p>{props.seconds}</p>
            </TimeWrapper>
            <Controls
                handlePlayButton={handlePlayButton}
                handleStopButton={handleStopButton}
                handleResetButton={handleResetButton}
            />
        </div>
    )
}

const TimeWrapper = styled.section`
    color: '#ccc';
    display: flex;
    letter-spacing: 2px;
    font-size: 4rem;
    vertical-align: top;
    margin-top: -25px;
`;

const TimeSpan = styled.span`
    position: relative;
    top: 10px;
    font-size: 3rem;
`;

export default Timer
