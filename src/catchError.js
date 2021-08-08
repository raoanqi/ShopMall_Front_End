function catchError(error) {
    if (!error) {
        throw new Error('出现未知错误')
    } else {
        this.$message({
            type: 'error',
            message: error.message || '服务器错误'
        })
        console.error(error)
    }
}

export default catchError