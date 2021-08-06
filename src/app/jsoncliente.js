import React, { Component, Fragment, useState, useEffect } from 'react';
import Cliente from './Cliente';
import FormCliente from './formcliente';
import PlusCliente from './PlusCliente';
import Pagination from './Pagination'
// const results = require('../result.json');

// const results = response.json();
class JsonCliente extends Component {
   constructor(props){
      super(props);
      this.crearCliente = this.crearCliente.bind(this)
      this.handleClick = this.handleClick.bind(this)
      this.fetchClientes = this.fetchClientes.bind(this)
      this.handleEdit = this.handleEdit.bind(this)
      this.updateCliente = this.updateCliente.bind(this)
      this.cancelarAccion = this.cancelarAccion.bind(this)
      this.deleteCliente = this.deleteCliente.bind(this)
      this.paginate = this.paginate.bind(this)
      this.state={
         data : [<tr><td>'No ha cargado nada aun'</td></tr>],
         select : 'rut',
         query : '',
         crearcliente: <PlusCliente key={"agregar"} cC={this.crearCliente}/>,
         input : '',
         input2 : '',
         input3 : '',
         input4 : '',
         notification:'',
         loading: true,
         currentPage: 1,
         clientesPerPage: 4
         
      }
      // this.crearCliente = this.crearCliente.bind(this)
   }

   //Pagination
   paginate = (number) => {
      this.setState({currentPage: number})
   }

   componentDidMount(){
      this.fetchClientes()
   }
   fetchClientes = async () =>{
      this.setState({ loading : true})
      const results = await fetch('/cliente/').then(res => res.json())
      // const datos = results.map((cliente) => {return <Cliente key={cliente.rut} {...cliente}/>})
      this.setState({data: results})
      this.setState({ loading: false})
      console.log('Se Ejecuto Fetch cliente')
      // return datos;
   }
   postClientes = async(data)=>{
      const results = await fetch('/cliente', {
         method: 'POST',
         headers:{
            'Content-Type' : 'application/json'
         },
         body: JSON.stringify(data)
      });
      return results.json
   }
   pruebaProps(){
      console.log(this.state.select)
   }
  
   handleChange = (e) =>{
      this.setState({select : e.target.value})
   }
   handleChangeInput = (e) =>{
      this.setState({query : e.target.value})
   }
   createQuery = async ()=> {
      let fullquery = '?'+this.state.select+'='+this.state.query
      console.log(fullquery)
      if(this.state.query === ""){
      const results = await fetch('/cliente').then(res => res.json());
      // const datos = results.map((cliente) => {return <Cliente key={cliente.rut} {...cliente}/>})
      this.setState({data: results})
      }else{
      const results = await fetch('/cliente/'+fullquery).then(res => res.json());
      // const datos = results.map((cliente) => {return <Cliente key={cliente.rut} {...cliente}/>})
      this.setState({data: results})
      }
      
       
   }
   handleClick = () => {
      // console.log(this.inputValidation())
      if(this.inputValidation() === true ){
         const inputs = {
         razonsocial: this.state.input,
         rut: this.state.input2,
         ubicacion : this.state.input3,
         contacto: this.state.input4
         }
         // console.log('input validation true')
         console.log(inputs)
         this.props.pruebaProps
         this.postClientes(inputs).then(data => {
            console.log(data);
            this.fetchClientes();
            this.setState({
            crearcliente: <PlusCliente cC={this.crearCliente}/>
         })
         })
         this.setState({input: '', input2: '', input3: '', input4:''})
         
      } else{
         // console.log('input validation false')
         this.setState({
            notification: this.inputValidation()
         })
      }
      
   }
   crearCliente(){
            this.setState({input: '', input2: '', input3: '', input4:''})
            this.setState({
               crearcliente : <FormCliente props={this.state} crearCliente={this.crearcliente} handleClick={this.handleClick} cancelarAccion={this.cancelarAccion}
               updateInputValue={this.updateInputValue} updateInputValue2={this.updateInputValue2} updateInputValue3={this.updateInputValue3}
               updateInputValue4={this.updateInputValue4}
               />
            })
   }
   deleteCliente(rut, razonsocial){
      if(confirm(`Esta seguro de que desea elimintar el cliente ${razonsocial} con el rut: ${rut}`)){
         const result = fetch(`/cliente/${rut}`,{
         method:'DELETE'
      }).then(result =>result.json()).then(data => this.fetchClientes());
      console.log(result)
      }
   }
   async updateCliente(){
      const inputs = {
         razonsocial: this.state.input,
         rut: this.state.input2,
         ubicacion : this.state.input3,
         contacto: this.state.input4
         }
      await fetch(`/cliente/${inputs.rut}`,{
         method: 'PUT',
         headers:{
            'Content-Type' : 'application/json'
         },
         body: JSON.stringify(inputs)
      }).then(data => {
         console.log(data);
         this.fetchClientes();
         this.setState({
         crearcliente: <PlusCliente cC={this.crearCliente}/>
      })
   })
   this.setState({input: '', input2: '', input3: '', input4:''})
}
   async handleEdit(rut){
      const results = await fetch(`/cliente/${rut}`).then(res=>res.json()).then(data => 
         {  this.setState({
            data: [],
            input: data[0].razonsocial,
            input2: data[0].rut,
            input3: data[0].ubicacion,
            input4: data[0].contacto
         })}
         )
         this.setState({
            crearcliente: <FormCliente crearCliente={this.crearCliente} handleClick={this.updateCliente} cancelarAccion={this.cancelarAccion}
            props={this.state} updateInputValue={this.updateInputValue} updateInputValue2={this.updateInputValue2} updateInputValue3={this.updateInputValue3}
               updateInputValue4={this.updateInputValue4}/>})
   }
   updateInputValue = (e)=>{
      this.setState({
         input: e.target.value
      });
   }
   updateInputValue2 = (e)=>{
      this.setState({
         input2: e.target.value
      });
   }
   updateInputValue3 = (e)=>{
      this.setState({
         input3: e.target.value
      });
   }
   updateInputValue4 = (e)=>{
      this.setState({
         input4: e.target.value
      });
   }
   cancelarAccion = ()=>{
       this.fetchClientes();
         this.setState({
         crearcliente: <PlusCliente cC={this.crearCliente}/>,
         notification: ''
      })
   }
   inputValidation = () =>{
      const displayError = (message) =>{
         return <div className="notification is-danger">{message}<button className="delete" onClick={()=>{this.setState({notification:''})}}></button></div>
      }
      if(this.state.input.trim() === '' || this.state.input2.trim() === '' || this.state.input3.trim() === '' || this.state.input4.trim() === ''){
         return displayError('Ningun campo puede estar vacio, por favor verifique los campos');
      }if(this.state.input.trim().length < 3){
         return displayError('Debe ingresar al menos 3 caracteres para Razon Social')
      }if(!(/^(\d{5,9}-[\dkK])$/.test(this.state.input2.trim()))){
         return displayError('Debe ingresar un formato válido para el RUT. Ejemplo: 12345678-9')
      }else{
         return true
      }
   }


   render(){ return (
      <>
      <div className="container">
      <div className='box'>
      <div className='title is-small'>Menu de clientes</div>
      <div className="field has-addons">
         <p className="control">
            <span className="select">
            <select value={this.state.select} onChange={this.handleChange}>
               <option defaultValue value="rut">RUT</option>
               <option value="razonsocial">Razon Social</option>
               <option value="ubicacion">Casa Matriz</option>
            </select>
            </span>
         </p>
         <p className="control">
            <input type="text" className="input" placeholder="Busqueda..." value={this.state.query} onChange={this.handleChangeInput} />
         </p>
         <p className="control">
            <button className="button is-info" onClick={this.createQuery}>Buscar</button>
         </p>
      </div>
      <div className="box is-flex is-justify-content-center ">
      <div className="table-container">
      <table className="table">
         <thead> 
            <tr>
               <th>Razon Social</th>
               <th>RUT</th>
               <th>Casa Matriz</th>
               <th>Contacto</th>
               <th>Creado</th>
               <th>Editar</th>
               <th>Borrar</th>
            </tr>   
         </thead>
         <tbody>
            {/* {console.log(this.state.data, 'pre client component @JsonCliente')} */}
            <Cliente 
            clientes={this.state.data} 
            loading={this.state.loading} 
            handleEdit={this.handleEdit} 
            deleteCliente={this.deleteCliente}
            clientesPerPage={this.state.clientesPerPage}
            currentPage={this.state.currentPage}
            />
            {this.state.crearcliente}
         </tbody>
      </table>
      </div>
      </div>
      <Pagination itemsPerPage={this.state.clientesPerPage} totalItems={this.state.data.length} paginate={this.paginate} currentPage={this.state.currentPage}/>
      </div>
      </div>
      <div className="is-flex is-justify-content-center">{this.state.notification}</div>
      </>
   );
}
}



export default JsonCliente;
