function getTypes() {
  var types = [];
  for (var i = 1; i < 5; i++)
    types.push({
      'Name': 'Type' + i
    });

  return types;
}

function getWorkgroups() {
  var workgroups = [];
  for (var i = 1; i < 5; i++)
    workgroups.push({
      'Name': 'Workgroup' + i
    });

  return workgroups;
}

function getCurrentDatetime()
{
  var date = new Date();
  
  return date.getDate() + "/" + 
         (date.getMonth() + 1) + "/" + 
         date.getFullYear() + " " +
         date.getHours() + ":"  +
         date.getMinutes() + ":" +
         date.getSeconds();
}