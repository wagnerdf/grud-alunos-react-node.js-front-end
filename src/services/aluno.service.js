import http from "../http-common";

class AlunoDataService {


    getAll(){
        return http.get("/aluno");
    }

    get(id){
        return http.get(`/aluno/${id}`);
    }

    delete(id){
        return http.delete(`/aluno/${id}`);
    }

    create(aluno){
        return http.post("/aluno", aluno);
    }

    update(id, alunos){
        return http.put(`/aluno/${id}`, alunos);
    }

    
}

export default new AlunoDataService();