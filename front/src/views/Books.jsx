import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import FilterableTable from "../components/FilterableTable";
import {
    Dialog,
    DialogSurface,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogTrigger,
    DialogBody,
    Button,
    useRestoreFocusTarget,
    Field,
    Input,
  } from "@fluentui/react-components";


const Books = () => {

    const [books, setBooks] = useState([])
    const [columns, setColumns] = useState([
        { columnKey: "id", label: "ID", show: false },
        { columnKey: "title", label: "Title", show: true },
        { columnKey: "author", label: "Author", show: true },
        { columnKey: "genres", label: "Genres", show: true },
        { columnKey: "published", label: "Publication year", show: true },
    ])
    const [newBook, setNewBook] = useState({
        title: null,
        author: null,
        published: null,
        genres: null
    })
    const [openModal, setOpenModal] = useState(false)

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
        const response = await axios.post(import.meta.env.VITE_BACK_URL, {
            query: "query AllBooks { allBooks { title published author id genres } }"
        })
        .then(response => response.data.data.allBooks.map(book => {
            return {
                ...book,
                genres: book.genres.join(", ")
            }
        }))
        setBooks(response);
    }

    const addBook = async () => {

        let title = newBook.title
        let author = newBook.author
        let published = newBook.published
        let genres = newBook.genres.map(genre => `"${genre}"`).join(", ")

        await axios.post(import.meta.env.VITE_BACK_URL, {
            query: `mutation { addBook( title: "${title}", author: "${author}", published: ${published}, genres: [${genres}]) { title, author } }`
        })

        await getAllBooks()
        .then(handleModal)
    }
    const handleModal = () => setOpenModal(!openModal)

    useEffect(() => {
        getAllBooks();
    }, [])

    return (
        <>
            <h2>List of books</h2>
            <FilterableTable
                filterable={true}
                columns={columns}
                data={books}
                filteredColumns={filteredColumns}
                filteredColumnLabels={filteredColumnLabels}
                onCheckedValueChange={onCheckedValueChange}
            />
            <Button onClick={handleModal}>Add book</Button>

            <Dialog open={openModal} onOpenChange={handleModal}>
                <DialogSurface>
                <DialogBody>
                    <DialogTitle>Add a book</DialogTitle>
                    <DialogContent>
                        <Field
                            label="Title"
                            required
                        >
                            <Input
                                type="text"
                                value={newBook.title}
                                onChange={(e, data) => setNewBook({...newBook, title: data.value})}
                            />
                        </Field>
                        <Field
                            label="Author"
                            required
                        >
                            <Input
                                type="text"
                                value={newBook.author}
                                onChange={(e, data) => setNewBook({...newBook, author: data.value})}
                            />
                        </Field>
                        <Field
                            label="Publication year"
                            required
                        >
                            <Input
                                type="number"
                                value={newBook.published}
                                onChange={(e, data) => setNewBook({...newBook, published: data.value})}
                            />
                        </Field>
                        <Field
                            label="Genres"
                            hint="Separate with commas"
                            required
                        >
                            <Input
                                type="text"
                                value={newBook.genres}
                                onChange={(e, data) => setNewBook({...newBook, genres: data.value.split(",")})}
                            />
                        </Field>
                    </DialogContent>
                    <DialogActions>
                    <DialogTrigger disableButtonEnhancement>
                        <Button appearance="secondary">Close</Button>
                    </DialogTrigger>
                    <Button appearance="primary" onClick={async () => addBook()}>Add</Button>
                    </DialogActions>
                </DialogBody>
                </DialogSurface>
            </Dialog>

        </>
    )
}

export default Books