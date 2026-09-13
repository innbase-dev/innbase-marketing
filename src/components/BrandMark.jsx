import Image from "next/image";

export default function BrandMark({ className = "" }) {
    return (
        <span className={`brand-lockup ${className}`.trim()}>
            <Image
                className="brand-logo-img"
                src="/images/innbase-light.svg"
                alt=""
                width={136}
                height={43}
                draggable={false}
            />
        </span>
    );
}
