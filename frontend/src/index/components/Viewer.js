import React from "react";
import "./App.css";
import ViewerCourses from "./ViewerCourses";
import ViewerButtons from './ViewerButtons';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import ViewerSelector from "./ViewerSelector";

function Viewer({getTimetable, selectedCoursesList, deleteCourse, setNumToTake, numToTake}){
    return (
        <>
            <div className="text-lg lg:text-xl flex gap-2 items-center justify-start">
                <PlaylistAddCheckIcon style={{'font-size': "2rem"}}/>
                <div className=" font-semibold mb-3 mt-3"> Desired list </div>
            </div>
            <ViewerCourses selectedCoursesList={selectedCoursesList} deleteCourse={deleteCourse}/>
            <ViewerSelector selectedCoursesList={selectedCoursesList} setNumToTake={setNumToTake} numToTake={numToTake}/>
            <ViewerButtons getTimetable={getTimetable} selectedCoursesList={selectedCoursesList}/>
        </>
    )
}

export default Viewer