import { AiOutlineLoading3Quarters, AiOutlineArrowUp } from 'react-icons/ai';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';


function Arrow({ id, open }) {
    return (
      <AiOutlineArrowUp  class={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`} />
    );
}

function Loading({loading}) {
    return (
        <AiOutlineLoading3Quarters class={loading ? "animate-spin ease-in duration-700 opacity-100 transition-transform" : "hidden ease-in duration-700 opacity-100 transition-transform"}/>
    );
}

export {
    Arrow,
    Loading
}