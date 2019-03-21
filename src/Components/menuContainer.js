/* eslint-disable no-console */
import React from 'react';
import csv from 'csvtojson';

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
const SERVER_PORT = 3001;
const SERVER_ADDRESS = `http://localhost:${SERVER_PORT}/owner/bars/${BAR_ID}/menus`;

class MenuContainer extends React.Component {
  state = {
    file: {},
    json: [],
  }

  handleChange = (files) => {
    this.setState({ file: files[0] });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { file } = this.state;
    const reader = new FileReader();
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
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
  }

  onConfirm = async () => {
    const { json } = this.state;
    const result = await fetch(
      SERVER_ADDRESS, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
      },
    );
    console.log(result);
  }

  onChangeName = () => {
    console.log('added a name');
  }

  computeMenu = (jsonMenu) => {
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
        <form>
          <input type="text" placeholder="Name" onChange={this.onChangeName} />
          <input type="file" name="file" onChange={e => this.handleChange(e.target.files)} />
          <input type="submit" value="Submit" onClick={this.onSubmit} />
          <input type="submit" value="Confirm" onClick={this.onConfirm} />
        </form>
        <div>
          {this.computeMenu(json)}
        </div>
      </div>
    );
  }
}

export default MenuContainer;
