import {useState} from 'react'

const useListHook = () => {
    const [value, setValue] = useState([]);

    const update = (value) => {
        setValue(value)
    };

    const append = (toAddValue) => {
        setValue(value.concat(toAddValue))
    };

    const clear = () => setValue([]);

    return {
        value, update, clear, append
    }
};

export default useListHook;