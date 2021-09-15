import React, { Component } from 'react';
import ProductosData from './Prod_Components/ProductosData'
import ProductoCreate from "./Prod_Components/ProductoCreate";
import ProductoForm from "./Prod_Components/ProductoForm";
import ProductoFilterDrop from './Prod_Components/ProductoFilterDrop';
import { json } from 'body-parser';
import Filter from './Filter';
import ProductModal from './Prod_Components/ProductModal';
// import PropTypes from 'prop-types';
const JSONDATA = require('./Prod_Components/jsonexample.json')
const initialState = {
   isFormVisible: false,
   testInput: "",
   testInput2: "",
   productType: "",
   dataFetched: {},
   loading: true,
   headers: ["loading"],
   itemsData: [],
   productOption: "",
   creationObject: {},
   isAnUpdate: false,
   isAnEye: false,
   productUpdate: {},
   optionsList: [],
   query: "",
   prevItems: []
}

class ProductosUI extends Component {

   constructor(props) {
      super(props)
      // this.quitarFormulario = this.quitarFormulario.bind(this)
      this.handleDropdownChange = this.handleDropdownChange.bind(this)
      // this.handleCreationForm = this.handleCreationForm.bind(this)
      this.state = initialState
   }


   // componentDidUpdate(pp, prevState) {
   //    if (this.state.productType !== prevState.productType) {

   //       this.fetchData(this.state.productType).then(
   //          () => { console.log(this.state.dataFetched) }
   //       )

   //    }

   // }

   fetchData = async (productType) => {
      // this.setState({ loading: true })

      const results = await fetch(`/producto/${productType}`).then(res => res.json()).then(data => {
         const { result, headers } = data
         console.log(result, 'result')
         let newItems = [];
         for (const { item: n, description: d } of result) {
            Object.assign(n, { description: d });
            newItems.push(n)
         }
         console.log(newItems)

         this.setState({ dataFetched: data, headers: headers, itemsData: newItems, loading: false })
      })

   }
   // const[options, setOptions] = useState([]);
   loadOptions = async () => {
      this.setState({ loading: true })
      let result = await fetch('/producto/option').then(res => res.json())
      // console.log(result, 'result fetch options')
      this.setState({ optionsList: result, loading: false })


   }
   // useEffect(() => {
   //    loadOptions()
   //    return () => {

   //    };
   // }, []);

   handleInput = (e) => {
      this.setState({ testInput: e.target.value })
   }

   handleSelection = (e) => {
      this.setState({ productOption: e.target.value },
         // () => { console.log(this.state.productOption) }
      )
   }

   mostrarFormulario = () => {
      this.setState({ isFormVisible: !this.state.isFormVisible }, () => {
         //  console.log(this.state.isFormVisible) 
      })
   }

   handleDropdownChange = (e) => {
      this.setState({ loading: true })
      this.setState({ productType: e.target.id }, () => {
         document.getElementById(e.target.id).classList.add('is-active')
         this.fetchData(this.state.productType).then(
            () => { }
         )

      })
      if (this.state.productType !== "") {
         document.getElementById(this.state.productType).classList.remove('is-active')

      }
   }

   handleCreationForm = (product) => {
      this.setState({ creationObject: product }, () => {

         product.generic
            ? this.createGenericProduct()
            // ? console.log(product)
            : this.createProduct()

         this.setState({ productOption: "" })
      })
   }
   createGenericProduct = async () => {
      const result = await fetch(`/producto/generic`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(this.state.creationObject)
      }).then(res => res.json()).catch(e => alert(e))
      // console.log(result)

      this.setState({ isFormVisible: false, creationObject: {}, productOption: "" }, () => { this.loadOptions() })

   }
   createProduct = async () => {
      const result = await fetch(`/producto/${this.state.productOption}`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(this.state.creationObject)
      }).then(res => res.json()).catch(e => alert(e))
      // console.log(result)
      this.setState({ isFormVisible: false, creationObject: {} })


   }
   handleEdit = async (e, id) => {
      console.log(this.state.productOption, this.state.productType, 'handleEdit')
      const result = await fetch(`/producto/${this.state.productType}/${id}`).then(res => res.json())
      this.setState({ isAnUpdate: true, isFormVisible: true, productOption: this.state.productType.includes('generic') ? this.state.productType.split('/')[1].toString() : this.state.productType, productUpdate: result })
      console.log(this.state.productOption, this.state.productType, 'handleEdit2')

   }
   handleEye = async (e, id) => {
      console.log(this.state.productOption, this.state.productType, 'handleEye')
      const result = await fetch(`/producto/${this.state.productType}/${id}`).then(res => res.json())
      this.setState({ isAnEye: true, isAnUpdate: true, productOption: this.state.productType.includes('generic') ? this.state.productType.split('/')[1].toString() : this.state.productType, productUpdate: result })
      console.log(this.state.productOption, this.state.productType, 'handleEye')

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
      }).then(res => res.json).then(data => { })
   }

   handleRemove = async (e, id) => {
      const results = await fetch(`/producto/${this.state.productType}/${id}`, {
         method: 'DELETE'
      }).then(result => result.json()).then(() => this.fetchData(this.state.productType))

      // console.log(results)

   }
   /////////////////Search Function/////////////////

   // Array.filter((el) => { return Object.values(el).toString().toLowerCase().indexOf('ddr4'.toLowerCase()) > -1 })
   handleQuery = (e) => {
      this.setState(prevState => { if (prevState.query == "") { return { query: e.target.value, prevItems: prevState.itemsData } } else { return { query: e.target.value } } }, () => { this.handleFilter() })
   }
   itemFilter = (itemArray) => {
      return itemArray.filter((el) => { return Object.values(el).toString().toLowerCase().indexOf(this.state.query.toLowerCase()) > -1 })
   }
   handleFilter = (prevState) => {
      console.log(prevState)
      const initialItems = [...this.state.prevItems]
      let newItems = this.itemFilter(initialItems)
      // console.log(newItems)
      this.setState({ itemsData: this.state.query == "" ? this.state.prevItems : newItems })
   }

   //////////////////Sort Function//////////////////

   dynamicSort(property) {
      // console.log(property);
      let sortOrder = 1;
      if (property[0] === "-") {
         sortOrder = -1;
         property = property.substr(1);
      }
      if (!property.includes(">")) {
         return function (a, b) {
            let result =
               a[property] == b[property] ? 0 : a[property] < b[property] ? -1 : 1;
            return result * sortOrder;
         };
      } else {
         property = property.substr(1);
         return function (a, b) {
            let result =
               a["body"][property] == b["body"][property]
                  ? 0
                  : a["body"][property] < b["body"][property]
                     ? -1
                     : 1;
            return result * sortOrder;
         };
      }
   }
   sortingData = (property) => {
      let newItems = [...this.state.itemsData]
      newItems.sort(this.dynamicSort(property))
      console.log(newItems, property)
      // console.log(property != "" ? true : false)
      this.setState({ itemsData: property == "" ? this.state.itemsData : newItems })

   }

   closeModal = () => {
      this.setState({ isAnEye: initialState.isAnEye, isAnUpdate: initialState.isAnUpdate, isFormVisible: initialState.isFormVisible, productOption: initialState.productOption, productUpdate: initialState.productUpdate })
   }

   render() {

      return (
         <>
            {this.state.isAnEye ? <ProductModal closeModal={this.closeModal} productOption={this.state.productOption} handleSelection={this.handleSelection} handleCreationForm={this.handleCreationForm} isAnEye={this.state.isAnEye} isAnUpdate={this.state.isAnUpdate} productUpdate={this.state.productUpdate} handleUpdate={this.handleUpdate} loadOptions={this.loadOptions} options={this.state.optionsList} loading={this.state.loading} /> : ""}
            <div className="container is-fluid">
               <div className="box">
                  <h1 className="title"> Productos</h1>
                  <ProductoFilterDrop productType={this.state.productType} handleDropdownChange={this.handleDropdownChange} loadOptions={this.loadOptions} options={this.state.optionsList} />
                  {this.state.productType != "" ? <Filter query={this.state.query} handleQuery={this.handleQuery} handleFilter={this.handleFilter} /> : ""}
                  {this.state.productType != "" ? <ProductosData sortingData={this.sortingData} productType={this.state.productType} loading={this.state.loading} data={this.state.itemsData} headers={this.state.headers} handleEdit={this.handleEdit} handleRemove={this.handleRemove} handleEye={this.handleEye} /> : ""}
                  {/* {this.state.productType != "" && this.state.isAnUpdate == false ? <ProductosData productType={this.state.productType} loading={this.state.loading} data={this.state.itemsData} headers={this.state.headers} handleEdit={this.handleEdit} handleRemove={this.handleRemove} /> : ""} */}
                  {/* <ProductosData data={JSONDATA.map(e => e.item)} descriptions={JSONDATA.map(e => e.description)} /> */}
                  <ProductoCreate mostrarFormulario={this.mostrarFormulario} isFormVisible={this.state.isFormVisible} handleInput={(e) => { this.handleInput(e) }} testInput={this.state.testInput} />
                  {this.state.isFormVisible ? <ProductoForm productOption={this.state.productOption} handleSelection={this.handleSelection} handleCreationForm={this.handleCreationForm} isAnEye={this.state.isAnEye} isAnUpdate={this.state.isAnUpdate} productUpdate={this.state.productUpdate} handleUpdate={this.handleUpdate} loadOptions={this.loadOptions} options={this.state.optionsList} loading={this.state.loading} /> : ""}
                  {/* <progress className="progress is-info" max="100"></progress> */}

               </div>
            </div>
         </>
      );
   }
}





export default ProductosUI;
