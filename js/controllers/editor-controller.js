'use strict'

let gElCanvas
let gCtx
var editorIsShow = false
var gCurrImg

function renderEditor(id) {

    gCurrImg = getMemById(id)

    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    toggleMainSections()
    addListeners()
    // resizeCanvas()
    renderImg()

}

function renderImg() {

    const img = document.getElementById(`${gCurrImg.id}`)
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function toggleMainSections() {

    if (!editorIsShow) {
        var elGallery = document.querySelector('.main-gallery-section')
        elGallery.classList.add('hide')
        var elEditor = document.querySelector('.main-editor-section')
        elEditor.classList.remove('hide')
    } else {
        var elGallery = document.querySelector('.main-gallery-section')
        elGallery.classList.remove('hide')
        var elEditor = document.querySelector('.main-editor-section')
        elEditor.classList.add('hide')
    }
    editorIsShow = !editorIsShow
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()

    window.addEventListener('resize', () => {
        resizeCanvas()
        renderImg()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function  renderNewLine(text){

    var userPrefs = getUserPrefs()

    userPrefs.pos = createPosCenter()

    gCtx.lineWidth = 2
    gCtx.strokeStyle = userPrefs.strokeColor
    gCtx.fillStyle = userPrefs.textColor
  
    gCtx.font = `${userPrefs.fontSize}px ${userPrefs.fontFamily} `
    gCtx.fillText(text, userPrefs.pos.x, userPrefs.pos.y) 
    gCtx.strokeText(text, userPrefs.pos.x, userPrefs.pos.y)

    userPrefs.textLength = getLineLength(gCtx, text).width

    drawRect(userPrefs.pos.x, userPrefs.pos.y ,userPrefs.fontSize, userPrefs.textLength)
    setNewLine({userPrefs, text})
}

function onDown(ev) {
    console.log('down');
    const pos = getEvPos(ev)
    isLineClicked(pos)
    // if (!isLineClicked(pos)) return
    // setCircleDrag(true)
    // //Save the pos we start from 
    // gStartPos = pos
    // document.body.style.cursor = 'grabbing'
}

function onMove(ev) {

    // console.log('move')
}

function onUp(ev) {

}

function drawRect(x, y, fontSize, textLength) {
    

    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(x-(fontSize/2), y-fontSize, textLength+(fontSize), fontSize+(fontSize/2))

}

function onTextInput() {

    var text = document.getElementById("text-input").value
    renderNewLine(text)
}

function getEvPos(ev) {

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    return pos
}
