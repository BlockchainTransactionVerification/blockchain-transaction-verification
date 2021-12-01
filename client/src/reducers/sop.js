import {
  CREATE_SOP_REQUEST,
  CREATE_SOP_SUCCESS,
  CREATE_SOP_FAIL,
  RETRIEVE_SOP_REQUEST,
  RETRIEVE_SOP_SUCCESS,
  RETRIEVE_SOP_FAIL,
  UPDATE_DOC_REQUEST,
  UPDATE_DOC_SUCCESS,
  UPDATE_DOC_FAIL,
  VIEW_DOCS_UPDATE,
} from "../constants/sopConstants";

export const retrieveSopReducer = (state = {}, action) => {
  switch (action.type) {
    case RETRIEVE_SOP_REQUEST:
      return {};
    case RETRIEVE_SOP_SUCCESS:
      return { sops: action.payload };
    case RETRIEVE_SOP_FAIL:
      return { error: action.payload };
    case VIEW_DOCS_UPDATE:
      const sop_id = action.payload.id;
      const tempSopList = [...state.sops];
      const sopFound = tempSopList.find((sop) => sop._id == sop_id);
      sopFound.RequiredDocs.map((doc) => {
        if (doc._id == action.payload.DocID) {
          doc.Done = true;
        }
      });
      console.log("SOP found. ", sopFound);

      console.log(tempSopList);
      return { sops: tempSopList };
    default:
      return state;
  }
};

export const createSopReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SOP_REQUEST:
      return {};
    case CREATE_SOP_SUCCESS:
      return { createSop: action.payload };
    case CREATE_SOP_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const updateSopDocReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DOC_REQUEST:
      return {};
    case UPDATE_DOC_SUCCESS:
      return { updateSopDoc: action.payload };
    case UPDATE_DOC_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
