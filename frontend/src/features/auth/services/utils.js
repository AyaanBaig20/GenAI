import {toast} from "react-toastify"

export function handlesuccess(msg) {
    toast.success(msg,{
        position:"top-center"
    })
}
export function handlefailure(msg) {
    toast.error(msg,{
        position:"top-center"
    })
}