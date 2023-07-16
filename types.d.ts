declare module '*module.css' {
    const styles: {
        [className: string]: string
    }
    export default styles
}

declare type Props = {
    children: React.ReactNode
}