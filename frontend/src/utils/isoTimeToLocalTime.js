const isoTimeToLocalTime = (isoTime) => {
    return new Date(isoTime).toLocaleString()
}

export default isoTimeToLocalTime