import axiosInstance from "@/handlers/AxiosConfig";
import { useEffect, useState } from "react";
import { Event } from "@/constants/Interfaces";

export default function useEvent() {
    const [data, setData] = useState<Event[] | null>(null); // where we'll store the result
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true; // avoid setting state if unmounted
        async function fetchData() {
            try {
                const response = await axiosInstance.post('/events/current');
                const result: Event[] = JSON.parse(response.data);
                if (mounted) {
                    setData(result);
                    setLoading(false);
                }
            } catch (err) {
                if (mounted) {
                    setLoading(false);
                }
            }
        }

        fetchData();

        return () => {
        mounted = false;
        };
    }, []);

    return {
        events: data,
        loading,
    };
}