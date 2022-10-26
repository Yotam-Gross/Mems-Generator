'use strict'


var gMems = [
    {id: makeId(), url:'1.jpg', keywords:['funny, animal'],},
    {id: makeId(), url:'2.jpg', keywords:['animal'],},
    {id: makeId(), url:'3.jpg', keywords:['funny, animal'],},
    {id: makeId(), url:'4.jpg', keywords:['animal'],},
    {id: makeId(), url:'5.jpg', keywords:['funny'],},
  
]



function  getGallery(){
    return gMems
}

function getMemById(MemId) {
    const mem = gMems.find(mem => mem.id === MemId)
    console.log(mem)
    return mem
}