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
    authUser: authUserType | null,
}

function ThreadInput({ addThread, authUser }: addThreadType) {
    const [title, onChangeTitle, setTitle] = useAddThread('')
    const [body, onChangeBody, setBody] = useAddThread('')
    const [category, onChangeCategory, setCategory] = useAddThread('public')

    function addthread() {
        if (authUser === null) {
            alert('Silahkan Login Terlebih dahulu')
        } else {
            addThread({
                title,
                body,
                category
            })

            setTitle('')
            setBody('')
            setCategory('public')
        }
    }

    return (
        <div className="thread-input">
            <label htmlFor="title">
                <span>Title</span>
                <input type="text" name="title" placeholder="Judul pikiran anda ..." onChange={onChangeTitle} />
            </label>


            <label htmlFor="body">
                <span>Thread</span>
                <input type="text" name="body" placeholder="Apa isi fikiran anda ? kosong ? hmm...." onChange={onChangeBody} />
            </label>

            <label htmlFor="category">
                <span>Category</span>
                <input type="text" name="category" placeholder="#public" onChange={onChangeCategory} />
            </label>

            <button type="submit" onClick={addthread}>Kirim</button>
        </div>
    )

}

export { ThreadInput };