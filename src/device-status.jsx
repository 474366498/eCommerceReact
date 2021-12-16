import React , { Component } from 'react' ;
import './index.scss';
class DeviceStatus extends Component {
   constructor (props) {
      super(props);
      this.state = {
         clock : 0
      }
   }
   componentWillMount () {
      const timeFun = function () {
         this.setState({
            clock : new Date().toLocaleTimeString()
         })
      }.bind(this);
      timeFun();
      setInterval(timeFun,1000)
   }
   componentDidMount(){ 
     
   }
  
   render() {
      return (
         <div className='container head-statue head-statue-pink' > 
            <div className='row'>
               <div class="col-xs-12">
                  <span className='wifi'>
                     <i className='iconfont icon-WiFi'></i>
                  </span>
                  <span className='signal'>
                     <i className='iconfont icon-xinhao'></i>
                  </span>
                  <span className='electricity'>
                     <i className='iconfont icon-iconset0251'></i>
                  </span>
                  <span className='clock'>
                     {this.state.clock}
                  </span>
               </div>
            </div>
         </div>
      )
   }
}

export default DeviceStatus;