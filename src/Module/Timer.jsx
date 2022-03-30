import { format } from "date-fns";
import { useState, useEffect } from "react"

export default function Timer() {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        setTimeout(() => {
            setTime(new Date())
        }, 1000);
    }, [time])

    return (
        <p className="text-center font-semibold p-4 text-lg">{format(time, "MMMM do, yyyy HH:mm:ss")}</p>
    )
}
