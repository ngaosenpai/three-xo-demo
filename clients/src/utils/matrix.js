// currentCell ,  checkCell : { user : string }

// noItem : number, items : [ { user : string }, ... ]
function checkCase(noItem, items){
    // let 
    for(let i = 0; i <= items.length - noItem; i++){
        let sum = 0
        for(let j = i; j <= i + noItem - 1; j++){
            sum += (items[j].refNumber || 0)
        }
        // console.log(sum, sum === noItem || sum === (-1)*noItem)
        if(sum === noItem || sum === (-1)*noItem){
            return {
                isWin : true,
                user : items[i].user,
                sum,
                index: i
            }
        }
    }
    return {
        isWin : false
    }
}

const toValidPos = (pos, size) => {
    if(pos < 0) return 0
    if(pos > size-1) return size-1
    return pos
}


const casesGenerator = (Matrix, x, y, noItem) => {
    const size = Matrix.length
    const fromX = toValidPos(x - noItem - 1, size)
    const toX = toValidPos(x + noItem - 1, size)
    const fromY = toValidPos(y - noItem - 1, size)
    const toY = toValidPos(y + noItem - 1, size)

    const case1 = []
    const case2 = []
    const case3 = []
    const case4 = []
    for(let i = fromX, j = fromY, nj = toY; i <= toX && j <= toY && nj >= fromY; i++, j++, nj--){
        case1.push(Matrix[i][y])
        case2.push(Matrix[x][j])
        case3.push(Matrix[i][j])
        case4.push(Matrix[i][nj])   
    }
    return [case1, case2, case3, case4]
}   

export const checkWin = (Matrix, x, y, noItem) => {

    const [case1, case2, case3, case4] = casesGenerator(Matrix, x, y, noItem)
    const sttCase1 = checkCase(noItem, case1)
    const sttCase2 = checkCase(noItem, case2)
    const sttCase3 = checkCase(noItem, case3)
    const sttCase4 = checkCase(noItem, case4)

    console.log([case1, case2, case3, case4])

    if(sttCase1.isWin){
        return sttCase1
    }
    if(sttCase2.isWin){
        return sttCase2
    }
    if(sttCase3.isWin){
        return sttCase3
    }
    if(sttCase4.isWin){
        return sttCase4
    }
    return {
        isWin : false
    }
}