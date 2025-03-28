import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import Swal from 'sweetalert2'
import { current } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { apiCreateOrder } from "../../apis/user";
import { useNavigate } from 'react-router-dom'
import path from "../../utils/path";
// This value is from the props in the UI
const style = { "layout": "vertical" };


const ButtonWrapper = ({ currency, showSpinner, amount, payload, setIsSuccess }) => {
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
    const navigate = useNavigate()
    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        })
    }, [currency, showSpinner, amount])
    const handleSaveOrder = async () => {
        const response = await apiCreateOrder({ ...payload, status: 'SUCCESS' })
        if (response.message === true) {
            setIsSuccess(true)
            Swal.fire({ title: 'CHÚC MỪNG !', text: "Bạn đã thanh toán thành công !", icon: "success" }).then((result) => {
                if (result.isConfirmed) {
                    setIsSuccess(false)
                    navigate(`/${path.HOME}`)
                }
            }, 700)
        }
    }

    return (
        <>
            {(showSpinner && isPending) && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style, currency, amount]}
                fundingSource={undefined}
                createOrder={(data, actions) => actions.order.create({
                    purchase_units: [
                        { amount: { currency_code: currency, value: amount } }
                    ]
                }).then(orderId => orderId)
                }
                onApprove={(data, actions) => actions.order.capture().then(async (response) => {
                    if (response.status === 'COMPLETED') {
                        handleSaveOrder()
                    }
                })}
            />
        </>
    );
}



export default function Paypal({ amount, payload, setIsSuccess }) {
    return (
        <div style={{ maxWidth: "750px", minHeight: "200px" }}>
            <PayPalScriptProvider s options={{ clientId: "test", components: "buttons", currency: "USD" }}>
                <ButtonWrapper payload={payload} setIsSuccess={setIsSuccess} currency={'USD'} amount={amount} showSpinner={false} />
            </PayPalScriptProvider>
        </div>
    );
}
ButtonWrapper.propTypes = {
    showSpinner: PropTypes.bool,
    currency: PropTypes.string,
    amount: PropTypes.number,
    payload: PropTypes.any,
    setIsSuccess: PropTypes.bool,
};
Paypal.propTypes = {
    amount: PropTypes.number,
    payload: PropTypes.any,
    setIsSuccess: PropTypes.bool,
};