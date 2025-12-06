"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => setIsOpen(!isOpen)
    const closeMenu = () => setIsOpen(false)

    // Prevent body scroll when menu is open
    if (typeof window !== "undefined") {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
    }

    return (
        <>
            {/* Hamburger Button */}
            <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={toggleMenu}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
            >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
                        onClick={closeMenu}
                        aria-hidden="true"
                    />

                    {/* Menu Panel */}
                    <nav
                        id="mobile-menu"
                        className="fixed top-20 right-0 bottom-0 w-full max-w-sm bg-card border-l border-border z-50 md:hidden overflow-y-auto"
                        role="navigation"
                        aria-label="Mobile navigation"
                    >
                        <div className="flex flex-col p-6 space-y-6">
                            {/* Navigation Links */}
                            <div className="space-y-4">
                                <Link
                                    href="/#properties"
                                    className="block text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                                    onClick={closeMenu}
                                >
                                    Properties
                                </Link>
                                <Link
                                    href="/about"
                                    className="block text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                                    onClick={closeMenu}
                                >
                                    About
                                </Link>
                                <Link
                                    href="/contact"
                                    className="block text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                                    onClick={closeMenu}
                                >
                                    Contact
                                </Link>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-border" />

                            {/* Contact Button */}
                            <a
                                href="https://wa.me/254702168686"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full bg-primary text-primary-foreground text-center px-6 py-3 rounded-md font-medium hover:opacity-90 transition"
                                onClick={closeMenu}
                            >
                                Contact Us on WhatsApp
                            </a>

                            {/* Additional Info */}
                            <div className="pt-4 space-y-2 text-sm text-muted-foreground">
                                <p className="flex items-center gap-2">
                                    <span className="font-medium">Phone:</span>
                                    <a href="tel:0702168686" className="hover:text-primary">
                                        0702 168 686
                                    </a>
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="font-medium">Email:</span>
                                    <a href="mailto:info@olshaniproperties.co.ke" className="hover:text-primary break-all">
                                        info@olshaniproperties.co.ke
                                    </a>
                                </p>
                            </div>
                        </div>
                    </nav>
                </>
            )}
        </>
    )
}
