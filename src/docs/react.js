class Button extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            caption: props.caption,
            func: props.func,
            message: "",
            image: {}
        }
        this.func = this.func.bind(this);
    }

    func() {
        this.state.func()
            .then(message => {
                console.log(message.data);
                this.setState({ color: 'green', message: `${message.status} ${message.statusText}` })
            })
            .catch(message => {
                //console.log(message.request);
                this.setState({ color: 'red', message: message.request.responseText })
            })
    }

    render() {
        return (
            <div>
                <button onClick={() => this.func()}>{this.state.caption}</button>
                <input type='text' style={{ color: this.state.color, width: '500px' }} value={this.state.message} />
            </div>
        );
    }
}

class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            user: {
                name: "batman2",
                email: 'batman2@gmail.com',
                password: 'batman2'
            },
            division: {
                code: ""
            },
            item: {
                code: ""
            },
            selectedFile: {},
            items: [],
            categories: [],
            token: ''
        }
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
        this.getDivision = this.getDivision.bind(this);
        this.retrieveItem = this.retrieveItem.bind(this);
    }

    signup() {
        return axios.post('/signup',
            this.state.user);
    }

    registerDivision() {
        return axios.post('/newdivision',
            {
                code: "Avengers",
                contact: "spiderman@gmail.com"
            });
    }

    getDivision() {
        this.login()
            .then(user => {
                console.log(user.data);
                axios.post('/division',
                    {
                        id: user.data.mainDivision
                    })
                    .then(division => {
                        this.setState({ division: division.data.token })
                    });
            });
    }

    login() {
        return axios.post('/login',
            {
                email: this.state.user.email,
                password: this.state.user.password
            })
            .then(response => {
                console.log(response);
                this.setState({token:response.data.token});
            });
    }

    addCategory() {
        let category = {
            division: this.state.division._id,
            code: "Cat2",
            description: "First category",
            status: "Active",
            imageUrl: "",
            image: ""
        }

        return axios.post('/category/create', category);
    }

    getCategory() {
        let category = {
            division: this.state.division._id,
        }

        return axios.post('/category/search', category);
    }

    deleteCategory() {
        let category = {
            division: this.state.division._id
        }

        return axios.post('/category/delete', category);
    }

    retrieveCategory() {
        let body = { division: '5adc0032dd1e8a2814ff2cb0' };
        axios.post('http://localhost:8000/category/search', body)
            .then((response) => {
                let categories = response.data;
                let collection = [];

                categories.map(x => {
                    console.log(x);
                    collection.push(<tr key={x.code}><td>{x.code}</td><td>{x.description}</td><td><img src={"data:image/gif;base64," + x.thumnail} /></td></tr>)
                });

                this.setState({ categories: collection });
            });
    }

    addItem() {
        let category = {
            division: this.state.division._id,
            code: "Cat1"
        }

        axios.post('/category/search', category)
            .then(categories => {
                let category = categories.data[0];
                let item = {
                    division: this.state.division._id,
                    description: "First item",
                    code: "Item1",
                    category: category._id,
                    price: 300,
                    satus: "Active"
                }

                axios.post('/item/create', item)
                    .then((res) =>
                        this.setState({ item: res.data })
                    )
                    .catch(err => {
                        this.setState({ item: { code: err.request.responseText } })
                    });
            })
    }

    // retrieveItem() {
    //     let item = {
    //         division: this.state.division._id,
    //     }

    //     return axios.post('/item/search', item);
    // }

    updateItem() {
        let item = {
            division: this.state.division._id,
            code: "Item1"
        }

        axios.post('/item/search', item)
            .then(item => {
                if (item.data.length >= 0) {
                    let data = item.data[0];
                    data.code = "Item2"
                    axios.post('/item/update', data)
                        .then(item => {
                            console.log(item);
                            this.setState({ item: item });
                        });
                }
            });

    }

    deleteItem() {
        let item = {
            division: this.state.division._id,
            code: "Item1"
        }

        axios.post('/item/search', item)
            .then(item => {
                if (item.data.length >= 0) {
                    let data = item.data[0];
                    axios.post('/item/delete', data)
                        .then(message => {
                            console.log(message.data);
                            this.setState({ item: {} });
                        });
                }
            });
    }

    handleUploadImage(ev) {

        const data = new FormData();
        data.append('data', this.uploadInput.files[0]);
        data.append('name', this.fileName.value);

        fetch('http://localhost:8000/upload', {
            method: 'POST',
            body: data,
        }).then((response) => {
            response.json().then((body) => {
                this.setState({ imageURL: `http://localhost:8000/${body.file}` });
            });
        });

        // axios.post('http://localhost:8000/upload', {
        //     body: data
        // }).then((response) => {
        //     response.json().then((body) => {
        //         this.setState({ imageURL: `http://localhost:8000/${body.file}` });
        //     });
        // });
    }

    retrieveItem() {
        let body = { division: '5adc0032dd1e8a2814ff2cb0', category: "5ae806458ff77628c42271a8" };
        axios(
            {
                method: 'POST',
                url: 'http://localhost:8000/item/search?thumnail=1', 
                headers: {
                    'content-Type': 'application/json',
                    authorization: 'bearer ' + this.state.token
                },
                data:body
            })
            .then((response) => {
                let items = response.data;
                let collection = [];

                items.map(x => {
                    console.log(x);
                    collection.push(<tr key={x.code}><td>{x.code}</td><td>{x.description}</td><td><img src={"data:image/gif;base64," + x.thumnail} /></td></tr>)
                });

                this.setState({ items: collection });
            });

    }

    retrieveItem2() {
        axios.get('http://localhost:8000/action')
            .then((response) => {
                this.setState({ image: "data:image/gif;base64," + response.data });
            });
    }

    createInvoice() {
        let invoice = {
            division: '5adc0032dd1e8a2814ff2cb0',
            name: "batman",
            email: "batman2@hotmail.com",
            address: "street abc",
            lines: [
                {
                    line: 1,
                    item: "itemA",
                    quantity: 3,
                    price: 100
                },
                {
                    line: 2,
                    item: "itemB",
                    quantity: 2,
                    price: 700
                }
            ]
        }

        axios.post('http://localhost:8000/invoice/create', invoice)
            .then(invoice => {
                console.log(invoice);
            });

    }

    updateInvoice() {
        axios.post('http://localhost:8000/invoice/search',
            {
                division: "5adc0032dd1e8a2814ff2cb0",
                invoiceNumber: "17"
            })
            .then((response) => {
                let invoice = response.data;
                let line = invoice.lines[1];
                line.quantity = 2;
                axios.post('http://localhost:8000/invoice/update',
                    invoice
                )
                    .then((response) => console.log(response.data));
            });
    }

    createOrder() {
        let order = {
            division: '5adc0032dd1e8a2814ff2cb0',
            name: "batman",
            email: "batman2@hotmail.com",
            address: "street abc",
            lines: [
                {
                    line: 1,
                    item: "itemA",
                    quantity: 3,
                    price: 100
                },
                {
                    line: 2,
                    item: "itemB",
                    quantity: 2,
                    price: 700
                }
            ]
        }

        axios.post('http://localhost:8000/order/create', order)
            .then(order => {
                console.log(order);
            });


    }

    updateOrder() {
        axios.post('http://localhost:8000/order/search',
            {
                division: "5adc0032dd1e8a2814ff2cb0",
                orderNumber: "12"
            })
            .then((response) => {
                let order = response.data;
                let line = order.lines[1];
                line.quantity = 8;
                axios.post('http://localhost:8000/order/update',
                    order
                )
                    .then((response) => console.log(response.data));
            });
    }

    createInvoiceFromOrder() {

        axios.post('http://localhost:8000/order/search',
            {
                division: "5adc0032dd1e8a2814ff2cb0",
                orderNumber: "13"
            })
            .then((response) => {
                let order = response.data;

                axios.post('http://localhost:8000/invoice/createfromorder',
                    order
                )
                .then((response) => console.log(response.data))
                .catch(err => 
                    console.log(err.response.data)
                );
            });
    }

    render() {
        let data = this.state.data;

        console.log(data);

        return (
            <div>
                <Button func={() => this.signup()} caption='Signup' />
                <Button func={() => this.registerDivision()} caption='Register division' />
                <Button func={() => this.login()} caption='Login' />
                <div>
                    <button onClick={() => this.getDivision()}  >GetDivision</button>
                    <input type='text' style={{ color: 'green', width: '500px' }} readOnly='readOnly' value={this.state.division._id} />
                </div>
                <Button func={() => this.addCategory()} caption='New category' />
                {/* <Button func={() => this.getCategory()} caption='Get category' /> */}
                <div>
                    <button onClick={() => this.retrieveCategory()} >Get categories </button>
                    <table>
                        <tbody>
                            {this.state.categories}
                        </tbody>
                    </table>
                </div>
                <Button func={() => this.deleteCategory()} caption='Delete category' />
                <Button func={() => this.retrieveCategory()} caption='Retrieve category' />
                <div>
                    <button onClick={() => this.addItem()}  >Add Item</button>
                    <input type='text' style={{ color: 'green', width: '500px' }} readOnly='readOnly' value={this.state.item.code} />
                </div>
                <div>
                    <button onClick={() => this.updateItem()}  >Update Item</button>
                    <input type='text' style={{ color: 'green', width: '500px' }} readOnly='readOnly' value={this.state.item.code} />
                </div>                <div>
                    <button onClick={() => this.deleteItem()}  >Delete Item</button>
                    <input type='text' style={{ color: 'green', width: '500px' }} readOnly='readOnly' value={this.state.item.code} />
                </div>
                {/* <Button func={() => this.retrieveItem()} caption='Retrieve item' /> */}
                <div>
                    <button onClick={() => this.retrieveItem()} >Get items </button>
                    <table>
                        <tbody>
                            {this.state.items}
                        </tbody>
                    </table>
                </div>
                <img src={this.state.image} style={{ height: 100, weight: 100 }} />
                <div>
                    <form onSubmit={() => this.handleUploadImage()}>
                        <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                        <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
                        <button >Upload</button>
                    </form>
                </div>
                <button onClick={() => this.createInvoice()}  >Create invoice</button>
                <button onClick={() => this.updateInvoice()}  >Update invoice</button>
                <button onClick={() => this.createOrder()}  >Create order</button>
                <button onClick={() => this.updateOrder()}  >Update order</button>
                <button onClick={() => this.createInvoiceFromOrder()}  >Create invoice from order</button>
            </div>
        );
    }
}

ReactDOM.render(
    <Signup />,
    document.getElementById('app')
);
