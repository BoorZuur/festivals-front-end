import {useEffect, useState} from "react";
import { useFestivals } from "../context/FestivalContext.jsx";

function CreateForm({onCreated, festival = null, festivalId = null, isEditMode = false}) {
    const { createFestival, updateFestival } = useFestivals();
    const [formdata, setFormdata] = useState({
        name: '',
        description: '',
        review: 0,
        location: {type: 'Point', coordinates: [0, 0]},
        locationType: 'other',
        imageUrl: 'https://placehold.co/600x400/png?text=No+Image',
        hasBookmark: false,
        date: new Date().toISOString().split('T')[0],
        organizer: '',
        countryCode: '',
        genre: '',
        lineup: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Populate form with existing festival data in edit mode
    useEffect(() => {
        if (isEditMode && festival) {
            setFormdata({
                name: festival.name || '',
                description: festival.description || '',
                review: festival.review || 0,
                location: festival.location || {type: 'Point', coordinates: [0, 0]},
                locationType: festival.locationType || 'other',
                imageUrl: festival.imageUrl || 'https://placehold.co/600x400/png?text=No+Image',
                hasBookmark: festival.hasBookmark || false,
                date: festival.date ? new Date(festival.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                organizer: festival.organizer || '',
                countryCode: festival.countryCode || '',
                genre: Array.isArray(festival.genre) ? festival.genre.join(', ') : (festival.genre || ''),
                lineup: Array.isArray(festival.lineup) ? festival.lineup.join(', ') : (festival.lineup || '')
            });
        }
    }, [isEditMode, festival]);

    const handleInputChange = (e) => {
        const {name, value, type, checked} = e.target;

        if (name === 'longitude' || name === 'latitude') {
            setFormdata({
                ...formdata,
                location: {
                    ...formdata.location,
                    coordinates: name === 'longitude'
                        ? [Number(value), formdata.location.coordinates[1]]
                        : [formdata.location.coordinates[0], Number(value)]
                }
            });
        } else if (type === 'checkbox') {
            setFormdata({
                ...formdata,
                [name]: checked
            });
        } else {
            setFormdata({
                ...formdata,
                [name]: value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditMode) {
            handleUpdate();
        } else {
            handleCreate();
        }
    }

    const handleUpdate = async () => {
        setLoading(true);
        setError('');

        const result = await updateFestival(festivalId, formdata);

        if (result.success) {
            onCreated(festivalId);
        } else {
            setError(result.error || "Fout bij het updaten van het Festival");
        }

        setLoading(false);
    }

    const handleCreate = async () => {
        setLoading(true);
        setError('');

        const result = await createFestival(formdata);

        if (result.success) {
            onCreated(result.id);
        } else {
            setError(result.error || "Fout bij het aanmaken van het Festival");
        }

        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit}
              className="flex flex-col gap-4 py-6 px-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
            {error && <p className="text-red-500 bg-red-50 p-3 rounded border border-red-200">{error}</p>}

            {/* Basic Information */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Basic Information</h3>

                <div className="flex flex-col">
                    <label htmlFor="name" className="font-medium text-gray-700 mb-1">Name *</label>
                    <input
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        type="text"
                        id="name"
                        name="name"
                        value={formdata.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="description" className="font-medium text-gray-700 mb-1">Description *</label>
                    <textarea
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-24"
                        id="description"
                        name="description"
                        value={formdata.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="organizer" className="font-medium text-gray-700 mb-1">Organizer</label>
                        <input
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            type="text"
                            id="organizer"
                            name="organizer"
                            value={formdata.organizer}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="date" className="font-medium text-gray-700 mb-1">Date</label>
                        <input
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            type="date"
                            id="date"
                            name="date"
                            value={formdata.date}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>

            {/* Location Information */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Location</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="locationType" className="font-medium text-gray-700 mb-1">Location Type</label>
                        <select
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            id="locationType"
                            name="locationType"
                            value={formdata.locationType}
                            onChange={handleInputChange}
                        >
                            <option value="park">Park</option>
                            <option value="countryside">Countryside</option>
                            <option value="venue">Venue</option>
                            <option value="street">Street</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="countryCode" className="font-medium text-gray-700 mb-1">Country Code</label>
                        <input
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                            type="text"
                            id="countryCode"
                            name="countryCode"
                            value={formdata.countryCode}
                            onChange={handleInputChange}
                            maxLength="2"
                            placeholder="nl"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="longitude" className="font-medium text-gray-700 mb-1">Longitude</label>
                        <input
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            type="number"
                            id="longitude"
                            name="longitude"
                            value={formdata.location.coordinates[0]}
                            onChange={handleInputChange}
                            step="any"
                            placeholder="0.0"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="latitude" className="font-medium text-gray-700 mb-1">Latitude</label>
                        <input
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            type="number"
                            id="latitude"
                            name="latitude"
                            value={formdata.location.coordinates[1]}
                            onChange={handleInputChange}
                            step="any"
                            placeholder="0.0"
                        />
                    </div>
                </div>
            </div>

            {/* Festival Details */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Festival Details</h3>

                <div className="flex flex-col">
                    <label htmlFor="review" className="font-medium text-gray-700 mb-1">Review (0-10) *</label>
                    <input
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        type="number"
                        id="review"
                        name="review"
                        value={formdata.review}
                        onChange={handleInputChange}
                        min="0"
                        max="10"
                        step="0.1"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="genre" className="font-medium text-gray-700 mb-1">Genres (comma-separated)</label>
                    <input
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        type="text"
                        id="genre"
                        name="genre"
                        value={formdata.genre}
                        onChange={handleInputChange}
                        placeholder="Rock, Pop, Electronic"
                    />
                    <span className="text-sm text-gray-500 mt-1">Separate multiple genres with commas</span>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="lineup" className="font-medium text-gray-700 mb-1">Lineup (comma-separated)</label>
                    <textarea
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-20"
                        id="lineup"
                        name="lineup"
                        value={formdata.lineup}
                        onChange={handleInputChange}
                        placeholder="Artist 1, Artist 2, Artist 3"
                    />
                    <span className="text-sm text-gray-500 mt-1">Separate multiple artists with commas</span>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="imageUrl" className="font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        value={formdata.imageUrl}
                        onChange={handleInputChange}
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                        type="checkbox"
                        id="hasBookmark"
                        name="hasBookmark"
                        checked={formdata.hasBookmark}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="hasBookmark" className="font-medium text-gray-700 cursor-pointer">Has
                        Bookmark</label>
                </div>
            </div>

            <button
                className="text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 p-3 rounded font-semibold transition-colors duration-200 mt-4"
                type="submit"
                disabled={loading}
            >
                {loading ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Festival' : 'Create Festival')}
            </button>
        </form>
    );
}

export default CreateForm;