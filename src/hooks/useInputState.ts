import { useState, useCallback } from "react";

type UseInputStateReturn = [string, (e: React.ChangeEvent<HTMLInputElement>) => void, React.Dispatch<React.SetStateAction<string>>];

function useInputState(initialValue: string): UseInputStateReturn {
  const [value, setValue] = useState(initialValue);

  // Add events to the ChangeEvent generic as needed
  const handleChange = useCallback<UseInputStateReturn[1]>((e) => {
    const { target: { value: targetValue } } = e;

    setValue(targetValue);
  }, [setValue]);

  return [value, handleChange, setValue];
}

export default useInputState;
