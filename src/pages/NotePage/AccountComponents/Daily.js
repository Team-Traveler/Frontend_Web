import { useRecoilState } from "recoil";
import { accountState } from "../../../recoil/atoms/accountState";
import { useEffect } from "react";
import "./Daily.css";

function Daily() {
    const [account, setAccount] = useRecoilState(accountState);

    return (
        <div className="account-daily">
            {account.map((item) => (
                <div className="account-item-container">
                    <div className="account-item-daily-header">
                        <div className="account-item-date">{item.date}</div>
                        <div className="account-item-daily-cost">합계 금액</div>
                    </div>
                    {item.content.map((item) => (
                        <div className="account-item">
                            <div className="account-item-category">
                                {item.category}
                            </div>
                            <div className="account-item-title">
                                {item.title}
                            </div>
                            <div className="account-item-price">
                                {item.price}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Daily;
