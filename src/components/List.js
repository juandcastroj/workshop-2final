import axios from "axios";
import React, { Component } from 'react'
import { Button, Card, Col, Row } from "react-bootstrap";
import { Modal, ModalBody, ModalFooter } from 'reactstrap';

const url = "https://workshop-tienda.herokuapp.com/registros/";


export default class List extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            modalEliminar: false,
            info: {
                id: '',
                precio: '',
                nombre: '',
                imagen: '',

            },
            productosAdd: []

        }
    }


    componentDidMount() {
        this.peticionGet();
    }


    Seleccionarproducto = (producto) => {

        this.setState({
            info: {

                id: producto.id,
                precio: producto.precio,
                nombre: producto.nombre,
                imagen: producto.imagen,
            }
        })
        console.log(producto)
        console.log(this.state.info)

        this.setState({ modalEliminar: true })

    }

    peticionGet = () => {
        axios.get(url)
            .then(response => {
                this.setState({ data: response.data })
                this.peticionGet();
            })
            .catch(error => {
                console.log(error.message);
            })
    }



    peticionDelete = async () => {
        await axios.delete(url + this.state.form.id)
            .then(response => {
                this.setState({ modalEliminar: false });
                this.peticionGet();
            }).catch(error => {
                console.log(error.message);
            })
    }

    agregarProduct = () => {
        this.setState({
            productosAdd: [...this.state.productosAdd, this.state.info],

        })
        console.log(this.state.productosAdd)

    }

    render() {
        return (
            <div className="container">

                <Row xs={1} md={5} className="g-4">
                    {this.state.data.map(prod => (
                        <Col>
                            <Card key={prod.id}  >
                                <Card.Img variant="top" src={prod.imagen} />
                                <Card.Body>
                                    <Card.Title>{prod.precio}</Card.Title>
                                    <Card.Text>
                                        {prod.nombre}
                                    </Card.Text>
                                    <Button className="btn btn-success"
                                        onClick={() => { this.Seleccionarproducto(prod); this.setState({ modalEliminar: true }) }}>Detalle</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>



                <Modal isOpen={this.state.modalEliminar}>

                    <ModalBody>
                        <div>
                            {
                               

                        <Card key={this.state.info.id} >
                        <Card.Img  src={this.state.info.imagen} width="160px"  alt="" />
                        <Card.Body>
                        <Card.Title>{this.state.info.precio}</Card.Title>
                         <Card.Text>
                        {this.state.info.nombre}
                        </Card.Text>
                        <Button className="btn btn-success"
                                onClick={() => this.agregarProduct()}>Agregar</Button>
                            
                        </Card.Body>    
                                    </Card>
                            }
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <div>
                        <Button className="btn btn-danger"
                                        onClick={() => { this.peticionGet(1); this.setState({ modalEliminar: true }) }}> Eliminar</Button>
                            <Button className="btn btn-secondary"
                                onClick={() => this.setState({ modalEliminar: false })}>Cerrar</Button>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>

        )
    }
}
