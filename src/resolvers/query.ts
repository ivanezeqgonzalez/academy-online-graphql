import { database } from './../data/data.store';
import { IResolvers} from 'graphql-tools';

const query: IResolvers = {
    Query: {
        students(): any {
            return database.students
        }
    }
}

export default query;