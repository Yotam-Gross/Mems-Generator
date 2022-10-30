'use strict'

let gElCanvas
let gCtx
var editorIsShow = false
var gCurrImg
var gStartPos

function renderEditor(id) {

    gCurrImg = getMemById(id)

    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    onMem()
    renderStickers()
    addListeners()
    renderImg()

}

function renderStickers(){

    var stickers = getStickers()

    var strHTML = stickers.map(sticker =>
        `<i onclick="renderNewLine('${sticker}')">${sticker}</i>`)

    var elStickerContainer = document.querySelector('.stickers-gallery')
    elStickerContainer.innerHTML = strHTML.join('')
}

function renderImg() {

    const img = document.getElementById(`${gCurrImg.id}`)
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onMem() {

        var elGallery = document.querySelector('.main-gallery-section')
        elGallery.classList.add('hide')
        var elEditor = document.querySelector('.main-editor-section')
        elEditor.classList.remove('hide')

}

function addListeners() {
    addMouseListeners()

    var input = document.querySelector(".line-input")
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          onTextInput()
        }
      })

    window.addEventListener('resize', () => {
        renderImg()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function renderNewLine(text) {

    const userPrefs = Object.assign({}, getUserPrefs())

    userPrefs.pos = createPosCenter()

    gCtx.lineWidth = 2
    gCtx.strokeStyle = userPrefs.strokeColor
    gCtx.fillStyle = userPrefs.textColor

    gCtx.font = `${userPrefs.fontSize}px ${userPrefs.fontFamily} `
    gCtx.fillText(text, userPrefs.pos.x, userPrefs.pos.y)
    gCtx.strokeText(text, userPrefs.pos.x, userPrefs.pos.y)

    userPrefs.textLength = getLineLength(gCtx, text).width

    // drawRect(userPrefs.pos.x, userPrefs.pos.y, userPrefs.fontSize, userPrefs.textLength)
    setNewLine({ userPrefs, text })
}

function renderLines(isLineClicked) {
   
    var lines = getLines()

    lines.forEach(line => {
    var userPrefs = {}
    userPrefs = line.userPrefs

    gCtx.lineWidth = 2
    gCtx.strokeStyle = userPrefs.strokeColor
    gCtx.fillStyle = userPrefs.textColor

    gCtx.font = `${userPrefs.fontSize}px ${userPrefs.fontFamily} `
    gCtx.fillText(line.text, userPrefs.pos.x, userPrefs.pos.y)
    gCtx.strokeText(line.text, userPrefs.pos.x, userPrefs.pos.y)

    userPrefs.textLength = getLineLength(gCtx, line.text).width
})
if (isLineClicked)drawRect()
}

function onAlignText(val) {
    setAlignText(val)
    renderImg()
    renderLines()
}

function onSelectTextColor() {
    const selectedColor = document.querySelector('.text-color-pref').value
    setSelectedColor(selectedColor)
    renderImg()
    renderLines()
}

function onSelectStrokeColor() {
    const selectedColor = document.querySelector('.stroke-color-pref').value
    setSelectedStrokeColor(selectedColor)
    renderImg()
    renderLines()
}

function onSelectFontFamily() {

    var newFont = document.querySelector('.font-family-pref').value
    setFontFamily(newFont)
    renderImg()
    renderLines()
}

function onFontSize(val) {
    setNewFontSize(val)
    renderImg()
    renderLines()
}

function onDown(ev) {
    console.log('down');
    const pos = getEvPos(ev)
    
    renderImg()
    if (!isLineClicked(pos)) return renderLines(false)
    renderLines(true)
    

    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {

    const { isDrag } = getDragLine().userPrefs
    if (!isDrag) return
    const pos = getEvPos(ev)

    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    gStartPos = pos
    renderImg()
    renderLines(true)

}

function onUp(ev) {

    setLineDrag(false)
    document.body.style.cursor = 'auto'
}

function drawRect() {

    var selctedLine = getLines().find(line => line.userPrefs.isSelect === true)
    if(!selctedLine) return
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(selctedLine.userPrefs.pos.x - (selctedLine.userPrefs.fontSize / 2),
    selctedLine.userPrefs.pos.y - selctedLine.userPrefs.fontSize,
    selctedLine.userPrefs.textLength + (selctedLine.userPrefs.fontSize),
    selctedLine.userPrefs.fontSize + (selctedLine.userPrefs.fontSize / 2))

}

function onTextInput() {

    var text = document.getElementById("text-input").value
    document.getElementById("text-input").value = ''
    renderNewLine(text)
}

function getEvPos(ev) {

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    return pos
}

function onBackToGallery() {
    var elGallery = document.querySelector('.main-gallery-section')
    elGallery.classList.remove('hide')
    var elHeader = document.querySelector('header')
    elHeader.classList.remove('hide')
    var elFooter = document.querySelector('footer')
    elFooter.classList.remove('hide') 
    var elFooterBuffer = document.querySelector('.footer-buffer')
    elFooterBuffer.classList.remove('hide')
    var elEditor = document.querySelector('.main-editor-section')
    elEditor.classList.add('hide')
    var elEditor = document.querySelector('.hero-image')
    elEditor.classList.add('remove')

    cleanUserSetion()
    document.getElementById("text-input").value = ''
}

function onDeleteLine(){
    deleteLine()
    renderImg()
    renderLines()
    console.log('deleting')
}

function downloadImg(elLink){
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function getSavedGallery() {
    return gSavedMems
}