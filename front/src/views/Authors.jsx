import React, { useEffect, useState, useMemo } from "react";
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

const Authors = () => {
    const [authors, setAuthors] = useState([])
    const [columns, setColumns] = useState([
        { columnKey: "id", label: "ID", show: true },
        { columnKey: "name", label: "Name", show: true },
        { columnKey: "born", label: "Year of birth", show: true },
        { columnKey: "bookCount", label: "Books published", show: true },
    ])

    const filteredColumns = useMemo(() => columns.filter(column => column.show).map(column => column.columnKey), [columns])
    const filteredColumnLabels = useMemo(() => columns.filter(column => column.show).map(column => column.label), [columns])

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
            <h2>List of authors</h2>
            <Menu>
                <MenuTrigger disableButtonEnhancement>
                    <Button icon={<Filter24Regular />} />
                </MenuTrigger>
                <MenuPopover>
                    <MenuList
                        checkedValues={{columns: filteredColumnLabels}}
                        onCheckedValueChange={(e, {name, checkedItems}) => {
                            const newColumns = columns.map(column => ({
                                ...column,
                                show: checkedItems.includes(column.label)
                            }));
                            setColumns(newColumns);
                        }}>
                        {columns.map(column => (
                            <MenuItemCheckbox key={column.label} name="columns" value={column.label}>
                                {column.label}
                            </MenuItemCheckbox>
                        ))}
                    </MenuList>
                </MenuPopover>
            </Menu>

            <Table size="small" aria-label="Table with small size">
                <TableHeader>
                    <TableRow>
                        {columns.filter(column => column.show).map(column => (
                            <TableHeaderCell key={column.columnKey}>
                                <h4>{column.label}</h4>
                            </TableHeaderCell>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {authors.map(author => (
                        <TableRow key={author.id}>
                            {filteredColumns.map(col => (
                                <TableCell key={col}>
                                    {author[col] || "-"}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default Authors;
