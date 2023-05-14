const d =document,
    $textArea=d.querySelector(".box-texto"),
    $formulario=d.querySelector(".box-encriptar"),
    $btnEnc=d.querySelector(".btn-enc"),
    $btnDec=d.querySelector(".btn-dec"),
    $boxResultado=d.querySelector(".box-resultado"),
    $btnCopiar=d.createElement("button"),
    $parrafo=d.createElement("p");

function validar(){
    const regex=new RegExp(/^[a-z\s]*$/gm),
        patronVacio=new RegExp(/^\s*$/gm);
    if((regex.test($textArea.value)) && (!patronVacio.test($textArea.value))){
        return true;
    }else{
        alert("Verifica los datos ingresados y recuerda que solo pueden ser letras minusculas y sin acentos");
        $textArea.select();
    }
};

function encriptar(){
    let msgEnc=$textArea.value;
    const caracteres={
        'e':"enter",
        'i':"imes",
        'a':"ai",
        'o':"ober",
        'u':"ufat"
    }
    msgEnc= msgEnc.replace(/[aeiou]/g,l=>caracteres[l]);
    return msgEnc;
};

function desencriptar(){
    let msgEnc=$textArea.value;
    const caracteres={
        'enter':'e',
        'imes':'i',
        'ai':'a',
        'ober':'o',
        'ufat':'u'
    }
    msgEnc= msgEnc.replace(/(enter)|(imes)|(ai)|(ober)|(ufat)/g,frase=>caracteres[frase]);
    return msgEnc;
};

function mostrarResultado(res){
    $boxResultado.innerHTML="";
    let $fragmento=d.createDocumentFragment();

    $parrafo.textContent=res;
    $parrafo.maxWidth="300px";
    $parrafo.style.fontSize="2rem";
    $parrafo.style.color="gray";
    $parrafo.style.paddingTop="1rem";
    $parrafo.style.textAlign="justify";
    $parrafo.style.width="100%";
    $parrafo.style.wordBreak="break-word";

    $btnCopiar.textContent="Copiar";
    $btnCopiar.classList.add("btn");
    $btnCopiar.style.backgroundColor="var(--main-bg-color)";
    $boxResultado.style.display="flex";
    $boxResultado.style.flexDirection="column";
    $boxResultado.style.justifyContent="space-between";
    $boxResultado.style.gap="30px";

    $boxResultado.style.alignItems="center";
    $boxResultado.style.textAlign="center";
    
    $fragmento.appendChild($parrafo);
    $fragmento.appendChild($btnCopiar);
    $boxResultado.appendChild($fragmento);
}

$btnEnc.addEventListener("click",e=>{
    if(validar()){
        let resultado=encriptar();
        mostrarResultado(resultado);
    };
});

$btnDec.addEventListener("click",e=>{
    if(validar()){
        let resultado=desencriptar();
        mostrarResultado(resultado);
    };
});

$btnCopiar.addEventListener("click", async e=>{
    navigator.permissions.query({name: "clipboard-write"}).then(async (result) => {
        if (result.state === "granted" || result.state === "prompt") {
            await navigator.clipboard.writeText($parrafo.textContent)
            .then(()=>{
                console.log("Texto copiado");
                $textArea.select()
            })
            .catch((err)=>console.log(`Error ${err} al copiar el texto `));
        }
      });
})