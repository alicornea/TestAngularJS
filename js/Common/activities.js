(function () {

    var Activities = function (){
        var statusesList = [];
        statusesList.push({ 'name': 'open' });
        statusesList.push({ 'name': 'in progress' });
        statusesList.push({ 'name': 'on hold' });
        statusesList.push({ 'name': 'done' });


        return { statuses: statusesList };
    };

    var app = angular.module("mrgApp");
    app.factory("Activities", [Activities]);


}());
