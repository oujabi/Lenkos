import {useState} from 'react';
/*Permet l'ouverture et la fermeture des modals*/
function useModal () {
    const [show, setShow] = useState(false);

    const toggle = () => {setShow(!show)};
    return [show, toggle]
}

export default useModal;
