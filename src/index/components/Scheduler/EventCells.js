import React from "react";
import "../App.css"
function EventCells({week, eventDetails}){
    function getClassNameByIndex(idx){
        switch (idx) {
            case 0:
                return "bg-cse-red border border-cse-red-b text-cse-red-b"
            case 1:
                return "bg-cse-orange border border-cse-orange-b text-cse-orange-b"
            case 2:
                return "bg-cse-yellow border border-cse-yellow-b text-cse-yellow-b"                    
            case 3:
                return "bg-cse-green border border-cse-green-b text-cse-green-b"                    
            case 4:
                return "bg-cse-cobalt border border-cse-cobalt-b text-cse-cobalt-b"       
            case 5:
                return "bg-cse-blue border border-cse-blue-b text-cse-blue-b"                    
            case 6:
                return "bg-cse-purple border border-cse-purple-b text-cse-purple-b"                    
            case 7:
                return "bg-cse-brown border border-cse-brown-b text-cse-brown-b"                    
            default:
                return "bg-cse-brown border border-cse-brown-b text-cse-brown-b";
        }
    }


    
    function getWeek1Slots(slots){
        return slots.filter(t => t < 53 * 7) //371
    }

    function getWeek2Slots(slots){
        return slots.filter(t => t >= 53 * 7)
    }

    function renderEventDivArray(eventDivArray){
        // console.log('eventDivArray', eventDivArray)
        return (eventDivArray.map(function(dayEvents, i){
            return (
            <div className="day-event-wrapper" key={i}>
                {dayEvents}
            </div>)
        }))
    }

    function getEventDivArray(courseList){
        // 2 rem = half hour
        var weekdayEventHTML = [[],[],[],[],[]]
        var SLOT_REF = [  
        '08:20', '08:30', '08:50', '09:00', '09:20', '09:30', '09:50', '10:00', '10:20', '10:30', '10:50', // 11
        '11:00', '11:20', '11:30', '11:50', '12:20', '12:30', '12:50', '13:00', '13:20', '13:30', '13:50',
        '14:00', '14:20', '14:30', '14:50', '15:00', '15:20', '15:30', '15:50', '16:20', '16:30', '16:50',
        '17:00', '17:20', '17:30', '17:50', '18:00', '18:20', '18:30', '18:50', '19:00', '19:20', '19:50',
        '20:20', '20:50', '21:00', '21:20', '21:30', '21:50', '22:20', '22:50', '23:20' ]

        // console.log('week', week)
        for (let courseIdx = 0; courseIdx < courseList.length; ++courseIdx){
            // console.log('courseIdx: ', courseIdx)
            var filterSlots;
            var courseInfo =  courseList[courseIdx]
            var courseCode = courseInfo['course']
            var courseSubclass = courseInfo['subClass']
            if (week === 'Week 1'){
                filterSlots = getWeek1Slots(courseInfo.slots)
                filterSlots.push(-1)
            } else {
                filterSlots = getWeek2Slots(courseInfo.slots)
                filterSlots.push(-1)
            }
            // console.log('filterslots', filterSlots)
            for (let ptr = 1; ptr < filterSlots.length; ++ptr){
                // console.log(ptr)
                // console.log(filterSlots[ptr-1])
                let weekDayNum = Math.floor(filterSlots[ptr-1] / 53) % 7
                // console.log('weekDayNum', weekDayNum)
                var startTimeIdx = filterSlots[ptr-1] % 53
                var startTime = SLOT_REF[startTimeIdx];
                // console.log('startTime', startTime)
                
                // Split into different blocks 
                while (filterSlots[ptr] === filterSlots[ptr-1] + 1 && ptr+1 < filterSlots.length){
                    // console.log("adding", ptr)
                    ptr += 1
                }
                // console.log('endTimeptr', ptr)
                var endTimeIdx = filterSlots[ptr-1] % 53
                var endTime = SLOT_REF[endTimeIdx];
                // console.log(startTime, endTime)
                // let weedDay = getWeekDay(startTime)
                // console.log(weekDayNum)
                let minDuration = getDuration(startTime, endTime)
                let cleanTimeStr = getCleanTimeStr(startTime)
                let className = `event-block event-s${cleanTimeStr} ${getClassNameByIndex(courseInfo['index'])}`  
                let height = (minDuration / 30 * 2).toFixed(2)
                // if (height === 4) { console.log('className:', className, 'height', height)}
                // console.log('weekDayNum', weekDayNum)
                weekdayEventHTML[weekDayNum].push(
                    <div className={className} style={{'height': height + 'rem'}} key={cleanTimeStr+weekDayNum+courseCode}>
                        <div className="w-full lg:px-3 py-1 px-1">
                            <p className="text-left lg:text-tiny text-xs font-semibold overflow-ellipsis">{courseCode}</p> 
                            <p className="text-left relative -top-1 lg:text-sm text-xs font-normal overflow-ellipsis">{courseSubclass} </p>
                        </div>
                    </div>
                )
            }
            // console.log('for loop end')
        }
        return weekdayEventHTML
    }

    function getCleanTimeStr(time){
        return time.substring(0,2)+time.substring(3,5)
    }

    function getDuration(startTime, endTime){
        var time1 = new Date()
        time1.setHours(startTime.substring(0,2))
        time1.setMinutes(startTime.substring(3,5))
        var time2 = new Date()
        time2.setHours(endTime.substring(0,2))
        time2.setMinutes(endTime.substring(3,5))
        var minsDuration = 0
        while (time1 < time2){
            minsDuration += 10
            time1.setMinutes(time1.getMinutes() + 10);
        }
        // console.log('minsDuration: ', minsDuration)
        return minsDuration;
    }

    return (
        <div className="h-full w-full absolute grid grid-cols-5">
            {
                week === "Week 1" && renderEventDivArray(getEventDivArray(eventDetails))
            }
            {
                week === 'Week 2' && renderEventDivArray(getEventDivArray(eventDetails))
            }
        </div>
    )
} 

export default EventCells