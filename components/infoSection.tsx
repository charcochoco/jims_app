"use client"

import Image from "next/image"
import type React from "react"

interface InfoSectionProps {
    title: string
    highlightedWord: string
    children: React.ReactNode
    imageUrl: string
    imageAlt: string
    imagePosition?: "left" | "right"
}

const InfoSection: React.FC<InfoSectionProps> = ({
    title,
    highlightedWord,
    children,
    imageUrl,
    imageAlt,
    imagePosition = "right",
}) => {
    const words = title.trim().split(" ");
    const lastWord = words.pop();
    const firstPart = words.join(" ");

    return (
        <section className="w-full px-4 sm:px-6 md:px-12 lg:px-24 py-12 md:py-16 max-w-7xl mx-auto">
            <div
                className={`flex flex-col md:flex-row justify-between items-center gap-12 ${imagePosition === "left" ? "md:flex-row-reverse" : ""
                    }`}
            >
                <div className="w-full md:w-6/12 flex-1">
                    <h2 className="text-3xl md:text-5xl font-title font-bold text-[#241f18] mb-4">
                        {firstPart && `${firstPart} `}
                        <span className="text-[#d1742c]">{lastWord}</span>
                    </h2>
                    <div className="space-y-4 text-[#4f473a] font-secondary text-base md:text-lg">
                        {children}
                    </div>
                </div>

                <div className="w-full md:w-5/12 flex-1">
                    <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={imageAlt}
                        width={500}
                        height={350}
                        className="rounded-lg object-cover w-full h-auto"
                        style={{maxHeight: '420px'}}
                    />
                </div>
            </div>
        </section>
    )
}

export default InfoSection
