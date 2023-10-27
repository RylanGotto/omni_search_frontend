import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../redux/searchSlice";

export function SearchBar() {
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        let message_body = {
            sender: "user",
            message: e.target.message.value,
            type: "user_message"
        };
        e.target.message.value = "";
        
        dispatch(setSearchTerm(message_body))
    }

    return (
        <div className='bottom-bar'>    
            <form class="w-full" onSubmit={handleSubmit}>
                <input type='text' placeholder='Ask your question...' className='bottom-bar-input' name='message' />
            </form>
        </div>
    );
};
