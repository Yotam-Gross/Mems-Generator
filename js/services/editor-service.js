'use strict'


var gLines = []
var gUserPrefs = {
    textColor: '#000',
    strokeColor: '#FFAEBC',
    fontFamily: 'impact',
    fontSize: 40,
    isDrag: false,
    isSelect: false,
}

function createPosCenter() {
    var pos = {}
    pos.x = 100
    pos.y = 200

    return pos
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
                console.log('line clicked')
                return true    
            } 
        }
}

function setLineDrag(isDrag, i) {
    if(!isDrag) {
        const line = gLines.find(pref => pref.userPrefs.isDrag === true)
        line.userPrefs.isDrag = false
        console.log(line, line.userPrefs.isDrag)
        
    }
    else{

        gLines[i].userPrefs.isDrag = isDrag
    }
}

function getLineLength(ctx, text) {
    return ctx.measureText(text)
}

function getSelectedLine() {
   const selectedLine = gLines.find(line => line.userPrefs.isDrag === true)
    return selectedLine
}

function setSelectedColor(color) {
    gUserPrefs.textColor = color
}

function setFontFamily(newFontFamily) {
    gUserPrefs.fontFamily = newFontFamily
}

function setNewFontSize(val) {
    gUserPrefs.fontSize += val
}

function setLineSelected(isSelect, i) {
    gLines.forEach(line => {
        line.userPrefs.isSelect = false
    })
    gLines[i].userPrefs.isSelect = isSelect
    gUserPrefs.isSelect = false
}

function getLines(){
    return gLines
}

function cleanUserSetion(){
    gLines = []
    gUserPrefs = {
        textColor: '#000',
        strokeColor: '#FFAEBC',
        fontFamily: 'impact',
        fontSize: 40,
        isDrag: false,
        isSelect: false,
    }    
}
