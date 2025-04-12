export const getInitials = (name) => {

    const nameArr = name.split(' ')
    if (nameArr.length == 1){
        return nameArr[0].charAt(0).toUpperCase()
    }if (nameArr.length > 1){
        return `${nameArr[0].charAt(0).toUpperCase()}${nameArr[1].charAt(0).toUpperCase()}`
    }
}

export const getFirstName = (name) => {

    const nameArr = name.split(' ')
    
    return nameArr[0]

}

