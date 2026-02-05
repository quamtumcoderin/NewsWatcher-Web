"user client";

import * as React from "react"
import { useTheme } from "next-themes"
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="w-10 h-10" />
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-border/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Alternar tema"
        >
            {theme === "dark" ? (
                <SunIcon className="w-6 h-6 text-primary" />
            ) : (
                <MoonIcon className="w-6 h-6 text-muted" />
            )}
        </button>
    )
}