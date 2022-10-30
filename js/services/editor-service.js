'use strict'

var gStickers = ['🧠','👄','💋','😕','🥰',
                    '🙂','👿','🎃','🙌','💩',
                    '👻','😂','🥳','💍','👑',
                    '💼','🎩','👕','👼','🥷',]
var gLines = []
var gUserPrefs = {
    textColor: 'white',
    strokeColor: 'black',
    fontFamily: 'impact',
    fontSize: 60,
    isDrag: false,
    isSelect: false,
}

var gSavedMems = []

function createPosCenter() {
    var pos = {}
    pos.x = 200
    pos.y = 200

    return pos
}

function getStickers(){
    return gStickers
}

function getUserPrefs() {
    return gUserPrefs
}

function setNewLine({ userPrefs, text }) {

    gLines.push({ userPrefs, text })
}

function isLineClicked(clickedPos) {

    for (let i = 0; i < gLines.length; i++){
        var { pos, textLength, fontSize } = gLines[i].userPrefs
        if (pos.x < clickedPos.x &&
            clickedPos.x < pos.x + textLength &&
            pos.y > clickedPos.y &&
            clickedPos.y > pos.y - fontSize) {
                setLineSelected(true, i)
                setLineDrag(true, i)
                drawRect(i)
                return true    
            } 
        }
}

function setLineDrag(isDrag, i) {
    if(!isDrag) {
        const line = gLines.find(pref => pref.userPrefs.isDrag === true)
        line.userPrefs.isDrag = false
        
    }
    else{

        gLines[i].userPrefs.isDrag = isDrag
    }
}

function getLineLength(ctx, text) {
    return ctx.measureText(text)
}

function getDragLine() {
   const dragLine = gLines.find(line => line.userPrefs.isDrag === true)
    return dragLine
}

function moveLine(dx, dy) {
    var line = getDragLine().userPrefs
    line.pos.x += dx
    line.pos.y += dy
}

function getSelectedLine(){
    const selectedLine = gLines.find(line => line.userPrefs.isSelect === true)
    return selectedLine
}

function setSelectedColor(color) {
    var i = gLines.findIndex(line => line.userPrefs.isSelect === true)
    if(i !== -1) gLines[i].userPrefs.textColor = color
    
    return gUserPrefs.textColor = color
    
}

function setSelectedStrokeColor(color) {
    var i = gLines.findIndex(line => line.userPrefs.isSelect === true)
    if(i !== -1) gLines[i].userPrefs.strokeColor = color
    
    return gUserPrefs.strokeColor = color
    
}

function setFontFamily(newFontFamily) {

    var i = gLines.findIndex(line => line.userPrefs.isSelect === true)
    if(i !== -1) gLines[i].userPrefs.fontFamily = newFontFamily
    
    return gUserPrefs.fontFamily = newFontFamily
}

function setNewFontSize(val) {
    var i = gLines.findIndex(line => line.userPrefs.isSelect === true)
    if(i !== -1) gLines[i].userPrefs.fontSize += val
    
    return gUserPrefs.fontSize += val
    
}

function setAlignText(val){
    var i = gLines.findIndex(line => line.userPrefs.isSelect === true)
    if(i !== -1) gLines[i].userPrefs.pos.x = val
}

function setLineSelected(isSelect, i) {
    gLines.forEach(line => {
        line.userPrefs.isSelect = false
    })
    gLines[i].userPrefs.isSelect = isSelect
  
}

function getLines(){
    return gLines
}

function cleanUserSetion(){
    gLines = []
    gUserPrefs = {
        textColor: 'white',
        strokeColor: 'black',
        fontFamily: 'impact',
        fontSize: 60,
        isDrag: false,
        isSelect: false,
    }    
}

function deleteLine(){
    var i = gLines.findIndex(line => line.userPrefs.isSelect === true)
    gLines.splice(i, 1)
    console.log('delet', i)
}

function setMemSaved(url){
    gSavedMems.push(url)
}