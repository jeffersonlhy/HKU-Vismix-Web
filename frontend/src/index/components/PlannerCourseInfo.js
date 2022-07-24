import React from "react";
import { Scrollbars } from 'react-custom-scrollbars-2';
import "./App.css"


function PlannerCourseInfo({courseData, selectedCourseCode, semester}){
    // console.log('Selected Course :', selectedCourseCode)
    const course = courseData.filter((item) => {
        return item.courseCode === selectedCourseCode
    })
    // console.log("Display PlannerCourseInfo: ", course)
    if (course.length === 1){
        var courseToDisplay = course[0]
        var courseTimeHTML = courseToDisplay.timeDisplay.map(function(subClass, i) {
            return (
                // <div className="flex items-center flex-wrap" key={i}>
                //     <div className="mr-3 px-1 align-middle py-0.5 border-b-2 border-medium-theme-green text-medium-theme-green">
                //         <span className="relative font-bold" style={{'top': '-1px'}}> {subClass.subClass} </span>
                //     </div>
                //     <div className="py-2">
                //         { subClass['Week 1'] !== "" && <p> {subClass['Week 1']+'(Week 1)'} </p>}
                //         { subClass['Week 2'] !== "" && <p> Week 2 {subClass['Week 2']+'(Week 2)'}</p>}
                //         { subClass['Week 1 & 2'] !== "" && <p> {subClass['Week 1 & 2']+'(Week 1 & 2)'} </p>}
                //     </div>
                // </div>
                <tr key={i} className={(subClass.semester !== semester) ? "text-disable-grey" : ""}>
                    <td>
                        {subClass.subClass}
                    </td>
                    <td>
                        { subClass['Week 1'] !== "" && <span> {subClass['Week 1']+'(Week 1)'} </span>}
                        { subClass['Week 2'] !== "" && <span> Week 2 {subClass['Week 2']+'(Week 2)'} </span>}
                        { subClass['Week 1 & 2'] !== "" && <span> {subClass['Week 1 & 2']+'(Week 1 & 2)'} </span>} 
                    </td>
                    <td>
                        { subClass['venue'] }
                    </td>
                </tr>
            )
        })
    }
    return (
        <>
            {
                course.length === 1 && 
                <div className='h-auto flex flex-col gap-5 mt-6'>
                    <div> 
                        <span className="text-ssm lg:text-base pr-1 font-semibold text-sub-font-grey">Course: </span> <span className="text-ssm lg:text-base text-content-font-white ">{courseToDisplay.courseCode +" "+courseToDisplay.courseName} </span>
                    </div>
                    {/* <Scrollbars renderTrackVertical={props => <div {...props} className="track-vertical"/>} 
                                renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}
                                renderThumbHorizontal={props => <div {...props} className="thumb-horizontal"/>}
                                renderTrackHorizontal={props => <div {...props} className="track-horizontal"/>}
                                renderView={props => <div {...props} className="view"/>}
                                style={{ width: '100%', height: '200px' }}> */}
                        <div className="overflow-y-auto overflow-x-auto" style={{'height': '200px'}}>
                            <table className="text-ssm lg:text-base w-full shadow-2xl pr-2" >
                                <thead>
                                    <td className="font-semibold text-sub-font-grey">
                                        Class
                                    </td>
                                    <td className="font-semibold text-sub-font-grey">
                                        Time
                                    </td>
                                    <td className="font-semibold text-sub-font-grey">
                                        Venue
                                    </td>
                                </thead>
                                <tbody className="text-ssm lg:text-sm">
                                    {courseTimeHTML}
                                </tbody>
                            </table>
                        </div>
                        {/* </Scrollbars> */}
                </div>
            }
        </>
    )
}

export default PlannerCourseInfo