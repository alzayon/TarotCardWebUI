import { Category } from '../../../../domain/model/category';

export class CategoryListResponse {
    readonly list:Array<Category> = [];

    constructor(list:Array<Category>) {
        this.list = list;
    }
}