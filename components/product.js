import React from 'react';
import PropTypes, { element, string } from 'prop-types';

class Product extends React.Component {
    static PropTypes={
        elements: PropTypes.object.isRequired,
        }

render() {

return(
       <div>
        { (this.props.elements!==null)?
         <div> 
            <br/>
           <span>ID: {this.props.elements.code}</span> <br/>
           <span>Model: {this.props.elements.name}</span> <br/>
           <span>price:{this.props.elements.price}</span> <br/>
           <span>url: {this.props.elements.url}</span> <br/> 
           <span>quanity: {this.props.elements.quanity}</span> <br/>
        </div> : false }
    </div>
    )
    }

} 


export default Product


