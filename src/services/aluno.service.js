import http from "../http-common";

class AlunoDataService {


    getAll(){
        return http.get("/aluno");
    }

    delete(id){
        return http.delete(`/aluno/${id}`);
    }

    create(aluno){
        return http.post("/aluno", aluno);
    }

    
}

export default new AlunoDataService();