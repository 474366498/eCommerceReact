import React , { Component } from 'react' ;
import China from './data' ;
import './index.scss' ;
import StringFunc from 'func/string/index' ;
const __str = new StringFunc();
// __str  strWrapText
class ReactRegionForm extends Component {
   constructor (props) {
      super(props) ;
      let code = this.props.address.addressCode < 9 * 1e5 
         ? this.props.address.addressCode * 1e3 
         : this.props.address.addressCode;
      this.addressCodeConversionAddress(code)
      this.state = {
         prov : []   ,         // 整除10000 * 1000 是省 
         city : []   ,         // 取模code 是省之下的市区 
         area : []   ,     
         town : []   ,    
         code : code
      }
   }

   componentWillMount () {
      let mode = this.props.mode  ||  'form' ;
      let address = this.props.address;
      console.log(24,address);    // 当props 有code码时 还要加载 city area town
      if(address.addressCode) {
         this.onLoadInitializationQueue(address.addressCode) ;
      }

      let prov = [] ;
      for(let key in China ) {
         if(key % 1e4 === 0) {  // 10000 
            prov.push({[key]:China[key]})
         }
      }
      this.setState({ 
         address  ,
         mode     ,
         prov  
      })
   }
   //初始化 city area town 队列数组
   onLoadInitializationQueue (code) {
      if(code < 9*1e5) {
         code = code * 1e3
      }
      let provCode = (Math.floor(code / 1e7) ) * 1e4 ,
          cityCode = (Math.floor(code / 1e5) ) * 1e2 ,
          areaCode = Math.floor(code / 1e3) ;

      let city = [] ,
          area = [] ,
          town = [] ;
      for(let key in China ) {
         if(key > provCode && key < provCode + 1e4 && key % 100 === 0) { // prov 下的市
            city.push({[key]:China[key]})
         } else if (key > cityCode && key < cityCode + 1e2) {
            area.push({[key]:China[key]})
         }
      } 
      let townJson = require(`./town/${areaCode}.json`) ;
      for(let townKey in townJson) {
         town.push({[townKey]:townJson[townKey]})
      }   

      this.setState({
         city  ,
         area  ,
         town
      })
   }
   onChangeStateCode (e) {
      let code = e.target.value ;
     /*  if(code < 9 * 1e5 ) {
         code = code * 1e3;
      } */
      this.setState({
         code
      })
   }
   componentWillUpdate(props,state) {
      let code = this.state.code ;
      console.log(39,code , state);
      // 是否加载下一级
      this.isOnLoading(code,state.code);
   }
   isOnLoading (prevCode,nextCode){
      if(typeof(prevCode) ==='function' || prevCode !== nextCode ) {  // function 第一次直接就加载 !== 重新选择后
         this.onLoadingNextArray(nextCode)
         // addressCode转换为地址字符串 或地址数组   code=> 四级地址要比三级地址 多3个0 
         this.addressCodeConversionAddress(nextCode)
      }
   }
   // 加载 当前code下的子数组
   onLoadingNextArray (code) { // 要判断code是省代码还是市级代码？？？？？？？？？？？？？？？？
      if(code % 1e4 === 0) {
         let city = [] ;
         let area = [] ;
         let town = [] ;
         for(let key in China ) {   // 普通省份
            if( key % 100 === 0 && key - code > 0 && key - code < 10000) {
               city.push({[key]:China[key]})  
            }
         }
         if(city.length === 0 ) {   // 直辖市 特别行政区
            let str = `${China[code]}直辖区`
            city.push({[code]:str}) ;
            for( let k in China ) {
               if(k - code > 0 && k - code < 10000 ) {
                  area.push({[k]:China[k]})
               }
            }
         }
         this.setState({
            city  ,
            area  ,
            town
         })
      } else if (code % 1e2 === 0 ) {
         let area = [] ;
         let town = [] ;
         for( let key in China ) {
            if(key - code > 0 && key - code < 100 ) {
               area.push({[key]:China[key]})
            }
         }
         this.setState({
            area  ,
            town 
         })
      } else if(code % 1e2 !== 0 && code < 9*1e5) {
         let townJson = require(`./town/${code}.json`);
         let town = [] ;
         for(let townKey in townJson) {
            town.push({[townKey]:townJson[townKey]})
         }
         console.log(96,town);
         this.setState({
            townJson ,
            town
         })
      } else if(code) {
         //110109106
      }
      
   }
   // 加载code对应的地址字符串或数组
   addressCodeConversionAddress (code) {
      code = Number(code)
      let address;
      if(code < 9*1e5) {   // 前三级
         if(code % 1e4 === 0) {
            let prov = code ;
            address = `${China[prov]}`;
         } else if ( code % 1e2 === 0) {
            let prov = (Math.floor(code / 1e4) ) * 1e4 ,
                city = (Math.floor(code / 1e2) ) * 1e2 ;
            address = `${China[prov]} ${China[city]} `;    
         }else {
            let prov = (Math.floor(code / 1e4) ) * 1e4,
                city = (Math.floor(code / 1e2) ) * 1e2 ,
                area = code ; 
            address = `${China[prov]} ${China[city]} ${China[area]}`;
         }
      } else {             // 四级 510100   510107   010
         let prov = (Math.floor(code / 1e7) ) * 1e4,
             city = (Math.floor(code / 1e5) ) * 1e2 ,
             area = Math.floor(code / 1e3) ,
             townJson = require(`./town/${area}.json`) ;
         address = `${China[prov]} ${China[city]} ${China[area]} ${townJson[code]}`;  
      }
      console.log(114,)
      this.setState({
         address :{
            address
         }
      }) 
   }

   render () {
      let  {
         mode  ,
         address ,
         prov  ,
         city  , 
         area  ,
         town  ,
         code
      } = this.state ;
      if ( code < 9 * 1e5 ) {
         code = code * 1e3 
      } 
      return (
         <div id='r-region' className='react-region'>
            {
               mode 
               ? (
                  <div className='region-form'>
                     <div className='region-from-text'>
                        <textarea 
                           title = '提交  重置 ？？？？？' 
                           className='region-form-input' 
                           code={code} 
                           name='region-form-input' 
                           rows = '3'
                           value = {__str.strWrapText(address.address).str} 
                        > 
                        </textarea>
                     </div>
                     <div className='region-from-group'>{/*  通过props(address)传值 设定group 是相对于窗口(fixed) 还是父节点(absolute) 进行定位  */}
                        <div className='region-from-select region-prov'>
                           <select onChange = {e => this.onChangeStateCode(e)}>
                              <option>请选择</option>
                              {
                                 prov.map((provItem)=>{
                                    for(let provKey in provItem) {
                                       return (
                                          <option 
                                             selected={ (Math.floor(code / 1e7) ) * 1e4 == provKey ? true : ''}
                                             code = { (Math.floor(code / 1e7) ) * 1e4 }
                                             key={provKey} 
                                             value={provKey}
                                          >
                                             {provItem[provKey]}
                                          </option>
                                       )
                                    }
                                 })
                              }
                           </select>
                        </div>
                        <div className='region-from-select region-city'>
                           <select onChange = {e => this.onChangeStateCode(e)}>
                              <option>请选择</option>
                              {
                                 city.map((cityItem)=>{
                                    for(let cityKey in cityItem) {
                                       return (
                                          <option 
                                             selected={ (Math.floor(code / 1e5) ) * 1e2 == cityKey ? true : ''}
                                             code = { (Math.floor(code / 1e5) ) * 1e2 }
                                             key={cityKey} 
                                             value={cityKey}
                                          >
                                             {cityItem[cityKey]}
                                          </option>
                                       )
                                    }
                                 })
                              }
                           </select>
                        </div>
                        <div className='region-from-select region-area' onChange = {e => this.onChangeStateCode(e)}>
                           <select>
                              <option>请选择</option>
                              {
                                 area.map((areaItem)=>{
                                    for(let areaKey in areaItem) {
                                       return (
                                          <option 
                                             selected={ Math.floor(code / 1e3 )== areaKey ? true : ''}
                                             code = { Math.floor(code / 1e3)  }
                                             key={areaKey} 
                                             value={areaKey}
                                          >
                                             {areaItem[areaKey]}
                                          </option>
                                       )
                                    }
                                 })
                              }
                           </select>
                        </div>
                        <div className='region-from-select region-town' onChange = {e => this.onChangeStateCode(e)}>
                           <select>
                              <option>请选择</option>
                              {
                                 town.map((townItem)=>{
                                    for(let townKey in townItem) {
                                       return (
                                          <option 
                                             selected={ code == townKey ? true : ''}
                                             code = { code }
                                             key={townKey} 
                                             value={townKey}
                                          >
                                             {townItem[townKey]}
                                          </option>
                                       )
                                    }
                                 })
                              }
                           </select>
                        </div>
                     </div>
                  </div>
               )
               : null 
            }
         </div>
      )
   }
}


export default ReactRegionForm ;