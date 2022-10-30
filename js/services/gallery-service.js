'use strict'

var gSearchParam = ''
var gKeyWords = [{ kWord: 'funny', size: 40 },
{ kWord: 'animal', size: 16 },
{ kWord: 'politics', size: 16 },
{ kWord: 'obama', size: 16 }]

var gMems = [
    { id: makeId(), url: '1.jpg', keywords: ['funny', 'animal'], },
    { id: makeId(), url: '2.jpg', keywords: ['animal'], },
    { id: makeId(), url: '3.jpg', keywords: ['funny', 'animal'], },
    { id: makeId(), url: '4.jpg', keywords: ['animal'], },
    { id: makeId(), url: '5.jpg', keywords: ['politics'], },
    { id: makeId(), url: '6.jpg', keywords: ['funny'], },
    { id: makeId(), url: '7.jpg', keywords: ['funny'], },
    { id: makeId(), url: '8.jpg', keywords: ['politics'], },
    { id: makeId(), url: '9.jpg', keywords: ['obama'], },
    { id: makeId(), url: '10.jpg', keywords: ['funny'], },
    { id: makeId(), url: '11.jpg', keywords: ['politics'], },
    { id: makeId(), url: '12.jpg', keywords: ['funny'], },
    { id: makeId(), url: '13.jpg', keywords: ['funny'], },
    { id: makeId(), url: '14.jpg', keywords: ['politics'], },
    { id: makeId(), url: '15.jpg', keywords: ['funny'], },
    { id: makeId(), url: '16.jpg', keywords: ['funny'], },
    { id: makeId(), url: '17.jpg', keywords: ['obama'], },
    { id: makeId(), url: '18.jpg', keywords: ['obama'], },

]


function getGallery() {
    return gMems.filter((mem) => mem.keywords.some((keyword) =>
        keyword.includes(gSearchParam)));
}

function getKeyWords() {
    return gKeyWords
}

function getMemById(MemId) {
    const mem = gMems.find(mem => mem.id === MemId)
    return mem
}

function setSearchParam(searchText) {
    gSearchParam = searchText
    return
}

function increaseKeyWord(word) {
    const wordToIncreas = gKeyWords.find(keyWord => keyWord.kWord === word)
    wordToIncreas.size += 5
}