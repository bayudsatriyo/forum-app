import { useState } from "react";

function useInput(defaultValue = '') {
    const [value, setValue] = useState<string>(defaultValue)

    function handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value)
    }

    return [value, handleValueChange] as [string, (event: React.ChangeEvent<HTMLInputElement>) => void]
}

export default useInput;