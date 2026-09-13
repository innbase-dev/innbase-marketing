"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Keeps the marketing surface presentable while the final property-photo pack
 * is being assembled. Real assets render normally; a quiet, branded fallback
 * replaces a failed request instead of leaving a broken-image glyph in the
 * layout.
 */
export default function AssetImage({
    fallbackLabel = "Innbase visual",
    fallbackTone = "forest",
    ...props
}) {
    const [failed, setFailed] = useState(false);

    if (failed) {
        const label = props.alt || fallbackLabel;
        return (
            <div
                className={`asset-fallback asset-fallback-${fallbackTone}${props.fill ? " asset-fallback-fill" : ""}${props.className ? ` ${props.className}` : ""}`}
                role="img"
                aria-label={label}
                style={props.style}
            >
                <span className="asset-fallback-mark" aria-hidden="true" />
                <span className="asset-fallback-label">{fallbackLabel}</span>
            </div>
        );
    }

    return <Image {...props} onError={() => setFailed(true)} />;
}
