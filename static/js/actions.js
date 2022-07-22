function ajaxGet() {
    $.ajax({
        type: "GET",
        url: "/get/info",
        success: function (result) {
            console.log(result)
            return result
        }
    });
    
}

function my_func() {
    console.log("TEST PASSED");
};


