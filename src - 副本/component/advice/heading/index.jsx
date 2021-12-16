import React , { Component } from 'react' ;
import { BrowserRouter as Router , Link } from 'react-router-dom' ;
import './index.scss' ;

// tab式链接  根据路径 path 来设置 链接的内容
class AdviceHeading extends Component {
   constructor(props) {
      super(props) ;
      this.state = {
         deleteWareStatus : false ,
         deleteWareIndex  : null  ,
         tabLinks : [] ,
         tabIndex : 0
      }
   } 
   componentWillMount(){
      console.log('tab--link15',window.location.pathname)
      window.location.pathname =='/' 
      ?  this.setState({
            tabLinks : [
               {'id': 1,'text':'Advice','href':'advice','filter':false,'title':'建议'},
               {'id': 2,'text':'Recent','href':'recent','filter':'date','title':'最近'},
               {'id': 3,'text':'Popular','href':'popular','filter':'popular','title':'受欢迎的'}
            ],
            tabIndex : 2
         })
      :  this.setState({
            tabLinks : [
               {'id': 1,'text':'ALL','href':'all','title':'所有'},
               {'id': 2,'text':'MAN','href':'man','title':'男士'},
               {'id': 3,'text':'WOMAN','href':'woman','title':'女士'},
               {'id': 4,'text':'KID','href':'kid','title':'儿童'}
            ],
            tabIndex : 0
         } ) 
          
   }
   
   // tabLinks 三个时 click方法
   onChangeFilterFun (index) {
      this.setState({
         tabIndex : index
      },()=>{
         this.props.onChangeHeadingIndex(index)
      })  
   }
   render () {
      let { 
         tabLinks ,
         tabIndex 
      } = this.state
      return (
         <div 
            className='container dialog-tab-background'  
         >
            <div className='row dialog-tab '>
               {
                  tabLinks.map((item,index) => (
                     <div 
                        key={index} 
                        className={'col-xs-'+12/tabLinks.length}   
                     >
                        {
                           tabLinks.length === 3 
                           ? <Link 
                              className={ 
                                 tabIndex===index
                                 ? 'btn btn-sm btn-block btn-default' 
                                 : 'btn btn-sm btn-block'
                              }
                              onClick = {e=>this.onChangeFilterFun(index)}
                              to = {{pathname:!item.filter ? '/'+item.href : null}}
                              > {item.text} </Link> 
                           : <a className={
                                 tabIndex ===index 
                                 ? 'on' : ''
                              }
                              >{item.text}</a> 
                        }
                        
                     </div>
                  ))
               }    
            </div>
         </div>
      )
   }
}


export default AdviceHeading;