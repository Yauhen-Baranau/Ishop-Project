import React from 'react';
import PropTypes from 'prop-types';
import "./ishopItem.css"

class Item extends React.Component {

    static PropTypes = {
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        quanity: PropTypes.number.isRequired,
        code: PropTypes.number.isRequired,
        cbSelected: PropTypes.func.isRequired,
        cbDelete: PropTypes.func,
        isSelected:PropTypes.bool,
        cbCheckMode: PropTypes.func,
        mode: PropTypes.number.isRequired,
    }

    itemClicked = () => {
      if (this.props.mode===0) {
        this.props.cbSelected(this.props.code);
        this.props.cbCheckMode(0)
      }
    }

    delete = (EO) => {
        EO=EO||window.event;
        EO.preventDefault();
        EO.stopPropagation()
        this.props.cbDelete(this.props.code)
        
        
       } 
    
    modeChekEdit1 = (EO) =>{
        EO=EO||window.event;
        EO.preventDefault();
        EO.stopPropagation()
        this.props.cbSelected(this.props.code);
        this.props.cbCheckMode(1)
    }

     render(){
       return(
            <tr className={this.props.isSelected? 'selected' : null}
                key={this.props.code} code = {this.props.code}
                onClick={this.itemClicked}>
                    <td className="tab1">{this.props.name}</td>
                    <td className="tab1">{this.props.price}</td>
                    <td className="tab1">{this.props.url}</td>
                    <td className="tab1">{this.props.quanity}</td>
                    <td className="tab1"> <button disabled={((this.props.mode!==0) && (this.props.mode!==1))} onClick={this.modeChekEdit1}>EDIT</button></td>
                    <td className="tab1"><button disabled={(this.props.mode!==0)} onClick={this.delete}>DELETE</button></td>
            </tr>
        )
    }
}

export default Item
