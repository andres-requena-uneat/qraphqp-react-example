import React, { useEffect, useState, useMemo } from "react";
import '../styles/authors.scss'
import axios from 'axios'
import { 
    Table,
    TableHeader,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Button,
    Menu,
    MenuTrigger,
    MenuPopover,
    MenuList,
    MenuItemCheckbox,
} from "@fluentui/react-components";
import {
     Filter24Regular,
} from "@fluentui/react-icons";
import FilterableTable from "../components/FilterableTable";

const Authors = () => {
    const [authors, setAuthors] = useState([])
    const [columns, setColumns] = useState([
        { columnKey: "id", label: "ID", show: false },
        { columnKey: "name", label: "Name", show: true },
        { columnKey: "born", label: "Year of birth", show: true },
        { columnKey: "bookCount", label: "Books published", show: true },
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

    const getAllAuthors = async () => {
        const response = await axios.post("http://localhost:4000/", {
            query: "query Query { allAuthors { name id born bookCount } }"
        });
        setAuthors(response.data.data.allAuthors);
    }
    
    useEffect(() => {
        getAllAuthors();
    }, [])

    return (
        <>
            <FilterableTable 
                title="List of Authors"
                filterable={true}
                columns={columns}
                data={authors}
                filteredColumns={filteredColumns}
                filteredColumnLabels={filteredColumnLabels}
                onCheckedValueChange={onCheckedValueChange}
            /> 
        </>
    )
}

export default Authors;
