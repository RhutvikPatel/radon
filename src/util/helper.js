const printDate = function(){
    let currentDate = new Date()
    console.log("Today's Date is: "+ currentDate)
}

const printMonth = function(){
    const currentMonth = new Date().getMonth()+1;//we add 1 to getMonth() because it returns zero-based index(starting with 0)
    console.log("This month is: "+ currentMonth)
}

const getBatchInfo = function(){
    console.log("Radon, W3D3, the topic for today is Nodejs module system")
}

module.exports.date= printDate
module.exports.month = printMonth
module.exports.batchInfo = getBatchInfo