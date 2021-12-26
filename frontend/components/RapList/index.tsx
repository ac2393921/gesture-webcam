import * as React from 'react'
import RapItem from "../RapItem";
import { Rap } from '../../interfaces'

type Props = {
    items: Rap[]
}

const RapList = () => (
    <div className="bg-gray-800 mt-5 px-2 overflow-y-auto h-96">
        <div
            className="flex flex-col md:items-start md:text-left items-center text-center"
        >
            <RapItem />
            <RapItem />
            <RapItem />
            <RapItem />
        </div>
    </div>
)

export default RapList
