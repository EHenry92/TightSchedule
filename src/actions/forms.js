import {
SCHEDULE_FORM_EDIT, SCHEDULE_FORM_CLEAR, SCHEDULE_FORM_LOADING,
TASK_FORM_EDIT, TASK_FORM_CLEAR, TASK_FORM_LOADING
} from './types';

export const scheduleFormEdit = change => ({type: SCHEDULE_FORM_EDIT, change});
export const scheduleFormClear = () => ({type: SCHEDULE_FORM_CLEAR});
export const scheduleFormLoad = () => ({type: SCHEDULE_FORM_LOADING});

export const taskFormEdit = change => ({type: TASK_FORM_EDIT, change});
export const taskFormClear = () => ({type: TASK_FORM_CLEAR});
export const taskFormLoad = () => ({type: TASK_FORM_LOADING});


export const formChange = (change, scheduleForm = true) => dispatch => {
    scheduleForm ? dispatch(scheduleFormEdit(change)) : dispatch(taskFormEdit(change));
};

export const formClear = (scheduleForm = true) => dispatch => {
  scheduleForm ? dispatch(scheduleFormClear()) : dispatch(taskFormClear());
};

export const formLoading = (scheduleForm = true) => dispatch => {
  scheduleForm ? dispatch(scheduleFormLoad()) : dispatch(taskFormLoad());
};
