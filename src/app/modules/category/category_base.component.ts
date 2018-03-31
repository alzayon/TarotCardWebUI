import { Store } from '@ngrx/store';
import { RootState } from '../../redux/reducers/root.reducer';

export abstract class CategoryBaseComponent {

    constructor(protected store: Store<RootState>) {

    }

    ngOnInit() {        
    }

    ngOnDestroy() {
        
    }
}