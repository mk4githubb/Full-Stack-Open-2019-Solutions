import {useState} from 'react'

const useFormHook = (type) => {

    const [value, setValue] = useState('');

    const update = (event) => {
        setValue(event.target.value);
    };

    const updateValueTo = setValueTo => {
        setValue(setValueTo)
    };

    const clear = () => setValue('');

    return {
        type,
        value,
        update,
        clear,
        updateValueTo
    }
};

export default useFormHook;

