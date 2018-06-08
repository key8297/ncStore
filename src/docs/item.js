class Item extends React.Component {
    constructor() {
        super();
        this.state = {
            user: {
                name: "batman2",
                email: 'batman2@gmail.com',
                password: 'batman2'
            },
            division: '',
            item: {
                code: ""
            },
            selectedFile: {},
            items: [],
            categories: [],
            token: ''
        }
        this.image= '' ;
        this.login = this.login.bind(this);
        this.getImage = this.getImage.bind(this);
    }

    componentWillMount(){
        this.login();
        
    }

    login() {
        axios.post('/login',
            {
                email: this.state.user.email,
                password: this.state.user.password
            })
            .then(response => {
                console.log(response);
                this.setState({token:response.data.token});
                this.setState({division:response.data.division});
                this.getImage();
            });
    }

    getImage(e, item){
        axios({
            url:'/item/image?item=5ae80969a017b21d20f2f82a&large=1',
            headers: {
                'content-Type': 'application/json',
                authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmF0bWFuMiIsImVtYWlsIjoiYmF0bWFuMkBnbWFpbC5jb20iLCJkaXZpc2lvbiI6IjVhZGMwMDMyZGQxZThhMjgxNGZmMmNiMCIsImlhdCI6MTUyODAzODEyNiwiZXhwIjoxNTI4MDQxNzI2fQ.DI5eMa9IbDXEV7ItJMQMst652uauIxs4xr7U6x6_Y1E' // + this.state.token
            }
        })
        .then(response => {
            this.setState({image: response.data})
            return response.data;
        })
        .catch(err => {});

    }

    render() {
        let url1= 'http://localhost:8000/item/image?item=5ae80969a017b21d20f2f82a&large=1&division=' + this.state.division;
        return (
            <div>
                {/* <button onClick={() => this.addItem()}  >Add Item</button>
                <input type='text' style={{ color: 'green', width: '500px' }} readOnly='readOnly' value={this.state.item.code} /> */}

                <img src={url1}/>
            </div>
        );
    }
}

ReactDOM.render(
    <Item />,
    document.getElementById('app')
);
