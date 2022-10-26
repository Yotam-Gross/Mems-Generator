'use strict'


var gLines = []

var userPrefs = {
    textColor: '#000',
    strokeColor: '#FFAEBC',
    fontFamily: 'Arial',
    fontSize: 40,
    isDrag: false
}

function createPosCenter(){
    var pos = {}

        pos.x = 100
        pos.y = 200
    
    return pos
}

function getUserPrefs(){
    return userPrefs
}

function setNewLine({userPrefs, text}){

    gLines.push({userPrefs, text})
}

function isLineClicked(clickedPos){

   var { pos, textLength, fontSize } = gLines[0].userPrefs

   if(pos.x < clickedPos.x &&
      clickedPos.x < pos.x+textLength &&
      pos.y > clickedPos.y &&
      clickedPos.y > pos.y-fontSize ){
        gLines[0].userPrefs.isDrag = true
        return true
      } 
      else return false


}

function getLineLength(ctx, text) {
    return ctx.measureText(text)
}

