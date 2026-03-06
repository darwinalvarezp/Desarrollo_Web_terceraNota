const btn = document.getElementById("themeBtn");

btn.addEventListener("click",()=>{
    document.body.classList.toggle("dark")

    if(document.body.classList.contains("dark")){
        btn.textContent = "Modo Claro"
    }else{
        btn.textContent = "Modo Oscuro"
    }
}
)