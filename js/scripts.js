var controllingMin = 1;
$(document).ready(function() {

    // Check if camera feed is available.
    $.get("python/feed.mjpg")
        .done(function() {
            console.log("Camera feed is available.");
        }).fail(function() {
            $("#feed").empty();
            $("#feed").append('<img src="assets/unavailable.jpg">');
        });

    // Hide max / min controls
    $("#min-controls").hide();
    $("#max-controls").hide();

    // Button events
    $(".btn").click(function() {
        var dataDest = $(this).data('dest');
        console.log(dataDest);
        if(dataDest == "min") {
            $("#min-controls").show();
            $("#max-controls").hide();
            if(!controllingMin) {
                $.get("python/" + r)
                    .done(function() {
                        controllingMin = 1;
                    }).fail(function() {
                        console.log("Failed to change min/max.");
                    });
            }
        }
        else if(dataDest == "max") {
            $("#min-controls").hide();
            $("#max-controls").show();
            if(controllingMin) {
                $.get("python/" + dataDest)
                    .done(function() {
                        controllingMin = 0;
                    }).fail(function() {
                        console.log("Failed to change min/max.");
                    });
            }
        }
        else if(dataDest == "start") {
            $.get("python/" + dataDest)
                .done(function() {
                    $(this).data('dest', "stop");
                    $(this).addClass("btn-danger");
                    $(this).removeClass("btn-success");
                    $(this).text("Stop recording");
                }).fail(function() {
                    console.log("Failed to start capture.");
                });
        }
        else if(dataDest == "stop") {
            $.get("python/" + dataDest)
                .done(function() {
                    $(this).data('dest', "start");
                    $(this).addClass("btn-success");
                    $(this).removeClass("btn-danger");
                    $(this).text("Start recording");
                }).fail(function() {
                    console.log("Failed to stop capture.");
                });
        }
        else sendGetRequest(dataDest);
    });
});

function sendGetRequest(r) {
    $.get("python/" + r)
        .done(function() {
            console.log("Sent get request to " + r);
            return true;
        }).fail(function() {
            console.log("Failed to send get request.");
            return false;
        });

}
