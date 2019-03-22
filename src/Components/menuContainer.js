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

// temporary stuff using Egill's token
const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5qY3pOVEV6T1RKRE4wTXlRMEZDTURJeE56TTVRMEU1UWpaRk5qWTROVE5FUXpSQ09EUXhNQSJ9.eyJnaXZlbl9uYW1lIjoiRWdpbGwiLCJmYW1pbHlfbmFtZSI6IkhyZWluc3NvbiIsIm5pY2tuYW1lIjoiZWdpbGxoMjEwIiwibmFtZSI6IkVnaWxsIEhyZWluc3NvbiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vLTVZVmVodUQ1QXRRL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFjL1R6UG1fV3duSElJL3Bob3RvLmpwZyIsImxvY2FsZSI6ImlzIiwidXBkYXRlZF9hdCI6IjIwMTktMDMtMTlUMTc6NTA6NTkuMjk2WiIsImVtYWlsIjoiZWdpbGxoMjEwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2Rldi1mNG5jNzI0ZC5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDcwNjk4Mjc2ODMzNzc5MzY0MzQiLCJhdWQiOiJQUWhzdXlTd3c3cWNBbnlMUmFWbGQxTzVmWXh6UjhCYiIsImlhdCI6MTU1MzAxNzg2MCwiZXhwIjoxNTUzMDUzODYwLCJhdF9oYXNoIjoia3RFekhacE9hRGd4NFNScVJEYmdfdyIsIm5vbmNlIjoiNzZYcm9Hdlh4dFU2Uzl6M2NmOHBUWDdJTzAwbDgyeUQifQ.4QuX5elDwvi3N23NhzONjqZ6f2rMkVsVllEsko7q5wh2CtLeAUwY8dCjxgNXXFAPFWJKoTrpcRO2U9lQFoKDvxT6aOr2NQbw4nUGoPDFTrZ7u3TstEDc-ARdYQd05-cXtisuRxeFOfOSz30-Oft5-5AOxrfoU9ZNN5wJc2UkCPDZbFyR2McDYQR6I5C8fp9FZI3AXuTsDDAS4zZPIY63fz1y-uTRoVQSHVVPVLQT88Uymns9UBj79pMZJYuS-hdOH4-wkpUdjCaHbRBkSaw495YFcKXILjc8l9sM2oKc3ngb6OgLyNPaguyiFfHM-gsU460jMszgse7lZJPwEflRiA';
const BAR_ID = '7qvPtpnc7';
const SERVER_ADDRESS = `/owner/bars/${BAR_ID}/menus`;

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

  onConfirm = async (e) => {
    e.preventDefault();
    const { json, menuName } = this.state;
    if (json.length < 1 || menuName.length < 1) {
      alert('Error: Please ensure that you submit both a menu and name.'); // eslint-disable-line no-alert
      return 1;
    }
    const newMenu = { name: menuName, categories: json };
    const result = await fetch(
      SERVER_ADDRESS, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMenu),
      },
    );
    console.log('Response: ', result.status); // eslint-disable-line no-console
    return 0;
  }

  renderMenu = (jsonMenu) => {
    const renderCategory = category => (
      <div key={category.name}>
        <div className="category__title">{category.name}</div>
        {category.items.map(item => (
          <div className="category__listitem" key={item.name}>
            {`${item.name} ${Number(item.price).toFixed(2)}`}
          </div>
        ))}
      </div>
    );

    const renderedMenu = jsonMenu.map(renderCategory);
    return renderedMenu;
  }

  render() {



    const { json } = this.state;

    return (
      <div className="menuContainer">

      {this.state.barData ? this.state.barData.map((item, i) => <MenuListItem key={i} data={item}/>) : null}

        <form>
          <input type="text" placeholder="Name" onChange={this.onChangeName} />
          <input type="file" name="file" onChange={this.onFileChange} />
          <input type="submit" value="Submit" onClick={this.onSubmit} />
          <input type="submit" value="Confirm" onClick={this.onConfirm} />
        </form>
        <div>
          {this.renderMenu(json)}
        </div>
      </div>
    );
  }
}

export default MenuContainer;
