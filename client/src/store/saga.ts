import { all } from "redux-saga/effects";
import registerSaga from "./login/userSaga";
import groupSaga from "./groups/groupSaga";
import postSaga from "./post/postSaga";
import commentSaga from "../store/comment/commentSaga";
import userSaga from "./login/userSaga";
import userIdSaga from "./post/userIdSaga";
import printingSaga from "../store/menu/ThreePrintingSaga";
import programmingSaga from "../store/menu/ProgrammingSaga";
import technewSaga from "../store/menu/TechnewsSaga";
import artificialSaga from "../store/menu/ArtificialSaga";
function* rootSaga() {
  yield all([
    registerSaga(),
    groupSaga(),
    postSaga(),
    commentSaga(),
    userSaga(),
    userIdSaga(),
    groupSaga(),
    printingSaga(),
    programmingSaga(),
    technewSaga(),
    artificialSaga(),
  ]);
}

export default rootSaga;
