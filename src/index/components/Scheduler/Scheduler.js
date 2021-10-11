import React, { useState, useEffect } from "react";
// import ControlPane from "./ControlPane";
// import Timetable from "./Timetable";
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import "../App.css";

function Scheduler({children}){

    return (
        <div className="text-font-grey w-full h-full rounded-xl">
            <div className="flex items-center justify-start">
                <InsertInvitationIcon className="mr-3" style={{'font-size': '1.5rem'}}/>

                <div className="text-xl lg:text-2xl text-white font-semibold mb-3 mt-3"> Schedule </div>
            </div>
            { children }
        </div>
    )
}

export default Scheduler

/**
 * {"status": "Success", "timetable": [{"timetable": 1, "courses": [{"course": "COMP3270", "subClass": "2B", "slots": [24, 25, 26, 27, 395, 396, 397, 398, 179, 180, 181, 182, 183, 184, 185, 186, 550, 551, 552, 553, 554, 555, 556, 557]}, {"course": "COMP3322", "subClass": "2B", "slots": [5, 6, 7, 8, 9, 10, 11, 12, 376, 377, 378, 379, 380, 381, 382, 383, 217, 218, 219, 220, 221, 222, 223, 224, 588, 589, 590, 591, 592, 593, 594, 595]}, {"course": "COMP2396", "subClass": "2B", "slots": [69, 70, 71, 72, 440, 441, 442, 443, 228, 229, 230, 231, 232, 233, 234, 235, 599, 600, 601, 602, 603, 604, 605, 606]}, {"course": "MATH2101", "subClass": "2B", "slots": [73, 74, 75, 76, 77, 78, 79, 80, 444, 445, 446, 447, 448, 449, 450, 451, 236, 237, 238, 239, 607, 608, 609, 610]}, {"course": "COMP3234", "subClass": "2A/2B", "slots": [62, 63, 64, 65, 66, 67, 68, 433, 434, 435, 436, 437, 
438, 439, 168, 169, 170, 171, 172, 173, 174, 539, 540, 541, 542, 543, 544, 545]}], "semester": "Sem 2"}]}
 */