import { database } from './../data/data.store';
import { IResolvers} from 'graphql-tools';

const query: IResolvers = {
    Query: {
        students(): any {
            return database.students
        },
        student(__: void, { id }): any {
            const resultado = database.students.filter(student => student.id === id)[0]
            if (resultado === undefined) {
                return {
                    id: '-1',
                    name: `Student with id: ${id} not found`,
                    email:'',
                    courses: []
                }
            }
            return resultado;
        },
        courses(): any {
            return database.courses
        }
    }
}

export default query;