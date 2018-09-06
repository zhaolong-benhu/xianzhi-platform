import {List, Map} from 'immutable';



export function setEntries(state, entries) {
  const list = List(entries);
  return state.set('entries', list)
              .set('initialEntries', list);
}