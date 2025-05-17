

export type ToastKind = "primary" | "success" | "danger" | "warning" | "info" | "dark";

export let TOAST_STORE = $state(new Array<Toast>())

export class Toast{
    public duration:number = $state(0);
    public kind:ToastKind = $state("primary")
    public content:string = $state("")
    public uid = crypto.randomUUID();

    constructor(d:number, k:ToastKind, c:string) {
        this.duration = d;
        this.kind = k;
        this.content = c;
    }
}

export function toast(d: number, k:ToastKind, c:string) {
    const toast = new Toast(d,k,c);
    const uid = toast.uid;
    TOAST_STORE.push(toast);}