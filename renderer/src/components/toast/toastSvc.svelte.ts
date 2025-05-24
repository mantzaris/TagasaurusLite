

export type ToastKind = "primary" | "success" | "danger" | "warning" | "info" | "dark";

export let TOAST_STORE = $state({
    toasts: new Array<Toast>()
})

const durationMap:Record<ToastKind,number> = {
    primary: 5000,
    success: 5000,
    dark: 5000,
    info: 5000,
    warning: 8000,
    danger: 10000,
}

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

export function toast(k:ToastKind, c:string, d:number = durationMap[k]) {
    const toast = new Toast(d,k,c);
    const uid = toast.uid;
    TOAST_STORE.toasts.push(toast);

    setTimeout(()=> {
        TOAST_STORE.toasts = TOAST_STORE.toasts.filter(t => t.uid != uid)
    }, d)
}