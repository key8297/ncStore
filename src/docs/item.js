class Item extends React.Component {
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
                this.getImage();
            });
    }

    getImage(){
        let url = '/item/image?division=' + this.state.user.division + '&item=5ae80969a017b21d20f2f82a&large=1';
        axios({
            url
            // headers: {
            //     'content-Type': 'application/json',
            //     authorization: 'bearer ' + this.state.token
            // }
        })
        .then(response => {
            this.setState({image: response.data})
        })
        .catch(err => {
            console.log('GetImage error: ', err)
        });

    }

    render() {
        //let data = this.state.data;

        console.log('Image ', this.state.image);

        return (
            <div>
                {/* <button onClick={() => this.addItem()}  >Add Item</button>
                <input type='text' style={{ color: 'green', width: '500px' }} readOnly='readOnly' value={this.state.item.code} /> */}

                <img src={this.state.image} />
            </div>
        );
    }
}

ReactDOM.render(
    <Item />,
    document.getElementById('app')
);
