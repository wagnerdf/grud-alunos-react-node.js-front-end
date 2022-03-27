import React from "react";
import {Table} from "react-bootstrap";

class Alunos extends React.Component{

    constructor(props){
        super(props);


        this.state = {
            alunos : []
        }
    }

    componentDidMount(){
        fetch("http://localhost:8080/api/aluno")
        .then(resposta => resposta.json())
        .then(dados => {
           this.setState({ alunos : dados}) 
        })
    }

    componentWillUnmount(){
       // alert("O componente Alunos foi desmontado!")
    }

    render(){
        return(
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
                        this.state.alunos.map((aluno) => 

                            <tr>
                                <td> {aluno.nome} </td>
                                <td> {aluno.email} </td>
                                <td>
                                    <button type="button" class="btn btn-primary btn-sm">Editar</button><span> </span>
                                    <button type="button" class="btn btn-danger btn-sm">Excluir</button>
                                </td>
                            </tr>
                      )
                    }
                </tbody>
                
            </Table>
            
        )
        
    }
}

export default Alunos;