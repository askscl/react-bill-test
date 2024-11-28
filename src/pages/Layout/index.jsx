import "./index.scss";
import { Button } from "antd-mobile";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBillList } from "@/store/modules/billStore";

import { TabBar } from "antd-mobile";
import {
    AppOutline,
    MessageOutline,
    HandPayCircleOutline
} from "antd-mobile-icons";

const Layout = () => {
    const dispatch = useDispatch();
    // 类似mounted
    useEffect(() => {
        dispatch(getBillList());
    }, [dispatch]);

    // 获取当前路由
    const location = useLocation();
    const { pathname } = location;
    const navigate = useNavigate();

    const setRouteActive = (value) => {
        navigate(value);
    };

    const tabs = [
        {
            key: "/",
            title: "月度账单",
            icon: <AppOutline />,
        },
        {
            key: "/new",
            title: "待办",
            icon: <HandPayCircleOutline />,
        },
        {
            key: "/year",
            title: "年度账单",
            icon: <MessageOutline />,
        },
    ];

    return (
        <>
            <div className="layout">
                <div className="contaimer">
                    <Outlet />
                </div>
                <div className="footer">
                    <TabBar
                        activeKey={pathname}
                        onChange={(value) => setRouteActive(value)}
                    >
                        {tabs.map((item) => (
                            <TabBar.Item
                                key={item.key}
                                icon={item.icon}
                                title={item.title}
                            />
                        ))}
                    </TabBar>
                </div>
            </div>

            {/* <div>layout页面</div>
            <Button color="primary">layout按钮</Button>
            <div className="puple">
                <Button color="primary">layout按钮</Button>
            </div> */}
        </>
    );
};

export default Layout;
