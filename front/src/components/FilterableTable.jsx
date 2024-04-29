import React from 'react'
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

const FilterableTable = (props) => {
  return (
    <>
        <div
            className="tableHeaderFilterButton"
        >
            {props.filterable && <Menu>
                <MenuTrigger disableButtonEnhancement>
                    <Button icon={<Filter24Regular />} />
                </MenuTrigger>
                <MenuPopover>
                    <MenuList
                        checkedValues={{columns: props.filteredColumnLabels}}
                        onCheckedValueChange={props.onCheckedValueChange}>
                        {props.columns.map(column => (
                            <MenuItemCheckbox key={column.label} name="columns" value={column.label}>
                                {column.label}
                            </MenuItemCheckbox>
                        ))}
                    </MenuList>
                </MenuPopover>
            </Menu>}

            <Table size="small" aria-label="Table with small size">
                <TableHeader>
                    <TableRow>
                        {props.columns.filter(column => column.show).map(column => (
                            <TableHeaderCell key={column.columnKey}>
                                <h4>{column.label}</h4>
                            </TableHeaderCell>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {props.data.map(element => (
                        <TableRow key={element.id}>
                            {props.filteredColumns.map(col => {
                                return (
                                <TableCell key={col}>
                                    {element[col] || "-"}
                                </TableCell>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    </>
  )
}

export default FilterableTable