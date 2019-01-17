var devices = {};
var actionNumber = 0;

$(document).ready(function(){
    $(".days").hide();
    $("#repeating").change(function(){
        $(".days").toggle();
    });
    
    var socket = io.connect();

    socket.on('initialise', function(data) {
        //alert(JSON.stringify(data));
        //$.each(data.schedule, function(index, value){
        //    addScheduledItem(index, value);
        //});
        
        devices = data.devices;
        addSelectRow();
    });
});

function addSelectRow()
{
    var deviceSelect = document.createElement('select');
    var actionSelect = document.createElement('select');
    
    $(deviceSelect).attr('name', 'devices' + actionNumber.toString()).attr('id','devices'+actionNumber.toString());
    $(actionSelect).attr('name', 'actions' + actionNumber.toString()).attr('id','actions'+actionNumber.toString());
    
    $(deviceSelect).append("<option disabled selected>Select a device</option>");
    $(actionSelect).append("<option disabled selected>Select an action</option>");
    
    $.each(devices, function(deviceId,device){
        $(deviceSelect).append("<option value='"+deviceId+"'>"+device.displayName+"</option>");
    });

    $(deviceSelect).change(function(){
        var selectionId = $(this).attr('id').replace('devices','');
        $('#actions'+selectionId).html("<option disabled selected>Select an action</option>");
        console.log(selectionId);
        var actions = devices[$(this).val()].functions;   
        
        $.each(actions, function(index, action) {
            $('#actions'+selectionId).append("<option value='"+index+"'>"+action.name+"</option>");
        });
    })
    
    $('#newRow').before(deviceSelect, actionSelect, " Delay (ms): <input type='number' name='delay"+actionNumber.toString()+"' min='0' max='10000' required value='0'><br>");
    
    actionNumber++;
    
}
