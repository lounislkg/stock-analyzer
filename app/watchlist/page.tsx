"use client"
import { useEffect, useState } from 'react'
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

    const [saved, setSaved] = useState<savedElem[]>()

    const { setData } = useCompanyStore()
    const [ticker, setTicker] = useState("")

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["company", ticker],
        queryFn: () => fetchCompanyData(ticker),
        enabled: false,
    });


    useEffect(() => {
        if (typeof window !== "undefined") {
            const storage = JSON.parse(localStorage.getItem("watchlist") || "[]")
            if (storage.length > 0) {
                setSaved(storage)
                for (let i = 0; i < storage.length; i++) {
                    const elem = storage[i]
                    getPrices(elem.ticker).then((data) => {
                        if (data.error) {
                            console.error(data.error)
                            return
                        }
                        const newSaved = storage?.map((e: savedElem, j: number) => {
                            if (j === i) {
                                return { ...e, price: data[0].c, logo: data[1].logo, name: data[1].name }
                            }
                            return e
                        })
                        setSaved(newSaved)
                    })
                }
            }
        }
    }, [])

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const index = parseInt(e.currentTarget.id)
        const newSaved = saved?.filter((_, i) => i !== index)
        setSaved(newSaved)
        localStorage.setItem("watchlist", JSON.stringify(newSaved))
    }

    const handleSearch = async (e: React.MouseEvent<HTMLTableRowElement>) => {
        e.preventDefault()
        const index = e.currentTarget.rowIndex
        const elem = saved?.[index - 1]
        if (elem) {
            console.log(elem)
            setTicker(elem.ticker)
            refetch().then((result) => {
                console.log("result", result);
                if (result.error) {
                    console.error(result.error);
                    return;
                }
                setData(result.data);
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }

    return (
        <>
            <h1>Watchlist</h1>
            {error && <p>Erreur: {error.message}</p>}
            {isLoading && <p>Chargement...</p>}
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
                                <tr key={index} className={styles.item} onClick={(e) => handleSearch(e)}>
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
