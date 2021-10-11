import React, { useState } from "react";
import PlannerSearchBar from "./PlannerSearchBar";
import PlannerCourseInfo from "./PlannerCourseInfo";
import PlannerButtons from "./PlannerButtons";
import PlannerSemController from "./PlannerSemController"
import ViewModuleIcon from '@material-ui/icons/ViewModule';

function Planner({selectedCourseCode, setSelectedCourseCode, courseData, confirmAddCourse, plannerAdd, semester, handleSemChange}){
    const coursesInSem = courseData.filter(item => item.timeDisplay.filter(time => time.semester === semester).length > 0)
    const courseDataForSearch = courseData !== {} && coursesInSem.map((item) => {
        return {
            'key': item.courseCode,
            'value': item.courseCode + " " + item.courseName
        }
    })
    
    return (
        <div>
            <div className="flex gap-2 items-center justify-start"> 
                <ViewModuleIcon style={{"font-size": "1.9rem"}}/>
                <div className="text-xl lg:text-2xl text-highlight-white font-semibold mb-3 mt-3"> Add </div>
            </div>
            <PlannerSemController semester={semester} handleSemChange={handleSemChange}/>
            <PlannerSearchBar 
                courseData={courseDataForSearch} 
                setSelectedCourseCode={setSelectedCourseCode} /> 
            <PlannerCourseInfo courseData={courseData} selectedCourseCode={selectedCourseCode} semester={semester}/>
            <PlannerButtons confirmAddCourse={confirmAddCourse} plannerAdd={plannerAdd}/>
        </div>
    )
}

export default Planner