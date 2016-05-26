var React = require('react');
var ReactDOM = require('react-dom');

var ProductCategoryRow = React.createClass({
  render: function() {
    return (<tr><th colSpan="2">{this.props.category}</th></tr>);
  }
});

var ProductRow = React.createClass({
  render: function() {
    if (this.props.product.stocked) {
      var name = this.props.product.name;
    } else {
      var name = <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
    }    

    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
});

var ProductTable = React.createClass({
  render: function() {
    var rows = [];
    var lastCategory = null;
    var filterText = this.props.filterText;
    var inStockOnly = this.props.inStockOnly;

    this.props.products.forEach(function(product) {
      if (product.name.indexOf(filterText) === -1 || (!product.stocked && inStockOnly)) {
        return;
      }
    
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }

      rows.push(<ProductRow product={product} key={product.name} />);

      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

var SearchBar = React.createClass({
  handleChange: function() {
    var filterText = this.refs.filterTextInput.value
    var inStockOnly = this.refs.inStockOnlyInput.checked
    this.props.onUserInput(filterText, inStockOnly);
  },
  render: function() {
    return (
      <form>
        <input
	  type="text"
	  placeholder="Search..."
	  value={this.props.filterText}
	  ref="filterTextInput"
	  onChange={this.handleChange}
	/>
        <p>
          <input
	    type="checkbox"
	    ref="inStockOnlyInput"
	    checked={this.props.inStockOnly}
	    onChange={this.handleChange}
	  />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
});

var FilterableProductTable = React.createClass({
  getInitialState: function() {
    return {
      filterText: '',
      inStockOnly: false
    };
  },
  handleUserInput: function(filterText, inStockOnly) {
    this.setState({
      filterText: filterText,
      inStockOnly: inStockOnly
    });
  },  
  render: function() {
    return(
      <div>
        <SearchBar
	  filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
	  onUserInput={this.handleUserInput}
	/>
	<ProductTable
	  products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}	  
	/>
      </div>
    );
  }
});

var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('app')
);
