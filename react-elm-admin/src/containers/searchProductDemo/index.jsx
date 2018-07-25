import React from 'react';
import './index.scss';
import {
	Input,Checkbox
} from 'antd';

export default class SearchProductDemo extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
			var PRODUCTS = [{
				category: 'Sporting Goods',
				price: '$49.99',
				stocked: true,
				name: 'Football'
			},
			{
				category: 'Sporting Goods',
				price: '$9.99',
				stocked: true,
				name: 'Baseball'
			},
			{
				category: 'Sporting Goods',
				price: '$29.99',
				stocked: false,
				name: 'Basketball'
			},
			{
				category: 'Electronics',
				price: '$99.99',
				stocked: true,
				name: 'iPod Touch'
			},
			{
				category: 'Electronics',
				price: '$399.99',
				stocked: false,
				name: 'iPhone 5'
			},
			{
				category: 'Electronics',
				price: '$199.99',
				stocked: true,
				name: 'Nexus 7'
			}
		];
		return ( 
			<FilterableProductTable products = {PRODUCTS}/>
		);
	}
}
export class FilterableProductTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filterText:'',
			inStockOnly:false
		}
		this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
		this.handleInStockInput = this.handleInStockInput.bind(this);
	}
	handleFilterTextInput(val){
		this.setState({
			filterText:val,
		})
	}
	handleInStockInput(val){
		this.setState({
			inStockOnly:val,
		})
	}
	render() {
		return (
			<div>
				<SearchBar  
				filterText={this.state.filterText}
				inStockOnly={this.state.inStockOnly}
				onFilterTextInput={this.handleFilterTextInput}
				onInStockInput={this.handleInStockInput} />
				<ProductTable 
				filterText={this.state.filterText}
				inStockOnly={this.state.inStockOnly}
				products={this.props.products} />
			</div>
		)
	}
}
export class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.onFilterSearchTextInput = this.onFilterSearchTextInput.bind(this);
		this.onInStockSearchInput = this.onInStockSearchInput.bind(this);
	}
	onFilterSearchTextInput(e){
		this.props.onFilterTextInput(e.target.value)
	}
	onInStockSearchInput(e){
		this.props.onInStockInput(e.target.checked)
	}
	render() {
		return (
			<div>
				<Input placeholder='search...' value={this.props.filterText}  onChange={this.onFilterSearchTextInput}/>
				<br/>
				<Checkbox checked={this.props.inStockOnly}  onChange={this.onInStockSearchInput}>Only show products in stock</Checkbox>
			</div>
		)
	}
}
export class ProductTable extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let rows_data =[],category = '';
		this.props.products.forEach((item,index)=>{
			if (item.name.indexOf(this.props.filterText) === -1 || (!item.stocked && this.props.inStockOnly)) {
				return;
			}
			if(category!==item.category){
				rows_data.push(
				<tr key={index+'key'} style={{color:'green'}}>
					<td colSpan="2">{item.category}</td>
				</tr>)
			}
			rows_data.push(
				<ProductRow key={index+'ProductRow'} product={item} />
			)
			category = item.category;
		});
		return (
			<div id="SearchProductDemo">
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody>
						{rows_data}
					</tbody>
				</table>
			</div>
		)
	}
}
class ProductRow extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		var name = this.props.product.stocked ?
		this.props.product.name :
		<span style={{color: 'red'}}>
			{this.props.product.name}
		</span>;
		return(
			<tr>
				<td>{name}</td>
				<td>{this.props.product.name}</td>
			</tr>
		)
	}
}