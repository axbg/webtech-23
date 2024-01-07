import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import "./style.css";

const MovieTable = ({ movies, deleteMovie }) => {
    const columns = [
        { field: "id", headerName: "ID", flex: 0.1, align: 'center', headerClassName: "table-header", headerAlign: "center" },
        { field: "title", headerName: "Title", flex: 1, align: 'center', headerClassName: "table-header", headerAlign: "center" },
        { field: "director", headerName: "Director", flex: 1, align: 'center', headerClassName: "table-header", headerAlign: "center" },
        {
            field: "year",
            headerName: "Year",
            type: "number",
            flex: 0.5,
            align: 'center',
            headerClassName: "table-header",
            headerAlign: "center"
        },
        { field: "genre", headerName: "Genre", flex: 0.5, align: 'center', headerClassName: "table-header", headerAlign: "center" },
        {
            field: "duration",
            headerName: "Duration",
            type: "number",
            flex: 0.5,
            align: 'center',
            headerClassName: "table-header",
            headerAlign: "center"
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Remove",
            align: "center",
            headerClassName: "table-header",
            flex: 0.5,
            getActions: ({ id }) => {
                return ([
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={() => {
                            if (window.confirm("Do you want to delete?")) {
                                deleteMovie({ id: id });
                            };
                        }}
                        color="inherit"
                    />
                ]);
            }
        }
    ];

    return (
        <div className="table-container">
            <DataGrid rows={movies} columns={columns} />
        </div>
    );
}

export { MovieTable };