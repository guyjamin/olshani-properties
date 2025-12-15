"use client"

import { useEffect } from "react"

const PARTICLES = ["❄️", "✨", "🎄", "🎅", "🎁", "🔔", "⛄"]
const COLORS = ["#FF0000", "#00FF00", "#FFD700", "#FFFFFF", "#C0C0C0"]

export function ChristmasMagic() {
    useEffect(() => {
        const createParticle = (x: number, y: number) => {
            const particle = document.createElement("div")

            // Randomly decide between an emoji or a colored dot
            const isEmoji = Math.random() > 0.3

            if (isEmoji) {
                particle.innerText = PARTICLES[Math.floor(Math.random() * PARTICLES.length)]
                particle.style.fontSize = `${Math.random() * 20 + 10}px`
            } else {
                const size = Math.random() * 6 + 4
                particle.style.width = `${size}px`
                particle.style.height = `${size}px`
                particle.style.backgroundColor = COLORS[Math.floor(Math.random() * COLORS.length)]
                particle.style.borderRadius = "50%"
            }

            particle.style.position = "fixed"
            particle.style.left = `${x}px`
            particle.style.top = `${y}px`
            particle.style.pointerEvents = "none"
            particle.style.zIndex = "9999"
            particle.style.transform = "translate(-50%, -50%)"

            // Random physics
            const angle = Math.random() * Math.PI * 2
            const velocity = Math.random() * 100 + 50 // pixels per second
            const rotation = Math.random() * 360
            const rotationSpeed = (Math.random() - 0.5) * 720

            document.body.appendChild(particle)

            const animation = particle.animate(
                [
                    {
                        transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(0)`,
                        opacity: 1,
                        offset: 0
                    },
                    {
                        transform: `translate(calc(-50% + ${Math.cos(angle) * (velocity * 0.2)}px), calc(-50% + ${Math.sin(angle) * (velocity * 0.2)}px)) rotate(${rotation + rotationSpeed * 0.2}deg) scale(1.2)`,
                        opacity: 1,
                        offset: 0.2
                    },
                    {
                        transform: `translate(calc(-50% + ${Math.cos(angle) * velocity}px), calc(-50% + ${Math.sin(angle) * velocity + 100}px)) rotate(${rotation + rotationSpeed}deg) scale(0)`,
                        opacity: 0,
                        offset: 1
                    }
                ],
                {
                    duration: 1000 + Math.random() * 500,
                    easing: "cubic-bezier(0, .9, .57, 1)",
                    fill: "forwards"
                }
            )

            animation.onfinish = () => {
                particle.remove()
            }
        }

        const handleClick = (e: MouseEvent) => {
            const count = 12 // Number of particles per click
            for (let i = 0; i < count; i++) {
                createParticle(e.clientX, e.clientY)
            }
        }

        window.addEventListener("click", handleClick)
        return () => window.removeEventListener("click", handleClick)
    }, [])

    return null
}
