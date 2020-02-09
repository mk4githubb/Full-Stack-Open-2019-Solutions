import {useState} from 'react'

const useFeild = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const update = (value) => {
        setValue(value);
    };

    const clear = (setValueTo) => setValue(setValueTo);

    return {
        value, update, clear
    }
};

export default useFeild;