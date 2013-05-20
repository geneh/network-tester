$(function() {
    FastClick.attach(document.body);
});

$("#main-page").live("pageinit", function () {
    "use strict";
    $("#url-go-btn").on("click", function () {
        var urlStr = $("#url-input").val();
        if (urlStr === "") {
            $("#response-txt-1").text("URL should not be empty. Try again.");
            return false;
        }
        $.mobile.loadingMessageTextVisible = true;
        $.mobile.loadingMessage = "Requesting " + urlStr;
        $.mobile.showPageLoadingMsg();
        $("#response-txt-1").text("");
        $("#response-txt-2").text("");
        $.ajax({
            type: "GET",
            dataType: "text",
            url: urlStr,
            success: function (response) {
                $.mobile.hidePageLoadingMsg();
                $("#response-txt-1").text("Response length: " + response.length + " characters.");
                $("#response-txt-2").text("Response code: " + response);
            },
            timeout: 5000,
            cache: false,
            error: function (jqXHR, textStatus, errorThrown) {
                $.mobile.hidePageLoadingMsg();
                $("#response-txt-1").text("Status: " + textStatus);
                $("#response-txt-2").text("Error: " + errorThrown);
            }
        });
    });
});