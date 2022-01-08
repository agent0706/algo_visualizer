export const getUpperLimit = (data) => {
    let maxNum = -1;
    data.forEach((num) => {
        if (num > maxNum) {
            maxNum = num;
        }
    });
    return maxNum + 10;
};