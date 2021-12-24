import * as React from 'react'

const RapItem = () => (
    <div className="bg-white p-2 w-80 max-w-3xl sm:w-full sm:p-4 h-auto rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none">
        <img
            src=""
            style={{
                width: 240,
                height: 180,
            }}
        />
        <div className="flex sm:flex-1 flex-col gap-2 p-1">
            <h1 className="text-lg sm:text-xl font-semibold  text-gray-600">
                This is the title for your card. This is really cool
            </h1>
            <p className="text-gray-500 text-sm sm:text-base line-clamp-3">
                This is the desctiption for your card.This is the desctiption for your card.This is the desctiption for your card.
            </p>
        </div>
    </div>
)

export default RapItem
