import React, { useState } from "react";
import "./App.css"

function PlannerSemController({ semester,  handleSemChange}){
    
    var sem1Style = (semester === "Sem-2") ? "text-disable-grey" : "text-highlight-white"
    var sem2Style = (semester === "Sem-2") ? "text-highlight-white" : "text-disable-grey"
    
    return (
        <div className="w-full flex items-center justify-center gap-6 py-4">

            <div className={`text-sm lg:text-base ${sem1Style} cursor-pointer`} onClick={() => handleSemChange('Sem-1')}>
                Semester 1
            </div>

            <div className={`text-sm lg:text-base ${sem2Style} cursor-pointer`} onClick={() => handleSemChange('Sem-2')}>
                Semester 2
            </div>

        </div>
    )
}

export default PlannerSemController