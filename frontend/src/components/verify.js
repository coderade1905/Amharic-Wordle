
async function verify(row, rows, column, color, setDcolor, winn, columns, setModal, setWin) {
    setDcolor(prevArr => {
        let newArr = [...prevArr];
        newArr[row][column] = color;
        return newArr;
    })
    console.log(winn, columns, 1234);
    if (winn == columns)
    {
        setWin(1);
        setModal(true);
    }
    else{
        if (row == rows-1){
            setWin(2);
            setModal(true);
        }
    }
}

export default verify;