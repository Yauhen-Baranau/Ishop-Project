import React from 'react';
import PropTypes from 'prop-types';
import './ishopBlock.css';
import Item from './ishopItem';
import Product from './product'
import Edit from './editBlock';


class Ishop extends React.Component {
     static PropTypes = {
        mode: PropTypes.number.isRequired,
        brend: PropTypes.string.isRequired,
        items:PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string.isRequired,
              price: PropTypes.number.isRequired,
              url: PropTypes.string.isRequired,
              quanity: PropTypes.number.isRequired,
              code: PropTypes.number.isRequired,
            })
           )   
    };

    state = {
       itemsArr: this.props.items,
       selectedItemCode: 0,
       forCardSelected: null,
       mode: this.props.mode
      };


     
      codeselect = (code) => {
        this.setState({selectedItemCode:code})
      }

      forCardTOselect = (num) => {
        this.setState({forCardSelected: num})
      }

       itemSelect = (code) => { // выбераем товар по id
       this.setState({selectedItemCode:code})
        this.showCard(code)
        }

        itemDelete = (code) => { //фильтруем удаленный товар
        var filt = this.state.itemsArr.filter( v=> v.code!=code)
        this.setState({itemsArr:filt})
        this.setState({forCardSelected: null})
        this.setState({mode: 0})
        }

        showCard = (code) => { // фильтр для карточки товара
        var filt = this.state.itemsArr.filter(v=> v.code==code)
        this.setState({forCardSelected:filt[0]})
      }

        checkMode = (num) => {
            this.setState({mode:num})
           }

        checkModeforAdd = () => {
            this.setState({mode:2})
        }

       rename = (elem) => {
      var newArray = JSON.parse(JSON.stringify(this.state.itemsArr));
      for(var i =0; i<newArray.length; i++){
          if(newArray[i].code===this.state.selectedItemCode){
              newArray[i].name=elem.name
              newArray[i].price=elem.price
              newArray[i].url=elem.url
              newArray[i].quanity=elem.quanity
              newArray[i].code=elem.code
              break
          }
    }
        this.setState({itemsArr:newArray})
       }

       generateID=()=>{
        var count = this.state.itemsArr.sort().map( v =>
                 v.code
          )
        this.setState({selectedItemCode:(count[count.length-1])+1})
        this.checkModeforAdd()
          }

       addnp = (elem) => {
        var newArray = JSON.parse(JSON.stringify(this.state.itemsArr));
        newArray.push(elem)
        this.setState({itemsArr: newArray})
        this.setState({selectedItemCode:0})
      }
       

 render () {
      var products=this.state.itemsArr.map( v =>
        <Item name={v.name}
              price={v.price} 
              url={v.url}
              quanity={v.quanity} 
              key={v.code}
              isSelected={v.code==this.state.selectedItemCode}
              code={v.code}
              cbSelected={this.itemSelect}
              cbDelete={this.itemDelete}
              cbCheckMode={this.checkMode}
              mode = {this.state.mode}
        />
        );
  
       return(
         

        <div>
            <h1>{this.props.brend}</h1>
            
            <table className="tab">
              <tbody>
              <tr><th className="t1">Name</th><th className="t1">Price</th><th className="t1">URL</th><th className="t1">Quanity</th><th className="t1">Edit</th><th className="t1">Delete</th></tr>
                {products}
                </tbody>
            </table>
            <button disabled={( (this.state.mode===2) || (this.state.mode===1))} onClick={this.generateID} >Add new product</button>

            { ( (this.state.forCardSelected!==null) && (this.state.mode===0) )?
            <div>
            <Product elements = {this.state.forCardSelected}/>
            </div>
            : null
            }



            {  ( (this.state.mode===1)&&(this.state.selectedItemCode!==0) )&& 
              <div>
               <Edit cbforCardTOselect={this.forCardTOselect} cbSelected={this.codeselect} key={this.state.forCardSelected.code} elements = {this.state.forCardSelected} rename={this.rename} cbCheckMode={this.checkMode} mode={this.state.mode} />
              </div>
            }

         {  (this.state.mode===2)&& 
              <div>
               <Edit cbforCardTOselect={this.forCardTOselect}  cbSelected={this.codeselect} elements = {this.state.itemsArr} newCode = {this.state.selectedItemCode} cbNew={this.addnp} cbCheckMode={this.checkMode} mode={this.state.mode}/>
              </div>
            }
             </div>  
         )
    }
  }

export default Ishop

