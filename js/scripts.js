var controllingMin = 1;
$(document).ready(function() {

    // Hide controls
    $("#sensitivity-controls").hide();
    $("#delete-confirm").hide();
    $("#delete-confirm2").hide();

    getCameraStatus();

    // Button events
    $(".btn").click(function() {
        var dataDest = $(this).data('dest');
        var thisButton = $(this);
        console.log(dataDest);
        if (dataDest == "sensitivity") {
            $("#sensitivity-controls").slideDown(100);
        }
        else if (dataDest == "less" || dataDest == "more" || dataDest == "default") {
            $.ajax({
                url: "python/" + dataDest,
                error: function() {
                    console.log("Failed to change sensitivity.");
                },
                success: function() {
                    console.log("Changed sensitivity.");
                    $("#sensitivity-controls .active").removeClass("active");
                }
            })
            $("#sensitivity-controls .active").removeClass("active");
        }
        else if (dataDest == "start") {
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
        else if (dataDest == "stop") {
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
        else if (dataDest == "delete") {
            $("#delete-confirm").slideDown(100);
        }
        else if (dataDest == "delete-yes") {
            $("#delete-confirm2").slideDown(100);
        }
        else if (dataDest == "delete-no") {
            $("#delete-confirm").slideUp(100);
            $("#delete-confirm2").slideUp(100);
        }
        else if (dataDest == "delete-final") {
            $.ajax({
                url: "python/" + dataDest,
                error: function() {
                    console.log("Failed to delete photos.");
                },
                success: function() {
                    console.log("Deleted photos.");
                    location.reload(true);
                },
                timeout:1000
            });
        }
        else sendGetRequest(dataDest);
    });
});

function getCameraStatus() {
    $.getJSON("python/get-status", function(data) {
        console.log("Mode: " + data.mode);
        console.log("Sensitivity: " + data.sensitivity);
        if (data.mode == 1) {
            $("#start-stop").data('dest', "stop");
            $("#start-stop").addClass("btn-danger");
            $("#start-stop").removeClass("btn-success");
            $("#start-stop").text("Stop recording");
        }
        if (data.sensitivity == "less") {
            $("#default").removeClass("active");
            $("#less").addClass("active");
        }
        else if (data.sensitivity == "more") {
            $("#default").removeClass("active");
            $("#more").addClass("active");
        }
    });
}

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
