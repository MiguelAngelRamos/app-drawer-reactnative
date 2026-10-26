import { fetchPage } from '@/services/api';
import {useEffect, useState} from "react";

const useInfiniteList = <T>(
    resource: string,
    search='',
    filters: Record<string, string>
) => {
    const [items, setItems] = useState<T[]>([]);
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const filtersKey = JSON.stringify(filters);

    useEffect(() => {
        try {
            const data = fetchPage<T>();
        } catch(e) {

        } finally {

        }
    },[filtersKey])
}

export default useInfiniteList;