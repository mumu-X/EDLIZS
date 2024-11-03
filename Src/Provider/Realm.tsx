import { RealmProvider } from "@realm/react"
import { PropsWithChildren } from "react"
import {schemas} from "../models/Task"

export default function RealmCustomProvider({children}: PropsWithChildren) {

    return (
        <RealmProvider schema={schemas}>
        {children}
        </RealmProvider>);}