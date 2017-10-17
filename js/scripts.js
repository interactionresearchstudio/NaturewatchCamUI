var controllingMin = 1;
$(document).ready(function() {
    // Check if camera feed is available.
    $.get("http://localhost:9090/feed.mjpg")
        .done(function() {
            $("#feed").append('<img src="http://naturewatch-cam.local:9090/feed.mjpg">');
        }).fail(function() {
            $("#feed").append('<img src="assets/unavailable.jpg">');
        });

    $("#min-controls").hide();
    $("#max-controls").hide();

    $(".btn").click(function() {
        var dataDest = $(this).data('dest');
        console.log(dataDest);
        if(dataDest == "min") {
            $("#min-controls").show();
            $("#max-controls").hide();
            if(!controllingMin) {
                if(sendGetRequest("changeActiveSquare") == 1) controllingMin = 1;
            }
        }
        else if(dataDest == "max") {
            $("#min-controls").hide();
            $("#max-controls").show();
            if(controllingMin) {
                if(sendGetRequest("changeActiveSquare") == 1) controllingMin = 0;
            }
        }
        else if(dataDest == "start") {
            //if(sendGetRequest(dataDest)) {
                $(this).data('dest', "stop");
                $(this).addClass("btn-danger");
                $(this).removeClass("btn-success");
                $(this).text("Stop recording");
            //}
        }
        else if(dataDest == "stop") {
            //if(sendGetRequest(dataDest)) {
                $(this).data('dest', "start");
                $(this).addClass("btn-success");
                $(this).removeClass("btn-danger");
                $(this).text("Start recording");
            //}
        }
        else sendGetRequest(dataDest);
    });
});

function sendGetRequest(r) {
    $.get("http://naturewatch-cam.local:9090/")
        .done(function() {
            console.log("Sent get request to " + r);
            return 1;
        }).fail(function() {
            console.log("Failed to send get request.");
            return 0;
        });

}
