import React, { Component } from 'react';
import ProductosData from './Prod_Components/ProductosData'
import ProductoCreate from "./Prod_Components/ProductoCreate";
import ProductoForm from "./Prod_Components/ProductoForm";
import ProductoFilterDrop from './Prod_Components/ProductoFilterDrop';
import { json } from 'body-parser';
// import PropTypes from 'prop-types';
const JSONDATA = require('./Prod_Components/jsonexample.json')

class ProductosUI extends Component {
   constructor(props) {
      super(props)
      // this.quitarFormulario = this.quitarFormulario.bind(this)
      this.handleDropdownChange = this.handleDropdownChange.bind(this)
      // this.handleCreationForm = this.handleCreationForm.bind(this)
      this.state = {
         isFormVisible: false,
         testInput: "",
         testInput2: "",
         productType: "",
         dataFetched: "",
         loading: true,
         headers: ["loading"],
         itemsData: "",
         productOption: "",
         creationObject: { },
         isAnUpdate: false,
         productUpdate: { },
      }
   }
   componentDidUpdate(pp, prevState) {
      if (this.state.productType !== prevState.productType) {

         this.fetchData(this.state.productType).then(
            () => { console.log(this.state.dataFetched) }
         )
         // this.fetchData(this.state.productType).then(res => { this.setState({ dataFetched: res }) })
         // console.log(true, prevState.productType, this.state.productType)
      }
      // else { console.log(false, prevState.productType, this.state.productType) }
   }

   fetchData = async (productType) => {

      const results = await fetch(`/producto/${productType}`).then(res => res.json()).then(data => {
         const { result, headers } = data
         this.setState({ dataFetched: data, headers: headers, itemsData: result, loading: false })
      })

   }

   handleInput = (e) => {
      this.setState({ testInput: e.target.value })
   }

   handleSelection = (e) => {
      this.setState({ productOption: e.target.value }, () => { console.log(this.state.productOption) })
   }

   mostrarFormulario = () => {
      this.setState({ isFormVisible: !this.state.isFormVisible }, () => { console.log(this.state.isFormVisible) })
   }

   handleDropdownChange = (e) => {
      this.setState({ loading: true })
      this.setState({ productType: e.target.id }, () => {
         document.getElementById(e.target.id).classList.add('is-active')
      })
      if (this.state.productType !== "") {
         document.getElementById(this.state.productType).classList.remove('is-active')

      }
   }

   handleCreationForm = (product) => {
      this.setState({ creationObject: product }, () => {
         // console.log(this.state.creationObject)
         this.createProduct()
      })
   }
   createProduct = async () => {
      const result = await fetch(`/producto/${this.state.productOption}`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(this.state.creationObject)
      }).then(res => res.json()).catch(e => alert(e))
      console.log(result)
      this.setState({ isFormVisible: false, creationObject: { } })


   }
   handleEdit = async (e, id) => {
      const result = await fetch(`/producto/${this.state.productType}/${id}`).then(res => res.json())
      this.setState({ isAnUpdate: true, isFormVisible: true, productOption: this.state.productType, productUpdate: result })

   }

   handleUpdate = (product) => {
      this.setState({ creationObject: product }, () => {
         // console.log(this.state.creationObject)
         this.updateProduct(this.state.productUpdate._id)
      })
   }
   updateProduct = async (id) => {
      const result = await fetch(`/producto/${this.state.productType}/${id}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(this.state.creationObject)
      }).then(res => res.json).then(data => { console.log(data) })
   }

   handleRemove = async (e, id) => {
      const results = await fetch(`/producto/${this.state.productType}/${id}`, {
         method: 'DELETE'
      }).then(result => result.json()).then(() => this.fetchData(this.state.productType))

      console.log(results)

   }

   render() {

      return (
         <>
            <div className="container is-fluid">
               <div className="box">
                  <h1 className="title"> Productos</h1>
                  <ProductoFilterDrop productType={this.state.productType} handleDropdownChange={this.handleDropdownChange} />
                  {this.state.productType != "" ? <ProductosData productType={this.state.productType} loading={this.state.loading} data={this.state.itemsData} headers={this.state.headers} handleEdit={this.handleEdit} handleRemove={this.handleRemove} /> : ""}
                  {/* {this.state.productType != "" && this.state.isAnUpdate == false ? <ProductosData productType={this.state.productType} loading={this.state.loading} data={this.state.itemsData} headers={this.state.headers} handleEdit={this.handleEdit} handleRemove={this.handleRemove} /> : ""} */}
                  {/* <ProductosData data={JSONDATA.map(e => e.item)} descriptions={JSONDATA.map(e => e.description)} /> */}
                  <ProductoCreate mostrarFormulario={this.mostrarFormulario} isFormVisible={this.state.isFormVisible} handleInput={(e) => { this.handleInput(e) }} testInput={this.state.testInput} />
                  {this.state.isFormVisible ? <ProductoForm productOption={this.state.productOption} handleSelection={this.handleSelection} handleCreationForm={this.handleCreationForm} isAnUpdate={this.state.isAnUpdate} productUpdate={this.state.productUpdate} handleUpdate={this.handleUpdate} /> : ""}
                  {/* <progress className="progress is-info" max="100"></progress> */}
               </div>
            </div>
         </>
      );
   }
}





export default ProductosUI;
