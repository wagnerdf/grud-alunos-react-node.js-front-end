import http from "../http-common";

class AlunoDataService {

    delete(id){
        return http.delete(`/aluno/${id}`);
    }

}

export default new AlunoDataService();