import { createContext, useContext, useState, useCallback } from 'react';

const FestivalContext = createContext(undefined);

export function FestivalProvider({ children }) {
    const [festivals, setFestivals] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const webservice = import.meta.env.VITE_WEBSERVICE_URL;

    // Fetch all festivals with pagination
    const fetchFestivals = useCallback(async (limit = 12, page = 1) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${webservice}?limit=${limit}&page=${page}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            });
            const data = await response.json();
            setFestivals(data.items || []);
            setPagination(data.pagination || null);
            return data;
        } catch (error) {
            console.error("Fout bij het ophalen van festivals:", error);
            setError(error.message);
            return { items: [], pagination: null };
        } finally {
            setLoading(false);
        }
    }, [webservice]);

    // Fetch single festival
    const fetchFestival = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${webservice}/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                if (response.status === 404) {
                    console.error(`Festival with id ${id} not found`);
                    return null;
                }
                const data = await response.json();
                throw new Error(data.error || `HTTP Error ${response.status}`);
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            return data;
        } catch (error) {
            console.error("Fout bij het ophalen van festival:", error);
            setError(error.message);
            return null;
        } finally {
            setLoading(false);
        }
    }, [webservice]);

    // Create festival
    const createFestival = useCallback(async (festivalData) => {
        setLoading(true);
        setError(null);
        try {
            const payload = {
                ...festivalData,
                genre: typeof festivalData.genre === 'string'
                    ? festivalData.genre.split(',').map(s => s.trim()).filter(Boolean)
                    : festivalData.genre,
                lineup: typeof festivalData.lineup === 'string'
                    ? festivalData.lineup.split(',').map(s => s.trim()).filter(Boolean)
                    : festivalData.lineup
            };

            const response = await fetch(webservice, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            const data = await response.json();

            if (response.status === 201) {
                return { success: true, id: data.id };
            } else {
                const errorMsg = data.error || "Fout bij het aanmaken van het Festival";
                setError(errorMsg);
                return { success: false, error: errorMsg };
            }
        } catch (error) {
            console.error("Fout bij het aanmaken van het Festival:", error);
            setError(error.message);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    }, [webservice]);

    // Update festival
    const updateFestival = useCallback(async (id, festivalData) => {
        setLoading(true);
        setError(null);
        try {
            const payload = {
                ...festivalData,
                genre: typeof festivalData.genre === 'string'
                    ? festivalData.genre.split(',').map(s => s.trim()).filter(Boolean)
                    : festivalData.genre,
                lineup: typeof festivalData.lineup === 'string'
                    ? festivalData.lineup.split(',').map(s => s.trim()).filter(Boolean)
                    : festivalData.lineup
            };

            const response = await fetch(`${webservice}/${id}`, {
                method: "PUT",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            const data = await response.json();

            if (response.ok) {
                return { success: true, id };
            } else {
                const errorMsg = data.error || "Fout bij het updaten van het Festival";
                setError(errorMsg);
                return { success: false, error: errorMsg };
            }
        } catch (error) {
            console.error("Fout bij het updaten van het Festival:", error);
            setError(error.message);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    }, [webservice]);

    // Delete festival
    const deleteFestival = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${webservice}/${id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 204) {
                // reload festivals after deletion
                await fetchFestivals();
                return { success: true };
            } else {
                const data = await response.json();
                const errorMsg = data.error || 'Failed to delete Festival';
                setError(errorMsg);
                return { success: false, error: errorMsg };
            }
        } catch (error) {
            console.error("Fout bij het verwijderen van het Festival:", error);
            setError(error.message);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    }, [webservice]);

    // Toggle bookmark (PATCH)
    const toggleBookmark = useCallback(async (id, hasBookmark) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${webservice}/${id}`, {
                method: "PATCH",
                body: JSON.stringify({ hasBookmark: !hasBookmark }),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                // Update local state with the response data from API
                setFestivals(prev =>
                    prev.map(f => f.id === id ? { ...f, hasBookmark: data.hasBookmark } : f)
                );
                return { success: true, data };
            } else {
                const data = await response.json();
                const errorMsg = data.error || "Failed to toggle bookmark";
                setError(errorMsg);
                return { success: false, error: errorMsg };
            }
        } catch (error) {
            console.error("Error toggling bookmark:", error);
            setError(error.message);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    }, [webservice]);

    const value = {
        festivals,
        pagination,
        loading,
        error,
        fetchFestivals,
        fetchFestival,
        createFestival,
        updateFestival,
        deleteFestival,
        toggleBookmark,
    };

    return (
        <FestivalContext.Provider value={value}>
            {children}
        </FestivalContext.Provider>
    );
}

// Custom hook to use the festival context
// eslint-disable-next-line react-refresh/only-export-components
export function useFestivals() {
    const context = useContext(FestivalContext);
    if (context === undefined) {
        throw new Error('useFestivals must be used within a FestivalProvider');
    }
    return context;
}
