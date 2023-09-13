import { DECREMENT, INCREMENT, RESET_COUNTER } from "../constants/counterConstants";

export const increment = () => async (dispatch, getState) => {
    dispatch({
        type: INCREMENT,
        payload: {
            count: getState().counter.count + 1,
        }
    })
};
export const decrement = () => async (dispatch, getState) => {
    dispatch({
        type: DECREMENT,
        payload: {
            count: getState().counter.count - 1,
        }
    })

};
export const resetCounter = () => async (dispatch, getState) => {
    dispatch({
        type: RESET_COUNTER,
        payload: {
            count: 0,
        }
    })

};


// const count = useSelector(state => state.counter.count);
// const dispatch = useDispatch();
//   dispatch(increment())
