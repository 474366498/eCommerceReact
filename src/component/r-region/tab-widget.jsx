import React , { Component } from 'react' ;
import China from './data' ;
import './index.scss' ;
import StringFunc from 'func/string/index' ;
const __str = new StringFunc();

class ReactRegionTabWidget extends Component {
   constructor (props) {
      super(props)
      this.state = {

      }
   }
   render () {
      return (
         <div id='r-region' className='react-region react-region-tab-widget'>
            region widget
         </div>
      )
   }
}

export default ReactRegionTabWidget ;
