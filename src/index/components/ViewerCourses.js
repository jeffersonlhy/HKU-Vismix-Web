import React, {useState} from "react";
import "./App.css"
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

function ViewerCourses({selectedCoursesList, deleteCourse}){
    return (
        <>
            {
                selectedCoursesList.length > 0 
                ? <div className="relative flex justify-start w-full h-auto gap-4 py-4 px-5 flex-wrap bg-dark-grey">
                    {
                        selectedCoursesList.map((course, i) => {
                            return (
                                <div className="relative flex items-center justify-center w-32 px-2 py-2 text-ssm lg:text-sm bg-row-grey border-1 border-button-grey rounded-md gap-1 hover:border-win-btn-hover-grey shadow-xl" key={i}>
                                    <p className="text-center font-semibold">{course.courseCode}</p>
                                    <HighlightOffRoundedIcon 
                                        className="delete-icon transform hover:scale-110 transition duration-500 cursor-pointer"
                                        onClick={() => {deleteCourse(course.courseCode)}}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                : <div className="flex text-ssm font-semibold text-font-grey justify-center w-full h-auto gap-4 py-5 px-5 flex-wrap bg-dark-grey items-center rounded-md">
                    <p>Your chosen courses will be shown here.</p>
                </div>

            }
        </>
    )
}

export default ViewerCourses