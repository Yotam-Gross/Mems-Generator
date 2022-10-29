

function onInit(){
    
    renderGallery() 

}

function renderGallery(){

    const gallery = getGallery()

    var strHTML = gallery.map(mems => 
        `<img class="img-gallery" id="${mems.id}" src="/imgs/${mems.url}"
         onclick="renderEditor('${mems.id}')">`
    )

    var elGallery = document.querySelector('.mems-gallery')
    elGallery.innerHTML = strHTML.join('')
}

