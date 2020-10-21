import {useState} from 'react';

function useModal () {
    const [show, setShow] = useState(false);

    const toggle = () => {setShow(!show)}
    show ?  document.body.style = 'overflow: hidden' : document.body.style = 'overflow: auto';
    return [show, toggle]
}

export default useModal;
