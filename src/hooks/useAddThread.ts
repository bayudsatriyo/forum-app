import { useState } from "react";

function useAddThread(defaultValue = '') {
    const [value, setValue] = useState<string>(defaultValue)

    function handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value)
    }

    return [value, handleValueChange, setValue] as [string, (event: React.ChangeEvent<HTMLInputElement>) => void, (value: string) => void]
}

export default useAddThread;