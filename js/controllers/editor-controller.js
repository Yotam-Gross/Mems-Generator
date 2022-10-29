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
    addListeners()
    renderImg()

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

function renderLines() {
   
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

    // drawRect(userPrefs.pos.x, userPrefs.pos.y, userPrefs.fontSize, userPrefs.textLength)
})
}

function onSelectTextColor() {
    const selectedColor = document.querySelector('.text-color-pref').value
    setSelectedColor(selectedColor)
}

function onSelectFontFamily() {

    var newFont = document.querySelector('.font-family-pref').value
    setFontFamily(newFont)
}

function onFontSize(val) {
    setNewFontSize(val)
}

function onDown(ev) {
    console.log('down');
    const pos = getEvPos(ev)

    if (!isLineClicked(pos)) return
    

    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {

    const { isDrag } = getSelectedLine().userPrefs
    console.log(isDrag)
    if (!isDrag) return
    const pos = getEvPos(ev)

    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    gStartPos = pos
    renderImg()
    renderLines()

}

function moveLine(dx, dy) {
    var line = getSelectedLine().userPrefs
    line.pos.x += dx
    line.pos.y += dy
}

function onUp(ev) {

    setLineDrag(false)
    document.body.style.cursor = 'auto'
}

function drawRect(x, y, fontSize, textLength) {

    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(x - (fontSize / 2), y - fontSize, textLength + (fontSize), fontSize + (fontSize / 2))

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

function onBackToGallery() {
    var elGallery = document.querySelector('.main-gallery-section')
    elGallery.classList.remove('hide')
    var elEditor = document.querySelector('.main-editor-section')
    elEditor.classList.add('hide')
}