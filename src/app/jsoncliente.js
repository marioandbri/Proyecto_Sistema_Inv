import React, { Component, Fragment, useState, useEffect } from 'react';
import Cliente from './Cliente';
import FormCliente from './formcliente';
import PlusCliente from './PlusCliente';
import Pagination from './Pagination'
// import { query } from 'express';
// const results = require('../result.json');

// const results = response.json();
class JsonCliente extends Component {
   constructor(props) {
      super(props);
      this.crearCliente = this.crearCliente.bind(this)
      this.handleClick = this.handleClick.bind(this)
      this.fetchClientes = this.fetchClientes.bind(this)
      this.handleEdit = this.handleEdit.bind(this)
      this.updateCliente = this.updateCliente.bind(this)
      this.cancelarAccion = this.cancelarAccion.bind(this)
      this.deleteCliente = this.deleteCliente.bind(this)
      this.paginate = this.paginate.bind(this)
      this.state = {
         data: [<tr><td>'No ha cargado nada aun'</td></tr>],
         actualData: [],
         select: 'rut',
         razonsocial: "",
         rut: "",
         ubicacion: "",
         contacto: "",
         createdat: "",
         crearcliente: <PlusCliente key={"agregar"} cC={this.crearCliente} />,
         input: '',
         input2: '',
         input3: '',
         input4: '',
         notification: '',
         loading: true,
         currentPage: 1,
         clientesPerPage: 5,

      }
      // this.crearCliente = this.crearCliente.bind(this)
   }

   //Pagination
   paginate = (number, e) => {
      const prevState = this.state.currentPage
      document.getElementById(`${prevState}`).classList.remove('is-current')
      document.getElementById(`${number}`).classList.toggle('is-current')
      this.setState({
         currentPage: number
      })
   }

   componentDidMount() {
      this.fetchClientes().then(()=>this.setState({ actualData: this.state.data}))
   }
   fetchClientes = async () => {
      this.setState({ loading: true })
      const results = await fetch('/cliente/').then(res => res.json())
      // const datos = results.map((cliente) => {return <Cliente key={cliente.rut} {...cliente}/>})
      this.setState({ data: results })
      this.setState({ loading: false })
      console.log('Se Ejecuto Fetch cliente')
      // return datos;
   }
   postClientes = async (data) => {
      const results = await fetch('/cliente', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
      });
      return results.json
   }
   // pruebaProps(){
   //    console.log(this.state.select)
   // }

   handleChange = (e) => {
      this.setState({ select: e.target.value })
   }
   handleChangeInput = (e) => {
      this.setState({
         [e.target.name]: e.target.value
      })

   }
   createQuery = async () => {
      const { razonsocial, rut, ubicacion, contacto, createdat } = this.state
      console.log(createdat)
      let fullquery = "";
      if (razonsocial != "" && razonsocial.length > 2) {
         fullquery += `razonsocial=${razonsocial}&`;
      }
      if (rut != "") {
         fullquery += `rut=${rut}&`;
      } if (ubicacion != "") {
         fullquery += `ubicacion=${ubicacion}&`
      } if (contacto != "") {
         fullquery += `contacto=${contacto}&`
      } if (createdat != "") {
         fullquery += `createdat=${createdat}&`
      }
      console.log(fullquery)
      // if(objectQuery.razonsocial === "" && objectQuery.rut === "" && objectQuery.ubicacion === "" && objectQuery.contacto === ""){
      if (fullquery == "") {
         const results = await fetch('/cliente').then(res => res.json());
         // const datos = results.map((cliente) => {return <Cliente key={cliente.rut} {...cliente}/>})
         this.setState({ data: results })
         console.log(true)
      } else {
         const results = await fetch(`/cliente?${fullquery}`).then(res => res.json());
         // const datos = results.map((cliente) => {return <Cliente key={cliente.rut} {...cliente}/>})
         this.setState({ data: results })
         console.log(false)
      }


   }
   handleClick = () => {
      // console.log(this.inputValidation())
      if (this.inputValidation() === true) {
         const inputs = {
            razonsocial: this.state.input,
            rut: this.state.input2,
            ubicacion: this.state.input3,
            contacto: this.state.input4
         }
         // console.log('input validation true')
         console.log(inputs)
         this.props.pruebaProps
         this.postClientes(inputs).then(data => {
            console.log(data);
            this.fetchClientes();
            this.setState({
               crearcliente: <PlusCliente cC={this.crearCliente} />
            })
         })
         this.setState({ input: '', input2: '', input3: '', input4: '' })

      } else {
         // console.log('input validation false')
         this.setState({
            notification: this.inputValidation()
         })
      }

   }
   crearCliente() {
      this.setState({ input: '', input2: '', input3: '', input4: '' })
      this.setState({
         crearcliente: <FormCliente props={this.state} crearCliente={this.crearcliente} handleClick={this.handleClick} cancelarAccion={this.cancelarAccion}
            updateInputValue={this.updateInputValue} updateInputValue2={this.updateInputValue2} updateInputValue3={this.updateInputValue3}
            updateInputValue4={this.updateInputValue4}
         />
      })
   }
   deleteCliente(rut, razonsocial) {
      if (confirm(`Esta seguro de que desea elimintar el cliente ${razonsocial} con el rut: ${rut}`)) {
         const result = fetch(`/cliente/${rut}`, {
            method: 'DELETE'
         }).then(result => result.json()).then(data => this.fetchClientes());
         console.log(result)
      }
   }
   async updateCliente() {
      const inputs = {
         razonsocial: this.state.input,
         rut: this.state.input2,
         ubicacion: this.state.input3,
         contacto: this.state.input4
      }
      await fetch(`/cliente/${inputs.rut}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(inputs)
      }).then(data => {
         console.log(data);
         this.fetchClientes();
         this.setState({
            crearcliente: <PlusCliente cC={this.crearCliente} />
         })
      })
      this.setState({ input: '', input2: '', input3: '', input4: '' })
   }
   async handleEdit(rut) {
      const results = await fetch(`/cliente/${rut}`).then(res => res.json()).then(data => {
         this.setState({
            data: [],
            input: data[0].razonsocial,
            input2: data[0].rut,
            input3: data[0].ubicacion,
            input4: data[0].contacto
         })
      }
      )
      this.setState({
         crearcliente: <FormCliente crearCliente={this.crearCliente} handleClick={this.updateCliente} cancelarAccion={this.cancelarAccion}
            props={this.state} updateInputValue={this.updateInputValue} updateInputValue2={this.updateInputValue2} updateInputValue3={this.updateInputValue3}
            updateInputValue4={this.updateInputValue4} />
      })
   }
   updateInputValue = (e) => {
      this.setState({
         input: e.target.value
      });
   }
   updateInputValue2 = (e) => {
      this.setState({
         input2: e.target.value
      });
   }
   updateInputValue3 = (e) => {
      this.setState({
         input3: e.target.value
      });
   }
   updateInputValue4 = (e) => {
      this.setState({
         input4: e.target.value
      });
   }
   cancelarAccion = () => {
      this.fetchClientes();
      this.setState({
         crearcliente: <PlusCliente cC={this.crearCliente} />,
         notification: ''
      })
   }
   inputValidation = () => {
      const displayError = (message) => {
         return <div className="notification is-danger">{message}<button className="delete" onClick={() => { this.setState({ notification: '' }) }}></button></div>
      }
      if (this.state.input.trim() === '' || this.state.input2.trim() === '' || this.state.input3.trim() === '' || this.state.input4.trim() === '') {
         return displayError('Ningun campo puede estar vacio, por favor verifique los campos');
      } if (this.state.input.trim().length < 3) {
         return displayError('Debe ingresar al menos 3 caracteres para Razon Social')
      } if (!(/^(\d{5,9}-[\dkK])$/.test(this.state.input2.trim()))) {
         return displayError('Debe ingresar un formato válido para el RUT. Ejemplo: 12345678-9')
      } else {
         return true
      }
   }
   changeClientesPerPage = (e) => {
      this.setState({
         clientesPerPage: e.target.value
      })
   } 

   sortingClientes = (id) =>{
      let icon = document.getElementById(id).children[0].children[0].children[0]
      let sortedData = [...this.state.data]
      if(icon.classList.contains('fa-chevron-down')){
         sortedData.sort((a,b)=>{
            if(a[id] > b[id]){
               return -1;
            }
            if(a[id] < b[id]){
               return 1;
            }
            return 0
         })
         this.setState({
            actualData: sortedData
         })
         icon.classList.remove('fa-chevron-down')
         icon.classList.add('fa-chevron-up')
      }else
      if(icon.classList.contains('fa-chevron-up')){
         this.setState({ actualData : this.state.data})
         icon.classList.remove('fa-chevron-up')
         
      }
      else{
         icon.classList.add('fa-chevron-down')
         sortedData.sort((a,b)=>{
            if(a[id] < b[id]){
               return -1;
            }
            if(a[id]>b[id]){
               return 1;
            }
            return 0
         })
         this.setState({
            actualData: sortedData
         })
      }


   }


   render() {
      return (
         <>
            <div className="container">
               <div className='box'>
                  <div className='title is-small'>Menu de clientes</div>
                  {/* <div className="field has-addons">
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
      </div> */}
                  <div className="box is-flex is-justify-content-center ">
                     <div className="table-container">
                        <table className="table is-fullwidth is-narrow is-size-6 has-text-weight-semibold">
                           <thead>
                              <tr>
                                 <th id="razonsocial"><a onClick={() => this.sortingClientes('razonsocial')} className="has-text-black is-unselectable">Razon Social<span className="icon"><i className="fas"></i></span></a>
                                    <div className="filtering"><input name="razonsocial" type="text" className="input is-small filtering" defaultValue={this.state.razonsocial} onChange={(e) => this.handleChangeInput(e)} /></div>
                                 </th>
                                 <th id="rut"><a onClick={() => this.sortingClientes('rut')} className="has-text-black is-unselectable">RUT<span className="icon"><i className="fas"></i></span></a>
                                    <div><input name="rut" type="text" className="input is-small filtering" value={this.state.rut} onChange={(e) => this.handleChangeInput(e)} /></div>
                                 </th>
                                 <th id="ubicacion"><a onClick={() => this.sortingClientes('ubicacion')} className="has-text-black is-unselectable">Casa Matriz<span className="icon"><i className="fas"></i></span></a>
                                    <div><input name="ubicacion" type="text" className="input is-small filtering" value={this.state.ubicacion} onChange={(e) => this.handleChangeInput(e)} /></div>
                                 </th>
                                 <th id="contacto"><a onClick={() => this.sortingClientes('contacto')} className="has-text-black is-unselectable">Contacto<span className="icon"><i className="fas"></i></span></a>
                                    <div><input name="contacto" type="text" className="input is-small filtering" value={this.state.contacto} onChange={(e) => this.handleChangeInput(e)} /></div>
                                 </th>
                                 <th id="createdat"><a onClick={() => this.sortingClientes('createdat')} className="has-text-black is-unselectable">Creado<span className="icon"><i className="fas"></i></span></a>
                                    <div><input name="createdat" type="text" className="input is-small filtering" placeholder="aaaa-mm-dd" value={this.state.createdat} onChange={(e) => this.handleChangeInput(e)} /></div>
                                 </th>
                                 <th colSpan="2">
                                    <div className="flex-container-buscar"><button className="button is-info buscar" onClick={this.createQuery}><span className="icon"><i className="fas fa-search"></i></span><span>Buscar</span></button></div>
                                 </th>
                              </tr>
                           </thead>
                           <tbody>
                              {/* {console.log(this.state.data, 'pre client component @JsonCliente')} */}
                              <Cliente
                                 clientes={this.state.actualData}
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
                  <span>Clientes por Pagina: </span><select className="select" value={this.state.clientesPerPage} onChange={this.changeClientesPerPage}>
                     <option defaultValue value="5">5</option>
                     <option value="10">10</option>
                     <option value="20">20</option>
                  </select>
                  <Pagination itemsPerPage={this.state.clientesPerPage} totalItems={this.state.data.length} paginate={this.paginate} currentPage={this.state.currentPage} />
               </div>
            </div>
            <div className="is-flex is-justify-content-center">{this.state.notification}</div>
         </>
      );
   }
}



export default JsonCliente;
