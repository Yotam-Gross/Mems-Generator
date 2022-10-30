'use strict'



function onInit(){
    
    renderGallery() 
    renderKeyWords()
}

function renderGallery(){

    const gallery = getGallery()

    var strHTML = gallery.map(mems => 
        `<img class="img-gallery" id="${mems.id}" src="./imgs/${mems.url}"
         onclick="renderEditor('${mems.id}')">`
    )

    var elGallery = document.querySelector('.mems-gallery')
    elGallery.innerHTML = strHTML.join('')
}

function renderSavedMems() {
    const gallery = getSavedGallery()
    
    var strHTML = gallery.map(mem => 
        `<img class="img-gallery"  src="${mem}")">`
    )

    var elGallery = document.querySelector('.saved-mems-gallery')
    elGallery.innerHTML = strHTML.join('')
    
}

function renderKeyWords(){

    const keyWords = getKeyWords()

    var strHTML = keyWords.map(word =>
        `<li style="font-size:${word.size}px;)" class"keyword-${word.kWord}" onclick="onKeyWord('${word.kWord}')" class"keyword-${word.kWord}">${word.kWord}</li>`)

    var elKeyWords = document.querySelector('.keywords-search-list')    
    elKeyWords.innerHTML = strHTML.join('')
}

function serachMemInGallery(){
    const searchText = document.querySelector('.search-input').value
    setSearchParam(searchText)
    renderGallery()
}

function onKeyWord(word){

    document.querySelector('.search-input').value = word
    increaseKeyWord(word)
    setSearchParam(word)
    renderGallery()
    renderKeyWords()
}

function onSavedMems() {
    var elGallery = document.querySelector('.main-gallery-section')
    elGallery.classList.add('hide')
    var elEditor = document.querySelector('.main-editor-section')
    elEditor.classList.add('hide')

    renderSavedMems()
}

function showHero() {
    var elGallery = document.querySelector('.main-gallery-section')
    elGallery.classList.add('hide')
    var elEditor = document.querySelector('.main-editor-section')
    elEditor.classList.add('hide')
    var elHeader = document.querySelector('header')
    elHeader.classList.add('hide')
    var elFooter = document.querySelector('footer')
    elFooter.classList.add('hide')
    var elFooterBuffer = document.querySelector('.footer-buffer')
    elFooterBuffer.classList.add('hide')
    var elHero = document.querySelector('.hero-image')
    elHero.classList.remove('remove')
}
