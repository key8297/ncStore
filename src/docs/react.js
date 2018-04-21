

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
                console.log(message);
                this.setState({ color: 'green', message: `${message.status} ${message.statusText}` })
            })
            .catch(message => {
                console.log(message.request);
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
            }
        }
        this.signup = this.signup.bind(this);
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

    login() {
        return axios.post('http://localhost:8000/login',
            {
                email: this.state.user.email,
                password: this.state.user.password
            });
    }

    render() {
        let data = this.state.data;

        console.log(data);

        return (
            <div>
                {/* <button onClick={() => this.signup()} >aaa</button> */}
                <Button func={() => this.signup()} caption='Signup' />
                <Button func={() => this.registerDivision()} caption='Register division' />
                <Button func={() => this.login()} caption='Login' />
            </div>
        );
    }
}

ReactDOM.render(
    <Signup />,
    document.getElementById('app')
);
