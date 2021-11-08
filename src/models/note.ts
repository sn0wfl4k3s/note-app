import { NoteForm } from "./noteForm"

export interface Note  extends NoteForm {
    id: string
    created: string
}