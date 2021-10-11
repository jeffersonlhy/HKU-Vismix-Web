import React, {useState, useEffect} from "react";
import Planner from "./Planner.js"
import Viewer from "./Viewer.js"
import Footer from './Footer.js'
import "./App.css"
import { Scheduler, Timetable, ControlPane, StatusSection } from "./Scheduler/index.js";
import { Scrollbars } from 'react-custom-scrollbars-2';
import LoadingOverlay from 'react-loading-overlay';
import course from '../data/course.json'

var axios = require('axios');
var FormData = require('form-data');


function Body(){
    const [displayEditPanel, setDisplayEditPanel] = useState(true)
    const [courseData, setCourseData] = useState([])
    const [selectedCoursesList, setSelectedCoursesList] = useState([])
    const [selectedCourseCode, setSelectedCourseCode] = useState("")
    const [numToTake, setNumToTake] = useState(5)
    const [semester, setSemester] = useState("Sem-1")
    const [isLoading, setIsLoading] = useState(false)
    const [timetableCourses, setTimetableCourses] = useState([])
    const [plannerAdd, setPlannerAdd] = useState(false)  
    const [scheduleShownIdx, setScheduleShownIdx] = useState(-1)
    const [weekCount, setWeekCount] = useState('Week 1')
    const [scheduleShown, setScheduleShown] = useState([])
    const [alertOn, setAlertOn] = useState(true)
    const [alertInfo, setAlertInfo] = useState("Welcome to Vismix Beta. Get your timetables generated here!")
    const [severity, setSeverity] = useState("info")
    const [viewOn, setViewOn] = useState(false)
    const [resultLength, setResultLength] = useState(0)

    useEffect(() => {
        // axios(config).then(function (response) {
        //   // console.log(response.data);
        //     setCourseData(response.data)
        // }).catch(function (error) {
        //     console.log(error);
        // });
        setCourseData(course)
    }, [])

    useEffect(()=>{
        var isInList = selectedCoursesList.some(el => el.courseCode === selectedCourseCode)
        if (selectedCourseCode !== "" && !isInList) {
            setPlannerAdd(true)
        } else {
            setPlannerAdd(false)
        }
    }, [selectedCourseCode])

    function getTimetable(){
        setIsLoading(true)
        // console.log('overlay true')
        const coursesList = selectedCoursesList.map(item => item.courseCode).join(',')
        var data = new FormData();
        data.append('sem', semester);
        data.append('numToTake', numToTake);
        data.append('targetCourseCode', coursesList);

        var config = {
            method: 'post',
            // url: 'https://vismix-test-api-2.azure-api.net/generate-all-schedules/get-all-possible-timetables',
            url: "https://generate-timetable.azurewebsites.net/api/get-all-possible-timetables",
            headers: { },
            data: data
        };

        axios(config).then(function (response) {
                // console.log("Success", response.data);
                var result = JSON.parse(JSON.stringify(response.data))
                setTimetableCourses(JSON.parse(JSON.stringify(response.data)))
                setIsLoading(false)
                if (result.length > 0){
                    setAlertInfo("Please check the timetables generated from the View button.")
                    setSeverity("success")
                    setResultLength(result.length)
                    setAlertOn(true)
                    setViewOn(true)
                } else {
                    setAlertInfo("No available timetables are generated. Please try with different courses.")
                    setSeverity("error")
                    setResultLength(0)
                    setAlertOn(true)
                    setViewOn(false)
                }
            }).catch(function (error) {
                // console.log(error)
                setIsLoading(false)
                setAlertInfo("The generator has met some unknown issues. Please try again later.")
                setSeverity("error")
                setResultLength(0)
                setAlertOn(true)
                setViewOn(false)
        });
        // Reset
        setScheduleShownIdx(-1)
        setScheduleShown([])
    }

    function confirmAddCourse() {
        if (selectedCourseCode !== "") {
            const course = courseData.find(item => item.courseCode === selectedCourseCode)
            const isSelected = selectedCoursesList.find(item => item.courseCode === selectedCourseCode)
            isSelected === undefined && setSelectedCoursesList(prevCourseList => [...prevCourseList, course]) // Only add unique courses
            setPlannerAdd(false)
        }
    }

    function deleteCourse(courseCode) {
        // console.log("Deleting code",courseCode)
        setSelectedCoursesList(selectedCoursesList.filter((course) => {
            return course.courseCode !== courseCode
        }))
    }

    // Schedule update per choice
    function handleScheduleChange(idx){
        setScheduleShownIdx(idx)
        setScheduleShown(timetableCourses[idx]['courses'])
    }

    function reset(){
        setSelectedCourseCode("")
        setScheduleShownIdx(-1)
        setScheduleShown([])
        setSelectedCoursesList([])
    }

    function handleSemChange(sem){
        setSemester(sem)
        reset()
    }

    function weekProceed(){
        (weekCount === 'Week 1') ? setWeekCount('Week 2') : setWeekCount('Week 1')
    }

    return(
        <>
            <LoadingOverlay
                active={isLoading}
                spinner
                text='Generating your timetables...'
            >
                {/* position: relative;overflow: hidden;width: calc(100%);height: calc(100vh - 64px); */}
                <Scrollbars style={{ width: '100%', height: 'calc(100vh - 68px)' }} autoHide>
                    <div className="bg-background min-w-full lg:p-8 lg:pr-0 p-0 main-content h-auto">
                        <div className="lg:flex lg:flex-row-reverse h-full w-full flex flex-col-reverse">
                            <div className="flex flex-row h-full lg:w-8/12 w-full lg:p-3 lg:pb-6 lg:px-14 pb-6 px-7 pt-8">
                                <Scheduler>
                                        <ControlPane
                                                    scheduleList={timetableCourses} 
                                                    scheduleShownIdx={scheduleShownIdx} 
                                                    setScheduleShownIdx={handleScheduleChange}
                                                    viewOn={viewOn}
                                                    resultLength={resultLength}/>
                                        <StatusSection severity={severity} alertInfo={alertInfo} alertOn={alertOn} setAlertOn={setAlertOn}/>
                                        
                                        <Timetable
                                                weekCount={weekCount} 
                                                weekProceed={weekProceed}
                                                scheduleShown={scheduleShown}/>
                                </Scheduler>
                                {/* <Timetable courses={timetableCourses}/> */}
                            </div>
                            <div className="flex bg-panel-grey flex-col lg:min-h-screen h-full lg:w-4/12 w-full text-font-grey gap-5 lg:pr-5 pb-10">
                                <div className="h-auto pt-4 pb-8 px-7 rounded-xl" style={{"min-height": "50%"}}>
                                    <Planner
                                            selectedCourseCode={selectedCourseCode}
                                            setSelectedCourseCode={setSelectedCourseCode} 
                                            courseData={courseData} 
                                            confirmAddCourse={confirmAddCourse}
                                            plannerAdd={plannerAdd}
                                            semester={semester}
                                            handleSemChange={handleSemChange}>
                                    </Planner>
                                </div>
                                <div className="h-auto p-2 px-7 pb-6 rounded-xl">
                                    <Viewer getTimetable={getTimetable} 
                                            selectedCoursesList={selectedCoursesList}
                                            deleteCourse={deleteCourse}
                                            setNumToTake={setNumToTake}
                                            numToTake={numToTake}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Footer/>
                    </div>
                </Scrollbars>
            </LoadingOverlay>
        </>
    )
}

export default Body