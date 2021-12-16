class StringFunc {
   toJson (str) {
      str = str.split(/(^\w+\W{1})|(\))/g)[3]
      let data = unescape(str.replace(/\\/g,'%'))
      data = data.replace(/%/g,'')
      //let reg = data.match(/(^\w+\W{1})/)
      //console.log(JSON.parse(data))
      return JSON.parse(data).data
   }
}
export default StringFunc