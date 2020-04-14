import { database } from './../data/data.store';
import { IResolvers} from 'graphql-tools';
import { GraphQLError } from 'graphql';

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
        },
        course(__: void, { id }): any {
            const resultado = database.courses.filter(course => course.id === id)[0]
            if (resultado === undefined) {
                throw new Error(
                    `id: ${id}' doesn't exists in database`
                );
            }
            return resultado;
        },
    }
}

export default query;