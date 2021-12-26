import * as React from 'react'

const RapItem = () => (
    <div className="bg-white p-2 w-full sm:w-full sm:p-4 h-48 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none mb-1">
        <img
            src="../../public/pexels-pavel-danilyuk-6339648.jpg"
            style={{
                width: 200,
                height: 150,
            }}
        />
        <div className="flex sm:flex-1 flex-col gap-2 p-1">
            <h1 className="text-lg sm:text-xl font-semibold  text-gray-600">
                Section 1/3 Rep 1/10
            </h1>
            <p className="text-gray-500 text-sm sm:text-base line-clamp-3">
                Time: 8s Total: 36
            </p>
        </div>
    </div>
)

export default RapItem
