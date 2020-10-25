const resetOverflow = () => {
    window.scrollTo(0,0);
    document.body.style = 'overflow: hidden';
}

const allowOverflow = () => {
    document.body.style = 'overflow: auto';
}

export {resetOverflow, allowOverflow}