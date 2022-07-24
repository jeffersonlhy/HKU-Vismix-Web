import React from "react";
import EventCells from "./EventCells";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import { Scrollbars } from 'react-custom-scrollbars-2';
import "../App.css";

function Timetable({weekCount, weekProceed, scheduleShown}){
    // console.log(scheduleShown)
    function Prefix(){
        return (
            <td>
                <div className="flex flex-col timetable-time-cells">
                    <div className="timetable-time-cell">0830</div>
                    <div className="timetable-time-cell"></div>
                    <div className="timetable-time-cell">0930</div>
                    <div className="timetable-time-cell"></div>
                    <div className="timetable-time-cell">1030</div>
                    <div className="timetable-time-cell"></div>
                    <div className="timetable-time-cell">1130</div>
                    <div className="timetable-time-cell"></div>
                    <div className="timetable-time-cell">1230</div>
                    <div className="timetable-time-cell"></div>
                    <div className="timetable-time-cell">1330</div>
                    <div className="timetable-time-cell"> </div>
                    <div className="timetable-time-cell">1430</div>
                    <div className="timetable-time-cell"></div>
                    <div className="timetable-time-cell">1530</div>
                    <div className="timetable-time-cell"></div>
                    <div className="timetable-time-cell">1630</div>
                    <div className="timetable-time-cell"></div>
                    <div className="timetable-time-cell">1730</div>
                    <div className="timetable-time-cell"></div>
                    <div className="timetable-time-cell">1830</div>
                    <div className="timetable-time-cell"></div>
                </div>
            </td>
        )
    }

    function TimetableGridRows({ count }) {
        const rows = [];
        for (let i = 0; i < count; ++i) {
            rows.push(
                <div className= { i % 2 === 0 ? "timetable-content-row-colored" : "timetable-content-row" } key={i}>
                <div className="timetable-content-cell"></div>
                <div className="timetable-content-cell"></div>
                <div className="timetable-content-cell"></div>
                <div className="timetable-content-cell"></div>
                <div className="timetable-content-cell"></div>
                </div>
            );
        }
        return rows;
    }
    
    return(
        <>
            <div className="relative flex items-center justify-center gap-2 text-lg lg:text-2xl text-font-grey font-semibold text-center w-full my-3 mt-8">
                {weekCount === 'Week 2' && <ArrowBackIosRoundedIcon className="absolute lg:left-40 left-4 cursor-pointer" onClick={weekProceed}/> }
                {weekCount}
                {weekCount === 'Week 1' && <ArrowForwardIosRoundedIcon className="absolute lg:right-40 right-4 cursor-pointer" onClick={weekProceed}/>}
            </div>
            <Scrollbars style={{width: '100%', height: '820px'}}>
                <div className="w-full overflow-x-hidden overflow-y-hidden" style={{"min-width": "750px"}}>
                    <table className="w-full" style={{'table-layout': 'fixed'}}>
                        <tbody>
                            <tr className="border-l-1 border-r-1 border-t-1 border-line-grey">
                                <td className="w-20 left-indent">
                                </td>
                                <td className="border-l-1 border-b-1 border-line-grey">
                                    <div className='grid grid-cols-5 text-center justify-items-center'>
                                        <span className="timetable-header-cell">
                                            MON
                                        </span>
                                        <span className="timetable-header-cell">
                                            TUE
                                        </span>
                                        <span className="timetable-header-cell">
                                            WED
                                        </span>
                                        <span className="timetable-header-cell">
                                            THU
                                        </span>
                                        <span className="timetable-header-cell">
                                            FRI
                                        </span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-l-1 border-r-1 border-b-1 border-line-grey">
                                <Prefix/>
                                <td className="border-r-1 border-l-1 border-line-grey relative p-0">
                                    {scheduleShown.length > 0 && <EventCells week={weekCount} eventDetails={scheduleShown}></EventCells>}
                                    <TimetableGridRows count={11}/>
                                </td>
                            </tr>
                        </tbody>
                    </table> 
                </div>
            </Scrollbars>
        </>
    )
}

export default Timetable