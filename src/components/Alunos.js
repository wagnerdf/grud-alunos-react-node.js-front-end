import React from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import AlunoDataService from "../services/aluno.service";

class Alunos extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 
            id: 0,
            nome: '',
            email: '',
            alunos: [],
            modalAberta: false
        }
    }


    componentDidMount() {
        this.retrieveAlunos();
        console.log("Componente montado");
    }

    componentWillUnmount() {
        console.log("Componente desmontado");
    }

    retrieveAlunos = () => {

        AlunoDataService.getAll()
            .then(response => {
                this.setState({
                    alunos: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    buttonDelete = (id) => {
        AlunoDataService.delete(id)
            .then(response => {
                console.log(response.data);
                this.retrieveAlunos();
            })
            .catch(e => {
                console.log(e);
            });
    }

    buttonLoadEdit = (id) => {
        AlunoDataService.get(id)
        .then(aluno => {
            this.setState({
                id: aluno.data.id,
                nome: aluno.data.nome,
                email: aluno.data.email
            });
            console.log(aluno.data);
            this.abrirModal();
        })
        .catch(e => {
            console.log(e);
        });
    }

    registerAluno = (aluno) => {
        AlunoDataService.create(aluno)
            .then(response => {
                this.setState({
                    id: aluno.id,
                    nome: aluno.nome,
                    email: aluno.email,
                    submitted: true
                });
                console.log(response.data);
                this.retrieveAlunos();
                
            })
        .catch(e => {
            console.log(e);        
        });
    }

    updateAluno = (aluno) => {
        AlunoDataService.update(
            aluno.id,
            aluno
            )
            .then(response => {
                console.log(response.data);
                this.retrieveAlunos();
            })
            
        .catch(e => {
            console.log(e);        
        });
    }


    renderTabela() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Op????es</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.alunos.map((aluno, index) =>

                            <tr key={index}>
                                <td> {aluno.nome} </td>
                                <td> {aluno.email} </td>
                                <td>

                                    <button type="button" className="btn btn-primary btn-sm" onClick={() => this.buttonLoadEdit(aluno.id)}>Editar</button><span> </span>
                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => this.buttonDelete(aluno.id)}>Excluir</button>


                                </td>
                            </tr>
                        )
                    }
                </tbody>

            </Table>
        )

    }

    updateNome = (e) => {
        this.setState(
            {
                nome: e.target.value 
            }
        )

    }

    updateEmail = (e) => {
        this.setState(
            {
                email: e.target.value  
            }
        )

    }

    submit = () => {

        if(this.state.id === 0){
            const aluno = {
                id: this.state.id,
                nome: this.state.nome, 
                email: this.state.email
            }
            this.registerAluno(aluno);
        }else{
            const aluno = {
                id: this.state.id,
                nome: this.state.nome, 
                email: this.state.email
            }
            this.updateAluno(aluno);

        }
        this.fecharModal();
    }

    reset = () => {
        this.setState({
            id: 0,
            nome: '',
            email: ''
        })
        this.abrirModal();
    }

    fecharModal = () => {
        this.setState({
            modalAberta: false
        })
    }

    abrirModal = () => {
        this.setState({
            modalAberta: true
        })
    }

    render() {
        return (
            <div>

                <Modal show={this.state.modalAberta} onHide={this.fecharModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Dados do Aluno.</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" >
                                <Form.Label>ID: </Form.Label>
                                <Form.Control type="text" value={this.state.id || 0} readOnly={true}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Nome: </Form.Label>
                                <Form.Control type="text" placeholder="Digite o nome do aluno" value={this.state.nome || ""} onChange={this.updateNome}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email: </Form.Label>
                                <Form.Control type="email" placeholder="Digite o e-mail do aluno" value={this.state.email || ""} onChange={this.updateEmail}/>
                                <Form.Text className="text-muted">
                                    Informe o e-mail do aluno.
                                </Form.Text>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.fecharModal}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" onClick={this.submit}>
                                Salvar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Button variant="warning" type="submit" onClick={this.reset}>
                            Novo
                </Button>

                {this.renderTabela()}
            </div>
        )
    }


}
export default Alunos;