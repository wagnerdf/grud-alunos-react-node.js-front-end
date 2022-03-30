import http from "../http-common";

class AlunoDataService {


    getAll(){
        return http.get("/aluno");
    }

    delete(id){
        return http.delete(`/aluno/${id}`);
    }

    
}

export default new AlunoDataService();