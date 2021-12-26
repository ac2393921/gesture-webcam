import React from "react";
import styled from "styled-components";

type Props = {
    onClick: (
        flag: boolean
    ) => void;
    name: string
    isPose: boolean
}

type LabelWrapper = {
    backgroundColor: "white" | "green"
    color: "gray" | "white"
}

const InputToggle = (props: Props) => {
    const { name, onClick } = props;
    const onPose = () => {
        onClick(true);
    }
    const offPose = () => {
        onClick(false);
    }

    if (name=="On") {
        return (
            <>
                {props.isPose ? (<LabelWrapper
                    backgroundColor="green"
                    color="white"
                >
                    <input type="radio" name="room_type" id="onPose" hidden onClick={onPose}  />{name}
                </LabelWrapper>) :
                    <LabelWrapper
                        backgroundColor="white"
                        color="gray"
                    >
                        <input type="radio" name="room_type" id="onPose" hidden onClick={onPose} />{name}
                    </LabelWrapper>
                }
            </>
        )
    }

    if (name=="Off") {
        return (
            <>
                {props.isPose ? (<LabelWrapper
                    backgroundColor="white"
                    color="gray"
                >
                    <input type="radio" name="room_type" id="onPose" hidden onClick={offPose} />{name}
                </LabelWrapper>) :
                    <LabelWrapper
                        backgroundColor="green"
                        color="white"
                    >
                        <input type="radio" name="room_type" id="onPose" hidden onClick={offPose} />{name}
                    </LabelWrapper>
                }
            </>
        )
    }

}

const LabelWrapper = styled.label<LabelWrapper>`
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.color};
    text-align: center;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-radius: 0.5rem;
    align-self: center;
    cursor: pointer;
`;

export default InputToggle;