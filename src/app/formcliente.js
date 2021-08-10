import React, { Component } from 'react';
import PlusCliente from './PlusCliente'

class FormCliente extends Component {
   constructor(props){
      super(props);
      console.log()
      this.state={
        input: this.props.props.input,
        input2: this.props.props.input2,
        input3: this.props.props.input3,
        input4: this.props.props.input4
      }
   }
   
  
   render() {
      return (
         <>
            <tr>
               <td><input type="text" className="input" defaultValue={this.state.input} value={this.input} onChange={this.props.updateInputValue}/></td>
               <td><input type="text" className="input" defaultValue={this.state.input2} value={this.input2} onChange={this.props.updateInputValue2}/></td>
               <td><input type="text" className="input" defaultValue={this.state.input3} value={this.input3} onChange={this.props.updateInputValue3}/></td>
               <td><input type="number" className="input" defaultValue={this.state.input4} value={this.input4} onChange={this.props.updateInputValue4}/></td>
               <td>
               <div className="flex-container is-size-6">
               <button className="button  is-small is-success aceptar" onClick={this.props.handleClick}><span className=" icon"><i className="fas fa-check"></i></span><span className="">Aceptar</span></button>
               <button className="button  is-small is-danger cancelar" onClick={this.props.cancelarAccion}><span className=" icon"><i className="fas fa-times"></i></span><span className="">Cancelar</span></button>
               </div>
               </td>
            </tr>
         </>
      );
   }
}

export default FormCliente;
