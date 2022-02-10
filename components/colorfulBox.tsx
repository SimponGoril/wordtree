

interface ColorfulBoxProps {
    size?: number;
    color?: string;
}

export default function ColorfulBox({ size = 20, color = "black" }: ColorfulBoxProps) {
    const styles = {
        fill:color,
        strokeWidth:"3",
        stroke:"rgb(0,0,0)"
    }

    return <svg className={"inline"} width={size} height={size} >
        <rect width={size} height={size} style={styles} />
    </svg>

}

