import React from 'react';
import csv from 'csvtojson';

import MenuListItem from './menuListItem';

const convertToObject = (input) => {
  const categories = {};
  input.forEach((el) => {
    if (!categories[el[2]]) categories[el[2]] = [];
    categories[el[2]].push({ name: el[0], price: el[1] });
  });
  return categories;
};

class MenuContainer extends React.Component {
  state = {
    file: null,
    json: [],
    menuName: '',
    barData: this.props.data,
  }

  onChangeName = (e) => {
    this.setState({
      menuName: e.nativeEvent.target.value,
    });
  }

  onFileChange = (e) => {
    const { files } = e.target;
    this.setState({ file: files[0] });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { file } = this.state;
    if (!file) {
      alert('Error: Please ensure that you submit a csv file.'); // eslint-disable-line no-alert
      return 1;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const binaryStr = reader.result;
      csv({ noheader: false, output: 'csv' })
        .fromString(binaryStr)
        .then((csvRow) => {
          const categoriesArr = [];
          Object.entries(convertToObject(csvRow))
            .forEach(el => categoriesArr.push({ name: el[0], items: el[1] }));
          this.setState({ json: categoriesArr });
        });
    };
    reader.readAsBinaryString(file);
    return 0;
  }

  onConfirm = (e) => {
    e.preventDefault();
    const { json, menuName } = this.state;
    if (json.length < 1 || menuName.length < 1) {
      alert('Error: Please ensure that you submit both a menu and name.'); // eslint-disable-line no-alert
      return 1;
    }
    const newMenu = { name: menuName, categories: json };
    this.props.addMenu(newMenu, this.props.barId)
  }

  // renderMenu = (jsonMenu) => {
  //   const renderCategory = category => (
  //     <div key={category.name}>
  //       <div className="category__title">{category.name}</div>
  //       {category.items.map(item => (
  //         <div className="category__listitem" key={item.name}>
  //           {`${item.name} ${Number(item.price).toFixed(2)}`}
  //         </div>
  //       ))}
  //     </div>
  //   );
  //   const renderedMenu = jsonMenu.map(renderCategory);
  //   return renderedMenu;
  // }

  render() {

    // const { json } = this.state;

    return (
      <div className="menuContainer">

      {this.props.data ? this.props.data.map((item, i) => <MenuListItem key={i} data={item} deleteMenu={this.props.deleteMenu} barId={this.props.barId}/>) : null}

        <form>
          <input type="text" placeholder="Name" onChange={this.onChangeName} />
          <input type="file" name="file" onChange={this.onFileChange} />
          <input type="submit" value="Submit" onClick={this.onSubmit} />
          <input type="submit" value="Confirm" onClick={this.onConfirm} />
        </form>
      </div>
    );
  }
}

export default MenuContainer;
