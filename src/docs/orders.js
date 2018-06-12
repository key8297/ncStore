class Orders extends React.Component {
    constructor() {
        super();
        this.state = {
            user: {
                name: "batman2",
                email: 'batman2@gmail.com',
                password: 'batman2'
            },
            token: '',
            orders: []
        }
    }

    componentWillMount() {
        this.login()
            .then(() => {return this.getOrders()})
            .then(() => this.makeDataTable())
    }

    componentDidMount() {

    }

    login() {
        let deferred = q.defer();
        axios.post('/login',
            {
                email: this.state.user.email,
                password: this.state.user.password
            })
            .then(response => {
                console.log(response);
                this.setState({ token: response.data.token });
                this.setState({ division: response.data.division });
                deferred.resolve();
                // this.getOrders();

            });

        return deferred.promise();
    }

    makeDataTable() {
        $(this.refs.main).DataTable({
            dom: '<"data-table-wrapper"t>',
            data: this.props.names,
            ordering: false
        });
    }

    getOrders() {
        let deferred = q.defer();
        axios({
            method: 'POST',
            url: '/order/search',
            headers: {
                'content-Type': 'application/json',
                authorization: `bearer ${this.state.token}`
            }
        })
            .then(response => {
                this.setState({ orders: response.data });
                console.log('orders', this.state.orders);
                deferred.resolve();

            })
            .catch(err => {
                console.log('GetOrders error: ', err);
                deferred.reject(err);
            });
        return deferred.promise();

    }

    confirm(_id) {
        let deferred = q.defer();

        axios({
            method: 'POST',
            url: '/order/confirm',
            headers: {
                'content-Type': 'application/json',
                authorization: `bearer ${this.state.token}`
            },
            data: { _id }
        })
            .then(response => {
                deferred.resolve();
            })
            .catch(err => {
                console.log('Confirmation error: ', err);
                deferred.resolve();

            });
        return deferred.promise();

    }

    render() {
        let orders = this.state.orders;
        let data = [];

        if (orders.length > 0) {
            orders.map(order => {
                data.push(
                    <tr key={order.orderNumber} >
                        <td>{order.orderDate}</td>
                        <td>{order.name}</td>
                        <td>{order.orderNumber}</td>
                        <td>{order.total}</td>
                        <td>{order.status}</td>
                        <td>
                            <button onClick={() => this.confirm(order._id)}  >Confirm</button>
                            <button onClick={() => this.createInvoice(order._id)}  >Create invoice</button>
                        </td>
                    </tr>
                )
            })
        }

        return (
            <div>
                <table ref="main">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Order number</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
            </div>
        );
    }
}

ReactDOM.render(
    <Orders />,
    document.getElementById('app')
);
