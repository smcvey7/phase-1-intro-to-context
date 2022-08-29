// Your code here
function createEmployeeRecord(info){
  const employeeRecord = {
    'firstName': info[0],
    'familyName': info[1],
    'title': info[2],
    'payPerHour': info[3],
    'timeInEvents': [],
    'timeOutEvents': []
  };

  return employeeRecord
}

function createEmployeeRecords(array){
  const employeeRecords = [];

  for (const member of array){
    employeeRecords.push(createEmployeeRecord(member))
  }
  
  return employeeRecords
}


function createTimeInEvent(record, stamp){
  const hour = parseInt(stamp.slice(11), 10);
  const date = stamp.slice(0,10);

  record.timeInEvents.push({
    'type': 'TimeIn',
    'hour': hour,
    'date': date
  })

  return record
}

function createTimeOutEvent(record, stamp){
  const hour = parseInt(stamp.slice(11), 10);
  const date = stamp.slice(0,10);

  record.timeOutEvents.push({
    'type': 'TimeOut',
    'hour': hour,
    'date': date
  })

  return record
}

function hoursWorkedOnDate(record, day){
  let dayIn
  let dayOut
  for (const event of record.timeInEvents){
    if (event.date === day){
      dayIn = event.hour/100
    }
  };
  for (const event of record.timeOutEvents){
    if (event.date === day){
      dayOut = event.hour/100
    }
  };

  return dayOut-dayIn;
}

function wagesEarnedOnDate(record, day){
  const hours = hoursWorkedOnDate(record, day);
  const payRate = record.payPerHour;
  return hours * payRate;
}

function allWagesFor(record){
  let sum = 0;
  for (const day of record.timeInEvents){
    sum += wagesEarnedOnDate(record, day.date);
  }

  return sum
}

function calculatePayroll(records){
  let sum = 0
  for (const employee of records){
    sum += allWagesFor(employee);
  }

  return sum;
}