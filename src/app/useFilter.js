import { useEffect, useState } from 'react';

export const useFilter = (query, data) => {
   const [filteredData, setFilteredData] = useState(data)


   const filterData = (data) => {
      setFilteredData(data.filter((el) => { return Object.values(el).toString().toLowerCase().indexOf(query.toLowerCase()) > -1 }))
   }

   useEffect(() => {
      filterData(data)
      console.log(query, 'filter query')
      return () => {

      };
   }, [query]);

   // handleQuery = (e) => {
   //    this.setState(prevState => { if (prevState.query == "") { return { query: e.target.value, prevItems: prevState.itemsData } } else { return { query: e.target.value } } }, () => { this.handleFilter() })
   // }
   // itemFilter = (itemArray) => {
   //    return itemArray.filter((el) => { return Object.values(el).toString().toLowerCase().indexOf(this.state.query.toLowerCase()) > -1 })
   // }
   // handleFilter = (prevState) => {
   //    console.log(prevState)
   //    const initialItems = [...this.state.prevItems]
   //    let newItems = this.itemFilter(initialItems)
   //    // console.log(newItems)
   //    this.setState({ itemsData: this.state.query == "" ? this.state.prevItems : newItems })
   // }

   return filteredData;
}


