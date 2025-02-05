import { useEffect, useState } from "react";
import usePublic from "./usePublic";
import { useQuery } from "@tanstack/react-query";

const useMenu = () => {
    const axiosPublic = usePublic();
    // const [menu, setMenu] = useState([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     fetch('https://bistro-boss-server-sepia-five.vercel.app/menu')
    //     .then(res => res.json())
    //     .then(data => {
    //         setMenu(data);
    //         setLoading(false)
    //     })
    // },[])

    const {data: menu = [], isPending: loading, refetch} = useQuery({
        queryKey: ['menu'],
        queryFn: async() => {
            const res = await axiosPublic.get('/menu')
            return res.data;
        }
    })

    return [menu, loading, refetch]
}

export default useMenu;