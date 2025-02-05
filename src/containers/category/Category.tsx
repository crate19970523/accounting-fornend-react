import Box from "@mui/material/Box";
import React from "react";
import {Tab, Tabs} from "@mui/material";
import {Query} from "./Query.tsx";
import {useLocation} from "react-router-dom";
import {CategoryIndexResponseType, QueryRowsType, SearchCategoryConditionType} from "./Types.ts";
import Cookies from "universal-cookie";

type TabPanelProps = {
    children?: React.ReactNode; // 包含子元素
    index: number;              // 當前索引
    value: number;              // 當前選擇的值
};

const CustomTabPanel: React.FC<TabPanelProps> = (props) => {
    const {children, value, index, ...other} = props;
    return (
        <Box
            hidden={value !== index}
            {...other}
        >
            {value === index && <Box sx={{p: 3}}>{children}</Box>}
        </Box>
    );
};

const Category = () => {
    const [value, setValue] = React.useState(0);
    const location = useLocation();
    const [searchCategoryCondition, setSearchCategoryCondition] = React.useState<SearchCategoryConditionType>({
        name: "",
        isForSaving: "all",
        isActive: "all",
    });
    const [editSerial, setEditSerial] = React.useState<number | null>(null);
    const [queryResult, setQueryResult] = React.useState<QueryRowsType[]>([]);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('mode', newValue === 0 ? 'query' : newValue === 1 ? 'edit' : 'add');

        // 使用 pushState 或 replaceState 更新 URL
        window.history.pushState({}, '', `${location.pathname}?${searchParams.toString()}`);
    };

    const onClickEditButton = (serialNo: number) => {
        setValue(1);
        setEditSerial(serialNo);
    };

    const searchCategory = () => {
        const cookies = new Cookies();
        const token: string = cookies.get('token') || "";
        const requestParams: { name: string, isActive: string, isForSaving: string } = {
            name: "",
            isActive: "",
            isForSaving: "",
        };
        if (!searchCategoryCondition.name) {
            requestParams.name = searchCategoryCondition.name;
        }
        if (searchCategoryCondition.isActive !== "all") {
            requestParams.isActive = searchCategoryCondition.isActive ? "true" : "false";
        }
        if (searchCategoryCondition.isForSaving !== "all") {
            requestParams.isForSaving = searchCategoryCondition.isForSaving ? "true" : "false";
        }
        const queryString = new URLSearchParams(requestParams).toString();
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        fetch(`/api/categoryController/categoryIndex?${queryString}`, options).then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = import.meta.env.VITE_ACCOUNT_URL + "?redirect_uri=" + window.location.href;
                } else throw new Error(response.statusText);
            }
            return response.json();
        }).then((data: CategoryIndexResponseType) => {
            setQueryResult(data.categoryIndexData
                .map((item) => ({
                    id: item.serialNo,
                    serialNo: item.serialNo,
                    name: item.name,
                    isForSaving: item.isForSaving,
                    isActive: item.isActive,
                    lastUpdateTime: item.lastUpdateTime
                })));

        }).catch(error => {
            alert(error.message);
        })
    }

    return (
        <Box>
            <Box sx={{borderBottom: 1, borderColor: 'divider', width: '100%'}}>
                <Tabs value={value} onChange={handleChange} sx={{justifyContent: 'flex-start', width: '80vw'}}>
                    <Tab label="查詢"/>
                    <Tab label="編輯"/>
                    <Tab label="新增"/>
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Box component={"div"} sx={{width: '100%'}}>
                    <Query onClickSearch={searchCategory} onClickEdit={onClickEditButton} queryResult={queryResult}
                           setSearchCategoryCondition={setSearchCategoryCondition}
                           searchCategoryCondition={searchCategoryCondition}></Query>
                </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                {`編輯 ${editSerial}`}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                新增
            </CustomTabPanel>
        </Box>
    )
}
export default Category;