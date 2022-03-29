import React from "react";
import {Table} from "react-bootstrap";
import AlunoDataService from "../services/aluno.service";

class Alunos extends React.Component{

    refreshList(){
        //this.componentDidMount();
        this.retrieveAlunos();
    }

    buttonDelete(id) {
        AlunoDataService.delete(id)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        this.refreshList();    
      }
   
    constructor(props){
        super(props);
        this.state = { alunos: []};
    }

    componentDidMount(){
        this.retrieveAlunos();
        console.log("Componente montado");
    }

     componentWillUnmount(){
        console.log("Componente desmontado");
     }

    retrieveAlunos(){
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
                        this.state.alunos.map((aluno, index) => 

                            <tr>
                                <td> {aluno.nome} </td>
                                <td> {aluno.email} </td>
                                <td>
                                    <button type="button" className="btn btn-primary btn-sm">Editar</button><span> </span>
                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => this.buttonDelete(`${aluno.id}`)}>Excluir {aluno.id}</button>
                                    
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