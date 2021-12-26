import * as React from "react";
import styled from "styled-components";

type Props = {
    handlePlayButton: () => void
    handleStopButton: () => void
    handleResetButton: () => void
}

const Controles = (props: Props) => {
    const { handlePlayButton, handleStopButton, handleResetButton } = props;

    return (
        <section className="flex text-center">
            <ControlBtn onClick={handlePlayButton}>Play</ControlBtn>
            <ControlBtn onClick={handleStopButton}>Stop</ControlBtn>
            <ControlBtn onClick={handleResetButton}>Reset</ControlBtn>
        </section>
    )
}

const ControlBtn = styled.section`
    margin-left: 15px;
    border: none;
    background-color: #E5AD3D;
    padding: 3px 12px;
    font-size: 1rem;
    font-weight: 400;
    color: white;
    cursor: pointer;
    margin-top: -10px;
`;

export default Controles
