import React, { Component } from 'react';
import ProductosData from './Prod_Components/ProductosData'
import ProductoCreate from "./Prod_Components/ProductoCreate";
import ProductoForm from "./Prod_Components/ProductoForm";
import ProductoFilterDrop from './Prod_Components/ProductoFilterDrop';
// import PropTypes from 'prop-types';
const JSONDATA = require('./Prod_Components/jsonexample.json')

class ProductosUI extends Component {
   constructor(props) {
      super(props)
      // this.quitarFormulario = this.quitarFormulario.bind(this)
      this.handleDropdownChange = this.handleDropdownChange.bind(this)
      this.state = {
         isFormVisible: false,
         testInput: "",
         testInput2: "",
         productType: "",
         dataFetched: "",
         loading: true,
         headers: ["loading"],
         itemsData: "",
         testOption: ""
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
      this.setState({ testOption: e.target.value }, () => { console.log(this.state.testOption) })
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

   render() {

      return (
         <>
            <div className="container is-fluid">
               <div className="box">
                  <h1 className="title"> Productos</h1>
                  <ProductoFilterDrop productType={this.state.productType} handleDropdownChange={this.handleDropdownChange} />
                  {this.state.productType != "" ? <ProductosData productType={this.state.productType} loading={this.state.loading} data={this.state.itemsData} headers={this.state.headers} /> : ""}
                  {/* <ProductosData data={JSONDATA.map(e => e.item)} descriptions={JSONDATA.map(e => e.description)} /> */}
                  <ProductoCreate mostrarFormulario={this.mostrarFormulario} isFormVisible={this.state.isFormVisible} handleInput={(e) => { this.handleInput(e) }} testInput={this.state.testInput} />
                  {this.state.isFormVisible ? <ProductoForm testOption={this.state.testOption} handleSelection={this.handleSelection} /> : ""}
                  {/* <progress className="progress is-info" max="100"></progress> */}
               </div>
            </div>
         </>
      );
   }
}





export default ProductosUI;
