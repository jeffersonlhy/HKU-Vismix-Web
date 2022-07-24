import React, { useState } from "react";
import "./App.css"
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';

function ViewerButtons({getTimetable, selectedCoursesList}){
    return (
        <>
            {
                selectedCoursesList.length > 0 &&
                <div className="w-full flex items-center justify-center pt-8"> 
                    <button className="flex items-center justify-items-center px-3 py-2 border border-theme-green rounded-md" onClick={getTimetable} >
                        <InsertInvitationIcon style={{color: "#78CCC2"}} />
                        <div className="ml-2 text-xs lg:text-ssm text-theme-green font-semibold"> Get Schedule </div>
                    </button>
                </div>
            }
        </>
    )
}

export default ViewerButtons