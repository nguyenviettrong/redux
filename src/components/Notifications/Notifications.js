import { store } from 'react-notifications-component';

export default function Notifications (message, type) {
    return (
        store.addNotification({
            title: "",
            message: message,
            type: type,
            insert: "top",
            container: "top-center",
            animationIn: ["animated", "bounceInDown"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 2000,
              onScreen: false,
              showIcon:true
            },
            width: 250
        })
    )
}
