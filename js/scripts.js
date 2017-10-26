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
        var thisButton = $(this);
        console.log(dataDest);
        if(dataDest == "min") {
            $("#min-controls").show();
            $("#max-controls").hide();
            if(!controllingMin) {
                $.get("python/" + dataDest)
                    .done(function() {
                        console.log("Changed min/max");
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
                        console.log("Changed min/max.");
                        controllingMin = 0;
                    }).fail(function() {
                        console.log("Failed to change min/max.");
                    });
            }
        }
        else if(dataDest == "start") {
            $.ajax({
                url: "python/" + dataDest,
                error: function() {
                    console.log("Failed to start capture.");
                },
                success: function() {
                    console.log("Started capture");
                    thisButton.data('dest', "stop");
                    thisButton.addClass("btn-danger");
                    thisButton.removeClass("btn-success");
                    thisButton.text("Stop recording");
                },
                timeout: 1000
            });
        }
        else if(dataDest == "stop") {
            $.ajax({
                url: "python/" + dataDest,
                error: function() {
                    console.log("Failed to start capture.");
                },
                success: function() {
                    console.log("Stopped capture");
                    thisButton.data('dest', "start");
                    thisButton.addClass("btn-success");
                    thisButton.removeClass("btn-danger");
                    thisButton.text("Start recording");
                },
                timeout: 1000
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
