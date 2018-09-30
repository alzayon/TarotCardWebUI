import { ReadingSessionListComponent } from "../reading_session_list.component";
import { ReadingSessionAddComponent }  from "../reading_session_add.component";
import { ReadingSessionEditComponent }  from "../reading_session_edit.component";
import { ReadingSessionViewComponent }  from "../reading_session_view.component";

export const readingSessionRoutes = [
    { path: "list", component: ReadingSessionListComponent },
    { path: "add", component: ReadingSessionAddComponent },
    { path: "edit", component: ReadingSessionEditComponent },
    { path: "view", component: ReadingSessionViewComponent }
  ];