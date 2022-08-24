$(document).ready(function() {
    // alert("essa msg foi disparada pelo jquery")
    $("#idicone-menu").click(mostarMenu)
    
})

// if ($("#links").hasClass("menu-ativo")){
//     $("#links").removeClass("menu-ativo")

// }else{
//     $("#links").addClass("menu-ativo")

// }
// alert("teste2")




function mostarMenu(){
    let menu= document.getElementById("icone-menu2")
    
    let links= document.getElementById("links")


    
    if(links.style.display == "none"){
        
        links.style.display ="flex"

    }else{
        links.style.display = "none"
    }

} 


