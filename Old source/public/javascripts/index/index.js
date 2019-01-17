var socket = io.connect();

socket.on('initialise', function(data) {
    //alert(JSON.stringify(data));
    //$.each(data.schedule, function(index, value){
    //    addScheduledItem(index, value);
    //});
    $(".content").html("<div class='item doubleWidth'><div class='item-name'>Schedule</div><div class='buttons'><a class='fullwidth'' href='/schedule/add'>Add an item to the schedule</a></div><div class='schedule-container'></div></div><section></section>");
    
    $.each(data.devices, function(index, value){
        addDevice(index, value);
    });
    $.each(data.schedule.sort(function(a,b) {return a.time > b.time}), function(index, value){
        addScheduledItem(index, value);
    });
});

socket.on('disconnect', function() {
    
});

function addDevice(deviceId, deviceData) {
    var item = document.createElement('div');
    item.className = "item";
    $(item).attr("id", deviceId);
    var item_name = document.createElement('div');
    item_name.className = "item-name";
    item_name.innerHTML = deviceData.displayName;
    var buttons = document.createElement('div');
    buttons.className = "buttons";
    $.each(deviceData.functions, function(index, funct) {
        var button = document.createElement('a');
        $(button).attr("id", index).text(funct.name).click(function() {
            sendAction($(this));
        });
        $(buttons).append(button);
    });

    $(item).append(item_name, buttons);
    
    $("section").append(item);
}

function addScheduledItem(itemId, item) {
    var container = document.createElement('div');
    $(container).addClass('schedule-item');
    $(container).append("<span class='time'>"+item.time+"</span>");
    $(container).append("<span class='schedule-text'>"+item.name+"</span>");
    var deleteButton = document.createElement('a');
    $(deleteButton).html("Delete").click(function(){
        deleteScheduledItem($(this));
    })
    $(container).append(deleteButton);
    
    $(".schedule-container").append(container);
}

function deleteScheduledItem(item)
{
    var message = {
        time: $(item).siblings(".time").html(),
        name: $(item).siblings(".schedule-text").html()
    };
    socket.emit("deleteSchedule", message);
    console.log($(item).parent().parent().attr("id") + $(item).attr("id"))
}

function sendAction(item)
{
    var message = {
        device: $(item).parent().parent().attr("id"),
        functionId: $(item).attr("id")
    };
    socket.emit("action", message);
    console.log($(item).parent().parent().attr("id") + $(item).attr("id"))
}