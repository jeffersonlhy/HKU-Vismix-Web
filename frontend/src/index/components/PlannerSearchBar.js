import React, {useState, useEffect} from "react";
import "./App.css"

function PlannerSearchBar({courseData, setSelectedCourseCode}){
    const [filterIsUpdating, setFilterIsUpdating] = useState(false)
    const [localKeywords, setLocalKeywords] = useState("")
    const [filteredCourse, setFilteredCourse] = useState("")

    const setCourse = (key) => {
        // console.log('Selected', e.target.innerText.substring(0,8))
        console.log(key)
        setSelectedCourseCode(key)
        setLocalKeywords("")
    }


    useEffect(()=>{
        setFilterIsUpdating(true)
        const timer = setTimeout(()=>{
            const filtered = courseData.filter((item) => {
                return (item.value.toLowerCase().includes(localKeywords) || item.value.toUpperCase().includes(localKeywords))
            })
            setFilteredCourse(filtered)
            setFilterIsUpdating(false)
        }, 300)

        return () => clearTimeout(timer);
    }, [localKeywords])
    


    return (
        <>
            <div className="flex items-center w-full">
                <input className="h-4 w-full text-ssm lg:text-sm border-0 px-5 py-4 rounded-lg outline-none" 
                style={{'background': '#404040'}}
                key="orbital-search-bar"
                value={localKeywords}
                placeholder={"Find courses"}
                onChange={(e) => setLocalKeywords(e.target.value)}
                />
            </div>
            <div className="h-full mb-4">
            { localKeywords !== "" && filteredCourse.length > 0 && !filterIsUpdating &&
                <ul className="list-none overflow-y-auto p-3 w-full max-h-64 relative bg-row-grey shadow-md rounded-md">
                    { filteredCourse.map((item) => {
                        return (
                            <li className="text-ssm lg:text-sm py-2 px-3 hover:bg-line-grey cursor-pointer rounded-sm" onClick={() => {setCourse(item.key)}} key={item.key}>
                                {item.value}
                            </li>
                        )})
                    }
                </ul> 
            }
            </div>
        </>
    );
}

export default PlannerSearchBar