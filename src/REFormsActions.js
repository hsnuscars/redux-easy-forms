export const REFORMS_INIT          = 'REFORMS_INIT';
export const REFORMS_UPDATE_FIELDS = 'REFORMS_UPDATE_FIELDS';


export function initFormsAction( data, fns ) {
  return {
    type: REFORMS_INIT,
    data,   // user's expanded form schema
    fns     // user's fns
  };
}

export function updateFieldsAction( fieldUpdateList, fns ) {
  return {
    type: REFORMS_UPDATE_FIELDS,
    fieldUpdateList,
    fns
  };
}
