"use client";
import { React, useEffect, useState } from "react"
import { Button, Card, Typography } from "@material-tailwind/react";
export default function MainScreen() {
    const TABLE_HEAD = ["From", "To", "Hour", ""];
    const [timeinMin, setTimeinMin] = useState("")
    const [timeinHour, setTimeinHour] = useState("")
    const [timeoutMin, setTimeoutMin] = useState("")
    const [timeoutHour, setTimeoutHour] = useState("")
    const [totalHours, setTotalHours] = useState(0);
    const [hour, setDate] = useState("")

    useEffect(() => {
        getTotalHours()
    }, [hour])

    const getTotalHours = () => {
        let totalMinutes = 0;

        if (hour.length > 0) {
            hour.forEach((entry) => {
                const match = entry.hour.match(/(\d+) and (\d+) minutes/);
                const hours = parseInt(match[1], 10);
                const minutes = parseInt(match[2], 10);
                totalMinutes += hours * 60 + minutes;
            });

            const calculatedTotalHours = totalMinutes / 60;
            setTotalHours(calculatedTotalHours.toFixed(2));
        }
        else {
            setTotalHours(0)
        }
    }

    const convertTo12HourFormat = (time24Hour) => {
        const [hours, minutes] = time24Hour.split(':').map(Number);
        const date = new Date(2000, 0, 1, hours, minutes);
        const time12Hour = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        return time12Hour;
    }
    const calculateTimeDifference = (time1, time2) => {
        const timeFormat = "hh:mm A";
        const date1 = new Date(`2000-01-01 ${time1}`);
        const date2 = new Date(`2000-01-01 ${time2}`);
        const differenceInMillis = date2 - date1;
        const hours = Math.floor(differenceInMillis / (1000 * 60 * 60));
        const minutes = Math.floor((differenceInMillis % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours} and ${minutes} minutes`
    };

    const handleSubmit = () => {
        const otStart = + timeinHour + 9
        const convertedTimein = convertTo12HourFormat(otStart + ":" + timeinMin)
        const convertedTimeout = convertTo12HourFormat(timeoutHour + ":" + timeoutMin)
        const timeDifference = calculateTimeDifference(convertedTimein, convertedTimeout);

        // Check if the time difference is less than 1 minute
        const match = timeDifference.match(/(\d+) and (\d+) minutes/);
        const hours = parseInt(match[1], 10);
        const minutes = parseInt(match[2], 10);

        if (hours === 0 && minutes < 1) {
            alert("Hindi ka overtime be!");
            return;
        }
        setDate((prevDate) => [
            ...prevDate,
            {
                from: convertedTimein,
                to: convertedTimeout,
                hour: timeDifference
            }
        ]);
        setTimeinHour("")
        setTimeinMin("")
        setTimeoutHour("")
        setTimeoutMin("")
    }

    const handleRemove = (index) => {
        const updatedData = [...hour];
        updatedData.splice(index, 1);
        setDate(updatedData);
        getTotalHours()
    };


    return (
        <div className="h-full w-full min-w-screen min-h-screen flex items-center justify-center gap-3 flex-col px-3 lg:py-20">
            <div className="flex items-center justify-center gap-2 lg:gap-10">
                <div className="flex gap-1 lg:gap-3 items-center justify-center">
                    <p>Timein:</p>
                    <input type="number"
                        className="text-black rounded-lg p-1 w-10 text-center"
                        maxLength={2}
                        placeholder="00"
                        value={timeinHour}
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            const sanitizedValue = inputValue.replace(/\D/g, '').slice(0, 2);
                            setTimeinHour(sanitizedValue)
                        }
                        }
                    />
                    :
                    <input type="number"
                        className="text-black rounded-lg p-1 w-10 text-center"
                        maxLength={2}
                        placeholder="00"
                        value={timeinMin}
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            const sanitizedValue = inputValue.replace(/\D/g, '').slice(0, 2);
                            setTimeinMin(sanitizedValue)
                        }
                        }
                    />
                </div>

                <div className="flex gap-1 lg:gap-3 items-center justify-center">
                    <p>Timeout:</p>
                    <input type="number"
                        className="text-black rounded-lg p-1 w-10 text-center"
                        maxLength={2}
                        placeholder="00"
                        value={timeoutHour}
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            const sanitizedValue = inputValue.replace(/\D/g, '').slice(0, 2);
                            setTimeoutHour(sanitizedValue)
                        }
                        }
                    />
                    :
                    <input type="number"
                        className="text-black rounded-lg p-1 w-10 text-center"
                        maxLength={2}
                        placeholder="00"
                        value={timeoutMin}
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            const sanitizedValue = inputValue.replace(/\D/g, '').slice(0, 2);
                            setTimeoutMin(sanitizedValue)
                        }
                        }
                    />
                </div>
                <div className="flex gap-1 lg:gap-3 items-center justify-center">
                    <button onClick={handleSubmit}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>

            </div>

            <Card className="h-full w-full lg:w-[30rem]  ">
                <table className="w-full min-w-max table-auto text-left">
                    <thead >
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {hour && hour.map(({ from, to, hour }, index) => {
                            const isLast = index === hour.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={index}>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {from}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {to}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {hour}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <button onClick={() => handleRemove(index)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-8 h-8">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>

                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
            <p>Total Overtime: {totalHours}</p>
            {/* <Button>Test</Button> */}
        </div>
    )
}
