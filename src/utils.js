const UtilsSet={
//    时间戳转换为时间格式
    timestamp2Date(timestamp){
        const date=new Date(timestamp)
        const year=date.getFullYear()
        const month=date.getMonth()+1
        const day=date.getDate()
        const hour=date.getHours()
        const minute=date.getMinutes()
        const second=date.getSeconds()
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`
    }
}

export default UtilsSet