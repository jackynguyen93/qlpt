

export const calculateNextDate = (lastDateStr, period) => {
    let lastDate = new Date(lastDateStr)
    switch (period) {
        case 'quy': {
            let nextDate = lastDate.setMonth(lastDate.getMonth() + 3);
            return (new Date(nextDate)).toISOString().substring(0,10);
        }
        case 'nam': {
            let nextDate =lastDate.setFullYear(lastDate.getFullYear() + 1);
            return (new Date(nextDate)).toISOString().substring(0,10);
        }
        default : {
            let nextDate =lastDate.setMonth(lastDate.getMonth() + 1);
            return (new Date(nextDate)).toISOString().substring(0,10);
        }
    }
}

export const formatDate = (date) => {
    return date.substring(8)  + "-" + date.substring(5,7) + "-" + date.substring(0,4)
}