"use client"
import { useEffect, useState, useLayoutEffect } from 'react'
import { getPrices } from '@/services/companyService'
import styles from './page.module.css'
import { fetchCompanyData } from '@/services/companyService'
import { useCompanyStore } from '@/store/useCompanyStore'
import { useQuery } from '@tanstack/react-query'

export interface savedElem {
    ticker: string,
    target_price: number,
    predictions: {
        fcf_per_share: number,
        fcf_growth: number,
        price_to_fcf: number,
        years: number,
        initial_value: number
    },
    price?: number,
    logo?: string,
    name?: string
}

export default function Watchlist() {

    const [stored, setStored] = useState("")
    const [saved, setSaved] = useState<savedElem[]>()

    const { setData } = useCompanyStore()
    const [ticker, setTicker] = useState("")

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["company", ticker],
        queryFn: () => fetchCompanyData(ticker),
        enabled: false,
    });


    useLayoutEffect(() => {
        if (typeof window !== "undefined") {
            const storage_str = localStorage.getItem("watchlist")
            setStored(storage_str ? storage_str : "")
        }
    }, [])

    useEffect(() => {
        if (!stored || stored === "") {
            console.log('no watchlist')
            return
        }
        const storage = JSON.parse(stored)
        const saved_temp: savedElem[] = []

        storage?.map(async (elem: savedElem) => {
            const data = await getPrices(elem.ticker)
            console.log("les datas recup : ", data)
            if (data.error) {
                console.log(data.error)
                return
            }
            elem.price = data[0].c
            elem.logo = data[1].logo
            elem.name = data[1].name
            saved_temp.push(elem)

        })
        console.log("coucou")
        setSaved(saved_temp);

    }, [stored])

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const index = parseInt(e.currentTarget.id)
        const newSaved = saved?.filter((_, i) => i !== index)
        setSaved(newSaved)
        localStorage.setItem("watchlist", JSON.stringify(newSaved))
    }

    const handleClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
        e.preventDefault()
        const index = e.currentTarget.rowIndex
        const elem = saved?.[index - 1]
        if (elem) {
            console.log(elem)
            setTicker(elem.ticker)
            refetch().then((result) => {
                setData(result.data);
            });
        }
    }

    const handleRefresh = () => {
        const storage_str = localStorage.getItem("watchlist")
        setStored(storage_str ? storage_str : "")
        console.log('refresh : ', storage_str ? storage_str : "rien")
    }

    return (
        <>
            <h1>Watchlist</h1>
            <button onClick={()=>handleRefresh()}>Refresh</button>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Ticker</th>
                        <th>Target Price</th>
                        <th>FCF per share</th>
                        <th>FCF growth</th>
                        <th>Price to FCF</th>
                        <th>Years</th>
                        <th>Initial Value</th>
                        <th>Price</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        saved?.map((elem, index) => {
                            return (
                                <tr key={index} className={styles.item} onClick={(e) => handleClick(e)}>
                                    <td>
                                        <img src={elem.logo ? elem.logo : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"} alt="logo" />
                                    </td>
                                    <td>
                                        <h3>{elem.name ? elem.name : elem.ticker}</h3>
                                    </td>
                                    <td>{elem.ticker}</td>
                                    <td>{elem.target_price}</td>
                                    <td>{elem.predictions.fcf_per_share}</td>
                                    <td>{elem.predictions.fcf_growth}</td>
                                    <td>{elem.predictions.price_to_fcf}</td>
                                    <td>{elem.predictions.years}</td>
                                    <td>{elem.predictions.initial_value}</td>
                                    <td>{elem.price}</td>
                                    <td>
                                        <button onClick={(e) => handleDelete(e)} id={index.toString()}>❌</button>

                                    </td>
                                </tr>
                            )
                        }
                        )
                    }
                </tbody>

            </table>

        </>
    )
};
