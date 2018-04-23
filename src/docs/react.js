class Button extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            caption: props.caption,
            func: props.func,
            message: ""
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
            selectedFile: {}
        }
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
        this.getDivision = this.getDivision.bind(this);
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
                        this.setState({item:res.data})
                    )
                    .catch(err =>{
                        this.setState({item: {code:err.request.responseText}})
                    });
            })
    }

    retrieveItem() {
        let item = {
            division: this.state.division._id,
        }

        return axios.post('/item/search', item);
    }

    updateItem(){
        let item = {
            division: this.state.division._id,
            code: "Item1"
        }

        axios.post('/item/search', item)
        .then(item => {
            if(item.data.length >= 0){
                let data = item.data[0];
                data.code = "Item2"
                axios.post('/item/update', data)
                .then(item => {
                    console.log(item);
                    this.setState({item: item});
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
            if(item.data.length >= 0){
                let data = item.data[0];
                axios.post('/item/delete', data)
                .then(message => {
                    console.log(message.data);
                    this.setState({item: {}});
                });
            }
        });
    }

    fileChangedHandler(event){
        this.setState({selectedFile: event.target.files[0]})
    }

    uploadHandler(){
        console.log(this.state.selectedFile)
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
                <Button func={() => this.retrieveItem()} caption='Retrieve item' />
                <div>
                    <input type="file" onChange={this.fileChangedHandler} />
                    <button onClick={this.uploadHandler}>Upload!</button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Signup />,
    document.getElementById('app')
);
