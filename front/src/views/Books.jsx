import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import FilterableTable from "../components/FilterableTable";

const Books = () => {

    const [books, setBooks] = useState([])
    const [columns, setColumns] = useState([
        { columnKey: "id", label: "ID", show: false },
        { columnKey: "title", label: "Title", show: true },
        { columnKey: "author", label: "Author", show: true },
        { columnKey: "genres", label: "Genres", show: true },
        { columnKey: "published", label: "Publication year", show: true },
    ])

    const filteredColumns = useMemo(() => columns.filter(column => column.show).map(column => column.columnKey), [columns])
    const filteredColumnLabels = useMemo(() => columns.filter(column => column.show).map(column => column.label), [columns])

    const onCheckedValueChange = (e, {name, checkedItems}) => {
        const newColumns = columns.map(column => ({
            ...column,
            show: checkedItems.includes(column.label)
        }));
        setColumns(newColumns);
    }

    const getAllBooks = async () => {
        const response = await axios.post("http://localhost:4000/", {
            query: "query AllBooks { allBooks { title published author id genres } }"
        })
        .then(response => response.data.data.allBooks)
        .then(response => response.map(book => {
            return {
                ...book,
                genres: book.genres.join(", ")
            }
        }))
        setBooks(response);
    }

    useEffect(() => {
        getAllBooks();
    }, [])

    return (
        <>
            <FilterableTable 
                title="List of Books"
                filterable={true}
                columns={columns}
                data={books}
                filteredColumns={filteredColumns}
                filteredColumnLabels={filteredColumnLabels}
                onCheckedValueChange={onCheckedValueChange}
            /> 
        </>
    )
}

export default Books