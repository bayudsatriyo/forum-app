import useAddThread from "../hooks/useAddThread";
import { authUserType } from "../states/authUser/action";

export interface threadAddType {
    title: string,
    body: string,
    category: string
}

interface addThreadType {
    addThread: ({
        title,
        body,
        category,
    }: threadAddType) => void,
    authUser: authUserType | null | undefined,
}

function ThreadInput({ addThread, authUser }: addThreadType) {
    const [title, onChangeTitle, setTitle] = useAddThread('')
    const [body, onChangeBody, setBody] = useAddThread('')
    const [category, onChangeCategory, setCategory] = useAddThread('')

    function addthread(event: React.MouseEvent<HTMLElement>) {
        if (authUser === null || authUser === undefined) {
            alert('Silahkan Login Terlebih dahulu')
        }
        event.preventDefault()

        addThread({
            title,
            body,
            category
        })

        setTitle('')
        setBody('')
        setCategory('')

    }

    return (
        <>
            <div className="thread-input flex flex-col gap-2 mb-8">
                <div className="input flex-col flex gap-2">
                    <input type="text" name="title" placeholder="Judul pikiran anda ..." onChange={onChangeTitle} value={title} className="border border-effect rounded-lg py-1 pl-2" />
                    <textarea name="body" placeholder="Apa isi fikiran anda ? kosong ? hmm...." onChange={onChangeBody} value={body} className="border border-effect rounded-lg py-2 pl-2"></textarea>
                    <div className="flex w-full gap-5">
                        <input type="text" name="category" placeholder="#category" onChange={onChangeCategory} value={category} className="w-full border border-effect rounded-lg pl-2" />
                        <button type="submit" onClick={addthread} className="bg-effect border border-effect text-slate-50 px-4 h-8 rounded-xl hover:text-effect hover:bg-white hover:border-effect hover:border ">Kirim</button>
                    </div>
                </div>
            </div >

        </>
    )

}

export { ThreadInput };