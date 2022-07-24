import React from "react";
import { Scrollbars } from 'react-custom-scrollbars-2';
import "../App.css";

function ControlChoiceItems({ scheduleList, scheduleShownIdx, setScheduleShownIdx}) {
    const selectBoxHeight = scheduleList.length * 35
    return (
        <div className="absolute top-9 h-auto w-28 bg-panel-grey z-10 shadow-2xl">
            <Scrollbars style={{ width: '7rem', height: `${selectBoxHeight}px`, maxHeight: '400px'}} autoHide>
                { scheduleList.map(function(item, idx) {
                    return (idx === scheduleShownIdx) ? (
                            <div className="px-3 py-2 text-xs lg:text-ssm font-semibold text-center bg-button-grey" key={idx}> 
                                {"Timetable " + item.timetable} 
                            </div> 
                        ) 
                        : (
                            <div className="px-3 py-2 text-xs lg:text-ssm font-light text-center bg-dark-grey hover:bg-line-grey cursor-pointer" key={idx} onClick={() => {setScheduleShownIdx(idx)}} > 
                                {"Timetable " + item.timetable} 
                            </div>  
                        )
                }) }
            </Scrollbars>
        </div>
    );
}

// onClick={handleScheduleIdxChange(item.timetable)}
export default ControlChoiceItems;
