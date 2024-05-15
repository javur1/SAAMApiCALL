let datosConsulta = {
    "idFlujo": null,
    "Status": null
};
function procesarParametrosURL() {
    /*
    const urlParams = new URLSearchParams(window.location.search);
    $("#param-rut").html(urlParams.get("rut"));
    $("#param-idSolicitud").html(urlParams.get("idSolicitud"));
    $("#param-callbackURL").html(urlParams.get("callbackURL"));
    */
    const PAGE_URL = location.href;
    const tmpParams = PAGE_URL.split("?");
    let parametros;
    console.log("URL", PAGE_URL, "parametros", parametros);
    if (tmpParams.length > 1) {
        parametros = PAGE_URL.split("?")[1].split("&");
        parametros.forEach(element => {
            const llave = element.split("=")[0];
            const valor = element.split("=")[1];
            datosConsulta[llave] = valor
        });
    } 
}
$(
    function(){
        $(".comment").submit(
            function(e) {
                var value = $(".commentBox").val();
                $(".commentDone").text(value);
                e.preventDefault();
            }
        );
    }
)
 
$(".APICALLReject").on(
    "click",function(){
        var value = $(".commentBox").val();
        $.ajax({
            method: 'POST',
            url: 'https://megafysadev.appiancloud.com/suite/webapi/cambiarEstado',
            contentType: 'application/json',
            data: JSON.stringify(
                {
                    "idFlujo":datosConsulta["idFlujo"],
                    "observacion": value,
                    "respuesta": "Rechazado"
                }
            ),
            headers: {'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1MWY0Mjk2Ni00NDMzLTI0YmItMDIzOS1mMTQ2ZGU5NGRlYWEifQ.lbT1VE3ktt5qBSg-kLTXBQt0h9uzJtwGsNfZOJhZ6Vg'},
            success: (data) => {
                console.log("Datos enviados a 3ro con exito", data);
            },
        }).done(function () {
            console.log("Envio de datos a 3ro completado")
        }).fail(function (data) {
            console.log('llamar a Url Callback fail', data)
        });

    }
)
$(".APICALLAprove").on(
    "click",function(){
        $.ajax({
            method: 'POST',
            url: 'https://megafysadev.appiancloud.com/suite/webapi/cambiarEstado',
            contentType: 'application/json',
            data: JSON.stringify(
                {
                    "idFlujo":datosConsulta["idFlujo"],
                    "observacion": null,
                    "respuesta": "Aprobado"
                }
            ),
            headers: {'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1MWY0Mjk2Ni00NDMzLTI0YmItMDIzOS1mMTQ2ZGU5NGRlYWEifQ.lbT1VE3ktt5qBSg-kLTXBQt0h9uzJtwGsNfZOJhZ6Vg'},
            success: (data) => {
                console.log("Datos enviados a 3ro con exito", data);
            },
        }).done(function () {
            console.log("Envio de datos a 3ro completado")
        }).fail(function (data) {
            console.log('llamar a Url Callback fail', data)
        });

    }
)    
$(
    $.ajax({
        method: 'GET',
        url: 'https://megafysadev.appiancloud.com/suite/webapi/checkFlujoEstado?idFlujo='+datosConsulta["idFlujo"],
        contentType: 'application/json',
        headers: {'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1MWY0Mjk2Ni00NDMzLTI0YmItMDIzOS1mMTQ2ZGU5NGRlYWEifQ.lbT1VE3ktt5qBSg-kLTXBQt0h9uzJtwGsNfZOJhZ6Vg'},
        success: (data) => {
            console.log("Datos enviados a 3ro con exito", data);
            $("#commentDone").html(
                data[0].idEstado.nombre
            );
        },
    }).done(function () {
        console.log("Envio de datos a 3ro completado")
    }).fail(function (data) {
        console.log('llamar a Url Callback fail', data)
    })
)

