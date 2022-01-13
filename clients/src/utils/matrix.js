const isEnemy = (currentCell, checkCell) => {
    if(!checkCell.user) return false
    return checkCell.user !== currentCell.user
}

function checkLine(){
    const value = arguments[0].user

}