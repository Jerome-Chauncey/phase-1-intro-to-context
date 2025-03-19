const employeeInfo = ["Gray", "Worm", "Security", 1];

//employee record
function createEmployeeRecord(employeeArray) {
  return {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}
console.log(createEmployeeRecord(employeeInfo));

//creating a copy of createdEmployeeRecord(employeeArray)
function createEmployeeRecords(employeeInfoCopyArray) {
  return employeeInfoCopyArray.map(createEmployeeRecord);
}
console.log(createEmployeeRecords([employeeInfo]));

//creating a timeInEvent
function createTimeInEvent(employee, dateTimeString) {
  //split date & time(string)
  const [date, hour] = dateTimeString.split(" "); //splits the string where there's a space

  //timeIn event object
  const timeInEvent = {
    type: "TimeIn",
    date: date,
    hour: parseInt(hour),
  };

  //add the timeInEvent to the employee's timeInEvents array
  employee.timeInEvents.push(timeInEvent);
  //return updated employee

  return employee;
}
const employeeRecord = createEmployeeRecord(employeeInfo);
const updatedEmployeeWithTimeIn = createTimeInEvent(employeeRecord, "2020-02-22 0900");
console.log(updatedEmployeeWithTimeIn);

function createTimeOutEvent(employee, dateTimeString) {
  //split date & time(string)
  const [date, hour] = dateTimeString.split(" "); //splits the string where there's a space

  //timeOut event object
  const timeOutEvent = {
    type: "TimeOut",
    date: date,
    hour: parseInt(hour),
  };

  //add the timeOutEvent to the employee's timeOutEvents array
  employee.timeOutEvents.push(timeOutEvent);
  //return updated employee

  return employee;
}
const updatedEmployeeWithTimeOut = createTimeOutEvent(employeeRecord, "2020-02-22 1700");
console.log(updatedEmployeeWithTimeOut);

//calculate hours worked
function hoursWorkedOnDate(employee, date) {
  //searches timeInEvents array for a matching date then stores in timeIn
  const timeIn = employee.timeInEvents.find((event) => event.date === date);
  //searches timeOutEvents array for a matching date then stores in timeOut
  const timeOut = employee.timeOutEvents.find((event) => event.date === date);

  //calculate hours worked
  return (timeOut.hour - timeIn.hour) / 100;
}

createTimeInEvent(employeeRecord, "2020-02-23 0900");
createTimeOutEvent(employeeRecord, "2020-02-23 1700");
createTimeInEvent(employeeRecord, "2020-02-24 1000");
createTimeOutEvent(employeeRecord, "2020-02-24 1500");
createTimeInEvent(employeeRecord, "2020-02-25 0800");
createTimeOutEvent(employeeRecord, "2020-02-25 1500");

console.log(hoursWorkedOnDate(employeeRecord, "2020-02-22"));

function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  return hoursWorked * employee.payPerHour;
}
console.log(wagesEarnedOnDate(employeeRecord, "2020-02-22"));

function allWagesFor(employee) {
  const dates = employee.timeInEvents.map((event) => event.date);

  //sum wages for each date
  return dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
}
console.log(allWagesFor(employeeRecord));

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((total, employee) => total + allWagesFor(employee), 0);
}

//multiple employee records
const employeeRecord1 = createEmployeeRecord(employeeInfo);

//timeIn & timeOut 
createTimeInEvent(employeeRecord1, "2020-02-22 0900");
createTimeOutEvent(employeeRecord1, "2020-02-22 1700");
createTimeInEvent(employeeRecord1, "2020-02-23 1000");
createTimeOutEvent(employeeRecord1, "2020-02-23 1800");
createTimeInEvent(employeeRecord1, "2020-02-24 0900");
createTimeOutEvent(employeeRecord1, "2020-02-24 1700");
createTimeInEvent(employeeRecord1, "2020-02-25 1000");
createTimeOutEvent(employeeRecord1, "2020-02-25 1800");
createTimeInEvent(employeeRecord1, "2020-02-26 0900");
createTimeOutEvent(employeeRecord1, "2020-02-26 1700");
createTimeInEvent(employeeRecord1, "2020-02-27 1000");
createTimeOutEvent(employeeRecord1, "2020-02-27 1800");

const allEmployees = [employeeRecord1];
console.log(calculatePayroll(allEmployees));
