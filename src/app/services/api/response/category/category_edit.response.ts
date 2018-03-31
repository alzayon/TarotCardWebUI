import { Category } from '../../../../domain/model/category';

export class CategoryEditResponse {
    constructor(public card: Category, public outcome: boolean = true, public error: any = null) {}
}