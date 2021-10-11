import React, {useState} from "react";
import "./App.css"
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

function PlannerButtons({confirmAddCourse, plannerAdd}){
    // console.log(plannerAdd)
    const addBtnClass = plannerAdd 
    ? "flex items-center justify-center rounded shadow-xl outline-none py-2 px-3 bg-button-grey text-medium-theme-green hover:bg-dark-grey cursor-pointer"
    : "flex items-center justify-center rounded shadow outline-none py-2 px-3 bg-dark-grey text-disable-grey cursor-default"


    return (
        <div className="flex justify-center w-full gap-4 mt-5">
            <button className={addBtnClass} onClick={confirmAddCourse}
                    disabled={!plannerAdd} >
                <AddCircleOutlineOutlinedIcon className="mr-2"/>
                <span className="text-sm font-bold">
                    Add
                </span>
            </button>
            {/* <button className="flex items-center justify-center rounded shadow-xl outline-none py-2 px-3 bg-button-grey text-medium-theme-green hover:bg-dark-grey">
                
                <EditRoundedIcon className="mr-2"/>
                <span className="text-sm font-bold">
                    Create
                </span>
            </button> */}
        </div>
    )
}

export default PlannerButtons