import React, { Component } from "react";
import ProductosData from "./Prod_Components/ProductosData";
import ProductoCreate from "./Prod_Components/ProductoCreate";
import ProductoForm from "./Prod_Components/ProductoForm";
import ProductoFilterDrop from "./Prod_Components/ProductoFilterDrop";
import Filter from "./Filter";
import ProductModal from "./Prod_Components/ProductModal";
import PropTypes from 'prop-types';
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
  prevItems: [],
};

class ProductosUI extends Component {
  constructor(props) {
    super(props);
    // this.quitarFormulario = this.quitarFormulario.bind(this)
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    // this.handleCreationForm = this.handleCreationForm.bind(this)
    this.state = initialState;
  }

  fetchData = async (productType) => {
    // this.setState({ loading: true })

    await fetch(`/producto/${productType}`)
      .then((res) => res.json())
      .then((data) => {
        const { result, headers } = data;
        console.log(Boolean(result), "result");
        let newItems = [];
        if (result) {
          for (const { item: n, description: d } of result) {
            console.log(n, "n");
            console.log(d, "d");
            Object.assign(n, { description: d });
            newItems.push(n);
          }
        }
        console.log(newItems, "new items");

        this.setState({
          dataFetched: data,
          headers: headers,
          itemsData: newItems,
          loading: false,
        });
      });
  };
  // const[options, setOptions] = useState([]);
  loadOptions = async () => {
    this.setState({ loading: true });
    let result = await fetch("/producto/types").then((res) => res.json());
    // console.log(result, 'result fetch options')
    this.setState({ optionsList: result, loading: false });
  };

  handleInput = (e) => {
    this.setState({ testInput: e.target.value });
  };

  handleSelection = (e) => {
    this.setState(
      { productOption: e.target.value }
      // () => { console.log(this.state.productOption) }
    );
  };

  mostrarFormulario = () => {
    this.setState({ isFormVisible: !this.state.isFormVisible }, () => {
      //  console.log(this.state.isFormVisible)
    });
  };

  handleDropdownChange = (e) => {
    this.setState({ loading: true, isFormVisible: false });
    this.setState({ productType: e.target.id }, () => {
      // document.getElementById(e.target.id).classList.add("is-active");
      this.fetchData(this.state.productType).then(() => {});
    });
    if (this.state.productType !== "") {
      document
        .getElementById(this.state.productType)
        .classList.remove("is-active");
    }
  };

  handleCreationForm = (product) => {
    this.setState({ creationObject: product }, () => {
      this.state.productOption == "types"
        ? this.createProduct()
        : this.createGenericProduct();
      this.setState({ productOption: "" });
    });
  };
  createGenericProduct = async () => {
    await fetch(`/producto/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.creationObject),
    })
      .then((res) => res.json())
      .catch((e) => alert(e));
    // console.log(result)

    this.setState(
      {
        isFormVisible: false,
        creationObject: {},
        productOption: "",
        productType: "",
      },
      () => {
        this.loadOptions();
      }
    );
  };
  createProduct = async () => {
    await fetch(`/producto/${this.state.productOption}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.creationObject),
    })
      .then((res) => res.json())
      .catch((e) => alert(e));
    // console.log(result)
    this.setState({
      isFormVisible: false,
      creationObject: {},
      productType: "",
    });
    this.loadOptions();
  };
  handleEdit = async (e, id) => {
    console.log(this.state.productOption, this.state.productType, "handleEdit");
    const result = await fetch(
      `/producto/${this.state.productType}/${id}`
    ).then((res) => res.json());
    this.setState({
      isAnUpdate: true,
      isFormVisible: true,
      productOption: this.state.productType,
      productUpdate: result,
    });
    console.log(
      this.state.productOption,
      this.state.productType,
      "handleEdit2"
    );
  };
  handleEye = async (e, id) => {
    console.log(this.state.productOption, this.state.productType, "handleEye");
    const result = await fetch(
      `/producto/${this.state.productType}/${id}`
    ).then((res) => res.json());
    this.setState({
      isAnEye: true,
      isAnUpdate: true,
      productOption: this.state.productType,
      productUpdate: result,
    });
    console.log(this.state.productOption, this.state.productType, "handleEye");
  };

  handleUpdate = (product) => {
    this.setState({ creationObject: product }, () => {
      // console.log(this.state.creationObject)
      this.updateProduct(this.state.productUpdate._id);
    });
  };
  updateProduct = async (id) => {
    await fetch(`/producto/${this.state.productType}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.creationObject),
    }).then((res) => res.json);
    this.setState({
      isFormVisible: false,
      creationObject: {},
      productOption: "",
      isAnUpdate: initialState.isAnUpdate,
    });
    this.fetchData(this.state.productType);
  };

  handleRemove = async (e, id) => {
    await fetch(`/producto/${this.state.productType}/${id}`, {
      method: "DELETE",
    })
      .then((result) => result.json())
      .then(() => this.fetchData(this.state.productType));

    // console.log(results)
  };
  /////////////////Search Function/////////////////

  // Array.filter((el) => { return Object.values(el).toString().toLowerCase().indexOf('ddr4'.toLowerCase()) > -1 })
  handleQuery = (e) => {
    this.setState(
      (prevState) => {
        if (prevState.query == "") {
          return { query: e, prevItems: prevState.itemsData };
        } else {
          return { query: e };
        }
      },
      () => {
        this.handleFilter();
      }
    );
  };
  itemFilter = (itemArray) => {
    return itemArray.filter((el) => {
      return (
        Object.values(el)
          .toString()
          .toLowerCase()
          .indexOf(this.state.query.toLowerCase()) > -1
      );
    });
  };
  handleFilter = (prevState) => {
    console.log(prevState);
    const initialItems = [...this.state.prevItems];
    let newItems = this.itemFilter(initialItems);
    // console.log(newItems)
    this.setState({
      itemsData: this.state.query == "" ? this.state.prevItems : newItems,
    });
  };

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
    let newItems = [...this.state.itemsData];
    newItems.sort(this.dynamicSort(property));
    console.log(newItems, property);
    // console.log(property != "" ? true : false)
    this.setState({
      itemsData: property == "" ? this.state.itemsData : newItems,
    });
  };

  closeModal = () => {
    this.setState({
      isAnEye: initialState.isAnEye,
      isAnUpdate: initialState.isAnUpdate,
      isFormVisible: initialState.isFormVisible,
      productOption: initialState.productOption,
      productUpdate: initialState.productUpdate,
    });
  };
  resetForm = () => {
    this.setState({
      isAnUpdate: initialState.isAnUpdate,
      isFormVisible: initialState.isFormVisible,
      productOption: initialState.productOption,
      productUpdate: initialState.productUpdate,
    });
  };

  render() {
    return (
      <>
        {this.state.isAnEye && (
          <ProductModal
            closeModal={this.closeModal}
            productOption={this.state.productOption}
            handleSelection={this.handleSelection}
            handleCreationForm={this.handleCreationForm}
            isAnEye={this.state.isAnEye}
            isAnUpdate={this.state.isAnUpdate}
            productUpdate={this.state.productUpdate}
            handleUpdate={this.handleUpdate}
            loadOptions={this.loadOptions}
            options={this.state.optionsList}
            loading={this.state.loading}
          />
        )}
        <div className="container is-fluid">
          <div className="box">
            <h1 className="title"> Productos</h1>

            <div className="level">
              <div className="level-left">
                <ProductoFilterDrop
                  productType={this.state.productType}
                  handleDropdownChange={this.handleDropdownChange}
                  loadOptions={this.loadOptions}
                  options={this.state.optionsList}
                />
              </div>
              {this.props.accessProductos[2] && <div className="level-right">
                <ProductoCreate
                  mostrarFormulario={this.mostrarFormulario}
                  isFormVisible={this.state.isFormVisible}
                  handleInput={(e) => {
                    this.handleInput(e);
                  }}
                  testInput={this.state.testInput}
                />
              </div>}
            </div>

            {this.state.productType != "" && !this.state.isFormVisible && (
              <div className="block box">
                <Filter
                  query={this.state.query}
                  setQuery={this.handleQuery}
                  handleFilter={this.handleFilter}
                />
              </div>
            )}
            {this.state.productType != "" && !this.state.isFormVisible && (
              <div className="block box">
                <ProductosData
                  sortingData={this.sortingData}
                  productType={this.state.productType}
                  loading={this.state.loading}
                  data={this.state.itemsData}
                  headers={this.state.headers}
                  handleEdit={this.handleEdit}
                  handleRemove={this.handleRemove}
                  handleEye={this.handleEye}
                  accessProductos={this.props.accessProductos}
                />
              </div>
            )}
            {/* {this.state.productType != "" && this.state.isAnUpdate == false ? <ProductosData productType={this.state.productType} loading={this.state.loading} data={this.state.itemsData} headers={this.state.headers} handleEdit={this.handleEdit} handleRemove={this.handleRemove} /> : ""} */}
            {/* <ProductosData data={JSONDATA.map(e => e.item)} descriptions={JSONDATA.map(e => e.description)} /> */}

            {this.state.isFormVisible && (
              <ProductoForm
                productOption={this.state.productOption}
                handleSelection={this.handleSelection}
                handleCreationForm={this.handleCreationForm}
                isAnEye={this.state.isAnEye}
                isAnUpdate={this.state.isAnUpdate}
                productUpdate={this.state.productUpdate}
                resetForm={this.resetForm}
                handleUpdate={this.handleUpdate}
                loadOptions={this.loadOptions}
                options={this.state.optionsList}
                loading={this.state.loading}
              />
            )}
            {/* <progress className="progress is-info" max="100"></progress> */}
          </div>
        </div>
      </>
    );
  }
}

ProductosUI.propTypes = {
  accessProductos: PropTypes.arrayOf(PropTypes.bool).isRequired
}

export default ProductosUI;
