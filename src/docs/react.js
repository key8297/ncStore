class Button extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            caption: props.caption,
            func: props.func,
            message: "",
            image:{}
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
                <input type='text' style={{ color: this.state.color, width: '500px' }} readOnly='readOnly' value={this.state.message} />
            </div>
        );
    }
}

class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            user: {
                name: "spider man",
                email: 'spiderman@gmail.com',
                password: 'password123'
            },
            division: {
                code: ""
            },
            item: {
                code: ""
            },
            selectedFile: {},
            items: []
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
                        this.setState({ division: division.data })
                    });
            });
    }

    login() {
        return axios.post('/login',
            {
                email: this.state.user.email,
                password: this.state.user.password
            });
    }

    addCategory() {
        let category = {
            division: this.state.division._id,
            code: "Cat1",
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
        let category = {
            division: this.state.division._id,
            code: "Cat1"
        }

        return axios.post('/category/search', category);
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

    retrieveItem(){
        let body = {division: this.state.division._id, category:"5adc178c896f6b023dca5557"}; 
        axios.post('http://localhost:8000/item/search', body)
        .then((response) => {
            let items = response.data;
            let collection = [];

            items.map(x => {
                console.log(x);
                collection.push(<tr><td>{x.code}</td><td>{x.description}</td><td><img src={"data:image/gif;base64," + x.thumnail}   /></td></tr>)
            });

            this.setState({items : collection});
        });
        
    }

    retrieveItem2(){
        axios.get('http://localhost:8000/action')
        .then((response) => {
            this.setState({image : "data:image/gif;base64," + response.data});
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
                <Button func={() => this.getCategory()} caption='Get category' />
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
                <img src={this.state.image} style={{height:100 , weight:100}} />
                <div>
                    <form onSubmit={() => this.handleUploadImage()}>
                        <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                        <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
                        <button >Upload</button>
                    </form>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Signup />,
    document.getElementById('app')
);
