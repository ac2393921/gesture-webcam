import * as React from 'react'
import RapItem from "./RapItem";
import { Rap } from '../interfaces'
type Props = {
    items: Rap[]
}

const RapList = ({ items }: Props) => (
    <div
        className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center overflow-y-auto"
        style={{ height: 480 }}
    >
        <RapItem/>
        <RapItem/>
        <RapItem/>
        <RapItem/>
    </div>
)

export default RapList
