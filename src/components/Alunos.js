import React from "react";
import { Table, Button, Form } from "react-bootstrap";
import AlunoDataService from "../services/aluno.service";

class Alunos extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 
            nome: '',
            email: '',
            alunos: [] 
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

    registerAluno = (aluno) => {
        AlunoDataService.create(aluno)
            .then(response => {
                this.setState({
                    nome: response.aluno.nome,
                    email: response.aluno.email,

                    submitted: true
                });
                console.log(response.aluno);
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
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.alunos.map((aluno, index) =>

                            <tr key={index}>
                                <td> {aluno.nome} </td>
                                <td> {aluno.email} </td>
                                <td>

                                    <button type="button" className="btn btn-primary btn-sm">Editar</button><span> </span>
                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => this.buttonDelete(aluno.id)}>Excluir {aluno.id}</button>


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
        const aluno = {
            nome: this.state.nome,
            email: this.state.email
        }

        this.registerAluno(aluno);
    }


    render() {
        return (
            <div>

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Nome: </Form.Label>
                        <Form.Control type="text" placeholder="Digite o nome do aluno" value={this.state.nome} onChange={this.updateNome}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email: </Form.Label>
                        <Form.Control type="email" placeholder="Digite o e-mail do aluno" value={this.state.email} onChange={this.updateEmail}/>
                        <Form.Text className="text-muted">
                            Informe o e-mail do aluno.
                        </Form.Text>
                    </Form.Group>
                                 
                    <Button variant="primary" type="submit" onClick={this.submit}>
                        Salvar
                    </Button>
                </Form>

                {this.renderTabela()}
            </div>
        )
    }


}
export default Alunos;