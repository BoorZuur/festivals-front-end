import CreateForm from "../components/createForm.jsx";
import {useNavigate} from "react-router";

function CreateFestival() {
    const navigate = useNavigate();
    const getFestival = (id) => {
        navigate("/festivals/" + id);
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold p-4">Create Festival</h1>
            <CreateForm onCreated={getFestival}/>
        </div>
    );
}

export default CreateFestival;