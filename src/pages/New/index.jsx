import { Button, DatePicker, Input, NavBar } from "antd-mobile";
import Icon from "@/components/Icon";
import "./index.scss";
import classNames from "classnames";
import { billListData } from "@/contants";
import { useNavigate } from "react-router-dom";
import React from "react";
import { addBillList } from "@/store/modules/billStore";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

const New = () => {
    const navigate = useNavigate();
    const [billType, setBillType] = React.useState("pay");

    // 收集金额
    const [money, setMoney] = React.useState(0);
    const moneyChange= (value) =>{
        setMoney(value)
    }

    // 收集账单类型
    const [useFor, setUseFor] = React.useState("");

    // 存储选择时间
    const [date, setDate] = React.useState(new Date());

    // 控制时间打开关闭
    const [dateVisible, setDateVisible] = React.useState(false);
    // 确认选择时间 
    const dateConfirm = (value) => {
        setDate(value)
        setDateVisible(false)
    }

    const dispatch = useDispatch();

    // 保存账单
    const saveBill = () => {
        
        if(!money) return alert('请输入金额!')
        if(!useFor) return alert('请输入账单类型!')
        const data = {
            type: billType,
            money: billType === 'pay' ? -money : +money,
            date: date,
            useFor: useFor
        }
        dispatch(addBillList(data))

        navigate('/')
    }

    
    return (
        <div className="keepAccounts">
            <NavBar className="nav" onBack={() => navigate(-1)}>
                记一笔
            </NavBar>

            <div className="header">
                <div className="kaType">
                    <Button
                        shape="rounded"
                        className={classNames(
                            billType === "pay" ? "selected" : ""
                        )}
                        onClick={() => setBillType("pay")}
                    >
                        支出
                    </Button>
                    <Button
                        shape="rounded"
                        className={classNames(
                            billType === "income" ? "selected" : ""
                        )}
                        onClick={() => setBillType("income")}
                    >
                        收入
                    </Button>
                </div>

                <div className="kaFormWrapper">
                    <div className="kaForm">
                        <div className="date">
                            <Icon type="calendar" className="icon" />
                            <span className="text" onClick={() => setDateVisible(!dateVisible)}>{dayjs(date).format("YYYY-MM-DD")}</span>
                            {/* 时间组件 */}
                            <DatePicker
                                className="kaDate"
                                title="记账日期"
                                max={new Date()}
                                visible={dateVisible}
                                onConfirm={dateConfirm}
                            />
                        </div>
                        <div className="kaInput">
                            <Input
                                className="input"
                                placeholder="0.00"
                                type="number"
                                value={money}
                                onChange={moneyChange}
                            />
                            <span className="iconYuan">¥</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="kaTypeList">
                {billListData[billType].map((item) => {
                    return (
                        <div className="kaType" key={item.type}>
                            <div className="title">{item.name}</div>
                            <div className="list">
                                {item.list.map((item) => {
                                    return (
                                        <div
                                            className={classNames("item", useFor === item.type ? "selected" : "")}
                                            key={item.type}
                                            onClick={() => setUseFor(item.type)}
                                        >
                                            <div className="icon">
                                                <Icon type={item.type} />
                                            </div>
                                            <div className="text">
                                                {item.name}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="btns">
                <Button className="btn save" onClick={saveBill}>
                    保 存
                </Button>
            </div>
        </div>
    );
};

export default New;
