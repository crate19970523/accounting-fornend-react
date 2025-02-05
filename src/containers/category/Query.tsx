import Box from "@mui/material/Box";
import {
    Button,
    FormControl,
    Input,
    InputLabel, MenuItem,
    Paper,
    Select,
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import React from "react";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {QueryRowsType, SearchCategoryConditionType} from "./Types.ts";

type PropsType = {
    onClickEdit: (serialNo: number) => void;
    onClickSearch: () => void;
    queryResult: QueryRowsType[];
    setSearchCategoryCondition: (param: SearchCategoryConditionType) => void;
    searchCategoryCondition: SearchCategoryConditionType;
}

export const Query: React.FC<PropsType> = ({
                                               onClickEdit,
                                               onClickSearch,
                                               queryResult,
                                               setSearchCategoryCondition,
                                               searchCategoryCondition
                                           }) => {
    const queryResultColumns: GridColDef<QueryRowsType>[] = [
        {
            field: "name",
            headerName: "名稱",
            headerAlign: "center",
            align: "center",
            flex: 1,
        }, {
            field: "isForSaving",
            headerName: "是否用於存檔",
            headerAlign: "center",
            align: "center",
            flex: 1,
            maxWidth: 150,
            renderCell: (params) => (
                <Box color={params.value ? "black" : "red"}>
                    {params.value ? "是" : "否"}
                </Box>
            )
        }, {
            field: "isActive",
            headerName: "是否活動中",
            headerAlign: "center",
            align: "center",
            flex: 1,
            maxWidth: 150,
            renderCell: (params) => (
                <Box color={params.value ? "black" : "red"}>
                    {params.value ? "是" : "否"}
                </Box>
            )
        }, {
            field: "lastUpdateTime",
            headerName: "更新時間",
            headerAlign: "center",
            align: "center",
            flex: 1,
            maxWidth: 150,
            renderCell: (params) => (
                <Box>
                    {params.value.split("T")[0] + " " + params.value.split("T")[1].split(".")[0]}
                </Box>
            )
        }, {
            field: "actions",
            headerName: "操作",
            headerAlign: "center",
            flex: 1,
            maxWidth: 200,
            align: "center",
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleActionClick(params.row)}
                >
                    點擊操作
                </Button>
            )
        }
    ];

    const doQuery = () => {
        onClickSearch();
    }

    const handleActionClick = (row: QueryRowsType) => {
        window.history.pushState({}, '', `${location.pathname}?mode=edit&serialNo=${row.serialNo}`);
        onClickEdit(row.serialNo);
    };

    const handleSearchCategoryConditionChange = (param: SearchCategoryConditionType) => {
        setSearchCategoryCondition(param);
    }

    return (
        <>
            <Paper elevation={2} style={{marginBottom: 10}}>
                <Box>
                    <Grid container rowSpacing={1} sx={{p: 1}}>
                        <Grid bgcolor="#64b5f6" color={"white"} size={12} sx={{p: 1}}>
                            查詢條件
                        </Grid>
                        <Grid size={1} container justifyContent={"flex-end"} style={{paddingTop: '1%'}}>
                            名稱
                        </Grid>
                        <Grid size={2} container justifyContent="flex-start">
                            <FormControl
                                variant="standard"
                            >
                                <InputLabel htmlFor="name"></InputLabel>
                                <Input
                                    id="name"
                                    value={searchCategoryCondition.name}
                                    sx={{maxHeight: 20}}
                                    onChange={(e) =>
                                        handleSearchCategoryConditionChange({
                                            ...searchCategoryCondition,
                                            name: e.target.value
                                        })}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={2} container justifyContent={"flex-end"} style={{paddingTop: '1%'}}>
                            是否用於存錢
                        </Grid>
                        <Grid size={2} container justifyContent="flex-start">
                            <FormControl variant="standard" size="small" sx={{m: 1, minWidth: 120}}>
                                <Select
                                    labelId={"isForSaving"}
                                    style={{maxHeight: 40}}
                                    value={searchCategoryCondition.isForSaving === "all" ? "all" : searchCategoryCondition.isForSaving}
                                    onChange={(e) => handleSearchCategoryConditionChange({
                                        ...searchCategoryCondition,
                                        isForSaving: e.target.value === "all" ? "all" : e.target.value === "true"
                                    })}
                                >
                                    <MenuItem value={"all"}>全都查</MenuItem>
                                    <MenuItem value={"true"}>是</MenuItem>
                                    <MenuItem value={"false"}>否</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={2} container justifyContent={"flex-end"} style={{paddingTop: '1%'}}>
                            活動中
                        </Grid>
                        <Grid size={1} container>
                            <FormControl variant="standard" size="small" sx={{m: 1, minWidth: 120}}>
                                <Select
                                    labelId={"isActive"}
                                    style={{maxHeight: 40}}
                                    value={searchCategoryCondition.isActive}
                                    onChange={(e) => handleSearchCategoryConditionChange({
                                        ...searchCategoryCondition,
                                        isActive: e.target.value === "all" ? "all" : e.target.value === "true"
                                    })}
                                >
                                    <MenuItem value={"all"}>全部</MenuItem>
                                    <MenuItem value={"true"}>是</MenuItem>
                                    <MenuItem value={"false"}>否</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={12} container margin={"auto"} justifyContent={"flex-end"}>
                            <Button variant="contained" onClick={doQuery}>查詢</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

            <Paper elevation={2}>
                <Box>
                    <DataGrid
                        rows={queryResult}
                        columns={queryResultColumns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5, 10, 20]}
                    />
                </Box>
            </Paper>
        </>
    )
}