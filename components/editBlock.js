import React from 'react';
import PropTypes from 'prop-types';
import "./editBlock.css"

class Edit extends React.Component {
    static PropTypes = {
        elements: PropTypes.object.isRequired,
        rename: PropTypes.func.isRequired,
        cbCheckMode: PropTypes.func.isRequired,
        mode: PropTypes.number.isRequired,
        newCode: PropTypes.number,
        cbNew: PropTypes.func,
        cbSelected: PropTypes.func,
        cbforCardTOselect: PropTypes.func,
    }

    state={
        name:(this.props.mode===2)? "" : this.props.elements.name,
        price:(this.props.mode===2)? "" : this.props.elements.price,
        url:(this.props.mode===2)? "" : this.props.elements.url,
        quanity:(this.props.mode===2)? "" : this.props.elements.quanity,
        code:(this.props.mode===2)?this.props.newCode:this.props.elements.code,
        }

   

     changeV = (EO) => {
        EO=EO||window.event;
       switch ( EO.target.name) {
            case '1':
                this.setState({name:EO.target.value})
             break;
            case '2':
                this.setState({price:EO.target.value})
              break;
            case '3':
                this.setState({url:EO.target.value})
                 break;
            case '4':
                this.setState({quanity:EO.target.value})
               break; 
                  }
                
            }

    

    save = ()=>{
    this.props.rename(this.state)
    this.props.cbCheckMode(0)
    }

    saveNewProduct = (EO) => {
        EO=EO||window.event;
        EO.preventDefault();
        EO.stopPropagation()
        this.props.cbNew(this.state)
        this.props.cbCheckMode(0)
    }

    cancelCheckMode = (EO) => {
        EO=EO||window.event;
        EO.preventDefault();
        EO.stopPropagation()
        this.props.cbCheckMode(0)
        this.props.cbSelected(0)
        this.props.cbforCardTOselect(null)
    }

    render() {

        var invalid = (this.state.name!==""&&this.state.url!==""&&this.state.price!==""&&this.state.quanity!=="")? false : true;
        
        
return(
        <div>
            { (this.props.mode==1)&&           
            <div>
                <h2>Edit Existing product</h2>
                <span>ID {this.state.code}</span><br/>
                <label><span className="flo">Product name:</span>
                <input type='text' name={1} defaultValue={this.state.name}  onChange={this.changeV}/></label><span className="right">{(this.state.name==="")?" Please, fill the field!":''}</span><br/>
                <label><span className="flo">Price:</span>
                <input type='text' name={2} defaultValue={this.state.price}  onChange={this.changeV}/></label><span className="right">{(this.state.price==="")?" Please, fill the field!":''}</span><br/>
                <label><span className="flo">URL:</span>
                <input type='text' name={3} defaultValue={this.state.url}  onChange={this.changeV}/></label><span className="right">{(this.state.url==="")?" Please, fill the field!":''}</span><br/>
                <label><span className="flo">Quanity:</span>
                <input type='text' name={4} defaultValue={this.state.quanity} onChange={this.changeV}/></label><span className="right">{(this.state.quanity==="")?" Please, fill the field!":''}</span><br/>
                <button disabled={invalid} onClick={this.save}>SAVE</button><button onClick={this.cancelCheckMode}>CANCEL</button>
            </div> 
            }
            { (this.props.mode==2)&&
            <div>
                <h2>Add new Product</h2>
                <span>ID {this.props.newCode}</span><br/>
                <label><span className="flo">Product name:</span>
                <input  type='text' name={1} onChange={this.changeV}/></label><span className="right">{(this.state.name==="")?" Please, fill the field!":''}</span><br/>
                <label><span className="flo">Price:</span>
                <input  type='text' name={2} onChange={this.changeV}/></label><span className="right">{(this.state.price==="")?" Please, fill the field!":''}</span><br/>
                <label><span className="flo">URL:</span>
                <input  type='text' name={3} onChange={this.changeV}/></label><span className="right">{(this.state.url==="")?" Please, fill the field!":''}</span><br/>
                <label><span className="flo">Quanity:</span>
                <input  type='text' name={4} onChange={this.changeV}/></label><span className="right">{(this.state.quanity==="")?" Please, fill the field!":''}</span><br/>
                <button onClick={this.saveNewProduct} disabled={invalid}>ADD</button><button onClick={this.cancelCheckMode}>CANCEL</button>
            </div>
            }
            </div>
        )
    }
}

export default Edit