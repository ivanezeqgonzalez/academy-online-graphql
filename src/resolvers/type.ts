import { database } from './../data/data.store';
import { IResolvers} from 'graphql-tools';
import _ from 'lodash';

const type: IResolvers = {
    Student: {
        courses: parent => {
            const arrCourses: Array<any> = [];
            parent.courses.map((course: String) => {
                arrCourses.push(
                    _.filter(database.courses, ['id', course])[0]
                )
            })
            return arrCourses;
        }
    }
}

export default type;