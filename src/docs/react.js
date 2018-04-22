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
                code:""
            }
        }
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
        this.getDivision = this.getDivision.bind(this);
    }

    signup() {
        return axios.post('http://localhost:8000/signup',
            this.state.user);
    }

    registerDivision() {
        return axios.post('http://localhost:8000/newdivision',
            {
                code: "Avengers",
                contact: "spiderman@gmail.com"
            });
    }

    getDivision(){
        this.login()
        .then(user => { 
            console.log(user.data);
            axios.post('http://localhost:8000/division',
            {
                id: user.data.mainDivision
            })
            .then(division => {
                this.setState({division:division.data})
            });            
        });
    }

    login() {
        return axios.post('http://localhost:8000/login',
            {
                email: this.state.user.email,
                password: this.state.user.password
            });
    }

    addCategory(){
        let category = {
            division: this.state.division._id,
            code: "Cat1",
            description: "First category",
            status: "Active",
            imageUrl: "",
            image:""
        }

        return axios.post('http://localhost:8000/category/create', category);
    }

    getCategory(){
        let category = {
            division: this.state.division._id,
        }

        return axios.post('http://localhost:8000/category/search', category);
    }

    deleteCategory(){
        let category = {
            division: this.state.division._id,
            code: "Cat1"
        }

        return axios.post('http://localhost:8000/category/delete', category);
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
                
            </div>
        );
    }
}

ReactDOM.render(
    <Signup />,
    document.getElementById('app')
);
