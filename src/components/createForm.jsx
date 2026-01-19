import {useState} from "react";

function CreateForm({onCreated}) {
    const [formdata, setFormdata] = useState({
        name: '',
        description: '',
        review: 0
    });
    const [loading, setLoading] = useState(false);
    const webservice = import.meta.env.VITE_WEBSERVICE_URL;

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormdata({
            ...formdata,
            [name]: value // === 'review' ? Number(value) : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createFestival();
    }

    const createFestival = async () => {
        setLoading(true);
        try {
            const response = await fetch(webservice, {
                method: "POST",
                body: JSON.stringify(formdata),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            const data = await response.json();

            if (response.status === 201) {
                onCreated(data.id);
            } else {
                setFormdata({name: '', description: '', review: 0});
                Error("Fout bij het aanmaken van het Festival");
            }

        } catch (error) {
            console.error("Fout bij het ophalen van het Festival:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 py-4 p-4 max-w-80">
            <div className="flex flex-col">
                <label htmlFor="name">Name</label>
                <input className="border" type="text" id="name" name="name" value={formdata.name}
                       onChange={handleInputChange} required/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="description">Description</label>
                <textarea className="border" id="description" name="description" value={formdata.description}
                          onChange={handleInputChange} required/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="review">Review</label>
                <input
                    className="border p-2"
                    type="number"
                    id="review"
                    name="review"
                    value={formdata.review}
                    onChange={handleInputChange}
                    min="0"
                    max="10"
                    step="1"
                    required
                />
            </div>
            <button className="text-white bg-blue-600 hover:bg-blue-700 p-3 rounded cursor-pointer" type="submit"
                    disabled={loading}>{loading ? 'Creating...' : 'Create'}</button>
        </form>
    );
}

export default CreateForm;