import React, { useState } from "react";

function useAddThread(defaultValue = '') {
    const [value, setValue] = useState<string>(defaultValue)

    function handleValueChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        setValue(event.target.value)
    }




    return [value, handleValueChange, setValue] as [string, (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void, React.Dispatch<React.SetStateAction<string>>]
}

export default useAddThread;