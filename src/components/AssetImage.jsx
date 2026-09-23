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
    alt = "",
    fallbackLabel = "Innbase visual",
    fallbackTone = "forest",
    ...props
}) {
    const [failed, setFailed] = useState(false);

    if (failed) {
        const label = alt || fallbackLabel;
        return (
            <div
                className={`asset-fallback asset-fallback-${fallbackTone}${props.fill ? " asset-fallback-fill" : ""}${props.className ? ` ${props.className}` : ""}`}
                role={alt ? "img" : undefined}
                aria-label={alt ? label : undefined}
                aria-hidden={alt ? undefined : true}
                style={props.style}
            >
                <span className="asset-fallback-mark" aria-hidden="true" />
                <span className="asset-fallback-label">{fallbackLabel}</span>
            </div>
        );
    }

    return <Image alt={alt} {...props} onError={() => setFailed(true)} />;
}
