import React, { useState, useEffect } from "react";
import "../App.css";
import ControlChoiceItems from "./ControlChoiceItems";
import GetAppIcon from '@material-ui/icons/GetApp';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';

function ControlPane({scheduleList, scheduleShownIdx, setScheduleShownIdx, viewOn, resultLength }) {
    const [toggleView, setToggleView] = useState(false)
    console.log("viewOn", viewOn)
    var viewClassName = (viewOn) ? "relative flex gap-2 items-center justify-center text-ssm py-1 px-3 pl-1 shadow hover:text-highlight-white text-disable-grey" 
                                 : "relative flex gap-2 items-center justify-center text-ssm py-1 px-3 pl-1 shadow text-disable-grey cursor-default"
    return (
        <div className="flex items-center justify-items-start gap-4 buttons">
            <div className="view-timetable relative flex flex-col items-center">

                <button className={viewClassName}
                        title="View timetable generated"
                        onClick={() => {setToggleView(!toggleView)}} disabled={!viewOn}>
                    <VisibilityIcon className="" aria-label="view" style={{'font-size': '1.6rem'}}/>
                    View
                </button>
                {toggleView && 
                    <ControlChoiceItems scheduleList={scheduleList} scheduleShownIdx={scheduleShownIdx} setScheduleShownIdx={setScheduleShownIdx} />}
                {/* <div className="absolute top-9 h-auto w-24 border-0.5 border-line-grey bg-panel-grey px-2 py-1">
                    <div className="text-ssm font-light text-center"> Timetable 1</div>
                </div> */}
            </div>
            <div className="flex items-center justify-center gap-2 shadow text-ssm text-disable-grey font-semibold py-1 px-3" disabled={true}>
                <GetAppIcon />
                    <div title="currently unavailable">Download</div> 
            </div>
        </div>
    )
}

export default ControlPane
