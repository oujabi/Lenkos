import {useState} from 'react';

function useModal () {
    const [show, setShow] = useState(false);

    const toggle = () => {setShow(!show)}

    return [show, toggle]
}

export default useModal;
