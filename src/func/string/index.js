class StringFunc {
   toJson (str) {
      //str = str.split(/(^\w+\W{1})|(\))/g);
      str = str.split(/(^\w+\W{1})/g)[2]; // 分割 { 以前的内容
      str = str.substring(0, str.length - 1); // 删除最后的 )
      let data = unescape(str.replace(/\\/g,'%'))
      data = data.replace(/%/g,'').replace(/[\n\r]/gi,'');
      
      //let reg = data.match(/(^\w+\W{1})/)
      return JSON.parse(data).data
   }
   strWrapText (str) {
      let reg = /^\s+|\s+/g ,
          ss = str.replace(reg,'\n') ,
          arr = str.split(reg) , 
          arrL = arr.length ;
      return {
         str : ss ,
         arr ,
         arrL
      }    
   }
}
export default StringFunc