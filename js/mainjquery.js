$(document).ready(function(){
    $("#login form").submit(function(){
        var form_name = $("#form_name").val()
        
        localStorage.setItem("form_name", form_name)
    })

    var form_name = localStorage.getItem("form_name")
    if(form_name != null && form_name != "undefined"){
        var about_parrafo = $("#about p")
        $('.welcome').html("<span> Welcome </span>")
        $("#about p").html("<strong>"+ " " + form_name + "</strong>")
        about_parrafo.append("<br> <a href='#' id='logout'> Cerrar sesion </a>")
        $("#login").hide()

        $("#logout").click(function(){
            localStorage.clear()
            location.reload()
        })
    }

    
        setInterval(function(){
            var reloj = moment().format("h:mm:ss A")
            $(".reloj").html(reloj)
        },1000)
        

})