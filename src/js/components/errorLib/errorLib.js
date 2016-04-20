
console.log("library installed");

function sendError ( sendObj ) {

    $.post ({
        type: 'POST',
        url: 'http://localhost:3000/api/error',
        // dataType: 'json',
        data: { error: sendObj }

    });

}


function errorLog ( title, msg, freeFormData) {
    errorLogPrimitive('user',title, freeFormData ); 

};

function errorLogPrimitive ( type, msg, freeFormData) {
    var errorObj = {};

    errorObj.title = "deprecated";
    errorObj.type = type;
    errorObj.freeFormData = freeFormData;
    errorObj.msg = msg;

    console.log("this is it");
    console.log(errorObj);

    try {
        throw new Error();
    }
        catch (e) {
        errorObj.stack = e.stack;

    }

    sendError (errorObj);

}




function initErrorLog () {
    window.onerror = function ( errorMsg ) {

        errorLogPrimitive('app',errorMsg,'freeFormData');
        
    }
}
