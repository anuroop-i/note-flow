const now = new Date()
const year = now.getFullYear()
const month = now.getMonth()
const day = now.getDay()
const date = now.getDate()
const hour = now.getHours()
const minute = now.getMinutes() 
const seconds = now.getSeconds()
const daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
     'Thursday', 'Friday', 'Saturday'];
const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];

export const genTimeStamp = () => {
    return `${daysArr[day]}, ${date}/${month+1}/${year}, ${hour}:${minute}:${seconds}`
}

console.log(genTimeStamp());


