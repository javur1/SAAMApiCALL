let datosConsulta = {
    "idFlujo": null,
    "Status": null,
    "selected":null
};
let hideButtons = false;
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
    
    if (tmpParams.length > 1) {
        parametros = PAGE_URL.split("?")[1].split("&");
        parametros.forEach(element => {
            const llave = element.split("=")[0];
            const valor = element.split("=")[1];
            datosConsulta[llave] = valor
        });
        
    }
    console.log("URL", PAGE_URL, "parametros", parametros); 
}

 
   
$( ()=> {
    procesarParametrosURL();
    $.ajax({
        method: 'GET',
        url: 'https://megafysadev.appiancloud.com/suite/webapi/checkFlujoEstado?idFlujo='+datosConsulta["idFlujo"],
        contentType: 'application/json',
        headers: {'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1MWY0Mjk2Ni00NDMzLTI0YmItMDIzOS1mMTQ2ZGU5NGRlYWEifQ.lbT1VE3ktt5qBSg-kLTXBQt0h9uzJtwGsNfZOJhZ6Vg'},
        success: (data) => {
            let fechaCambio = data[0].fechaCambio;
            /*extrayendo componentes de fecha*/
            let year = fechaCambio.getUTCFullYear();
            let month = fechaCambio.toLocaleString('es-ES', { month: 'long' });
            let day = fechaCambio.getUTCDate();
            let hours = fechaCambio.getUTCHours().toString().padStart(2, '0');
            let minutes = fechaCambio.getUTCMinutes().toString().padStart(2, '0');
            let seconds = fechaCambio.getUTCSeconds().toString().padStart(2, '0');

            let etapasTotales = data[0].idEstado.idDocumento.etapasTotales;
            let etapaActual = data[0].idEstado.etapa;
            let nombreEstado = data[0].idEstado.nombre;
            console.log("Datos enviados a 3ro con exito", data,nombreEstado);
            hideButtons = datosConsulta["Status"] != etapaActual || etapaActual==etapasTotales;
            if(datosConsulta["selected"]== "A") {
                $("#rjt").hide();
            } else if (datosConsulta["selected"]== "R") {
                $("#apr").hide();
            } else {
                $("#rjt").hide();
                $("#apr").hide();
            }
            if( hideButtons) $("#evaluateFlujo").hide();

            $("#commentDone").html(
                "Status URL: "+datosConsulta["Status"]+" <br>"+
                "ETAPA ACTUAL: "+etapaActual+ " "+" <br>"+
                "ETAPAS TOTALES: "+etapasTotales+" "+" <br>"+
                "El flujo quedó "+nombreEstado+" al "+" " + day + " de " + month + " de " + year + " a las " + hours + ":" + minutes + ":" + seconds
            );
        },
    }).done(function () {
        console.log("Envio de datos a 3ro completado")
    }).fail(function (data) {
        console.log('llamar a Url Callback fail', data)
    })
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
        function(){
            $(".comment").submit(
                function(e) {
                    var value = $(".commentBox").val();
                    e.preventDefault();
                }
            );
        }
    )
}
    
)

