import { useState } from "react";

const useSelectFile = () => {

    const [selectedFile, setSelectedFile] = useState<string>()

    const onSelectFile  = (evt: React.ChangeEvent<HTMLInputElement>) => {

        const reader = new FileReader()

        if (evt.target.files?.[0]) {
            reader.readAsDataURL(evt.target.files[0])
        }

        reader.onload = (readerEvent) => {
            if (readerEvent.target?.result) {
                setSelectedFile(readerEvent.target.result as string)
            }
        }
    }

    return {
        selectedFile,
        setSelectedFile,
        onSelectFile
    }
};

export default useSelectFile;